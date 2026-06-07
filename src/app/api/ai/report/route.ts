import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";
import { generateProgressReport, ChildProfile } from "@/lib/gemini";

// POST /api/ai/report — Generate AI progress report for a child
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, period } = await req.json();

    if (!childId) {
      return NextResponse.json({ error: "childId is required" }, { status: 400 });
    }

    // Authorize access to this child before reading their data
    const access = await getAccessibleChild(session, childId);
    if (!access) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    // Fetch child with all relevant data
    const child = await prisma.child.findUnique({
      where: { id: childId },
      include: {
        quizAttempts: {
          orderBy: { completedAt: "desc" },
          take: 20,
          include: { quiz: true },
        },
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    const safeParse = (str: any) => { try { return str && typeof str === "string" && str.trim().startsWith("[") ? JSON.parse(str) : []; } catch { return []; } };

    const childProfile: ChildProfile = {
      name: child.name,
      age: child.age,
      grade: child.grade || "unknown",
      interests: safeParse(child.strongSubjects),
      weakSubjects: safeParse(child.weakSubjects),
      level: child.level,
      totalQuizzes: child.totalQuizzes,
    };

    const recentQuizzes = child.quizAttempts.map(a => ({
      subject: a.quiz.subject,
      score: a.score,
      total: a.totalQuestions,
      difficulty: a.difficulty,
    }));

    const reportData = await generateProgressReport({
      profile: childProfile,
      recentQuizzes,
      totalWatchTime: child.totalWatchTime,
      streak: child.streak,
      longestStreak: child.longestStreak,
      badges: JSON.parse(child.badges),
    });

    // Save report to database
    const report = await prisma.progressReport.create({
      data: {
        childId,
        period: period || "weekly",
        content: reportData.content,
        interests: JSON.stringify(reportData.interests),
        recommendations: JSON.stringify(reportData.recommendations),
        strengths: JSON.stringify(reportData.strengths),
        weaknesses: JSON.stringify(reportData.weaknesses),
      },
    });

    return NextResponse.json({ report: { ...report, parsed: reportData } });
  } catch (error) {
    console.error("AI report generation error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}

// GET /api/ai/report?childId=xxx — Get existing reports
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json({ error: "childId is required" }, { status: 400 });
    }

    const access = await getAccessibleChild(session, childId);
    if (!access) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    const reports = await prisma.progressReport.findMany({
      where: { childId },
      orderBy: { generatedAt: "desc" },
      take: 10,
    });

    return NextResponse.json({ reports });
  } catch (error) {
    console.error("Report fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
