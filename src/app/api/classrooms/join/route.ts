import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";

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

    const classroom = await prisma.classroom.findUnique({
      where: { joinCode: joinCode.trim().toUpperCase() },
    });

    if (!classroom) {
      return NextResponse.json({ error: "Classroom not found. Check the code!" }, { status: 404 });
    }

    const safeParse = (str: any) => { try { return str && typeof str === "string" ? JSON.parse(str) : []; } catch { return []; } };
    const currentStudentIds = safeParse(classroom.studentIds);

    if (currentStudentIds.includes(childId)) {
      return NextResponse.json({ error: "You are already in this classroom!" }, { status: 400 });
    }

    currentStudentIds.push(childId);

    const updated = await prisma.classroom.update({
      where: { id: classroom.id },
      data: { studentIds: JSON.stringify(currentStudentIds) },
    });

    return NextResponse.json({ success: true, classroom: updated });
  } catch (error) {
    console.error("Classroom join error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
