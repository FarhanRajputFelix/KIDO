import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/friends/approve — Parent approves or rejects a friend request
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== "parent" && userRole !== "admin") {
      return NextResponse.json({ error: "Only parents can approve friend requests" }, { status: 403 });
    }

    const { requestId, action } = await req.json(); // action: "approve" | "reject"

    if (!requestId || !action) {
      return NextResponse.json({ error: "requestId and action required" }, { status: 400 });
    }

    const request = await prisma.friendRequest.findUnique({
      where: { id: requestId },
      include: { fromChild: true, toChild: true },
    });

    if (!request) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }

    // Verify parent owns one of the children
    const userId = (session.user as any).id;
    if (request.fromChild.parentId !== userId && request.toChild.parentId !== userId) {
      return NextResponse.json({ error: "Not your child's request" }, { status: 403 });
    }

    if (action === "approve") {
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: "approved", parentApproved: true },
      });

      // Create activity feed entries for both children
      await prisma.activityFeed.createMany({
        data: [
          {
            childId: request.fromChildId,
            type: "friend_added",
            title: `Became friends with ${request.toChild.name}! 🎉`,
            description: "Parent approved your friend request",
            xpEarned: 10,
          },
          {
            childId: request.toChildId,
            type: "friend_added",
            title: `Became friends with ${request.fromChild.name}! 🎉`,
            description: "A new friend was added",
            xpEarned: 10,
          },
        ],
      });
    } else {
      await prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: "rejected" },
      });
    }

    return NextResponse.json({ success: true, action });
  } catch (error) {
    console.error("Friend approval error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
