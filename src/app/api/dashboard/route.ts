import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/dashboard - get dashboard stats for current user
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    if (userRole === "parent") {
      // Get all children for this parent
      const children = await prisma.child.findMany({
        where: { parentId: userId },
        include: {
          quizAttempts: {
            orderBy: { completedAt: "desc" },
            take: 10,
          },
          watchLogs: {
            orderBy: { watchedAt: "desc" },
            take: 5,
          },
          activities: {
            orderBy: { createdAt: "desc" },
            take: 10,
          },
          alerts: {
            where: { isRead: false },
            orderBy: { createdAt: "desc" },
          },
        },
      });

      const totalXP = children.reduce((sum, c) => sum + c.xp, 0);
      const totalQuizzes = children.reduce((sum, c) => sum + c.totalQuizzes, 0);
      const avgStreak = children.length
        ? Math.round(children.reduce((sum, c) => sum + c.streak, 0) / children.length)
        : 0;
      const unreadAlerts = children.reduce((sum, c) => sum + c.alerts.length, 0);

      return NextResponse.json({
        children,
        stats: {
          totalChildren: children.length,
          totalXP,
          totalQuizzes,
          avgStreak,
          unreadAlerts,
        },
      });
    }

    // For child role, return own data
    const child = await prisma.child.findFirst({
      where: { parentId: userId },
      include: {
        quizAttempts: {
          orderBy: { completedAt: "desc" },
          take: 10,
          include: { quiz: true },
        },
        activities: {
          orderBy: { createdAt: "desc" },
          take: 15,
        },
      },
    });

    return NextResponse.json({ child });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
