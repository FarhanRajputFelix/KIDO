import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateCode, sendVerificationEmail } from "@/lib/email";

const CODE_TTL_MS = 15 * 60 * 1000; // 15 minutes

// POST /api/auth/resend-code — issue a fresh verification code
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });

    // Always respond success to avoid leaking which emails exist.
    if (!user || user.emailVerified) {
      return NextResponse.json({ success: true });
    }

    const code = generateCode();
    await prisma.verificationCode.deleteMany({ where: { email: normalizedEmail } });
    await prisma.verificationCode.create({
      data: { email: normalizedEmail, code, expiresAt: new Date(Date.now() + CODE_TTL_MS) },
    });

    const emailed = await sendVerificationEmail(normalizedEmail, code, user.name);
    return NextResponse.json({ success: true, ...(emailed ? {} : { devNotice: "Email not configured — check server logs." }) });
  } catch (error) {
    console.error("Resend code error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
