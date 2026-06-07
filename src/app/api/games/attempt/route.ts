import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";
import { calculateLevel } from "@/lib/utils";

// POST /api/games/attempt — record a completed game and award XP
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, gameType, score = 0, totalPoints = 0, xpReward = 0 } = await req.json();

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

    const xpEarned = Math.max(0, Math.round(Number(xpReward) || 0));

    // Record the attempt
    const attempt = await prisma.gameAttempt.create({
      data: {
        childId,
        gameType,
        score: Math.round(Number(score) || 0),
        totalPoints: Math.round(Number(totalPoints) || 0),
        xpEarned,
      },
    });

    // Update child XP / level / streak (mirrors quiz attempt logic)
    const newXP = child.xp + xpEarned;
    const newLevel = calculateLevel(newXP);

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    let newStreak = child.streak;
    if (child.lastActiveDate === yesterday) newStreak = child.streak + 1;
    else if (child.lastActiveDate !== today) newStreak = 1;
    const newLongestStreak = Math.max(child.longestStreak, newStreak);

    await prisma.child.update({
      where: { id: childId },
      data: {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        longestStreak: newLongestStreak,
        lastActiveDate: today,
      },
    });

    const gameLabel: Record<string, string> = {
      "word-builder": "Word Builder",
      "story-creator": "Story Creator",
      "math-arena": "Math Arena",
    };

    await prisma.activityFeed.create({
      data: {
        childId,
        type: "game_completed",
        title: `Played ${gameLabel[gameType]}! 🎮`,
        description: totalPoints ? `Scored ${score}/${totalPoints} points` : "Completed a challenge",
        xpEarned,
        metadata: JSON.stringify({ gameType, score, totalPoints }),
      },
    });

    return NextResponse.json({
      attempt,
      results: {
        xpEarned,
        newXP,
        newLevel,
        leveledUp: newLevel > child.level,
        streak: newStreak,
      },
    });
  } catch (error) {
    console.error("Game attempt error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
