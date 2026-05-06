import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/children - list children for current parent
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const children = await prisma.child.findMany({
      where: { parentId: userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ children });
  } catch (error) {
    console.error("Children fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// POST /api/children - create a new child profile
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { name, age, grade, avatar } = await req.json();

    if (!name || !age) {
      return NextResponse.json(
        { error: "Name and age are required" },
        { status: 400 }
      );
    }

    const child = await prisma.child.create({
      data: {
        name,
        age: parseInt(age),
        grade: grade || null,
        avatar: avatar || "🦁",
        parentId: userId,
      },
    });

    return NextResponse.json({ child }, { status: 201 });
  } catch (error) {
    console.error("Child creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
