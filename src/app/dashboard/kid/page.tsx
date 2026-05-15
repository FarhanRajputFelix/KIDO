"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { formatXP, xpProgress } from "@/lib/utils";

export default function KidDashboard() {
  const { status } = useSession();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Friend Request State
  const [friendCode, setFriendCode] = useState("");
  const [friendStatus, setFriendStatus] = useState("");
  const [showAddFriend, setShowAddFriend] = useState(false);

  // Classroom Join State
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-float">🎮</div>
          <p className="text-foreground/50 text-lg">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  const child = data?.child;
  if (!child) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-sm">
          <div className="text-5xl mb-4">🧒</div>
          <p className="text-lg font-semibold mb-4">Welcome to KIDO!</p>
          <p className="text-foreground/50 mb-4">Ask your parent to set up your profile</p>
          <Link href="/" className="btn-primary no-underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const progress = xpProgress(child.xp);
  const childBadges = JSON.parse(child.badges);
  const friends = data?.friendsProgress || [];
  const _screenTime = data?.todayScreenTime?.minutes || 0;

  const handleAddFriend = async () => {
    if (!friendCode) return;
    setFriendStatus("Sending...");
    try {
      const res = await fetch("/api/friends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromChildId: child.id, toChildId: friendCode.trim() })
      });
      if (res.ok) {
        setFriendStatus("Request sent! Ask your parent to approve it.");
        setFriendCode("");
        setTimeout(() => setShowAddFriend(false), 3000);
      } else {
        const d = await res.json();
        setFriendStatus(d.error || "Failed to add friend");
      }
    } catch {
      setFriendStatus("Error adding friend.");
    }
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
      if (res.ok) {
        setJoinStatus("Successfully joined classroom! 🎉");
        setJoinCode("");
        setTimeout(() => setShowJoinClass(false), 3000);
      } else {
        const d = await res.json();
        setJoinStatus(d.error || "Failed to join classroom");
      }
    } catch {
      setJoinStatus("Error joining classroom.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fun Top Navbar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold no-underline">
            <span className="text-xl">🧒</span>
            <span className="gradient-text">KIDO</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/chat" className="btn-primary py-2 px-4 text-sm no-underline">💬 Ask AI</Link>
          <Link href="/agents" className="btn-primary py-2 px-4 text-sm no-underline" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>🧠 AI Trace</Link>
          <Link href="/games" className="btn-accent py-2 px-4 text-sm no-underline">🎮 Games</Link>
          <Link href="/quiz" className="btn-secondary py-2 px-4 text-sm no-underline">🎯 Quiz</Link>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-secondary py-2 px-4 text-sm">🚪</button>
        </div>
      </nav>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          {/* Hero Header */}
          <div className="card card-glow mb-8 animate-slide-up">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="text-6xl animate-float">{child.avatar}</div>
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold mb-1">
                  Hey, <span className="gradient-text">{child.name}</span>! 🎉
                </h1>
                <p className="text-foreground/50">
                  Level {child.level} Explorer · {child.grade} Grade · {child.age} years old
                </p>
                <div className="mt-3 max-w-md mx-auto md:mx-0">
                  <div className="flex justify-between text-xs font-medium mb-1">
                    <span>Level {child.level}</span>
                    <span>{formatXP(progress.current)} / {formatXP(progress.needed)} XP</span>
                  </div>
                  <div className="xp-bar-track">
                    <div className="xp-bar-fill" style={{ width: `${progress.percentage}%` }} />
                  </div>
                </div>
              </div>

              {/* Streak + XP */}
              <div className="flex gap-4">
                <div className="text-center">
                  <div className="text-3xl animate-streak">🔥</div>
                  <div className="font-extrabold text-xl">{child.streak}</div>
                  <div className="text-xs text-foreground/50">day streak</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl">⭐</div>
                  <div className="font-extrabold text-xl text-xp">{formatXP(child.xp)}</div>
                  <div className="text-xs text-foreground/50">total XP</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-children">
            <Link href="/quiz" className="card text-center no-underline group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
              <div className="font-bold text-sm">Take a Quiz</div>
              <div className="text-xs text-foreground/50">Earn XP & badges</div>
            </Link>
            <Link href="/chat" className="card text-center no-underline group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🤖</div>
              <div className="font-bold text-sm">Chat with AI</div>
              <div className="text-xs text-foreground/50">Get help learning</div>
            </Link>
            <Link href="/games" className="card text-center no-underline group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎮</div>
              <div className="font-bold text-sm">Play Games</div>
              <div className="text-xs text-foreground/50">Learn while playing</div>
            </Link>
            <Link href="/explore" className="card text-center no-underline group">
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🔭</div>
              <div className="font-bold text-sm">Explore</div>
              <div className="text-xs text-foreground/50">Watch & discover</div>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats */}
            <div className="card">
              <h3 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">📊</span> My Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-[var(--background)] text-center">
                  <div className="font-bold text-lg text-primary-500">{child.totalQuizzes}</div>
                  <div className="text-xs text-foreground/50">Quizzes</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--background)] text-center">
                  <div className="font-bold text-lg text-primary-500">{childBadges.length}</div>
                  <div className="text-xs text-foreground/50">Badges</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--background)] text-center">
                  <div className="font-bold text-lg text-primary-500">{child.longestStreak}</div>
                  <div className="text-xs text-foreground/50">Best Streak</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--background)] text-center">
                  <div className="font-bold text-lg text-primary-500">{friends.length}</div>
                  <div className="text-xs text-foreground/50">Friends</div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="card">
              <h3 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">🏅</span> My Badges</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: "first_quiz", icon: "🎯" },
                  { id: "quiz_master", icon: "🏆" },
                  { id: "perfect_score", icon: "💯" },
                  { id: "streak_7", icon: "🔥" },
                  { id: "streak_30", icon: "⚡" },
                  { id: "level_5", icon: "⭐" },
                  { id: "video_watcher", icon: "📺" },
                  { id: "math_whiz", icon: "🧮" },
                ].map(b => (
                  <div key={b.id} className={`badge ${!childBadges.includes(b.id) ? "badge-locked" : ""}`} title={b.id}>
                    {b.icon}
                  </div>
                ))}
              </div>
              <Link href="/achievements" className="btn-secondary w-full mt-3 text-sm no-underline">View All →</Link>
            </div>

            {/* Classrooms */}
            <div className="card mb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2"><span className="text-xl">🏫</span> My Classrooms</h3>
                <button onClick={() => setShowJoinClass(!showJoinClass)} className="btn-primary py-1 px-3 text-xs bg-accent-500 hover:bg-accent-600">
                  {showJoinClass ? "Cancel" : "Join Code"}
                </button>
              </div>
              
              {showJoinClass && (
                <div className="mb-4 p-3 rounded-xl bg-[var(--background)] animate-slide-up border border-accent-500/20">
                  <p className="text-xs text-foreground/50 mb-2">Get your Join Code from your Teacher!</p>
                  {joinStatus && (
                    <div className={`text-xs font-bold mb-2 ${joinStatus.includes("Error") || joinStatus.includes("Failed") || joinStatus.includes("already") ? "text-accent-500" : "text-success-500"}`}>
                      {joinStatus}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input 
                      className="input flex-1 py-1.5 px-3 text-sm font-mono uppercase" 
                      placeholder="e.g. AXB3R" 
                      value={joinCode}
                      onChange={e => setJoinCode(e.target.value.toUpperCase())}
                    />
                    <button onClick={handleJoinClassroom} className="btn-primary py-1.5 px-3 text-xs bg-accent-500 hover:bg-accent-600">Join Room</button>
                  </div>
                </div>
              )}
            </div>

            {/* Friends */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2"><span className="text-xl">👥</span> Friends</h3>
                <button onClick={() => setShowAddFriend(!showAddFriend)} className="btn-primary py-1 px-3 text-xs">
                  {showAddFriend ? "Cancel" : "+ Add Friend"}
                </button>
              </div>

              {showAddFriend && (
                <div className="mb-4 p-3 rounded-xl bg-[var(--background)] animate-slide-up border border-primary-500/20">
                  <p className="text-xs text-foreground/50 mb-2">Your Friend Code: <strong className="text-foreground">{child.id}</strong></p>
                  {friendStatus && (
                    <div className={`text-xs font-bold mb-2 ${friendStatus.includes("Error") || friendStatus.includes("Failed") || friendStatus.includes("Cannot") ? "text-accent-500" : "text-success-500"}`}>
                      {friendStatus}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input 
                      className="input flex-1 py-1.5 px-3 text-sm" 
                      placeholder="Enter Friend's Code" 
                      value={friendCode}
                      onChange={e => setFriendCode(e.target.value)}
                    />
                    <button onClick={handleAddFriend} className="btn-primary py-1.5 px-3 text-xs">Send</button>
                  </div>
                </div>
              )}

              {friends.length > 0 ? (
                <div className="space-y-2">
                  {friends.map((f: any) => (
                    <div key={f.id} className="flex items-center gap-3 p-2 rounded-xl bg-[var(--background)]">
                      <span className="text-2xl">{f.avatar}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{f.name}</div>
                        <div className="text-xs text-foreground/50">Lvl {f.level} · 🔥{f.streak}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-xp">{formatXP(f.xp)} XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="text-3xl mb-2">🤝</div>
                  <p className="text-sm text-foreground/40">No friends yet. Ask your parent to help!</p>
                </div>
              )}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card mt-6">
            <h3 className="font-bold mb-4 flex items-center gap-2"><span className="text-xl">📋</span> Recent Activity</h3>
            <div className="space-y-2">
              {child.activities?.length > 0 ? child.activities.slice(0, 8).map((a: any) => (
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
              )) : (
                <p className="text-sm text-foreground/40 text-center py-4">Start a quiz to see your activity! 🎮</p>
              )}
            </div>
          </div>

          {/* Leaderboard Teaser */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/leaderboard" className="btn-primary no-underline">📊 View Leaderboard</Link>
            <Link href="/achievements" className="btn-secondary no-underline">🏆 All Achievements</Link>
            <Link href="/explore" className="btn-secondary no-underline">🔭 Explore Content</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
