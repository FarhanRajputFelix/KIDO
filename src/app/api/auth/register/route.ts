import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateCode, sendVerificationEmail } from "@/lib/email";

const CODE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  try {
    const { email, password, name, role = "parent" } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
      console.error("CRITICAL: DATABASE_URL is not defined in environment variables.");
      return NextResponse.json({ error: "Database configuration error" }, { status: 500 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    // Already registered AND verified → block.
    if (existingUser && existingUser.emailVerified) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    // Create the user (unverified), or refresh an existing unverified signup.
    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword, name, role },
      });
    } else {
      await prisma.user.create({
        data: { email: normalizedEmail, password: hashedPassword, name, role },
      });
    }

    // Issue a fresh 6-digit code (replace any previous ones for this email).
    const code = generateCode();
    await prisma.verificationCode.deleteMany({ where: { email: normalizedEmail } });
    await prisma.verificationCode.create({
      data: { email: normalizedEmail, code, expiresAt: new Date(Date.now() + CODE_TTL_MS) },
    });

    const emailed = await sendVerificationEmail(normalizedEmail, code, name);

    return NextResponse.json(
      {
        needsVerification: true,
        email: normalizedEmail,
        // When no email provider is configured, surface a hint so dev/testing isn't blocked.
        ...(emailed ? {} : { devNotice: "Email not configured — check server logs for the code." }),
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", { message: error.message, code: error.code, meta: error.meta });
    if (error.code === "P2002") {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: `Internal server error: ${error.message || "Unknown error"}` }, { status: 500 });
  }
}
