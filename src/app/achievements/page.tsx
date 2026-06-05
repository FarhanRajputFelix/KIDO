"use client";

import Link from "next/link";
import { BADGE_DEFINITIONS } from "@/lib/constants";

export default function AchievementsPage() {
  const categories = ["quiz", "streak", "learning", "social"];
  const categoryConfig: Record<string, { label: string; icon: string; bg: string; chipClass: string }> = {
    quiz:     { label: "Quiz Achievements",  icon: "🎯", bg: "#f0efff", chipClass: "chip-purple" },
    streak:   { label: "Streak Milestones",  icon: "🔥", bg: "#fff7ed", chipClass: "chip-gold" },
    learning: { label: "Learning Progress",  icon: "📚", bg: "#f0fff4", chipClass: "chip-green" },
    social:   { label: "Social",             icon: "🤝", bg: "#fff0f8", chipClass: "chip-red" },
  };

  const grouped = categories.map(cat => ({
    cat,
    ...categoryConfig[cat],
    badges: BADGE_DEFINITIONS.filter(b => b.category === cat),
  }));

  const totalBadges = BADGE_DEFINITIONS.length;

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ background: "#F8F7FF" }}>
      {/* Header */}
      <div className="bg-white border-b border-[var(--card-border)] px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="font-extrabold text-lg" style={{ color: "#1a1a2e" }}>🏆 Achievements</div>
            <div className="text-xs font-semibold" style={{ color: "#777587" }}>Earn badges to show off your skills!</div>
          </div>
          <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Back</Link>
        </div>
      </div>

      <main className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full">

        {/* Hero gold card */}
        <div className="leaderboard-hero mb-7 animate-slide-up">
          <div className="chip chip-purple mb-3 mx-auto" style={{ width: "fit-content" }}>YOUR PROGRESS</div>
          <div className="text-5xl font-black mb-1" style={{ color: "#1a1a2e" }}>{totalBadges}<span className="text-3xl font-bold"> Badges</span></div>
          <p className="font-bold" style={{ color: "#3F3D9E" }}>Collect them all to become a KIDO Champion! 🏅</p>
          <div className="mt-4 w-full max-w-xs mx-auto">
            <div className="w-full h-3 rounded-full" style={{ background: "rgba(0,0,0,0.1)" }}>
              <div className="h-full rounded-full" style={{ width: "35%", background: "#3F3D9E" }} />
            </div>
            <p className="text-xs font-bold mt-1 text-center" style={{ color: "#3F3D9E" }}>Keep playing to unlock more!</p>
          </div>
        </div>

        {/* Badge category sections */}
        <div className="space-y-6">
          {grouped.map(group => (
            <div key={group.cat}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{group.icon}</span>
                <h2 className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>{group.label}</h2>
                <span className={`chip ${group.chipClass} ml-auto`}>{group.badges.length} badges</span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {group.badges.map(badge => {
                  const xpVal = badge.requirement.value === 1 ? 25 : badge.requirement.value >= 30 ? 150 : 50;
                  return (
                    <div key={badge.id} className="flex items-center gap-4 card"
                         style={{ background: group.bg, border: "1.5px solid #e8e5ff", boxShadow: "0 3px 0 #e8e5ff" }}>
                      {/* Big badge icon */}
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 badge"
                           style={{ background: "white" }}>
                        {badge.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>{badge.name}</div>
                        <div className="text-sm font-semibold mt-0.5" style={{ color: "#777587" }}>{badge.description}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="chip chip-gold text-xs">+{xpVal} XP</span>
                          <span className="text-xs font-semibold capitalize" style={{ color: "#777587" }}>
                            {badge.requirement.type.replace("_", " ")} ≥ {badge.requirement.value}
                          </span>
                        </div>
                      </div>
                      {/* Lock indicator */}
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                           style={{ background: "#e8e5ff" }}>
                        <span className="text-base">🔒</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 hero-banner text-center">
          <div className="text-4xl mb-3">🚀</div>
          <h3 className="text-xl font-extrabold text-white mb-2">Ready to earn more badges?</h3>
          <p className="text-white/70 mb-5 text-sm">Take quizzes and play games to unlock achievements!</p>
          <div className="flex gap-3 justify-center">
            <Link href="/quiz" className="btn-gold no-underline">🎯 Start a Quiz</Link>
            <Link href="/games" className="no-underline">
              <button className="glass text-white border border-white/30 rounded-2xl py-3 px-6 font-bold text-sm">🎮 Play Games</button>
            </Link>
          </div>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="bottom-nav justify-around">
        <Link href="/dashboard/kid" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">🏠</div><span>Home</span></Link>
        <Link href="/chat" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">💬</div><span>Chat</span></Link>
        <Link href="/games" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">🎮</div><span>Games</span></Link>
        <Link href="/leaderboard" className="bottom-nav-item no-underline"><div className="bottom-nav-icon">⭐</div><span>Stars</span></Link>
      </nav>
    </div>
  );
}
