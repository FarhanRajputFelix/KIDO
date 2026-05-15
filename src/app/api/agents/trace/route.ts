import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { runAgentPipeline, AgentContext } from "@/lib/agents";

// POST /api/agents/trace — Run all agents and save trace
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { childId, triggerEvent, ...contextData } = body;

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    // Fetch child data for context
    const child = await prisma.child.findUnique({
      where: { id: childId },
      include: {
        quizAttempts: { orderBy: { completedAt: "desc" }, take: 10 },
        screenTimeLogs: { orderBy: { date: "desc" }, take: 1 },
      },
    });

    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    // Build agent context from child data + request body
    const recentScores = child.quizAttempts.map(a => a.score / a.totalQuestions);
    const avgScore = recentScores.length > 0
      ? recentScores.reduce((a, b) => a + b, 0) / recentScores.length
      : 0.5;

    // Calculate score trend (compare last 5 vs previous 5)
    let scoreTrend = 0;
    if (recentScores.length >= 6) {
      const recent5 = recentScores.slice(0, 5).reduce((a, b) => a + b, 0) / 5;
      const prev5 = recentScores.slice(5, 10).reduce((a, b) => a + b, 0) / Math.min(5, recentScores.length - 5);
      scoreTrend = recent5 - prev5;
    }

    const context: AgentContext = {
      childId: child.id,
      childName: child.name,
      childAge: child.age,
      childGrade: child.grade || "Unknown",
      quizScore: contextData.score ?? avgScore,
      subject: contextData.subject ?? "general",
      difficulty: contextData.difficulty ?? 3,
      weakAreas: JSON.parse(child.weakSubjects),
      strongAreas: JSON.parse(child.strongSubjects),
      totalQuizzes: child.totalQuizzes,
      avgResponseTimeS: contextData.avgResponseTimeS ?? 15,
      sessionLengthMin: contextData.sessionLengthMin ?? 10,
      scoreTrend,
      sessionTrend: contextData.sessionTrend ?? 0,
      streakDays: child.streak,
      level: child.level,
      xp: child.xp,
      socialMessage: contextData.socialMessage ?? "",
      friendRequestFrom: contextData.friendRequestFrom,
      friendRequestTo: contextData.friendRequestTo,
      screenTimeMinutes: child.screenTimeLogs[0]?.minutes ?? 0,
      screenTimeLimit: child.screenTimeLimit,
      parentRestrictions: [],
      triggerEvent: triggerEvent || "quiz_submit",
    };

    // Run the full 11-agent pipeline
    const trace = await runAgentPipeline(context);

    // Save to database
    await prisma.agentTrace.create({
      data: {
        childId: child.id,
        sessionId: trace.sessionId,
        triggerEvent: trace.triggerEvent,
        agentResults: JSON.stringify(trace.agentResults),
        overallConfidence: trace.overallConfidence,
        fallbackTriggered: trace.fallbackTriggered,
        contradictionDetected: trace.contradictionDetected,
        finalRecommendations: JSON.stringify(trace.finalRecommendations),
        metadata: JSON.stringify({
          sharedMemory: trace.sharedMemory,
          timestamp: trace.timestamp,
        }),
      },
    });

    return NextResponse.json(trace);
  } catch (error) {
    console.error("Agent trace error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET /api/agents/trace?childId=xxx — Fetch traces for a child
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    const traces = await prisma.agentTrace.findMany({
      where: { childId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const parsed = traces.map(t => ({
      id: t.id,
      sessionId: t.sessionId,
      triggerEvent: t.triggerEvent,
      agentResults: JSON.parse(t.agentResults),
      overallConfidence: t.overallConfidence,
      fallbackTriggered: t.fallbackTriggered,
      contradictionDetected: t.contradictionDetected,
      finalRecommendations: JSON.parse(t.finalRecommendations),
      metadata: t.metadata ? JSON.parse(t.metadata) : null,
      createdAt: t.createdAt.toISOString(),
    }));

    return NextResponse.json({ traces: parsed });
  } catch (error) {
    console.error("Agent trace fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
