"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SUBJECTS } from "@/lib/constants";

interface Quiz {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  xpReward: number;
  timeLimit: number;
  questionCount: number;
}

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = filter ? `?subject=${filter}` : "";
    fetch(`/api/quiz${params}`)
      .then((r) => r.json())
      .then((d) => {
        setQuizzes(d.quizzes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [filter]);

  const getDifficultyColor = (d: string) => {
    if (d === "easy") return "#10b981";
    if (d === "hard") return "#f43f5e";
    return "#f59e0b";
  };

  const getSubjectInfo = (id: string) => SUBJECTS.find((s) => s.id === id) || { icon: "📝", name: id, color: "#8b5cf6" };

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
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2">🎯 Quiz Arena</h1>
          <p className="text-foreground/50">Choose a quiz and test your knowledge!</p>
        </div>

        {/* Subject Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter("")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${!filter ? "bg-primary-500 text-white" : "bg-[var(--card)] border border-[var(--card-border)]"}`}
          >
            All
          </button>
          {SUBJECTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilter(s.id)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all border"
              style={{
                background: filter === s.id ? `${s.color}20` : "var(--card)",
                borderColor: filter === s.id ? s.color : "var(--card-border)",
                color: filter === s.id ? s.color : "inherit",
              }}
            >
              {s.icon} {s.name}
            </button>
          ))}
        </div>

        {/* Quiz Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4 animate-float">🎯</div>
            <p className="text-foreground/50">Loading quizzes...</p>
          </div>
        ) : quizzes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-foreground/50">No quizzes found. Try a different subject!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
            {quizzes.map((quiz) => {
              const subj = getSubjectInfo(quiz.subject);
              return (
                <Link
                  key={quiz.id}
                  href={`/quiz/${quiz.id}`}
                  className="card no-underline block group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{subj.icon}</span>
                    <span
                      className="px-2.5 py-0.5 rounded-lg text-xs font-semibold"
                      style={{ background: `${subj.color}20`, color: subj.color }}
                    >
                      {subj.name}
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-lg text-xs font-semibold ml-auto capitalize"
                      style={{ background: `${getDifficultyColor(quiz.difficulty)}20`, color: getDifficultyColor(quiz.difficulty) }}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary-500 transition-colors">
                    {quiz.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-foreground/50">
                    <span>❓ {quiz.questionCount} questions</span>
                    <span>⏱ {quiz.timeLimit ? `${Math.round(quiz.timeLimit / 60)}m` : "No limit"}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-xp">+{quiz.xpReward} XP</span>
                    <span className="btn-primary py-1.5 px-4 text-xs">Play →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
