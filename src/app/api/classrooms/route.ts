import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";

// POST /api/classrooms — Create a classroom (Teacher only)
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user || (session.user as any).role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { name, subject, grade } = await req.json();

    if (!name) {
      return NextResponse.json({ error: "Classroom name is required" }, { status: 400 });
    }

    // Generate a unique join code (retry on the rare collision).
    let joinCode = "";
    for (let i = 0; i < 6; i++) {
      joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const exists = await prisma.classroom.findUnique({ where: { joinCode } });
      if (!exists) break;
    }

    const classroom = await prisma.classroom.create({
      data: {
        name,
        subject,
        grade,
        teacherId: userId,
        joinCode,
        studentIds: "[]",
      },
    });

    return NextResponse.json({ classroom }, { status: 201 });
  } catch (error) {
    console.error("Classroom creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
