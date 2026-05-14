"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
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
  totalWatchTime: number;
  screenTimeLimit: number;
  badges: string;
  strongSubjects: string;
  weakSubjects: string;
  activities: Array<{ id: string; type: string; title: string; description: string; xpEarned: number; createdAt: string }>;
  alerts: Array<{ id: string; type: string; title: string; message: string; severity: string }>;
  screenTimeLogs: Array<{ date: string; minutes: number; alertTriggered: boolean }>;
  progressReports: Array<{ id: string; content: string; period: string; generatedAt: string; interests: string; recommendations: string }>;
  sentFriendRequests: Array<{ id: string; status: string; parentApproved: boolean; toChild: { name: string; avatar: string } }>;
  receivedFriendRequests: Array<{ id: string; status: string; parentApproved: boolean; fromChild: { name: string; avatar: string } }>;
}

export default function ParentDashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddChild, setShowAddChild] = useState(false);
  const [newChild, setNewChild] = useState({ name: "", age: "", grade: "", avatar: "🦊", email: "", password: "" });
  const [generatingReport, setGeneratingReport] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          setData(d);
          if (d.children?.length > 0) setSelectedChild(d.children[0].id);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status]);

  const handleAddChild = async () => {
    if (!newChild.name || !newChild.age) return;
    try {
      const res = await fetch("/api/children/manage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChild),
      });
      if (res.ok) {
        setShowAddChild(false);
        setNewChild({ name: "", age: "", grade: "", avatar: "🦊", email: "", password: "" });
        window.location.reload();
      }
    } catch (e) { console.error(e); }
  };

  const handleFriendApproval = async (requestId: string, action: string) => {
    try {
      await fetch("/api/friends/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });
      window.location.reload();
    } catch (e) { console.error(e); }
  };

  const handleGenerateReport = async (childId: string) => {
    setGeneratingReport(true);
    try {
      await fetch("/api/ai/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, period: "weekly" }),
      });
      window.location.reload();
    } catch (e) { console.error(e); }
    setGeneratingReport(false);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">👨‍👩‍👧‍👦</div>
          <p className="text-foreground/50">Loading parent dashboard...</p>
        </div>
      </div>
    );
  }

  const activeChild: Child | undefined = data?.children?.find((c: Child) => c.id === selectedChild);
  const progress = activeChild ? xpProgress(activeChild.xp) : null;
  const childBadges = activeChild ? JSON.parse(activeChild.badges) : [];
  const strongSubjects = activeChild ? JSON.parse(activeChild.strongSubjects) : [];
  const weakSubjects = activeChild ? JSON.parse(activeChild.weakSubjects) : [];

  const screenTimeToday = activeChild?.screenTimeLogs?.[0]?.minutes || 0;
  const isOverScreenLimit = screenTimeToday >= (activeChild?.screenTimeLimit || 120);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold no-underline">
            <span className="text-xl">🧒</span>
            <span className="gradient-text">KIDO</span>
          </Link>
          <span className="px-2 py-1 rounded-lg bg-primary-500/10 text-primary-500 text-xs font-bold uppercase">Parent</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground/50 hidden md:inline">{session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary py-2 px-4 text-sm">Logout</button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar - Children */}
        <aside className="sidebar hidden md:flex">
          <h3 className="text-xs uppercase tracking-wider text-sidebar-text/50 mb-3 px-4">Your Children</h3>
          {data?.children?.map((child: Child) => (
            <button
              key={child.id}
              onClick={() => setSelectedChild(child.id)}
              className={`sidebar-link ${selectedChild === child.id ? "active" : ""}`}
              style={{ border: "none", background: selectedChild === child.id ? "rgba(139, 92, 246, 0.25)" : "transparent" }}
            >
              <span className="text-2xl">{child.avatar}</span>
              <div className="text-left">
                <div className="font-semibold">{child.name}</div>
                <div className="text-xs opacity-60">Lvl {child.level} · {child.age}yo</div>
              </div>
            </button>
          ))}

          <button
            onClick={() => setShowAddChild(true)}
            className="sidebar-link"
            style={{ border: "none", background: "transparent" }}
          >
            <span className="text-xl">➕</span>
            <span>Add Child</span>
          </button>

          <div className="mt-auto pt-6 border-t border-white/10">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-text/50 mb-3 px-4">Tabs</h3>
            {[
              { id: "overview", icon: "📊", label: "Overview" },
              { id: "alerts", icon: "🔔", label: `Alerts (${data?.stats?.unreadAlerts || 0})` },
              { id: "friends", icon: "👥", label: "Friends" },
              { id: "reports", icon: "📋", label: "AI Reports" },
              { id: "screen-time", icon: "⏱️", label: "Screen Time" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sidebar-link ${activeTab === tab.id ? "active" : ""}`}
                style={{ border: "none", background: activeTab === tab.id ? "rgba(139, 92, 246, 0.25)" : "transparent" }}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - var(--nav-height))" }}>
          <div className="max-w-5xl mx-auto">
            {/* Add Child Modal */}
            {showAddChild && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="card max-w-md w-full animate-scale-in">
                  <h2 className="text-xl font-bold mb-4">➕ Add a Child</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="label">Name *</label>
                      <input className="input" placeholder="Child's name" value={newChild.name} onChange={e => setNewChild({ ...newChild, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="label">Age *</label>
                        <input className="input" type="number" placeholder="Age" value={newChild.age} onChange={e => setNewChild({ ...newChild, age: e.target.value })} />
                      </div>
                      <div>
                        <label className="label">Grade</label>
                        <input className="input" placeholder="e.g., 5th" value={newChild.grade} onChange={e => setNewChild({ ...newChild, grade: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="label">Avatar</label>
                      <div className="flex flex-wrap gap-2">
                        {["🦊", "🐼", "🦁", "🐱", "🐶", "🦄", "🐸", "🦋", "🐯", "🐧", "🐨", "🐰"].map(a => (
                          <button key={a} onClick={() => setNewChild({ ...newChild, avatar: a })} className={`text-2xl p-2 rounded-xl transition-all ${newChild.avatar === a ? "bg-primary-500/20 ring-2 ring-primary-500" : "hover:bg-primary-500/10"}`} style={{ border: "none" }}>
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="label">Child Login Email (optional)</label>
                      <input className="input" type="email" placeholder="child@email.com" value={newChild.email} onChange={e => setNewChild({ ...newChild, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="label">Child Password (optional)</label>
                      <input className="input" type="password" placeholder="Password" value={newChild.password} onChange={e => setNewChild({ ...newChild, password: e.target.value })} />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button onClick={handleAddChild} className="btn-primary flex-1">Create Child Account</button>
                      <button onClick={() => setShowAddChild(false)} className="btn-secondary flex-1">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeChild ? (
              <>
                {/* Child Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 animate-slide-up">
                  <div className="text-5xl">{activeChild.avatar}</div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">{activeChild.name}&apos;s Dashboard</h1>
                    <p className="text-foreground/50 text-sm">Level {activeChild.level} · {activeChild.grade} Grade · {activeChild.age} years old</p>
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
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="animate-streak text-2xl">🔥</span>
                      <div>
                        <div className="font-bold text-lg">{activeChild.streak}</div>
                        <div className="text-foreground/50 text-xs">day streak</div>
                      </div>
                    </div>
                    {/* Screen Time Indicator */}
                    <div className={`card p-3 ${isOverScreenLimit ? "border-accent-500 bg-accent-500/5" : ""}`}>
                      <div className="text-center">
                        <div className={`font-bold text-lg ${isOverScreenLimit ? "text-accent-500" : ""}`}>
                          {screenTimeToday}m
                        </div>
                        <div className="text-xs text-foreground/50">
                          / {activeChild.screenTimeLimit}m
                        </div>
                        {isOverScreenLimit && <div className="text-xs text-accent-500 font-bold mt-1">⚠️ OVER LIMIT</div>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Tab Selector */}
                <div className="flex gap-2 mb-6 overflow-x-auto md:hidden">
                  {["overview", "alerts", "friends", "reports", "screen-time"].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${activeTab === tab ? "bg-primary-500 text-white" : "bg-[var(--card)] border border-[var(--card-border)]"}`}
                      style={{ border: activeTab === tab ? "none" : undefined }}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
                    </button>
                  ))}
                </div>

                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div className="animate-slide-up">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 stagger-children">
                      <div className="card text-center"><div className="stat-value">{formatXP(activeChild.xp)}</div><div className="text-sm text-foreground/50 mt-1">Total XP</div></div>
                      <div className="card text-center"><div className="stat-value">{activeChild.totalQuizzes}</div><div className="text-sm text-foreground/50 mt-1">Quizzes Done</div></div>
                      <div className="card text-center"><div className="stat-value">{childBadges.length}</div><div className="text-sm text-foreground/50 mt-1">Badges</div></div>
                      <div className="card text-center"><div className="stat-value">{activeChild.longestStreak}</div><div className="text-sm text-foreground/50 mt-1">Best Streak</div></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Subjects */}
                      <div className="card">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">💪</span> Strengths & Weaknesses</h3>
                        <div className="mb-4">
                          <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">Strong Subjects</p>
                          <div className="flex flex-wrap gap-2">
                            {strongSubjects.length > 0 ? strongSubjects.map((s: string) => (
                              <span key={s} className="px-3 py-1.5 rounded-lg bg-success-500/10 text-success-500 text-sm font-medium capitalize">{s}</span>
                            )) : <span className="text-sm text-foreground/40">Keep quizzing to discover!</span>}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">Needs Improvement</p>
                          <div className="flex flex-wrap gap-2">
                            {weakSubjects.length > 0 ? weakSubjects.map((s: string) => (
                              <span key={s} className="px-3 py-1.5 rounded-lg bg-warning-500/10 text-warning-500 text-sm font-medium capitalize">{s}</span>
                            )) : <span className="text-sm text-foreground/40">Excellent across the board! 🌟</span>}
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div className="card">
                        <h3 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">📋</span> Recent Activity</h3>
                        <div className="space-y-2">
                          {activeChild.activities?.slice(0, 5).map((a) => (
                            <div key={a.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)]">
                              <span className="text-xl">
                                {a.type === "quiz_completed" ? "🎯" : a.type === "badge_earned" ? "🏅" : a.type === "level_up" ? "⬆️" : a.type === "streak" ? "🔥" : a.type === "friend_added" ? "🤝" : "📝"}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-sm truncate">{a.title}</div>
                                {a.description && <div className="text-xs text-foreground/50">{a.description}</div>}
                              </div>
                              {a.xpEarned > 0 && <span className="text-xs font-bold text-xp">+{a.xpEarned} XP</span>}
                            </div>
                          )) || <p className="text-sm text-foreground/40 text-center py-4">No recent activity</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Alerts Tab */}
                {activeTab === "alerts" && (
                  <div className="animate-slide-up">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span>🔔</span> Alerts</h2>
                    <div className="space-y-3">
                      {activeChild.alerts?.length > 0 ? activeChild.alerts.map((alert) => (
                        <div key={alert.id} className="card flex items-start gap-3" style={{
                          borderLeftWidth: 4,
                          borderLeftColor: alert.severity === "critical" ? "#f43f5e" : alert.severity === "warning" ? "#f59e0b" : "#8b5cf6",
                        }}>
                          <span className="text-xl mt-0.5">{alert.severity === "critical" ? "🚨" : alert.severity === "warning" ? "⚠️" : "ℹ️"}</span>
                          <div>
                            <div className="font-medium text-sm">{alert.title}</div>
                            <div className="text-xs text-foreground/50">{alert.message}</div>
                            <div className="text-xs text-foreground/30 mt-1">{alert.type}</div>
                          </div>
                        </div>
                      )) : (
                        <div className="card text-center py-12">
                          <div className="text-4xl mb-4">✅</div>
                          <p className="text-foreground/50">No alerts! Everything looks good.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Friends Tab */}
                {activeTab === "friends" && (
                  <div className="animate-slide-up">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span>👥</span> Friend Requests</h2>

                    {/* Pending Parent Approval */}
                    {data?.pendingFriendApprovals?.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-bold mb-3 text-warning-500">⏳ Awaiting Your Approval</h3>
                        <div className="space-y-3">
                          {data.pendingFriendApprovals.map((req: any) => (
                            <div key={req.id} className="card flex items-center gap-4" style={{ borderLeftWidth: 4, borderLeftColor: "#f59e0b" }}>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {req.fromChild?.name || "Child"} → {req.toChild?.name || "Child"}
                                </div>
                                <div className="text-xs text-foreground/50">Friend request needs your approval</div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleFriendApproval(req.id, "approve")} className="btn-primary py-1.5 px-4 text-sm">✓ Approve</button>
                                <button onClick={() => handleFriendApproval(req.id, "reject")} className="btn-secondary py-1.5 px-4 text-sm">✕ Deny</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Current Friends */}
                    <h3 className="font-bold mb-3">Current Friends</h3>
                    <div className="space-y-2">
                      {[
                        ...activeChild.sentFriendRequests.filter(r => r.status === "approved" && r.parentApproved),
                        ...activeChild.receivedFriendRequests.filter(r => r.status === "approved" && r.parentApproved),
                      ].map(f => (
                        <div key={f.id} className="card flex items-center gap-3">
                          <span className="text-2xl">{(f as any).toChild?.avatar || (f as any).fromChild?.avatar}</span>
                          <div className="font-medium">{(f as any).toChild?.name || (f as any).fromChild?.name}</div>
                          <span className="px-2 py-1 rounded-lg bg-success-500/10 text-success-500 text-xs font-bold ml-auto">Approved</span>
                        </div>
                      ))}
                      {activeChild.sentFriendRequests.filter(r => r.status === "approved" && r.parentApproved).length === 0 &&
                       activeChild.receivedFriendRequests.filter(r => r.status === "approved" && r.parentApproved).length === 0 && (
                        <p className="text-sm text-foreground/40 text-center py-4">No friends yet</p>
                      )}
                    </div>
                  </div>
                )}

                {/* AI Reports Tab */}
                {activeTab === "reports" && (
                  <div className="animate-slide-up">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold flex items-center gap-2"><span>🤖</span> AI Progress Reports</h2>
                      <button
                        onClick={() => handleGenerateReport(activeChild.id)}
                        className="btn-primary text-sm"
                        disabled={generatingReport}
                      >
                        {generatingReport ? "🔄 Generating..." : "✨ Generate New Report"}
                      </button>
                    </div>

                    <div className="space-y-4">
                      {activeChild.progressReports?.length > 0 ? activeChild.progressReports.map((report: any) => (
                        <div key={report.id} className="card">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-2 py-1 rounded-lg bg-primary-500/10 text-primary-500 text-xs font-bold uppercase">{report.period}</span>
                            <span className="text-xs text-foreground/40">{new Date(report.generatedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">{report.content}</div>
                          {report.interests && (
                            <div className="mt-4 pt-4 border-t border-[var(--card-border)]">
                              <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">Detected Interests</p>
                              <div className="flex flex-wrap gap-2">
                                {JSON.parse(report.interests).map((i: string) => (
                                  <span key={i} className="px-3 py-1 rounded-lg bg-info-500/10 text-info-500 text-sm">{i}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )) : (
                        <div className="card text-center py-12">
                          <div className="text-4xl mb-4">📊</div>
                          <p className="text-foreground/50">No reports yet. Generate one to see AI-powered insights!</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Screen Time Tab */}
                {activeTab === "screen-time" && (
                  <div className="animate-slide-up">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><span>⏱️</span> Screen Time</h2>

                    {/* Today's Usage */}
                    <div className={`card mb-6 ${isOverScreenLimit ? "border-accent-500" : ""}`}>
                      <h3 className="font-bold mb-3">Today&apos;s Usage</h3>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="xp-bar-track" style={{ height: 20 }}>
                            <div
                              className="xp-bar-fill"
                              style={{
                                width: `${Math.min(100, (screenTimeToday / (activeChild.screenTimeLimit || 120)) * 100)}%`,
                                background: isOverScreenLimit ? "linear-gradient(90deg, #f43f5e, #ef4444)" : undefined,
                              }}
                            />
                          </div>
                        </div>
                        <div className={`font-bold text-lg ${isOverScreenLimit ? "text-accent-500" : ""}`}>
                          {screenTimeToday} / {activeChild.screenTimeLimit} min
                        </div>
                      </div>
                      {isOverScreenLimit && (
                        <div className="mt-3 p-3 rounded-xl bg-accent-500/10 border border-accent-500/30">
                          <p className="text-sm text-accent-500 font-bold">🚨 Screen time limit exceeded!</p>
                          <p className="text-xs text-accent-500/70">Consider having {activeChild.name} take a break.</p>
                        </div>
                      )}
                    </div>

                    {/* Weekly History */}
                    <div className="card">
                      <h3 className="font-bold mb-4">📅 Weekly History</h3>
                      <div className="space-y-2">
                        {activeChild.screenTimeLogs?.map((log: any) => (
                          <div key={log.date} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)]">
                            <div className="font-medium text-sm w-24">{log.date}</div>
                            <div className="flex-1">
                              <div className="xp-bar-track" style={{ height: 8 }}>
                                <div
                                  className="xp-bar-fill"
                                  style={{
                                    width: `${Math.min(100, (log.minutes / (activeChild.screenTimeLimit || 120)) * 100)}%`,
                                    background: log.alertTriggered ? "linear-gradient(90deg, #f43f5e, #ef4444)" : undefined,
                                  }}
                                />
                              </div>
                            </div>
                            <div className={`text-sm font-medium w-16 text-right ${log.alertTriggered ? "text-accent-500" : ""}`}>
                              {log.minutes}m{log.alertTriggered ? " ⚠️" : ""}
                            </div>
                          </div>
                        )) || <p className="text-sm text-foreground/40">No screen time data yet</p>}
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-6xl mb-4">👶</div>
                <h2 className="text-xl font-bold mb-2">No children added yet</h2>
                <p className="text-foreground/50 mb-6">Add a child profile to get started!</p>
                <button onClick={() => setShowAddChild(true)} className="btn-primary">➕ Add Your First Child</button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
