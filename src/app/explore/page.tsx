"use client";

import Link from "next/link";
import { SUBJECTS } from "@/lib/constants";

export default function ExplorePage() {
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
          <h1 className="text-3xl font-bold mb-2">🔭 Explore Subjects</h1>
          <p className="text-foreground/50">Dive into any subject and start learning!</p>
        </div>

        {/* Subject Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 stagger-children">
          {SUBJECTS.map((subject) => (
            <Link
              key={subject.id}
              href={`/quiz?subject=${subject.id}`}
              className="card text-center group no-underline"
              style={{ borderColor: `${subject.color}30` }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 transition-transform group-hover:scale-110"
                style={{ background: `${subject.color}15` }}
              >
                {subject.icon}
              </div>
              <h3 className="font-bold text-lg mb-1 group-hover:text-primary-500 transition-colors">
                {subject.name}
              </h3>
              <p className="text-sm text-foreground/50">Explore quizzes and content</p>
              <div className="mt-3 text-sm font-medium" style={{ color: subject.color }}>
                Start Learning →
              </div>
            </Link>
          ))}
        </div>

        {/* Learning Tips */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5 stagger-children">
          <div className="card">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-bold mb-1">Daily Practice</h3>
            <p className="text-sm text-foreground/50">
              Complete at least one quiz daily to build your streak and earn bonus XP!
            </p>
          </div>
          <div className="card">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold mb-1">Focus on Weak Areas</h3>
            <p className="text-sm text-foreground/50">
              Check your dashboard to identify subjects that need more practice.
            </p>
          </div>
          <div className="card">
            <div className="text-3xl mb-3">⚔️</div>
            <h3 className="font-bold mb-1">Challenge Friends</h3>
            <p className="text-sm text-foreground/50">
              Compete with friends on quizzes to make learning more fun!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
