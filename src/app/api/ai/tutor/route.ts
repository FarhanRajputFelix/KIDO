import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ============================================================
//  KIDO BOT — Standalone Teaching AI
//  Completely independent from the rest of the app's AI system
//  No circuit breakers, no shared state, always tries to respond
// ============================================================

// Free-tier Gemini models available to this project (verified June 2026).
// gemini-1.5-* are retired (404) and gemini-2.5/3.x need billing (403) — use 2.0.
const MODELS = [
  "gemini-2.0-flash",         // Most capable on free tier
  "gemini-2.0-flash-lite",    // Lighter quota, fast — fallback
];

const SYSTEM_PROMPT = `You are Kido Bot, a fun and friendly AI teaching assistant for children aged 6-14.
Help students understand any subject they are curious about or stuck on.

Your teaching style:
- Use simple, age-appropriate language that a child can understand
- Add emojis to make answers fun and engaging 🎉
- For math problems: show step-by-step working with examples
- For science: include a relatable real-world example
- For history/geography: make it a mini-story
- For coding: show simple examples
- Keep answers concise — 2 to 4 short paragraphs max
- Always end with encouragement or a fun fact
- Never give unsafe, inappropriate, or adult content
- Be patient, warm, and celebrate curiosity!`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message: string = (body.message || "").trim();
    const history: Array<{ role: string; content: string }> = body.history || [];

    if (!message) {
      return NextResponse.json({ reply: "Please ask me something! 😊" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "⚠️ AI is not configured. Please add GEMINI_API_KEY to the .env file.",
      });
    }

    // Build conversation context (last 6 messages)
    const recentHistory = history.slice(-6);
    const historyText = recentHistory.length > 0
      ? recentHistory.map(m =>
          `${m.role === "user" ? "Student" : "Kido Bot"}: ${m.content}`
        ).join("\n\n") + "\n\n"
      : "";

    const fullPrompt = `${SYSTEM_PROMPT}

${historyText}Student: ${message}

Kido Bot:`;

    const genAI = new GoogleGenerativeAI(apiKey);

    // Try each model in sequence
    for (const modelName of MODELS) {
      try {
        console.log(`[KidoBot] Trying model: ${modelName}`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        });

        const result = await model.generateContent(fullPrompt);
        const reply = result.response.text().trim();

        if (reply) {
          console.log(`[KidoBot] ✅ ${modelName} responded successfully`);
          return NextResponse.json({ reply });
        }
      } catch (err: any) {
        const errMsg: string = err?.message || String(err);
        console.log(`[KidoBot] ❌ ${modelName}: ${errMsg.slice(0, 120)}`);
        // Continue to next model
      }
    }

    // All models failed — give a helpful response instead of error
    return NextResponse.json({
      reply: `I'm a little busy right now! 🤖⏳\n\n**Please try again in 30 seconds** — my AI brain needs a tiny rest!\n\n💡 **Quick tip while you wait:** The best learners ask lots of questions, and you're already doing that! Keep it up! ⭐`,
    });

  } catch (err: any) {
    console.error("[KidoBot] Fatal error:", err?.message);
    return NextResponse.json({
      reply: "Oops! Something went wrong on my end. Please ask me again! 😊",
    });
  }
}
