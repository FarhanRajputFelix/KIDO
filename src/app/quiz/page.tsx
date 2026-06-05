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
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user) {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) setChildId(child.id);
        });
    }
  }, [session]);

  const handleGenerate = async (subjectId: string) => {
    if (!childId || generating) return;
    setSelected(subjectId);
    setGenerating(subjectId);
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, subject: subjectId }),
      });
      const data = await res.json();
      if (data.quiz?.id) router.push(`/quiz/${data.quiz.id}`);
      else setGenerating(null);
    } catch {
      setGenerating(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ background: "#F8F7FF" }}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--card-border)] px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">😊</span>
            <div>
              <div className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>Pick a Subject!</div>
              <div className="text-xs font-semibold" style={{ color: "#777587" }}>AI generates a quiz just for you</div>
            </div>
          </div>
          <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Back</Link>
        </div>
      </div>

      {/* Hero banner */}
      <div className="px-5 py-5">
        <div className="hero-banner max-w-2xl mx-auto flex items-center gap-4">
          <div>
            <div className="chip chip-gold mb-2" style={{ width: "fit-content" }}>AI QUIZ GENERATOR</div>
            <h2 className="text-2xl font-black text-white mb-1">Ready to challenge your brain?</h2>
            <p className="text-white/70 text-sm">Pick any subject — KIDO AI generates a unique quiz every time!</p>
          </div>
          <div className="text-5xl animate-float shrink-0">🎯</div>
        </div>
      </div>

      <main className="flex-1 px-5 pb-6 max-w-2xl mx-auto w-full">
        {/* Subject grid - Stitch style */}
        <h3 className="font-extrabold text-base mb-4" style={{ color: "#1a1a2e" }}>Choose Your Subject 📚</h3>
        <div className="grid grid-cols-2 gap-3 stagger-children">
          {SUBJECTS.map(s => {
            const isGenerating = generating === s.id;
            const isSelected = selected === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleGenerate(s.id)}
                disabled={generating !== null}
                className="subject-card text-left relative overflow-hidden"
                style={{
                  background: isSelected ? "#f0efff" : "white",
                  border: isSelected ? "2px solid #6C63FF" : "1.5px solid #e8e5ff",
                  boxShadow: isSelected ? "0 4px 0 #6C63FF44" : "0 3px 0 #e8e5ff",
                  opacity: generating !== null && !isSelected ? 0.55 : 1,
                  cursor: generating !== null ? "wait" : "pointer",
                }}>
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="font-extrabold text-base mb-1" style={{ color: isSelected ? "#6C63FF" : "#1a1a2e" }}>{s.name}</div>
                <div className="text-xs font-semibold mb-3" style={{ color: "#777587" }}>10 questions · AI-powered</div>
                <div className="flex items-center justify-between">
                  <span className="chip chip-purple text-xs">+50 XP</span>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl text-white"
                    style={{ background: isGenerating ? "#6C63FF" : s.color }}>
                    {isGenerating ? "⏳ Generating..." : "Play →"}
                  </span>
                </div>
                {isGenerating && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 rounded-full animate-shimmer"
                       style={{ background: "linear-gradient(90deg,#6C63FF,#FFD700,#6C63FF)", backgroundSize: "200% 100%" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Info chip */}
        <div className="alert-info mt-6 flex items-center gap-3">
          <span className="text-xl">🤖</span>
          <p className="text-sm font-semibold" style={{ color: "#3F3D9E" }}>
            Every quiz is uniquely generated by KIDO AI — no two quizzes are the same!
          </p>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="bottom-nav justify-around">
        <Link href="/dashboard/kid" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">🏠</div><span>Home</span></Link>
        <Link href="/chat" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">💬</div><span>Chat</span></Link>
        <Link href="/games" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">🎮</div><span>Games</span></Link>
        <Link href="/leaderboard" className="bottom-nav-item active no-underline"><div className="bottom-nav-icon">⭐</div><span>Stars</span></Link>
      </nav>
    </div>
  );
}
