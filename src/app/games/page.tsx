"use client";

import Link from "next/link";

export default function GamesHub() {
  const featured = [
    { id: "math-arena", title: "Math Match", tag: "NEW GAME", desc: "Race against the clock!", bg: "linear-gradient(135deg,#6C63FF,#3F3D9E)", emoji: "🧮" },
    { id: "word-builder", title: "Word Builder", tag: "FEATURED", desc: "Slice through words!", bg: "linear-gradient(135deg,#ec4899,#be185d)", emoji: "🔤" },
  ];

  const categories = [
    { id: "math-arena", icon: "🧮", title: "Math Arena", count: "12 Games", bg: "#f0efff", iconBg: "#e8e5ff", tag: null },
    { id: "story-creator", icon: "🔬", title: "Science Quests", count: "8 Games", bg: "#f0fff4", iconBg: "#d1fae5", tag: "NEW" },
    { id: "word-builder", icon: "📚", title: "Word Builder", count: "15 Games", bg: "#fffbeb", iconBg: "#fef3c7", tag: null },
    { id: "story-creator", icon: "🎨", title: "Story Creator", count: "6 Games", bg: "#fff0f8", iconBg: "#fce7f3", tag: null },
  ];

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ background: "#F8F7FF" }}>
      {/* Header */}
      <nav className="flex items-center justify-between px-5 py-4 bg-white border-b border-[var(--card-border)]">
        <div className="flex items-center gap-3">
          <span className="text-2xl">😊</span>
          <div>
            <div className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>Hi, there!</div>
            <div className="chip chip-purple" style={{ fontSize: "11px", padding: "2px 8px" }}>🔥 5 XP</div>
          </div>
        </div>
        <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Dashboard</Link>
      </nav>

      <main className="flex-1 px-5 py-6 max-w-2xl mx-auto w-full">
        {/* New & Featured horizontal scroll */}
        <div className="mb-7">
          <h2 className="font-extrabold text-lg mb-3" style={{ color: "#1a1a2e" }}>New &amp; Featured 🚀</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {featured.map(g => (
              <Link key={g.id} href={`/games/${g.id}`}
                className="min-w-[240px] rounded-3xl p-5 no-underline relative overflow-hidden flex flex-col justify-end game-card"
                style={{ background: g.bg, minHeight: "140px" }}>
                <div className="absolute top-3 left-3">
                  <span className="chip chip-gold text-xs">{g.tag}</span>
                </div>
                <div className="absolute top-3 right-3 text-4xl opacity-60">{g.emoji}</div>
                <div className="text-white font-extrabold text-base">{g.title}</div>
                <div className="text-white/70 text-sm">{g.desc}</div>
                {/* Play button */}
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center mt-2">
                  <span className="text-white text-sm">▶</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Explore all games */}
        <div className="mb-7">
          <h2 className="font-extrabold text-lg mb-3" style={{ color: "#1a1a2e" }}>Explore All Games 🗺️</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map(c => (
              <Link key={c.id + c.title} href={`/games/${c.id}`}
                className="subject-card no-underline relative" style={{ background: c.bg }}>
                {c.tag && (
                  <span className="chip chip-red absolute top-3 right-3" style={{ fontSize: "10px", padding: "2px 7px" }}>{c.tag}</span>
                )}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-3"
                     style={{ background: c.iconBg }}>{c.icon}</div>
                <div className="font-bold text-base mb-0.5" style={{ color: "#1a1a2e" }}>{c.title}</div>
                <div className="text-xs font-semibold" style={{ color: "#777587" }}>{c.count}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Daily challenge card */}
        <div className="challenge-card flex items-center gap-4">
          <span className="text-3xl">🏆</span>
          <div className="flex-1">
            <div className="chip chip-gold mb-1" style={{ width: "fit-content", fontSize: "11px" }}>DAILY CHALLENGE</div>
            <div className="font-bold text-sm" style={{ color: "#1a1a2e" }}>Solve 3 Math Match puzzles today!</div>
            <div className="mt-2">
              <div className="flex items-center gap-2 text-xs mb-1">
                <div className="flex-1 h-2 rounded-full" style={{ background: "#e8e5ff" }}>
                  <div className="h-full rounded-full" style={{ width: "66%", background: "#6C63FF" }}></div>
                </div>
                <span className="font-bold" style={{ color: "#6C63FF" }}>2/3 completed</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="bottom-nav justify-around">
        <Link href="/dashboard/kid" className="bottom-nav-item no-underline">
          <div className="bottom-nav-icon">🏠</div><span>Home</span>
        </Link>
        <Link href="/chat" className="bottom-nav-item no-underline">
          <div className="bottom-nav-icon">💬</div><span>Chat</span>
        </Link>
        <Link href="/games" className="bottom-nav-item active no-underline">
          <div className="bottom-nav-icon">🎮</div><span>Games</span>
        </Link>
        <Link href="/leaderboard" className="bottom-nav-item no-underline">
          <div className="bottom-nav-icon">⭐</div><span>Stars</span>
        </Link>
      </nav>
    </div>
  );
}
