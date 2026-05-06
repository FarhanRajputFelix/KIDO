"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { formatXP, xpProgress } from "@/lib/utils";

interface Child {
  id: string;
  name: string;
  avatar: string;
  age: number;
  grade: string;
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  totalQuizzes: number;
  badges: string;
  strongSubjects: string;
  weakSubjects: string;
  activities: { id: string; type: string; title: string; description: string; xpEarned: number; createdAt: string }[];
  alerts: { id: string; type: string; title: string; message: string; severity: string }[];
}

interface DashboardData {
  children: Child[];
  stats: {
    totalChildren: number;
    totalXP: number;
    totalQuizzes: number;
    avgStreak: number;
    unreadAlerts: number;
  };
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then((r) => r.json())
        .then((d) => {
          setData(d);
          if (d.children?.length > 0) setSelectedChild(d.children[0].id);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">🧒</div>
          <p className="text-foreground/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-sm">
          <p className="text-lg font-semibold mb-4">Please log in to access your dashboard</p>
          <Link href="/login" className="btn-primary no-underline">Sign In</Link>
        </div>
      </div>
    );
  }

  const activeChild = data?.children?.find((c) => c.id === selectedChild);
  const childBadges = activeChild ? JSON.parse(activeChild.badges) : [];
  const strongSubjects = activeChild ? JSON.parse(activeChild.strongSubjects) : [];
  const weakSubjects = activeChild ? JSON.parse(activeChild.weakSubjects) : [];
  const progress = activeChild ? xpProgress(activeChild.xp) : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold no-underline">
            <span className="text-xl">🧒</span>
            <span className="gradient-text">KIDO</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/quiz" className="btn-secondary py-2 px-4 text-sm no-underline">🎯 Quizzes</Link>
          <Link href="/achievements" className="btn-secondary py-2 px-4 text-sm no-underline">🏆 Badges</Link>
          <Link href="/leaderboard" className="btn-secondary py-2 px-4 text-sm no-underline">📊 Ranks</Link>
          <span className="text-sm text-foreground/50 hidden md:inline">
            {session?.user?.name}
          </span>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary py-2 px-4 text-sm">
            Logout
          </button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar - Child Selector */}
        <aside className="sidebar hidden md:flex">
          <h3 className="text-xs uppercase tracking-wider text-sidebar-text/50 mb-3 px-4">Your Children</h3>
          {data?.children?.map((child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`sidebar-link ${selectedChild === child.id ? "active" : ""}`}
              style={{ border: "none", background: selectedChild === child.id ? "rgba(139, 92, 246, 0.25)" : "transparent" }}
            >
              <span className="text-2xl">{child.avatar}</span>
              <div className="text-left">
                <div className="font-semibold">{child.name}</div>
                <div className="text-xs opacity-60">Level {child.level} · {child.age}yo</div>
              </div>
            </button>
          ))}

          <div className="mt-auto pt-6 border-t border-white/10">
            <Link href="/quiz" className="sidebar-link no-underline">🎯 Take a Quiz</Link>
            <Link href="/achievements" className="sidebar-link no-underline">🏆 Achievements</Link>
            <Link href="/leaderboard" className="sidebar-link no-underline">📊 Leaderboard</Link>
            <Link href="/explore" className="sidebar-link no-underline">🔭 Explore</Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - var(--nav-height))" }}>
          {activeChild ? (
            <div className="max-w-5xl mx-auto">
              {/* Child Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8 animate-slide-up">
                <div className="text-5xl">{activeChild.avatar}</div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{activeChild.name}&apos;s Dashboard</h1>
                  <p className="text-foreground/50 text-sm">
                    Level {activeChild.level} · {activeChild.grade} Grade · {activeChild.age} years old
                  </p>
                  {progress && (
                    <div className="mt-3 max-w-sm">
                      <div className="flex justify-between text-xs font-medium mb-1">
                        <span>Level {activeChild.level}</span>
                        <span>{formatXP(progress.current)} / {formatXP(progress.needed)} XP</span>
                      </div>
                      <div className="xp-bar-track">
                        <div className="xp-bar-fill" style={{ width: `${progress.percentage}%` }} />
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="animate-streak text-2xl">🔥</span>
                  <div>
                    <div className="font-bold text-lg">{activeChild.streak}</div>
                    <div className="text-foreground/50 text-xs">day streak</div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stagger-children">
                <div className="card text-center">
                  <div className="stat-value">{formatXP(activeChild.xp)}</div>
                  <div className="text-sm text-foreground/50 mt-1">Total XP</div>
                </div>
                <div className="card text-center">
                  <div className="stat-value">{activeChild.totalQuizzes}</div>
                  <div className="text-sm text-foreground/50 mt-1">Quizzes Done</div>
                </div>
                <div className="card text-center">
                  <div className="stat-value">{childBadges.length}</div>
                  <div className="text-sm text-foreground/50 mt-1">Badges</div>
                </div>
                <div className="card text-center">
                  <div className="stat-value">{activeChild.longestStreak}</div>
                  <div className="text-sm text-foreground/50 mt-1">Best Streak</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Strong Subjects */}
                <div className="card">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">💪</span> Strong Subjects
                  </h3>
                  {strongSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {strongSubjects.map((s: string) => (
                        <span key={s} className="px-3 py-1.5 rounded-lg bg-success-500/10 text-success-500 text-sm font-medium capitalize">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/40">Keep quizzing to discover strengths!</p>
                  )}

                  <h3 className="font-bold mt-6 mb-4 flex items-center gap-2">
                    <span className="text-xl">📈</span> Needs Improvement
                  </h3>
                  {weakSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {weakSubjects.map((s: string) => (
                        <span key={s} className="px-3 py-1.5 rounded-lg bg-warning-500/10 text-warning-500 text-sm font-medium capitalize">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-foreground/40">Excellent across the board! 🌟</p>
                  )}
                </div>

                {/* Badges */}
                <div className="card">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">🏅</span> Badges Earned ({childBadges.length})
                  </h3>
                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { id: "first_quiz", icon: "🎯" },
                      { id: "quiz_master", icon: "🏆" },
                      { id: "perfect_score", icon: "💯" },
                      { id: "streak_7", icon: "🔥" },
                      { id: "streak_30", icon: "⚡" },
                      { id: "level_5", icon: "⭐" },
                      { id: "video_watcher", icon: "📺" },
                      { id: "math_whiz", icon: "🧮" },
                    ].map((b) => (
                      <div
                        key={b.id}
                        className={`badge ${!childBadges.includes(b.id) ? "badge-locked" : ""}`}
                        title={b.id}
                      >
                        {b.icon}
                      </div>
                    ))}
                  </div>
                  <Link href="/achievements" className="btn-secondary w-full mt-4 text-sm no-underline">
                    View All Achievements →
                  </Link>
                </div>

                {/* Activity Feed */}
                <div className="card lg:col-span-2">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">📋</span> Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {activeChild.activities?.length > 0 ? (
                      activeChild.activities.map((a) => (
                        <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)]">
                          <span className="text-xl">
                            {a.type === "quiz_completed" ? "🎯" :
                             a.type === "badge_earned" ? "🏅" :
                             a.type === "level_up" ? "⬆️" :
                             a.type === "streak" ? "🔥" : "📝"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{a.title}</div>
                            {a.description && (
                              <div className="text-xs text-foreground/50">{a.description}</div>
                            )}
                          </div>
                          {a.xpEarned > 0 && (
                            <span className="text-xs font-bold text-xp">+{a.xpEarned} XP</span>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-foreground/40 text-center py-4">
                        No recent activity. Time to start a quiz! 🎮
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Parent Alerts */}
              {activeChild.alerts?.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">🔔</span> Alerts
                  </h3>
                  <div className="space-y-3">
                    {activeChild.alerts.map((alert) => (
                      <div
                        key={alert.id}
                        className="card flex items-start gap-3"
                        style={{
                          borderLeftWidth: 4,
                          borderLeftColor: alert.severity === "critical" ? "#f43f5e"
                            : alert.severity === "warning" ? "#f59e0b" : "#8b5cf6",
                        }}
                      >
                        <span className="text-xl mt-0.5">
                          {alert.severity === "critical" ? "🚨" : alert.severity === "warning" ? "⚠️" : "ℹ️"}
                        </span>
                        <div>
                          <div className="font-medium text-sm">{alert.title}</div>
                          <div className="text-xs text-foreground/50">{alert.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/quiz" className="btn-primary no-underline">🎯 Start a Quiz</Link>
                <Link href="/leaderboard" className="btn-secondary no-underline">📊 View Leaderboard</Link>
                <Link href="/achievements" className="btn-secondary no-underline">🏆 Check Achievements</Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-6xl mb-4">👶</div>
              <h2 className="text-xl font-bold mb-2">No children added yet</h2>
              <p className="text-foreground/50 mb-6">Add a child profile to get started with learning!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
