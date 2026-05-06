"use client";

import Link from "next/link";
import { BADGE_DEFINITIONS } from "@/lib/constants";

export default function AchievementsPage() {
  // In a full app, we'd fetch the child's earned badges from API.
  // For now, showcasing all available badges.
  const categories = ["quiz", "streak", "learning", "social"];
  const categoryLabels: Record<string, string> = {
    quiz: "🎯 Quiz Achievements",
    streak: "🔥 Streak Milestones",
    learning: "📚 Learning Progress",
    social: "🤝 Social",
  };

  const grouped = categories.map((cat) => ({
    category: cat,
    label: categoryLabels[cat],
    badges: BADGE_DEFINITIONS.filter((b) => b.category === cat),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-bold no-underline">
          <span className="text-xl">🧒</span>
          <span className="gradient-text">KIDO</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Dashboard</Link>
          <Link href="/quiz" className="btn-primary py-2 px-4 text-sm no-underline">🎯 Quizzes</Link>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2">🏆 Achievements</h1>
          <p className="text-foreground/50">Earn badges by completing challenges and reaching milestones!</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 stagger-children">
          <div className="card text-center">
            <div className="stat-value text-2xl">{BADGE_DEFINITIONS.length}</div>
            <div className="text-sm text-foreground/50 mt-1">Total Badges</div>
          </div>
          <div className="card text-center">
            <div className="stat-value text-2xl">4</div>
            <div className="text-sm text-foreground/50 mt-1">Categories</div>
          </div>
          <div className="card text-center">
            <div className="stat-value text-2xl">🔥</div>
            <div className="text-sm text-foreground/50 mt-1">Best: Streaks</div>
          </div>
          <div className="card text-center">
            <div className="stat-value text-2xl">💪</div>
            <div className="text-sm text-foreground/50 mt-1">Keep Earning!</div>
          </div>
        </div>

        {/* Badge Categories */}
        <div className="space-y-10">
          {grouped.map((group) => (
            <div key={group.category}>
              <h2 className="text-xl font-bold mb-4">{group.label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
                {group.badges.map((badge) => (
                  <div key={badge.id} className="card flex items-start gap-4">
                    <div className="badge shrink-0">
                      {badge.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base">{badge.name}</h3>
                      <p className="text-sm text-foreground/50 mt-0.5">{badge.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs font-bold text-xp">+{badge.requirement.value === 1 ? 25 : badge.requirement.value >= 30 ? 150 : 50} XP</span>
                        <span className="text-xs text-foreground/40 capitalize">
                          {badge.requirement.type.replace("_", " ")} ≥ {badge.requirement.value}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center card card-glow">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-xl font-bold mb-2">Ready to earn more badges?</h3>
          <p className="text-foreground/50 mb-4">Take a quiz and start unlocking achievements!</p>
          <Link href="/quiz" className="btn-primary no-underline">Start a Quiz →</Link>
        </div>
      </main>
    </div>
  );
}
