import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/friends?childId=xxx — Get friends and friend requests
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

    // Get sent and received friend requests
    const sent = await prisma.friendRequest.findMany({
      where: { fromChildId: childId },
      include: { toChild: true },
    });

    const received = await prisma.friendRequest.findMany({
      where: { toChildId: childId },
      include: { fromChild: true },
    });

    // Get accepted friends
    const friends = [
      ...sent.filter(r => r.status === "approved" && r.parentApproved),
      ...received.filter(r => r.status === "approved" && r.parentApproved),
    ];

    const pending = [
      ...sent.filter(r => r.status === "pending"),
      ...received.filter(r => r.status === "pending"),
    ];

    const awaitingParentApproval = [
      ...sent.filter(r => r.status === "approved" && !r.parentApproved),
      ...received.filter(r => r.status === "approved" && !r.parentApproved),
    ];

    return NextResponse.json({ friends, pending, awaitingParentApproval });
  } catch (error) {
    console.error("Friends fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/friends — Send a friend request
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fromChildId, toChildId } = await req.json();

    if (!fromChildId || !toChildId) {
      return NextResponse.json({ error: "fromChildId and toChildId required" }, { status: 400 });
    }

    if (fromChildId === toChildId) {
      return NextResponse.json({ error: "Cannot friend yourself" }, { status: 400 });
    }

    // Check if request already exists
    const existing = await prisma.friendRequest.findFirst({
      where: {
        OR: [
          { fromChildId, toChildId },
          { fromChildId: toChildId, toChildId: fromChildId },
        ],
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Friend request already exists" }, { status: 409 });
    }

    const request = await prisma.friendRequest.create({
      data: { fromChildId, toChildId, status: "pending" },
    });

    return NextResponse.json({ request });
  } catch (error) {
    console.error("Friend request error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
