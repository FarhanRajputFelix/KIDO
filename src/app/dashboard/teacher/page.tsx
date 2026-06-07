"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

interface Student {
  id: string;
  name: string;
  avatar: string;
  age: number;
  grade: string;
  xp: number;
  level: number;
  streak: number;
  totalQuizzes: number;
  strongSubjects: string;
  weakSubjects: string;
  parent: { name: string; email: string };
  quizAttempts: Array<{ score: number; totalQuestions: number; difficulty: string; quiz: { title: string; subject: string } }>;
}

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [generateFeedback, setGenerateFeedback] = useState("");
  const [quizSubject, setQuizSubject] = useState("math");

  // Classroom Management
  const [newClassroomName, setNewClassroomName] = useState("");
  const [newClassroomSubject, setNewClassroomSubject] = useState("");
  const [creatingClassroom, setCreatingClassroom] = useState(false);
  const [classroomFeedback, setClassroomFeedback] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => { setData(d); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [status]);

  const handleGenerateQuiz = async (childId: string) => {
    setGeneratingQuiz(true);
    setGenerateFeedback("");
    try {
      const res = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, subject: quizSubject }),
      });
      if (res.ok) {
        const data = await res.json();
        setGenerateFeedback(`Success! Quiz "${data.quiz?.title || "New Quiz"}" generated for the student. 🎯`);
      } else {
        setGenerateFeedback("Failed to generate quiz. ❌");
      }
    } catch {
      setGenerateFeedback("Error generating quiz. ❌");
    }
    setGeneratingQuiz(false);
  };

  const handleCreateClassroom = async () => {
    if (!newClassroomName) return;
    setCreatingClassroom(true);
    setClassroomFeedback("");
    try {
      const res = await fetch("/api/classrooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newClassroomName, subject: newClassroomSubject, grade: "All Grades" })
      });
      if (res.ok) {
        setClassroomFeedback("Classroom created successfully!");
        setNewClassroomName("");
        setNewClassroomSubject("");
        window.location.reload();
      } else {
        setClassroomFeedback("Failed to create classroom.");
      }
    } catch {
      setClassroomFeedback("Error creating classroom.");
    }
    setCreatingClassroom(false);
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">👨‍🏫</div>
          <p className="text-foreground/50">Loading teacher dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;
  const _activeStudent: Student | undefined = data.students?.find((s: Student) => s.id === selectedStudent);

  const SUBJECTS = [
    { id: "math", name: "Math", icon: "🧮", color: "#6366f1" },
    { id: "science", name: "Science", icon: "🔬", color: "#10b981" },
    { id: "english", name: "English", icon: "📚", color: "#f59e0b" },
    { id: "history", name: "History", icon: "🏛️", color: "#ef4444" },
    { id: "geography", name: "Geography", icon: "🌍", color: "#3b82f6" },
    { id: "coding", name: "Coding", icon: "💻", color: "#8b5cf6" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F7FF" }}>
      {/* Stitch Top Navbar */}
      <nav className="flex items-center justify-between px-5 py-4 bg-white border-b border-[var(--card-border)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white"
               style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)", boxShadow: "0 2px 0 #2d2b70" }}>K</div>
          <span className="text-xl font-black gradient-text">KIDO</span>
          <span className="chip chip-gold">Teacher</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold hidden md:inline" style={{ color: "#777587" }}>{session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary py-2 px-4 text-sm">Logout</button>
        </div>
      </nav>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="sidebar hidden md:flex">
          <h3 className="text-xs uppercase tracking-wider text-sidebar-text/50 mb-3 px-4">Navigation</h3>
          {[
            { id: "overview", icon: "📊", label: "Overview" },
            { id: "students", icon: "🧒", label: `Students (${data.students?.length || 0})` },
            { id: "classrooms", icon: "🏫", label: `Classrooms (${data.classrooms?.length || 0})` },
            { id: "generate", icon: "🤖", label: "AI Quiz Generator" },
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
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="animate-slide-up">
                
                {/* Teacher Profile Display */}
                <div className="flex items-center gap-6 mb-8 p-6 card card-glow rounded-2xl">
                  <div className="text-6xl bg-primary-500/10 p-5 rounded-full border-4 border-primary-500/20">👨‍🏫</div>
                  <div>
                    <h2 className="text-3xl font-extrabold mb-1">
                      <span className="gradient-text">{session?.user?.name || "Teacher Profile"}</span>
                    </h2>
                    <p className="text-foreground/50 font-medium">KIDO Certified Educator</p>
                    <p className="mt-2 text-sm font-mono opacity-60 bg-foreground/5 inline-block px-2 py-1 rounded">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 stagger-children">
                  <div className="card text-center" style={{ borderTop: "3px solid #10b981" }}>
                    <div className="stat-value">{data.stats?.totalStudents || 0}</div>
                    <div className="text-sm text-foreground/50 mt-1">Total Students</div>
                  </div>
                  <div className="card text-center" style={{ borderTop: "3px solid #8b5cf6" }}>
                    <div className="stat-value">{data.stats?.totalClassrooms || 0}</div>
                    <div className="text-sm text-foreground/50 mt-1">Classrooms</div>
                  </div>
                  <div className="card text-center" style={{ borderTop: "3px solid #f59e0b" }}>
                    <div className="stat-value">{data.stats?.avgScore || 0}%</div>
                    <div className="text-sm text-foreground/50 mt-1">Avg Score</div>
                  </div>
                </div>

                {/* Subject Performance */}
                {data.subjectStats && Object.keys(data.subjectStats).length > 0 && (
                  <div className="card mb-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">📈</span> Subject Performance (Class Average)</h3>
                    <div className="space-y-3">
                      {Object.entries(data.subjectStats).map(([subject, stats]: [string, any]) => {
                        const avg = Math.round((stats.correct / Math.max(1, stats.total)) * 100);
                        const subjectInfo = SUBJECTS.find(s => s.id === subject);
                        return (
                          <div key={subject} className="flex items-center gap-3">
                            <span className="text-xl w-8">{subjectInfo?.icon || "📝"}</span>
                            <div className="w-24 font-medium text-sm capitalize">{subject}</div>
                            <div className="flex-1">
                              <div className="xp-bar-track" style={{ height: 10 }}>
                                <div className="xp-bar-fill" style={{ width: `${avg}%`, background: `linear-gradient(90deg, ${subjectInfo?.color || "#8b5cf6"}, ${subjectInfo?.color || "#8b5cf6"}88)` }} />
                              </div>
                            </div>
                            <div className={`font-bold text-sm w-12 text-right ${avg >= 80 ? "text-success-500" : avg >= 60 ? "text-warning-500" : "text-accent-500"}`}>
                              {avg}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">🧒 Student Progress</h1>
                <div className="space-y-3">
                  {data.students?.map((s: Student) => {
                    const strong = JSON.parse(s.strongSubjects);
                    const weak = JSON.parse(s.weakSubjects);
                    return (
                      <div key={s.id} className="card cursor-pointer" onClick={() => { setSelectedStudent(s.id === selectedStudent ? null : s.id); }}>
                        <div className="flex items-center gap-4">
                          <span className="text-3xl">{s.avatar}</span>
                          <div className="flex-1">
                            <div className="font-bold">{s.name}</div>
                            <div className="text-xs text-foreground/50">{s.grade} Grade · Age {s.age} · Parent: {s.parent.name}</div>
                          </div>
                          <div className="text-right hidden md:block">
                            <div className="font-bold text-primary-500">Lvl {s.level}</div>
                            <div className="text-xs text-foreground/50">{s.xp} XP · 🔥{s.streak}</div>
                          </div>
                        </div>

                        {selectedStudent === s.id && (
                          <div className="mt-4 pt-4 border-t border-[var(--card-border)] animate-slide-up">
                            <div className="grid grid-cols-2 gap-4 mb-4">
                              <div>
                                <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">💪 Strong Subjects</p>
                                <div className="flex flex-wrap gap-1">
                                  {strong.length > 0 ? strong.map((s: string) => (
                                    <span key={s} className="px-2 py-1 rounded-lg bg-success-500/10 text-success-500 text-xs capitalize">{s}</span>
                                  )) : <span className="text-xs text-foreground/40">Determining...</span>}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-foreground/50 mb-2 uppercase tracking-wider">📈 Needs Help</p>
                                <div className="flex flex-wrap gap-1">
                                  {weak.length > 0 ? weak.map((s: string) => (
                                    <span key={s} className="px-2 py-1 rounded-lg bg-warning-500/10 text-warning-500 text-xs capitalize">{s}</span>
                                  )) : <span className="text-xs text-foreground/40">All good!</span>}
                                </div>
                              </div>
                            </div>

                            <h4 className="font-medium text-sm mb-2">Recent Quizzes</h4>
                            <div className="space-y-1">
                              {s.quizAttempts.map((a, i) => (
                                <div key={i} className="flex items-center gap-2 text-xs p-2 rounded-lg bg-[var(--background)]">
                                  <span>{a.quiz.subject === "math" ? "🧮" : a.quiz.subject === "science" ? "🔬" : "📝"}</span>
                                  <span className="flex-1">{a.quiz.title}</span>
                                  <span className={`font-bold ${(a.score / a.totalQuestions) >= 0.8 ? "text-success-500" : (a.score / a.totalQuestions) >= 0.6 ? "text-warning-500" : "text-accent-500"}`}>
                                    {a.score}/{a.totalQuestions}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {(!data.students || data.students.length === 0) && (
                    <div className="card text-center py-12">
                      <div className="text-4xl mb-4">🏫</div>
                      <p className="text-foreground/50">No students in your classrooms yet</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Classrooms Tab */}
            {activeTab === "classrooms" && (
              <div className="animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold">🏫 My Classrooms</h1>
                </div>

                <div className="card mb-8">
                  <h3 className="font-bold mb-4">＋ Create New Classroom</h3>
                  {classroomFeedback && (
                    <div className={`mb-4 p-3 rounded-lg text-sm font-bold border ${classroomFeedback.includes("Error") || classroomFeedback.includes("Failed") ? "bg-accent-500/10 text-accent-500 border-accent-500/20" : "bg-primary-500/10 text-primary-500 border-primary-500/20"}`}>
                      {classroomFeedback}
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row gap-3">
                    <input 
                      placeholder="Classroom Name (e.g. Mrs. Smith 3rd Grade)" 
                      className="input flex-1" 
                      value={newClassroomName} 
                      onChange={e => setNewClassroomName(e.target.value)} 
                    />
                    <input 
                      placeholder="Subject (e.g. Science)" 
                      className="input flex-1" 
                      value={newClassroomSubject} 
                      onChange={e => setNewClassroomSubject(e.target.value)} 
                    />
                    <button 
                      className="btn-primary flex-shrink-0" 
                      onClick={handleCreateClassroom} 
                      disabled={creatingClassroom || !newClassroomName}
                    >
                      {creatingClassroom ? "Creating..." : "Create Class"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.classrooms?.map((c: any) => {
                    const enrolled = (() => { try { return JSON.parse(c.studentIds).length; } catch { return 0; } })();
                    const pending = (() => { try { return JSON.parse(c.pendingStudentIds || "[]").length; } catch { return 0; } })();
                    return (
                    <div key={c.id} className="card">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-lg">{c.name}</h3>
                      </div>
                      {/* Share code */}
                      <div className="mb-3 p-3 rounded-xl" style={{ background: "rgba(139,92,246,0.08)" }}>
                        <div className="text-xs text-foreground/50 mb-1">Share this join code with students:</div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-mono font-bold tracking-widest text-primary-500">{c.joinCode}</span>
                          <button
                            onClick={() => { navigator.clipboard?.writeText(c.joinCode); setClassroomFeedback(`Copied code ${c.joinCode}!`); }}
                            className="btn-secondary py-1 px-2 text-xs ml-auto"
                          >📋 Copy</button>
                        </div>
                      </div>
                      <div className="text-sm text-foreground/50 space-y-1">
                        {c.subject && <p>📚 Subject: {c.subject}</p>}
                        {c.grade && <p>🎓 Grade: {c.grade}</p>}
                        <p>👨‍🎓 Enrolled: {enrolled}</p>
                        {pending > 0 && <p style={{ color: "#f59e0b" }}>⏳ Awaiting parent approval: {pending}</p>}
                        <p>📋 Lessons: {c.lessons?.length || 0}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* AI Quiz Generator */}
            {activeTab === "generate" && (
              <div className="animate-slide-up">
                <h1 className="text-2xl font-bold mb-6">🤖 AI Quiz Generator</h1>
                <p className="text-foreground/50 mb-6">Select a student and subject to generate a personalized AI quiz based on their age, grade, and learning profile.</p>

                <div className="card mb-6">
                  <h3 className="font-bold mb-4">Select Subject</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {SUBJECTS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setQuizSubject(s.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all"
                        style={{
                          background: quizSubject === s.id ? `${s.color}20` : "var(--card)",
                          color: quizSubject === s.id ? s.color : "var(--foreground)",
                          border: `1.5px solid ${quizSubject === s.id ? s.color : "var(--card-border)"}`,
                        }}
                      >
                        <span>{s.icon}</span> {s.name}
                      </button>
                    ))}
                  </div>

                  <h3 className="font-bold mb-4">Select Student</h3>
                  {generateFeedback && (
                    <div className="mb-4 p-3 rounded-lg text-sm font-bold bg-primary-500/10 text-primary-500 border border-primary-500/20">
                      {generateFeedback}
                    </div>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.students?.map((s: Student) => (
                      <button
                        key={s.id}
                        onClick={() => handleGenerateQuiz(s.id)}
                        disabled={generatingQuiz}
                        className="card flex items-center gap-3 text-left cursor-pointer hover:border-primary-500 transition-all"
                        style={{ border: "1px solid var(--card-border)" }}
                      >
                        <span className="text-2xl">{s.avatar}</span>
                        <div className="flex-1">
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-foreground/50">{s.grade} · Age {s.age} · Lvl {s.level}</div>
                        </div>
                        <span className="btn-primary py-1.5 px-3 text-xs">
                          {generatingQuiz ? "..." : "✨ Generate"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
