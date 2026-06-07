import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";
import bcrypt from "bcryptjs";

// POST /api/children/manage — Parent creates a child account
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
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

    // If email+password provided, create a child LOGIN account. Failing to
    // create the login (e.g. email already taken) must NOT fail the whole
    // request — the child profile is already created.
    let loginCreated = false;
    let loginError: string | null = null;
    if (email && password) {
      const normalizedEmail = String(email).trim().toLowerCase();
      try {
        const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
        if (existing) {
          loginError = "That login email is already in use — child added without a login.";
        } else {
          const hashedPassword = await bcrypt.hash(password, 12);
          await prisma.user.create({
            data: {
              email: normalizedEmail,
              password: hashedPassword,
              name,
              role: "child",
              avatar: avatar || "🦊",
              // Parent-created child accounts are trusted — no verification step.
              emailVerified: new Date(),
            },
          });
          loginCreated = true;
        }
      } catch (e: any) {
        loginError = "Child added, but the login could not be created.";
        console.error("Child login creation error:", e?.message);
      }
    }

    return NextResponse.json({ child, loginCreated, loginError }, { status: 201 });
  } catch (error) {
    console.error("Child creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT /api/children/manage — Update child profile
export async function PUT(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, name, age, grade, avatar, screenTimeLimit } = await req.json();

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    // Only the owning parent/admin may edit this child
    if (!(await getAccessibleChild(session, childId))) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
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
