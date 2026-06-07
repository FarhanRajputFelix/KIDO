import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";

// POST /api/classrooms/approve — parent approves/rejects a child's classroom enrollment
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "parent" && role !== "admin") {
      return NextResponse.json({ error: "Only parents can approve enrollments" }, { status: 403 });
    }

    const { childId, classroomId, action } = await req.json(); // action: "approve" | "reject"
    if (!childId || !classroomId || !action) {
      return NextResponse.json({ error: "childId, classroomId and action required" }, { status: 400 });
    }

    // The parent must own this child.
    const child = await getAccessibleChild(session, childId);
    if (!child) {
      return NextResponse.json({ error: "Not your child" }, { status: 403 });
    }

    const classroom = await prisma.classroom.findUnique({ where: { id: classroomId } });
    if (!classroom) {
      return NextResponse.json({ error: "Classroom not found" }, { status: 404 });
    }

    const safeParse = (s: string) => { try { return JSON.parse(s) as string[]; } catch { return []; } };
    const pending = safeParse(classroom.pendingStudentIds);
    const enrolled = safeParse(classroom.studentIds);

    if (!pending.includes(childId)) {
      return NextResponse.json({ error: "No pending request for this child" }, { status: 400 });
    }

    const newPending = pending.filter(id => id !== childId);
    let newEnrolled = enrolled;

    if (action === "approve" && !enrolled.includes(childId)) {
      newEnrolled = [...enrolled, childId];
      await prisma.activityFeed.create({
        data: {
          childId,
          type: "classroom_joined",
          title: `Joined classroom "${classroom.name}"! 🎓`,
          description: "Your parent approved the enrollment.",
          xpEarned: 0,
        },
      });
    }

    await prisma.classroom.update({
      where: { id: classroomId },
      data: { pendingStudentIds: JSON.stringify(newPending), studentIds: JSON.stringify(newEnrolled) },
    });

    return NextResponse.json({ success: true, action });
  } catch (error) {
    console.error("Classroom approval error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
