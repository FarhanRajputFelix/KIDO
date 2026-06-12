"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { formatXP, xpProgress } from "@/lib/utils";

export default function KidDashboard() {
  const { status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [friendCode, setFriendCode] = useState("");
  const [friendStatus, setFriendStatus] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [joinCode, setJoinCode] = useState("");
  const [joinStatus, setJoinStatus] = useState("");
  const [showJoinClass, setShowJoinClass] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8F7FF" }}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🎮</div>
          <p className="font-bold" style={{ color: "#6C63FF" }}>Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const child = data?.child;
  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8F7FF" }}>
        <div className="card text-center max-w-sm">
          <div className="text-5xl mb-4">🧒</div>
          <p className="text-lg font-bold mb-2" style={{ color: "#1a1a2e" }}>Welcome to KIDO!</p>
          <p className="text-sm mb-4" style={{ color: "#777587" }}>Ask your parent to set up your profile</p>
          <Link href="/" className="btn-primary no-underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const progress = xpProgress(child.xp);
  const childBadges = JSON.parse(child.badges);
  const friends = data?.friendsProgress || [];

  const handleAddFriend = async () => {
    if (!friendCode) return;
    setFriendStatus("Sending...");
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromChildId: child.id, toChildId: friendCode.trim() })
      });
      if (res.ok) { setFriendStatus("Request sent! Ask your parent to approve it."); setFriendCode(""); setTimeout(() => setShowAddFriend(false), 3000); }
      else { const d = await res.json(); setFriendStatus(d.error || "Failed to add friend"); }
    } catch { setFriendStatus("Error adding friend."); }
  };

  const handleJoinClassroom = async () => {
    if (!joinCode) return;
    setJoinStatus("Joining...");
    try {
      const res = await fetch("/api/classrooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId: child.id, joinCode: joinCode.trim() })
      });
      const d = await res.json();
      if (res.ok) { setJoinStatus(d.message || "Request sent! A parent must approve before you join. 📚"); setJoinCode(""); setTimeout(() => setShowJoinClass(false), 4000); }
      else { setJoinStatus(d.error || "Failed to join classroom"); }
    } catch { setJoinStatus("Error joining classroom."); }
  };

  return (
    <div className="min-h-screen flex flex-col pb-20 md:pb-0" style={{ background: "#F8F7FF" }}>
      {/* Sticky top nav with primary navigation (no scrolling needed) */}
      <nav className="sticky top-0 z-30 flex items-center justify-between px-5 py-3 bg-white border-b border-[var(--card-border)]" style={{ boxShadow: "0 2px 8px rgba(108,99,255,0.06)" }}>
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white"
               style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)", boxShadow: "0 2px 0 #2d2b70" }}>K</div>
          <span className="text-xl font-black gradient-text">KIDO</span>
        </div>
        {/* Primary links — always visible on desktop */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { href: "/quiz", icon: "🎯", label: "Quizzes" },
            { href: "/chat", icon: "🤖", label: "AI Tutor" },
            { href: "/videos", icon: "📺", label: "Videos" },
            { href: "/games", icon: "🎮", label: "Games" },
            { href: "/messages", icon: "💬", label: "Messages" },
            { href: "/leaderboard", icon: "⭐", label: "Leaderboard" },
            { href: "/achievements", icon: "🏆", label: "Badges" },
          ].map(l => (
            <Link key={l.href} href={l.href}
              className="no-underline px-3 py-2 rounded-xl text-sm font-bold transition-all hover:bg-[#f0efff]"
              style={{ color: "#3F3D9E" }}>
              <span className="mr-1">{l.icon}</span>{l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="chip chip-gold animate-gold-pulse">🔥 {child.streak}</div>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary py-2 px-3 text-sm">🚪</button>
        </div>
      </nav>

      <main className="flex-1 px-5 py-5 overflow-y-auto">
        <div className="max-w-6xl mx-auto">

          {/* Stitch hero banner */}
          <div className="hero-banner mb-5 animate-slide-up">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="chip chip-gold mb-2" style={{ width: "fit-content" }}>LEVEL {child.level} EXPLORER</div>
                <h1 className="text-2xl font-black text-white mb-1">
                  Ready to learn today,<br />{child.name.split(" ")[0]}? 🚀
                </h1>
                <p className="text-white/70 text-sm">{child.grade} Grade · {child.age} years old</p>
              </div>
              <div className="text-5xl animate-float ml-4">{child.avatar}</div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs font-bold text-white/80 mb-1">
                <span>⚡ {formatXP(progress.current)} XP</span>
                <span>Next Level: {formatXP(progress.needed)} XP</span>
              </div>
              <div className="w-full h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${progress.percentage}%`, background: "#FFD700" }} />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { icon: "🎯", val: child.totalQuizzes, label: "Quizzes" },
              { icon: "🏅", val: childBadges.length, label: "Badges" },
              { icon: "🔥", val: child.streak, label: "Streak" },
              { icon: "👥", val: friends.length, label: "Friends" },
            ].map(s => (
              <div key={s.label} className="card text-center py-3" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
                <div className="text-xl">{s.icon}</div>
                <div className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>{s.val}</div>
                <div className="text-xs font-semibold" style={{ color: "#777587" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Daily challenge card */}
          <div className="challenge-card mb-5 flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <div className="flex-1">
              <div className="chip chip-gold mb-1" style={{ width: "fit-content", fontSize: "11px" }}>DAILY CHALLENGE</div>
              <p className="font-bold text-sm" style={{ color: "#1a1a2e" }}>Complete 3 quizzes today!</p>
            </div>
            <Link href="/quiz" className="btn-primary no-underline text-xs py-2 px-3">Start →</Link>
          </div>

          {/* Two-column layout on desktop, single column on mobile */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-6 lg:items-start">
          <div>
          {/* Subject cards */}
          <h3 className="font-extrabold text-base mb-3" style={{ color: "#1a1a2e" }}>Your Subjects 📚</h3>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { href: "/quiz", icon: "🧮", label: "Math", bg: "#fff0ef", iconBg: "#ffe4e1", pct: 40, color: "#6C63FF" },
              { href: "/chat", icon: "🤖", label: "Ask AI", bg: "#f0efff", iconBg: "#e8e5ff", pct: 0, color: "#6C63FF" },
              { href: "/videos", icon: "📺", label: "Videos", bg: "#eef6ff", iconBg: "#dbeafe", pct: 0, color: "#3b82f6" },
              { href: "/games", icon: "🎮", label: "Games", bg: "#f0fff4", iconBg: "#d1fae5", pct: 0, color: "#10b981" },
            ].map(s => (
              <Link key={s.label} href={s.href} className="subject-card no-underline" style={{ background: s.bg }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-2" style={{ background: s.iconBg }}>{s.icon}</div>
                <div className="font-bold text-sm mb-2" style={{ color: "#1a1a2e" }}>{s.label}</div>
                {s.pct > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full" style={{ background: "#e8e5ff" }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min(s.pct, 100)}%`, background: s.color }} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: s.color }}>{Math.min(s.pct, 100)}%</span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Badges section */}
          <div className="card mb-5" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2" style={{ color: "#1a1a2e" }}>
                🏅 My Badges
              </h3>
              <Link href="/achievements" className="chip chip-purple no-underline text-xs">View all →</Link>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: "first_quiz", icon: "🎯" },
                { id: "quiz_master", icon: "🏆" },
                { id: "perfect_score", icon: "💯" },
                { id: "streak_7", icon: "🔥" },
                { id: "streak_30", icon: "⚡" },
                { id: "level_5", icon: "⭐" },
                { id: "video_watcher", icon: "📺" },
                { id: "math_whiz", icon: "🧮" },
                { id: "social_star", icon: "🤝" },
                { id: "explorer", icon: "🔭" },
              ].map(b => (
                <div key={b.id} className={`badge ${!childBadges.includes(b.id) ? "badge-locked" : ""}`}
                     title={b.id} style={{ width: "100%", height: "52px", fontSize: "1.5rem" }}>
                  {b.icon}
                </div>
              ))}
            </div>
          </div>

          </div>{/* end left column */}
          <div>{/* right column */}

          {/* Classrooms + Friends */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 mb-5">
            {/* Classrooms */}
            <div className="card" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-sm" style={{ color: "#1a1a2e" }}>🏫 Classrooms</h3>
                <button onClick={() => setShowJoinClass(!showJoinClass)} className="chip chip-purple cursor-pointer text-xs">
                  {showJoinClass ? "Cancel" : "+ Join"}
                </button>
              </div>
              {showJoinClass && (
                <div className="mb-3 animate-slide-up">
                  {joinStatus && <div className={`text-xs font-bold mb-2 ${joinStatus.includes("Error") || joinStatus.includes("Failed") ? "text-red-500" : "text-green-600"}`}>{joinStatus}</div>}
                  <div className="flex gap-2">
                    <input className="input flex-1 py-2 text-sm font-mono uppercase" placeholder="Enter code e.g. AXB3R"
                      value={joinCode} onChange={e => setJoinCode(e.target.value.toUpperCase())} />
                    <button onClick={handleJoinClassroom} className="btn-primary py-2 px-3 text-xs">Join</button>
                  </div>
                </div>
              )}
              <p className="text-xs font-semibold" style={{ color: "#777587" }}>Get the code from your teacher!</p>
            </div>

            {/* Friends */}
            <div className="card" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-sm" style={{ color: "#1a1a2e" }}>👥 Friends</h3>
                <button onClick={() => setShowAddFriend(!showAddFriend)} className="chip chip-green cursor-pointer text-xs">
                  {showAddFriend ? "Cancel" : "+ Add"}
                </button>
              </div>
              {showAddFriend && (
                <div className="mb-3 animate-slide-up">
                  <p className="text-xs font-semibold mb-1" style={{ color: "#777587" }}>Your friend code:</p>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="flex-1 text-xs font-mono px-2 py-1.5 rounded-lg truncate" style={{ background: "#f0efff", color: "#6C63FF" }}>{child.id}</code>
                    <button onClick={() => { navigator.clipboard?.writeText(child.id); setFriendStatus("Copied your code!"); }} className="btn-secondary py-1.5 px-2 text-xs">📋</button>
                  </div>
                  {friendStatus && <div className={`text-xs font-bold mb-2 ${friendStatus.includes("Error") || friendStatus.includes("Failed") ? "text-red-500" : "text-green-600"}`}>{friendStatus}</div>}
                  <div className="flex gap-2">
                    <input className="input flex-1 py-2 text-sm" placeholder="Paste friend's code"
                      value={friendCode} onChange={e => setFriendCode(e.target.value)} />
                    <button onClick={handleAddFriend} className="btn-primary py-2 px-3 text-xs">Send</button>
                  </div>
                </div>
              )}
              {friends.length > 0 ? (
                <div className="space-y-2">
                  {friends.slice(0, 3).map((f: any) => (
                    <div key={f.id} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: "#f0efff" }}>
                      <span className="text-xl">{f.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm truncate" style={{ color: "#1a1a2e" }}>{f.name}</div>
                        <div className="text-xs font-semibold" style={{ color: "#777587" }}>Lvl {f.level} · 🔥{f.streak}</div>
                      </div>
                      <div className="text-xs font-bold" style={{ color: "#FFD700" }}>{formatXP(f.xp)} XP</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-2">
                  <div className="text-2xl mb-1">🤝</div>
                  <p className="text-xs font-semibold" style={{ color: "#777587" }}>No friends yet!</p>
                </div>
              )}
            </div>
          </div>

          {/* Pending friend requests (Facebook-style, awaiting parent approval) */}
          {((data?.incomingRequests?.length || 0) + (data?.outgoingRequests?.length || 0)) > 0 && (
            <div className="card mb-5" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
              <h3 className="font-extrabold text-base mb-3 flex items-center gap-2" style={{ color: "#1a1a2e" }}>
                ⏳ Friend Requests
              </h3>
              <div className="space-y-2">
                {data?.incomingRequests?.map((r: any) => (
                  <div key={r.id} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: "#fffbeb" }}>
                    <span className="text-xl">{r.fromChild?.avatar || "🙂"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: "#1a1a2e" }}>{r.fromChild?.name} wants to be your friend</div>
                      <div className="text-xs font-semibold" style={{ color: "#f59e0b" }}>Waiting for a parent to approve</div>
                    </div>
                    <span className="chip chip-gold text-xs">Incoming</span>
                  </div>
                ))}
                {data?.outgoingRequests?.map((r: any) => (
                  <div key={r.id} className="flex items-center gap-2 p-2 rounded-xl" style={{ background: "#f0efff" }}>
                    <span className="text-xl">{r.toChild?.avatar || "🙂"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: "#1a1a2e" }}>Request sent to {r.toChild?.name}</div>
                      <div className="text-xs font-semibold" style={{ color: "#777587" }}>Waiting for a parent to approve</div>
                    </div>
                    <span className="chip chip-purple text-xs">Sent</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Feed */}
          <div className="card mb-5" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
            <h3 className="font-extrabold text-base mb-3 flex items-center gap-2" style={{ color: "#1a1a2e" }}>
              📋 Recent Activity
            </h3>
            <div className="space-y-2">
              {child.activities?.length > 0 ? child.activities.slice(0, 6).map((a: any) => (
                <div key={a.id} className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: "#f8f7ff" }}>
                  <span className="text-xl">
                    {a.type === "quiz_completed" ? "🎯" : a.type === "badge_earned" ? "🏅" : a.type === "level_up" ? "⬆️" : a.type === "streak" ? "🔥" : "📝"}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm truncate" style={{ color: "#1a1a2e" }}>{a.title}</div>
                    {a.description && <div className="text-xs font-semibold" style={{ color: "#777587" }}>{a.description}</div>}
                  </div>
                  {a.xpEarned > 0 && <span className="chip chip-gold text-xs">+{a.xpEarned} XP</span>}
                </div>
              )) : (
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">🎮</div>
                  <p className="text-sm font-semibold" style={{ color: "#777587" }}>Start a quiz to see your activity!</p>
                </div>
              )}
            </div>
          </div>

          </div>{/* end right column */}
          </div>{/* end two-column layout */}

          {/* Bottom links */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Link href="/leaderboard" className="btn-primary no-underline text-sm">⭐ Leaderboard</Link>
            <Link href="/videos" className="btn-secondary no-underline text-sm">📺 Videos</Link>
            <Link href="/messages" className="btn-secondary no-underline text-sm">💬 Messages</Link>
            <Link href="/achievements" className="btn-secondary no-underline text-sm">🏆 Achievements</Link>
          </div>
        </div>
      </main>

      {/* Stitch bottom nav */}
      <nav className="bottom-nav justify-around">
        <Link href="/dashboard/kid" className="bottom-nav-item active no-underline">
          <div className="bottom-nav-icon">🏠</div><span>Home</span>
        </Link>
        <Link href="/chat" className="bottom-nav-item no-underline">
          <div className="bottom-nav-icon">💬</div><span>Chat</span>
        </Link>
        <Link href="/games" className="bottom-nav-item no-underline">
          <div className="bottom-nav-icon">🎮</div><span>Games</span>
        </Link>
        <Link href="/leaderboard" className="bottom-nav-item no-underline">
          <div className="bottom-nav-icon">⭐</div><span>Stars</span>
        </Link>
      </nav>
    </div>
  );
}
