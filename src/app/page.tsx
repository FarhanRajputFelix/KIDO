import Link from "next/link";
import GuestButton from "@/components/GuestButton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: "#F8F7FF" }}>
      {/* ─── Navbar ─────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-[var(--card-border)] bg-white">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black"
               style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)", boxShadow: "0 3px 0 #2d2b70" }}>
            K
          </div>
          <span className="gradient-text text-xl">KIDO</span>
        </Link>
        <div className="flex items-center gap-3">
          <GuestButton className="hidden sm:inline-flex btn-secondary text-sm py-2 px-5" label="👀 Explore as Guest" />
          <Link href="/login" className="btn-secondary text-sm py-2 px-5 no-underline">Log In</Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-5 no-underline">Get Started 🚀</Link>
        </div>
      </nav>

      {/* ─── Hero ───────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center px-5 md:px-12 py-12 md:py-20">
        {/* Hero banner - matches Stitch "Ready to learn today?" card */}
        <div className="hero-banner w-full max-w-2xl mb-10 animate-slide-up text-center">
          <div className="chip chip-gold mb-4 mx-auto" style={{ width: "fit-content" }}>
            🔥 AI-Powered Learning for Kids
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
            Where Learning<br />
            <span style={{ color: "#FFD700" }}>Becomes an Adventure</span>
          </h1>
          <p className="text-white/75 text-lg mb-8 max-w-lg mx-auto">
            Adaptive quizzes, XP rewards, streaks, badges, and friendly challenges
            keep children engaged and growing every day.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="btn-gold text-base py-3.5 px-8 no-underline">
              🚀 Start Free Today
            </Link>
            <GuestButton
              className="glass text-white border border-white/30 rounded-2xl py-3.5 px-8 font-bold text-base hover:bg-white/20 transition-all cursor-pointer"
              label="👀 Explore as Guest — no signup"
            />
          </div>
          <p className="text-white/60 text-xs mt-3">Jump straight into a live demo — no account needed.</p>
          {/* Decorative robot */}
          <div className="text-6xl mt-8 animate-float">🤖</div>
        </div>

        {/* ─── Subject Cards - Stitch Style ───────── */}
        <div className="w-full max-w-2xl mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-extrabold" style={{ color: "#1a1a2e" }}>Your Subjects</h2>
            <span className="text-sm font-semibold" style={{ color: "#6C63FF" }}>8 Available</span>
          </div>
          <div className="grid grid-cols-2 gap-4 stagger-children">
            {[
              { icon: "🧮", name: "Math", bg: "#fff0ef", iconBg: "#ffe4e1", pct: 40, color: "#6C63FF" },
              { icon: "🔬", name: "Science", bg: "#f0fff4", iconBg: "#d1fae5", pct: 20, color: "#10b981" },
              { icon: "📚", name: "English", bg: "#fffbeb", iconBg: "#fef3c7", pct: 60, color: "#f59e0b" },
              { icon: "🎨", name: "Art", bg: "#fff0f8", iconBg: "#fce7f3", pct: 10, color: "#ec4899" },
            ].map(s => (
              <div key={s.name} className="subject-card" style={{ background: s.bg }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-3"
                     style={{ background: s.iconBg }}>
                  {s.icon}
                </div>
                <div className="font-bold text-base mb-3" style={{ color: "#1a1a2e" }}>{s.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2.5 rounded-full" style={{ background: "#e8e5ff" }}>
                    <div className="h-full rounded-full transition-all"
                         style={{ width: `${s.pct}%`, background: s.color }}></div>
                  </div>
                  <span className="text-xs font-bold" style={{ color: s.color }}>{s.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Daily Challenge - Stitch Gold Style ─── */}
        <div className="challenge-card w-full max-w-2xl mb-10 animate-slide-up flex items-center gap-4">
          <div className="text-4xl">🏆</div>
          <div className="flex-1">
            <div className="chip chip-gold mb-1" style={{ width: "fit-content" }}>DAILY CHALLENGE</div>
            <p className="font-bold text-base" style={{ color: "#1a1a2e" }}>Solve 5 Math Puzzles!</p>
          </div>
          <Link href="/register" className="btn-primary no-underline text-sm py-2.5 px-5">Start</Link>
        </div>

        {/* ─── Feature Cards ─────────────────────── */}
        <div className="w-full max-w-4xl mb-10">
          <h2 className="text-2xl font-extrabold mb-6 text-center">
            Everything Your Child Needs to <span className="gradient-text">Thrive</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
            {[
              { icon: "🧠", title: "Adaptive AI", desc: "Quizzes that auto-adjust difficulty based on each child's performance." },
              { icon: "🏆", title: "Gamification", desc: "XP, levels, streaks, and badges make learning feel like an epic quest." },
              { icon: "👨‍👩‍👧", title: "Parent Dashboard", desc: "Real-time monitoring, screen-time limits, and safety alerts." },
              { icon: "⚔️", title: "Peer Challenges", desc: "Challenge friends, climb leaderboards, and learn in a safe space." },
            ].map(f => (
              <div key={f.title} className="card text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 mx-auto"
                     style={{ background: "linear-gradient(135deg,#f0efff,#e8e5ff)" }}>
                  {f.icon}
                </div>
                <h3 className="font-extrabold text-base mb-2" style={{ color: "#1a1a2e" }}>{f.title}</h3>
                <p className="text-sm" style={{ color: "#464555" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Stats ─────────────────────────────── */}
        <div className="w-full max-w-2xl mb-8">
          <div className="hero-banner text-center">
            <h3 className="text-white font-extrabold text-xl mb-6">Join Thousands of Happy Learners</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Active Learners", value: "2,500+", icon: "👧" },
                { label: "Quizzes Taken", value: "18,000+", icon: "🎯" },
                { label: "Badges Earned", value: "6,200+", icon: "🏅" },
                { label: "Subjects", value: "8", icon: "📚" },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-black text-white">{s.value}</div>
                  <div className="text-white/60 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* ─── Footer ─────────────────────────────── */}
      <footer className="text-center py-6 text-sm border-t border-[var(--card-border)] bg-white"
              style={{ color: "#777587" }}>
        © 2026 KIDO Learning Platform — Built with ❤️ by <strong>FelixX-Tech</strong>
      </footer>
    </div>
  );
}
