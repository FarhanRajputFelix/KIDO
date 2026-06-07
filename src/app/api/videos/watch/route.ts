import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";
import { calculateLevel } from "@/lib/utils";

// POST /api/videos/watch — award XP for watching a video (once per video per child)
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, videoId, title, xp = 15 } = await req.json();
    if (!childId || !videoId) {
      return NextResponse.json({ error: "childId and videoId required" }, { status: 400 });
    }

    const child = await getAccessibleChild(session, childId);
    if (!child) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    // Only award once per video (look for an existing watch activity).
    const already = await prisma.activityFeed.findFirst({
      where: { childId, type: "video_watched", metadata: { contains: videoId } },
    });
    if (already) {
      return NextResponse.json({ alreadyWatched: true, xpEarned: 0 });
    }

    const xpEarned = Math.max(0, Math.round(Number(xp) || 0));
    const newXP = child.xp + xpEarned;
    const newLevel = calculateLevel(newXP);

    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
    let newStreak = child.streak;
    if (child.lastActiveDate === yesterday) newStreak = child.streak + 1;
    else if (child.lastActiveDate !== today) newStreak = 1;

    await prisma.child.update({
      where: { id: childId },
      data: {
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        longestStreak: Math.max(child.longestStreak, newStreak),
        lastActiveDate: today,
        totalWatchTime: { increment: 10 },
      },
    });

    await prisma.activityFeed.create({
      data: {
        childId,
        type: "video_watched",
        title: `Watched "${title || "a video"}" 📺`,
        description: "Earned XP for learning!",
        xpEarned,
        metadata: JSON.stringify({ videoId }),
      },
    });

    return NextResponse.json({ xpEarned, newXP, newLevel, leveledUp: newLevel > child.level });
  } catch (error) {
    console.error("Video watch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
