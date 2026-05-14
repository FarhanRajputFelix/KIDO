import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import bcrypt from "bcryptjs";

// POST /api/children/manage — Parent creates a child account
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = (session.user as any).role;
    if (userRole !== "parent" && userRole !== "admin") {
      return NextResponse.json({ error: "Only parents can create child accounts" }, { status: 403 });
    }

    const { name, age, grade, avatar, email, password, screenTimeLimit } = await req.json();

    if (!name || !age) {
      return NextResponse.json({ error: "Name and age are required" }, { status: 400 });
    }

    const userId = (session.user as any).id;

    // Create child profile
    const child = await prisma.child.create({
      data: {
        name,
        age: parseInt(age),
        grade: grade || null,
        avatar: avatar || "🦊",
        screenTimeLimit: screenTimeLimit || 120,
        parentId: userId,
      },
    });

    // If email+password provided, create a child user account
    if (email && password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          role: "child",
          avatar: avatar || "🦊",
        },
      });
    }

    return NextResponse.json({ child });
  } catch (error) {
    console.error("Child creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/children/manage — Update child profile
export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, name, age, grade, avatar, screenTimeLimit } = await req.json();

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    const child = await prisma.child.update({
      where: { id: childId },
      data: {
        ...(name && { name }),
        ...(age && { age: parseInt(age) }),
        ...(grade !== undefined && { grade }),
        ...(avatar && { avatar }),
        ...(screenTimeLimit !== undefined && { screenTimeLimit }),
      },
    });

    return NextResponse.json({ child });
  } catch (error) {
    console.error("Child update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
