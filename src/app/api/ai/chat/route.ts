import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { chatWithStudent, ChildProfile } from "@/lib/gemini";

// POST /api/ai/chat — Chat with AI learning assistant
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, message } = await req.json();

    if (!childId || !message) {
      return NextResponse.json({ error: "childId and message required" }, { status: 400 });
    }

    // Fetch child profile
    const child = await prisma.child.findUnique({ where: { id: childId } });
    if (!child) {
      return NextResponse.json({ error: "Child not found" }, { status: 404 });
    }

    const safeParse = (str: any) => { try { return str && typeof str === "string" && str.trim().startsWith("[") ? JSON.parse(str) : []; } catch { return []; } };

    const childProfile: ChildProfile = {
      name: child.name,
      age: child.age,
      grade: child.grade || "unknown",
      interests: safeParse(child.strongSubjects),
      weakSubjects: safeParse(child.weakSubjects),
      level: child.level,
      totalQuizzes: child.totalQuizzes,
    };

    // Save user message
    await prisma.chatMessage.create({
      data: { childId, role: "user", content: message },
    });

    // Get recent conversation history
    const history = await prisma.chatMessage.findMany({
      where: { childId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    const messages = history.reverse().map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Generate AI response
    const aiResponse = await chatWithStudent(messages, childProfile);

    // Save AI response
    const saved = await prisma.chatMessage.create({
      data: { childId, role: "assistant", content: aiResponse },
    });

    return NextResponse.json({ message: saved });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}

// GET /api/ai/chat?childId=xxx — Get chat history
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    const messages = await prisma.chatMessage.findMany({
      where: { childId },
      orderBy: { createdAt: "asc" },
      take: 50,
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Chat history error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
