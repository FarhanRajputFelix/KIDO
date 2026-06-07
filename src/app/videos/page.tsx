"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Curated, real, kid-safe educational YouTube videos (Crash Course Kids etc.)
interface Video {
  id: string;          // YouTube video ID
  title: string;
  description: string;
  subject: string;
  duration: string;
  xp: number;
}

const VIDEOS: Video[] = [
  { id: "7vTfyAMu6G4", title: "Land and Water", description: "How water shapes the land around us.", subject: "Science", duration: "4m", xp: 15 },
  { id: "EstPeBt9CyU", title: "How Plants Grow & Make Food", description: "Vegetation transformation and photosynthesis for kids.", subject: "Science", duration: "5m", xp: 15 },
  { id: "6FB0rDsR_rc", title: "Here Comes the Sun", description: "The Sun at the center of our solar system.", subject: "Geography", duration: "4m", xp: 15 },
  { id: "Dvhl891zGqU", title: "Weather in Space (Rocky Planets)", description: "Do other planets have weather? Let's find out!", subject: "Geography", duration: "5m", xp: 15 },
  { id: "WoPtsnIcSv8", title: "Gas Giants & Their Weather", description: "Wild storms on the giant planets.", subject: "Geography", duration: "4m", xp: 15 },
  { id: "sQK3Yr4Sc_k", title: "Photosynthesis Explained", description: "How plants turn sunlight into energy.", subject: "Science", duration: "13m", xp: 25 },
];

const CATEGORIES = ["All", ...Array.from(new Set(VIDEOS.map(v => v.subject)))];

const SUBJECT_ICON: Record<string, string> = {
  Science: "🔬", Geography: "🌍", Math: "🔢", History: "🏛️", Art: "🎨", Music: "🎵", English: "📚", Coding: "💻",
};

export default function VideosPage() {
  const { status } = useSession();
  const [childId, setChildId] = useState<string | null>(null);
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState<Video | null>(null);
  const [watched, setWatched] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) setChildId(child.id);
        });
    }
  }, [status]);

  const filtered = category === "All" ? VIDEOS : VIDEOS.filter(v => v.subject === category);

  const awardXp = async (v: Video) => {
    if (!childId || watched[v.id]) return;
    setWatched(prev => ({ ...prev, [v.id]: true }));
    try {
      const res = await fetch("/api/videos/watch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, videoId: v.id, title: v.title, xp: v.xp }),
      });
      const data = await res.json();
      if (data.xpEarned > 0) {
        setToast(`🎉 +${data.xpEarned} XP${data.leveledUp ? " — Level up!" : ""}`);
        setTimeout(() => setToast(""), 3000);
      }
    } catch { /* ignore */ }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F7FF" }}>
      <nav className="flex items-center justify-between px-5 py-4 bg-white border-b border-[var(--card-border)]">
        <Link href="/dashboard" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white" style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)" }}>K</div>
          <span className="text-xl font-black gradient-text">KIDO</span>
        </Link>
        <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Back</Link>
      </nav>

      <main className="flex-1 p-5 md:p-8 max-w-5xl mx-auto w-full">
        <div className="mb-5">
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2" style={{ color: "#1a1a2e" }}>▶️ Video Library</h1>
          <p className="text-sm font-semibold" style={{ color: "#777587" }}>Safe, educational videos just for you</p>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className="chip cursor-pointer text-sm"
              style={{
                background: category === c ? "#6C63FF" : "#fff",
                color: category === c ? "#fff" : "#1a1a2e",
                border: "1px solid #e8e5ff",
              }}>
              {c === "All" ? "All" : `${SUBJECT_ICON[c] || "📘"} ${c}`}
            </button>
          ))}
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(v => (
            <div key={v.id} onClick={() => setActive(v)} className="card cursor-pointer p-0 overflow-hidden group" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
              <div className="relative">
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} className="w-full h-40 object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: "rgba(255,255,255,0.9)" }}>▶️</div>
                </div>
                <span className="absolute top-2 right-2 chip chip-gold text-xs">+{v.xp} XP</span>
                {watched[v.id] && <span className="absolute top-2 left-2 chip chip-green text-xs">✓ Watched</span>}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <span>{SUBJECT_ICON[v.subject] || "📘"}</span>
                  <h3 className="font-bold text-sm" style={{ color: "#1a1a2e" }}>{v.title}</h3>
                </div>
                <p className="text-xs mb-2" style={{ color: "#777587" }}>{v.description}</p>
                <div className="text-xs font-semibold" style={{ color: "#aaa" }}>🕐 {v.duration}</div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Player modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setActive(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-4 py-3">
              <h2 className="font-bold" style={{ color: "#1a1a2e" }}>{active.title}</h2>
              <button onClick={() => setActive(null)} className="text-xl" style={{ background: "transparent", border: "none", cursor: "pointer" }}>✕</button>
            </div>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0&modestbranding=1`}
                title={active.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => awardXp(active)}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <p className="text-sm" style={{ color: "#777587" }}>{active.description}</p>
              <span className="chip chip-gold text-xs shrink-0">+{active.xp} XP</span>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-2xl font-bold text-white animate-slide-up" style={{ background: "#10b981", boxShadow: "0 6px 20px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
