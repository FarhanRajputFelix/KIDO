import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";

// POST /api/classrooms/join — Student joins a classroom
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, joinCode } = await req.json();

    if (!childId || !joinCode) {
      return NextResponse.json({ error: "Child ID and Join Code required" }, { status: 400 });
    }

    // Only enroll a child this account is allowed to act for
    if (!(await getAccessibleChild(session, childId))) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    const classroom = await prisma.classroom.findUnique({
      where: { joinCode: joinCode.trim().toUpperCase() },
    });

    if (!classroom) {
      return NextResponse.json({ error: "Classroom not found. Check the code!" }, { status: 404 });
    }

    const safeParse = (str: any) => { try { return str && typeof str === "string" ? JSON.parse(str) : []; } catch { return []; } };
    const currentStudentIds = safeParse(classroom.studentIds);
    const pendingStudentIds = safeParse(classroom.pendingStudentIds);

    if (currentStudentIds.includes(childId)) {
      return NextResponse.json({ error: "You are already in this classroom!" }, { status: 400 });
    }
    if (pendingStudentIds.includes(childId)) {
      return NextResponse.json({ error: "Your request is already waiting for parent approval." }, { status: 400 });
    }

    // Enrollment requires PARENT approval — queue it instead of joining directly.
    pendingStudentIds.push(childId);
    await prisma.classroom.update({
      where: { id: classroom.id },
      data: { pendingStudentIds: JSON.stringify(pendingStudentIds) },
    });

    // Notify the child's parent so they can approve.
    const child = await prisma.child.findUnique({ where: { id: childId }, select: { name: true } });
    await prisma.parentAlert.create({
      data: {
        childId,
        type: "classroom_request",
        title: `📚 Classroom enrollment needs your approval`,
        message: `${child?.name || "Your child"} wants to join the classroom "${classroom.name}". Approve it from your Parent Panel.`,
        severity: "info",
      },
    });

    return NextResponse.json({
      success: true,
      pending: true,
      message: "Request sent! A parent must approve before you can join this classroom.",
    });
  } catch (error) {
    console.error("Classroom join error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
