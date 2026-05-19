import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import jwt from "jsonwebtoken";

export interface MobileUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface MobileSession {
  user: MobileUser;
}

// Verifies NextAuth session OR mobile Bearer JWT token
export async function getMobileSession(req?: NextRequest): Promise<MobileSession | null> {
  // Try NextAuth cookie-based session first (web)
  try {
    const session = await auth();
    if (session?.user) {
      return session as unknown as MobileSession;
    }
  } catch {}

  // Try Bearer JWT token (mobile app)
  const authHeader = req?.headers.get("authorization") ?? req?.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const secret = process.env.AUTH_SECRET ?? "";
      const payload = jwt.verify(token, secret) as MobileUser;
      return { user: { id: payload.id, email: payload.email, name: payload.name, role: payload.role } };
    } catch {
      return null;
    }
  }

  return null;
}

export function createMobileToken(user: MobileUser): string {
  const secret = process.env.AUTH_SECRET ?? "";
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role },
    secret,
    { expiresIn: "30d" }
  );
}
