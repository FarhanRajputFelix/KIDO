import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateGameChallenge, ChildProfile } from "@/lib/gemini";

// POST /api/ai/game — Generate AI game challenge
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, gameType, context } = await req.json();

    if (!childId || !gameType) {
      return NextResponse.json({ error: "childId and gameType required" }, { status: 400 });
    }

    if (!["word-builder", "story-creator", "math-arena"].includes(gameType)) {
      return NextResponse.json({ error: "Invalid game type" }, { status: 400 });
    }

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

    const gameData = await generateGameChallenge(gameType, childProfile, context);

    return NextResponse.json({ game: gameData });
  } catch (error) {
    console.error("AI game generation error:", error);
    return NextResponse.json({ error: "Failed to generate game" }, { status: 500 });
  }
}
