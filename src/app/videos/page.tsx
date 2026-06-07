"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Curated, real, kid-safe educational YouTube videos with age ranges.
// Each child only sees videos appropriate for their age (the safety layer).
interface Video {
  id: string;
  title: string;
  description: string;
  subject: string;
  duration: string;
  xp: number;
  ageMin: number;
  ageMax: number;
}

const VIDEOS: Video[] = [
  // ── Younger learners (6–11) ──
  { id: "7vTfyAMu6G4", title: "Land and Water", description: "How water shapes the land around us.", subject: "Science", duration: "4m", xp: 15, ageMin: 6, ageMax: 11 },
  { id: "EstPeBt9CyU", title: "How Plants Grow & Make Food", description: "Photosynthesis for kids.", subject: "Science", duration: "5m", xp: 15, ageMin: 6, ageMax: 11 },
  { id: "6FB0rDsR_rc", title: "Here Comes the Sun", description: "The Sun at the center of our solar system.", subject: "Geography", duration: "4m", xp: 15, ageMin: 6, ageMax: 11 },
  { id: "Dvhl891zGqU", title: "Weather in Space (Rocky Planets)", description: "Do other planets have weather?", subject: "Geography", duration: "5m", xp: 15, ageMin: 6, ageMax: 11 },
  { id: "WoPtsnIcSv8", title: "Gas Giants & Their Weather", description: "Wild storms on the giant planets.", subject: "Geography", duration: "4m", xp: 15, ageMin: 7, ageMax: 12 },
  // ── Teens / older grades (12–18) ──
  { id: "sQK3Yr4Sc_k", title: "Photosynthesis (Biology)", description: "How plants turn sunlight into energy — deeper dive.", subject: "Science", duration: "13m", xp: 25, ageMin: 12, ageMax: 18 },
  { id: "FSyAehMdpyI", title: "The Nucleus — Chemistry #1", description: "Atoms, the nucleus, and why chemistry is amazing.", subject: "Science", duration: "12m", xp: 25, ageMin: 13, ageMax: 18 },
  { id: "PmvLB5dIEp8", title: "What Is Organic Chemistry?", description: "Intro to organic chemistry for high-schoolers.", subject: "Science", duration: "12m", xp: 30, ageMin: 14, ageMax: 18 },
  { id: "Yocja_N5s1I", title: "The Agricultural Revolution", description: "How humans went from hunting to farming.", subject: "History", duration: "11m", xp: 25, ageMin: 12, ageMax: 18 },
  { id: "O5nskjZ_GoI", title: "Early Computing — CS #1", description: "Where computers came from.", subject: "Coding", duration: "12m", xp: 25, ageMin: 12, ageMax: 18 },
];

const SUBJECT_ICON: Record<string, string> = {
  Science: "🔬", Geography: "🌍", Math: "🔢", History: "🏛️", Art: "🎨", Music: "🎵", English: "📚", Coding: "💻",
};

export default function VideosPage() {
  const { status } = useSession();
  const [childId, setChildId] = useState<string | null>(null);
  const [childAge, setChildAge] = useState<number | null>(null);
  const [childName, setChildName] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState<Video | null>(null);
  const [watched, setWatched] = useState<Record<string, boolean>>({});
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) { setChildId(child.id); setChildAge(child.age ?? null); setChildName(child.name || ""); }
        });
    }
  }, [status]);

  // Age-appropriate videos only (the safety/age-restriction layer).
  const ageOk = (v: Video) => childAge == null || (childAge >= v.ageMin && childAge <= v.ageMax);
  const ageVideos = VIDEOS.filter(ageOk);

  const categories = ["All", ...Array.from(new Set(ageVideos.map(v => v.subject)))];

  const filtered = ageVideos.filter(v => {
    const inCat = category === "All" || v.subject === category;
    const q = search.trim().toLowerCase();
    const inSearch = !q || v.title.toLowerCase().includes(q) || v.description.toLowerCase().includes(q) || v.subject.toLowerCase().includes(q);
    return inCat && inSearch;
  });

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

      <main className="flex-1 p-5 md:p-8 max-w-6xl mx-auto w-full">
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-2" style={{ color: "#1a1a2e" }}>▶️ Video Library</h1>
          <p className="text-sm font-semibold" style={{ color: "#777587" }}>
            Safe, educational videos{childAge != null ? ` picked for age ${childAge}` : ""} 🛡️
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-4">
          <input
            className="input"
            placeholder="🔍 Search videos (e.g. chemistry, planets, history)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(c => (
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
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-5xl mb-3">🔍</div>
            <p className="font-semibold" style={{ color: "#777587" }}>No videos match your search.</p>
          </div>
        ) : (
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
                  <div className="text-xs font-semibold" style={{ color: "#aaa" }}>🕐 {v.duration} · Ages {v.ageMin}–{v.ageMax}</div>
                </div>
              </div>
            ))}
          </div>
        )}
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
