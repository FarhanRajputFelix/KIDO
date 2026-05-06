"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatXP } from "@/lib/utils";

interface Player {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  totalQuizzes: number;
  badgeCount: number;
}

export default function LeaderboardPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((r) => r.json())
      .then((d) => {
        setPlayers(d.leaderboard || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getRankStyle = (rank: number) => {
    if (rank === 1) return { emoji: "🥇", color: "#fbbf24", bg: "rgba(251,191,36,0.1)" };
    if (rank === 2) return { emoji: "🥈", color: "#94a3b8", bg: "rgba(148,163,184,0.1)" };
    if (rank === 3) return { emoji: "🥉", color: "#d97706", bg: "rgba(217,119,6,0.1)" };
    return { emoji: "", color: "inherit", bg: "transparent" };
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
          <Link href="/quiz" className="btn-primary py-2 px-4 text-sm no-underline">🎯 Quizzes</Link>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-8 max-w-4xl mx-auto w-full">
        <div className="mb-8 animate-slide-up">
          <h1 className="text-3xl font-bold mb-2">📊 Leaderboard</h1>
          <p className="text-foreground/50">Top learners ranked by XP. Can you reach the top?</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4 animate-float">📊</div>
            <p className="text-foreground/50">Loading rankings...</p>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-16 card">
            <div className="text-4xl mb-4">🏁</div>
            <p className="text-foreground/50">No learners yet. Be the first!</p>
            <Link href="/quiz" className="btn-primary mt-4 no-underline">Start Learning →</Link>
          </div>
        ) : (
          <>
            {/* Top 3 Podium */}
            {players.length >= 3 && (
              <div className="grid grid-cols-3 gap-4 mb-8 stagger-children">
                {[players[1], players[0], players[2]].map((player, idx) => {
                  const rank = player.rank;
                  const rs = getRankStyle(rank);
                  const isFirst = rank === 1;
                  return (
                    <div
                      key={player.id}
                      className={`card text-center ${isFirst ? "card-glow" : ""}`}
                      style={{
                        transform: isFirst ? "scale(1.05)" : "",
                        marginTop: isFirst ? "0" : "16px",
                      }}
                    >
                      <div className="text-3xl mb-1">{rs.emoji}</div>
                      <div className="text-4xl mb-2">{player.avatar}</div>
                      <h3 className="font-bold text-base">{player.name}</h3>
                      <div className="stat-value text-lg mt-1">{formatXP(player.xp)} XP</div>
                      <div className="text-xs text-foreground/50 mt-1">Level {player.level}</div>
                      <div className="flex justify-center gap-3 mt-2 text-xs text-foreground/40">
                        <span>🔥 {player.streak}</span>
                        <span>🎯 {player.totalQuizzes}</span>
                        <span>🏅 {player.badgeCount}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full Rankings Table */}
            <div className="card">
              <div className="space-y-2">
                {players.map((player) => {
                  const rs = getRankStyle(player.rank);
                  return (
                    <div
                      key={player.id}
                      className="flex items-center gap-4 p-3 rounded-xl transition-colors hover:bg-[var(--background)]"
                      style={{ background: rs.bg }}
                    >
                      <span className="w-8 text-center font-bold text-lg" style={{ color: rs.color }}>
                        {rs.emoji || `#${player.rank}`}
                      </span>
                      <span className="text-2xl">{player.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{player.name}</div>
                        <div className="text-xs text-foreground/50">
                          Level {player.level} · 🔥 {player.streak} day streak
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-sm">{formatXP(player.xp)} XP</div>
                        <div className="text-xs text-foreground/40">
                          {player.totalQuizzes} quizzes · {player.badgeCount} badges
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
