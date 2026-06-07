import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";
import { generateGameChallenge, ChildProfile } from "@/lib/gemini";

// POST /api/ai/game — Generate AI game challenge
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
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

    const child = await getAccessibleChild(session, childId);
    if (!child) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
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

    const gameData = await generateGameChallenge(gameType, childProfile, context);

    return NextResponse.json({ game: gameData });
  } catch (error) {
    console.error("AI game generation error:", error);
    return NextResponse.json({ error: "Failed to generate game" }, { status: 500 });
  }
}
