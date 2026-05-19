import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { createMobileToken } from "@/lib/mobile-auth";

// POST /api/mobile/auth/register — mobile registration + auto-login
export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role = "parent" } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name required" }, { status: 400 });
    }

    const allowed = ["parent", "teacher"];
    if (!allowed.includes(role)) {
      return NextResponse.json({ error: "Role must be parent or teacher" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashed,
        name: name.trim(),
        role,
      },
    });

    const token = createMobileToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    console.error("Mobile register error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
