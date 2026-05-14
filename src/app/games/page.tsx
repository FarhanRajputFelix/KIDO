"use client";

import Link from "next/link";

export default function GamesHub() {
  const games = [
    {
      id: "word-builder",
      title: "Word Builder",
      icon: "🔤",
      description: "Solve AI-generated word puzzles, anagrams, and fill-in-the-blanks themed around your interests!",
      color: "#6366f1",
      difficulty: "Easy → Medium",
    },
    {
      id: "story-creator",
      title: "Story Creator",
      icon: "📖",
      description: "AI starts an exciting story, you continue it! Build creative writing skills in a fun way.",
      color: "#ec4899",
      difficulty: "Medium",
    },
    {
      id: "math-arena",
      title: "Math Arena",
      icon: "🧮",
      description: "Timed math challenges that get harder as you go. Race against the clock to earn max XP!",
      color: "#10b981",
      difficulty: "Progressive",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-foreground/50 hover:text-foreground no-underline">←</Link>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold no-underline">
            <span className="text-xl">🎮</span>
            <span className="gradient-text">KIDO Games</span>
          </Link>
        </div>
        <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">Back</Link>
      </nav>

      <main className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 animate-slide-up">
            <div className="text-5xl mb-4 animate-float">🎮</div>
            <h1 className="text-3xl font-extrabold mb-2">
              <span className="gradient-text">AI-Powered Games</span>
            </h1>
            <p className="text-foreground/50 text-lg">Learn while having fun! Every game is personalized just for you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {games.map(game => (
              <Link
                key={game.id}
                href={`/games/${game.id}`}
                className="card card-glow text-center no-underline group"
                style={{ borderTop: `3px solid ${game.color}` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{game.icon}</div>
                <h3 className="font-bold text-lg mb-2">{game.title}</h3>
                <p className="text-sm text-foreground/50 mb-4">{game.description}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ background: `${game.color}18`, color: game.color }}>
                    {game.difficulty}
                  </span>
                  <span className="text-xs font-bold text-xp">+XP</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
