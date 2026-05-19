import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";

// GET /api/screen-time?childId=xxx — Get screen time data
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];

    // Get today's screen time
    const todayLog = await prisma.screenTimeLog.findUnique({
      where: { childId_date: { childId, date: today } },
    });

    // Get last 7 days
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
    const weekLogs = await prisma.screenTimeLog.findMany({
      where: { childId, date: { gte: weekAgo } },
      orderBy: { date: "asc" },
    });

    // Get the child's screen time limit
    const child = await prisma.child.findUnique({
      where: { id: childId },
      select: { screenTimeLimit: true, name: true },
    });

    return NextResponse.json({
      today: todayLog || { minutes: 0, alertTriggered: false },
      weekLogs,
      limit: child?.screenTimeLimit || 120,
      childName: child?.name,
    });
  } catch (error) {
    console.error("Screen time fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/screen-time — Log screen time and check for alerts
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, minutes } = await req.json();

    if (!childId || minutes === undefined) {
      return NextResponse.json({ error: "childId and minutes required" }, { status: 400 });
    }

    const today = new Date().toISOString().split("T")[0];

    // Upsert screen time log
    const log = await prisma.screenTimeLog.upsert({
      where: { childId_date: { childId, date: today } },
      update: { minutes: { increment: minutes } },
      create: { childId, date: today, minutes },
    });

    // Check if screen time exceeds 2 hours (120 minutes)
    const child = await prisma.child.findUnique({
      where: { id: childId },
      select: { screenTimeLimit: true, name: true },
    });

    const limit = child?.screenTimeLimit || 120;
    let alertCreated = false;

    if (log.minutes >= limit && !log.alertTriggered) {
      // Create critical alert for parent
      await prisma.parentAlert.create({
        data: {
          childId,
          type: "screen_time",
          title: `⚠️ ${child?.name} exceeded screen time limit!`,
          message: `${child?.name} has been active for ${log.minutes} minutes today (limit: ${limit} min). Consider taking a break.`,
          severity: log.minutes >= limit * 1.5 ? "critical" : "warning",
        },
      });

      // Mark alert as triggered
      await prisma.screenTimeLog.update({
        where: { id: log.id },
        data: { alertTriggered: true },
      });

      alertCreated = true;
    }

    return NextResponse.json({
      log,
      alertCreated,
      isOverLimit: log.minutes >= limit,
      minutesRemaining: Math.max(0, limit - log.minutes),
    });
  } catch (error) {
    console.error("Screen time log error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
