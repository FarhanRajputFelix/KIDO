"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SUBJECTS } from "@/lib/constants";

export default function QuizPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [childId, setChildId] = useState<string | null>(null);
  const [generating, setGenerating] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/dashboard")
        .then((r) => r.json())
        .then((d) => {
          const child = d.child || d.children?.[0];
          if (child) setChildId(child.id);
        });
    }
  }, [session]);

  const handleGenerate = async (subjectId: string) => {
    if (!childId || generating) return;
    setGenerating(subjectId);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, subject: subjectId }),
      });
      const data = await res.json();
      if (data.quiz?.id) {
        router.push(`/quiz/${data.quiz.id}`);
      } else {
        setGenerating(null);
      }
    } catch {
      setGenerating(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold no-underline">
          <span className="text-xl">🧒</span>
          <span className="gradient-text">KIDO</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Dashboard</Link>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-8 animate-slide-up text-center md:text-left">
          <h1 className="text-3xl font-bold mb-2">⚡ AI Quiz Generator</h1>
          <p className="text-foreground/50">Pick a subject! Every quiz is uniquely generated just for you by KIDO AI.</p>
        </div>

        {/* Quiz Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleGenerate(s.id)}
              disabled={generating !== null}
              className={`card text-left block group transition-all w-full relative outline-none border-2`}
              style={{
                borderColor: generating === s.id ? s.color : `${s.color}20`,
                opacity: generating !== null && generating !== s.id ? 0.6 : 1,
                cursor: generating !== null ? "wait" : "pointer"
              }}
            >
              <div className="text-4xl mb-3 animate-float" style={{ animationDelay: `${Math.random()}s` }}>{s.icon}</div>
              <h3 className="font-bold text-xl mb-1 group-hover:text-primary-500 transition-colors" style={{ color: s.color }}>
                {s.name}
              </h3>
              <p className="text-sm text-foreground/50 mb-5">
                Generate a personalized {s.name.toLowerCase()} quiz!
              </p>
              
              <div className="mt-3 flex items-center justify-between font-medium">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg" style={{ background: `${s.color}15`, color: s.color }}>
                  AI Powered ✨
                </span>
                <span className={`py-1.5 px-4 text-xs rounded-xl text-white font-bold transition-all ${generating === s.id ? "animate-pulse" : "btn-primary hover:scale-105"}`} style={{ background: generating === s.id ? s.color : undefined }}>
                  {generating === s.id ? "Generating..." : "Play Now →"}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
