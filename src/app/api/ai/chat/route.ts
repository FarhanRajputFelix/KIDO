import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";
import { getAccessibleChild } from "@/lib/access";
import { chatWithStudent, ChildProfile } from "@/lib/gemini";

const safeParse = (str: any) => {
  try { return str && typeof str === "string" && str.trim().startsWith("[") ? JSON.parse(str) : []; }
  catch { return []; }
};

// POST /api/ai/chat — send a message in a chat session (creates one if needed)
export async function POST(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, message, sessionId } = await req.json();
    if (!childId || !message) {
      return NextResponse.json({ error: "childId and message required" }, { status: 400 });
    }

    const child = await getAccessibleChild(session, childId);
    if (!child) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    // Resolve (or create) the conversation session.
    let activeSessionId = sessionId as string | undefined;
    if (activeSessionId) {
      const owned = await prisma.chatSession.findFirst({ where: { id: activeSessionId, childId } });
      if (!owned) activeSessionId = undefined;
    }
    if (!activeSessionId) {
      const created = await prisma.chatSession.create({
        data: { childId, title: String(message).slice(0, 40) },
      });
      activeSessionId = created.id;
    }

    const childProfile: ChildProfile = {
      name: child.name,
      age: child.age,
      grade: child.grade || "unknown",
      interests: safeParse(child.strongSubjects),
      weakSubjects: safeParse(child.weakSubjects),
      level: child.level,
      totalQuizzes: child.totalQuizzes,
    };

    await prisma.chatMessage.create({
      data: { childId, sessionId: activeSessionId, role: "user", content: message },
    });

    const history = await prisma.chatMessage.findMany({
      where: { childId, sessionId: activeSessionId },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    const messages = history.reverse().map(m => ({ role: m.role, content: m.content }));

    const aiResponse = await chatWithStudent(messages, childProfile);

    const saved = await prisma.chatMessage.create({
      data: { childId, sessionId: activeSessionId, role: "assistant", content: aiResponse },
    });

    // Bump the session so it sorts to the top of the history list.
    await prisma.chatSession.update({
      where: { id: activeSessionId },
      data: { updatedAt: new Date() },
    });

    return NextResponse.json({ message: saved, sessionId: activeSessionId });
  } catch (error) {
    console.error("AI chat error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}

// GET /api/ai/chat?childId=X            → list chat sessions
// GET /api/ai/chat?childId=X&sessionId=Y → messages in one session
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");
    const sessionId = searchParams.get("sessionId");

    if (!childId) {
      return NextResponse.json({ error: "childId required" }, { status: 400 });
    }

    const child = await getAccessibleChild(session, childId);
    if (!child) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    if (sessionId) {
      const messages = await prisma.chatMessage.findMany({
        where: { childId, sessionId },
        orderBy: { createdAt: "asc" },
        take: 100,
      });
      return NextResponse.json({ messages });
    }

    const sessions = await prisma.chatSession.findMany({
      where: { childId },
      orderBy: { updatedAt: "desc" },
      take: 50,
      select: { id: true, title: true, updatedAt: true },
    });
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Chat history error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// DELETE /api/ai/chat?sessionId=Y&childId=X → delete a session and its messages
export async function DELETE(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const childId = searchParams.get("childId");
    const sessionId = searchParams.get("sessionId");
    if (!childId || !sessionId) {
      return NextResponse.json({ error: "childId and sessionId required" }, { status: 400 });
    }

    const child = await getAccessibleChild(session, childId);
    if (!child) {
      return NextResponse.json({ error: "Child not found or access denied" }, { status: 403 });
    }

    await prisma.chatMessage.deleteMany({ where: { childId, sessionId } });
    await prisma.chatSession.deleteMany({ where: { id: sessionId, childId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Chat delete error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
