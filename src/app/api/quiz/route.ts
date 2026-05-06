import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/quiz - list quizzes with optional filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject");
    const difficulty = searchParams.get("difficulty");
    const age = searchParams.get("age");

    const where: any = {};
    if (subject) where.subject = subject;
    if (difficulty) where.difficulty = difficulty;
    if (age) {
      const ageNum = parseInt(age);
      where.ageMin = { lte: ageNum };
      where.ageMax = { gte: ageNum };
    }

    const quizzes = await prisma.quiz.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    // Parse JSON questions for each quiz
    const parsed = quizzes.map((q) => ({
      ...q,
      questions: JSON.parse(q.questions),
      questionCount: JSON.parse(q.questions).length,
    }));

    return NextResponse.json({ quizzes: parsed });
  } catch (error) {
    console.error("Quiz fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
