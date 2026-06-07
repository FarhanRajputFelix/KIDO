import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";

// Confirm two children are PARENT-APPROVED friends before allowing messaging.
async function areApprovedFriends(a: string, b: string): Promise<boolean> {
  const link = await prisma.friendRequest.findFirst({
    where: {
      status: "approved",
      parentApproved: true,
      OR: [
        { fromChildId: a, toChildId: b },
        { fromChildId: b, toChildId: a },
      ],
    },
  });
  return !!link;
}

// GET /api/messages?childId=X&withChildId=Y → conversation thread
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");
    const withChildId = searchParams.get("withChildId");
    if (!childId || !withChildId) {
      return NextResponse.json({ error: "childId and withChildId required" }, { status: 400 });
    }

    const child = await getAccessibleChild(session, childId);
    if (!child) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    if (!(await areApprovedFriends(childId, withChildId))) {
      return NextResponse.json({ error: "You can only message approved friends" }, { status: 403 });
    }

    const messages = await prisma.friendMessage.findMany({
      where: {
        OR: [
          { fromChildId: childId, toChildId: withChildId },
          { fromChildId: withChildId, toChildId: childId },
        ],
      },
      orderBy: { createdAt: "asc" },
      take: 100,
    });

    // Mark incoming messages as read.
    await prisma.friendMessage.updateMany({
      where: { fromChildId: withChildId, toChildId: childId, isRead: false },
      data: { isRead: true },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Messages fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/messages { childId, toChildId, content }
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { childId, toChildId, content } = await req.json();
    if (!childId || !toChildId || !content?.trim()) {
      return NextResponse.json({ error: "childId, toChildId and content required" }, { status: 400 });
    }

    const child = await getAccessibleChild(session, childId);
    if (!child) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    if (!(await areApprovedFriends(childId, toChildId))) {
      return NextResponse.json({ error: "You can only message approved friends" }, { status: 403 });
    }

    const message = await prisma.friendMessage.create({
      data: { fromChildId: childId, toChildId, content: String(content).slice(0, 2000) },
    });

    return NextResponse.json({ message });
  } catch (error) {
    console.error("Message send error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
