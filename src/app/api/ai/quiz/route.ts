import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { generateQuiz, ChildProfile } from "@/lib/gemini";

// POST /api/ai/quiz — Generate a personalized AI quiz
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, subject, difficulty } = await req.json();

    if (!childId || !subject) {
      return NextResponse.json({ error: "childId and subject are required" }, { status: 400 });
    }

    // Fetch child profile for personalization
    const child = await prisma.child.findUnique({ where: { id: childId } });
    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    const childProfile: ChildProfile = {
      name: child.name,
      age: child.age,
      grade: child.grade || "unknown",
      interests: JSON.parse(child.strongSubjects),
      weakSubjects: JSON.parse(child.weakSubjects),
      level: child.level,
      totalQuizzes: child.totalQuizzes,
    };

    // Generate quiz using Gemini AI
    const quizData = await generateQuiz(childProfile, subject, difficulty);

    // Save to database
    const quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        subject: quizData.subject,
        difficulty: quizData.difficulty,
        xpReward: quizData.difficulty === "hard" ? 75 : quizData.difficulty === "medium" ? 50 : 35,
        timeLimit: quizData.difficulty === "hard" ? 180 : quizData.difficulty === "medium" ? 120 : 90,
        ageMin: Math.max(6, child.age - 2),
        ageMax: Math.min(14, child.age + 2),
        questions: JSON.stringify(quizData.questions),
        createdById: (session.user as any).id,
      },
    });

    return NextResponse.json({
      quiz: {
        ...quiz,
        questions: quizData.questions,
        questionCount: quizData.questions.length,
      },
    });
  } catch (error) {
    console.error("AI quiz generation error:", error);
    return NextResponse.json({ error: "Failed to generate quiz" }, { status: 500 });
  }
}
