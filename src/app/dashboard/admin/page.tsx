"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface AdminData {
  role: string;
  stats: {
    totalUsers: number;
    totalChildren: number;
    totalQuizzes: number;
    totalContent: number;
    totalTeachers: number;
    totalClassrooms: number;
  };
  recentUsers: Array<{ id: string; name: string; email: string; role: string; avatar?: string; createdAt: string }>;
  teachers: Array<{ id: string; name: string; email: string; avatar?: string }>;
  classrooms: Array<{ id: string; name: string; subject?: string; joinCode: string; grade?: string; teacher: { name: string } }>;
  topStudents: Array<{ id: string; name: string; avatar?: string; xp: number; level: number; streak: number; totalQuizzes: number; parent: { name: string; email: string } }>;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => { setData(d); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">⚙️</div>
          <p className="text-foreground/50">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold no-underline">
            <span className="text-xl">🧒</span>
            <span className="gradient-text">KIDO</span>
          </Link>
          <span className="px-2 py-1 rounded-lg bg-accent-500/10 text-accent-500 text-xs font-bold uppercase">Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-foreground/50 hidden md:inline">{session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary py-2 px-4 text-sm">Logout</button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sidebar hidden md:flex">
          <h3 className="text-xs uppercase tracking-wider text-sidebar-text/50 mb-3 px-4">Admin Panel</h3>
          {[
            { id: "overview", icon: "📊", label: "Overview" },
            { id: "teachers", icon: "👨‍🏫", label: "Teachers" },
            { id: "students", icon: "🧒", label: "Students" },
            { id: "classrooms", icon: "🏫", label: "Classrooms" },
            { id: "quizzes", icon: "🎯", label: "Quizzes" },
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto" style={{ maxHeight: "calc(100vh - var(--nav-height))" }}>
          <div className="max-w-6xl mx-auto">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">🛡️ Admin Overview</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8 stagger-children">
                  {[
                    { label: "Total Users", value: data.stats.totalUsers, icon: "👤", color: "#8b5cf6" },
                    { label: "Students", value: data.stats.totalChildren, icon: "🧒", color: "#10b981" },
                    { label: "Teachers", value: data.stats.totalTeachers, icon: "👨‍🏫", color: "#f59e0b" },
                    { label: "Classrooms", value: data.stats.totalClassrooms, icon: "🏫", color: "#3b82f6" },
                    { label: "Quizzes", value: data.stats.totalQuizzes, icon: "🎯", color: "#f43f5e" },
                    { label: "Content Items", value: data.stats.totalContent, icon: "📚", color: "#14b8a6" },
                  ].map(s => (
                    <div key={s.label} className="card text-center" style={{ borderTop: `3px solid ${s.color}` }}>
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="stat-value">{s.value}</div>
                      <div className="text-sm text-foreground/50 mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Users */}
                <div className="card">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <span className="text-xl">🕐</span> Recent Users
                  </h3>
                  <div className="space-y-2">
                    {data.recentUsers.map(u => (
                      <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)]">
                        <span className="text-2xl">{u.avatar || "👤"}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{u.name}</div>
                          <div className="text-xs text-foreground/50">{u.email}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                          u.role === "admin" ? "bg-accent-500/10 text-accent-500" :
                          u.role === "teacher" ? "bg-warning-500/10 text-warning-500" :
                          u.role === "parent" ? "bg-primary-500/10 text-primary-500" :
                          "bg-success-500/10 text-success-500"
                        }`}>
                          {u.role}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Teachers Tab */}
            {activeTab === "teachers" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">👨‍🏫 Teachers ({data.teachers.length})</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.teachers.map(t => (
                    <div key={t.id} className="card flex items-center gap-4">
                      <span className="text-3xl">{t.avatar || "👨‍🏫"}</span>
                      <div>
                        <div className="font-bold">{t.name}</div>
                        <div className="text-sm text-foreground/50">{t.email}</div>
                      </div>
                    </div>
                  ))}
                  {data.teachers.length === 0 && (
                    <p className="text-foreground/40 text-center py-8 col-span-2">No teachers registered yet</p>
                  )}
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">🧒 Top Students</h1>
                <div className="space-y-3">
                  {data.topStudents.map((s, i) => (
                    <div key={s.id} className="card flex items-center gap-4">
                      <div className="text-xl font-bold text-foreground/30 w-8 text-center">#{i + 1}</div>
                      <span className="text-3xl">{s.avatar || "🧒"}</span>
                      <div className="flex-1">
                        <div className="font-bold">{s.name}</div>
                        <div className="text-xs text-foreground/50">Parent: {s.parent.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary-500">Lvl {s.level}</div>
                        <div className="text-xs text-foreground/50">{s.xp} XP · {s.totalQuizzes} quizzes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Classrooms Tab */}
            {activeTab === "classrooms" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">🏫 Classrooms ({data.classrooms.length})</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.classrooms.map(c => (
                    <div key={c.id} className="card">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{c.name}</h3>
                        <span className="px-2 py-1 rounded-lg bg-primary-500/10 text-primary-500 text-xs font-mono">{c.joinCode}</span>
                      </div>
                      <div className="text-sm text-foreground/50">
                        <p>Teacher: {c.teacher.name}</p>
                        {c.subject && <p>Subject: {c.subject}</p>}
                        {c.grade && <p>Grade: {c.grade}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quizzes Tab */}
            {activeTab === "quizzes" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">🎯 Quiz Management</h1>
                <div className="card text-center py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <p className="text-foreground/50 mb-4">Total quizzes in the system: <strong>{data.stats.totalQuizzes}</strong></p>
                  <p className="text-sm text-foreground/40">AI-generated quizzes are personalized per student</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
