import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";

// GET /api/leaderboard - get top learners (authentication required)
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const children = await prisma.child.findMany({
      orderBy: { xp: "desc" },
      take: 50,
      select: {
        id: true,
        name: true,
        avatar: true,
        xp: true,
        level: true,
        streak: true,
        totalQuizzes: true,
        badges: true,
      },
    });

    const leaderboard = children.map((child, index) => ({
      rank: index + 1,
      ...child,
      badgeCount: JSON.parse(child.badges).length,
    }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
