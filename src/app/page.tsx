import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ─── Navbar ─────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 border-b border-[var(--card-border)]">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold no-underline">
          <span className="text-2xl">🧒</span>
          <span className="gradient-text">KIDO</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-secondary text-sm py-2 px-5 no-underline">
            Log In
          </Link>
          <Link href="/register" className="btn-primary text-sm py-2 px-5 no-underline">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ─── Hero ───────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-16 md:py-24 text-center">
        <div className="animate-slide-up max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
            <span className="animate-streak">🔥</span>
            AI-Powered Learning for Kids
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Where Learning
            <br />
            <span className="gradient-text">Becomes an Adventure</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            KIDO transforms education into an exciting journey. Adaptive quizzes,
            XP rewards, streaks, badges, and friendly challenges keep children
            engaged and growing every day.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/register" className="btn-primary text-base py-3.5 px-8 no-underline">
              🚀 Start Free Today
            </Link>
            <Link href="/login" className="btn-secondary text-base py-3.5 px-8 no-underline">
              I have an account
            </Link>
          </div>
        </div>

        {/* ─── Feature Cards ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto w-full stagger-children">
          <div className="card text-left">
            <div className="text-3xl mb-3">🧠</div>
            <h3 className="font-bold text-lg mb-1.5">Adaptive AI</h3>
            <p className="text-sm text-foreground/60">
              Quizzes that automatically adjust difficulty based on each child&apos;s performance.
            </p>
          </div>
          <div className="card text-left">
            <div className="text-3xl mb-3">🏆</div>
            <h3 className="font-bold text-lg mb-1.5">Gamification</h3>
            <p className="text-sm text-foreground/60">
              XP, levels, streaks, and badges make learning feel like an epic quest.
            </p>
          </div>
          <div className="card text-left">
            <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
            <h3 className="font-bold text-lg mb-1.5">Parent Dashboard</h3>
            <p className="text-sm text-foreground/60">
              Track progress, set screen limits, and get real-time alerts on your child&apos;s learning.
            </p>
          </div>
          <div className="card text-left">
            <div className="text-3xl mb-3">⚔️</div>
            <h3 className="font-bold text-lg mb-1.5">Peer Challenges</h3>
            <p className="text-sm text-foreground/60">
              Challenge friends, climb leaderboards, and learn together in a safe environment.
            </p>
          </div>
        </div>

        {/* ─── Subject Showcase ─────────────────────── */}
        <div className="mt-20 max-w-4xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Explore <span className="gradient-text">8 Subjects</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon: "🧮", name: "Math", color: "#6366f1" },
              { icon: "🔬", name: "Science", color: "#10b981" },
              { icon: "📚", name: "English", color: "#f59e0b" },
              { icon: "🏛️", name: "History", color: "#ef4444" },
              { icon: "🌍", name: "Geography", color: "#3b82f6" },
              { icon: "💻", name: "Coding", color: "#8b5cf6" },
              { icon: "🎨", name: "Art & Music", color: "#ec4899" },
              { icon: "🧠", name: "General", color: "#14b8a6" },
            ].map((s) => (
              <div
                key={s.name}
                className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm"
                style={{
                  background: `${s.color}18`,
                  color: s.color,
                  border: `1.5px solid ${s.color}30`,
                }}
              >
                <span className="text-lg">{s.icon}</span>
                {s.name}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Stats Bar ────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto w-full">
          {[
            { label: "Active Learners", value: "2,500+" },
            { label: "Quizzes Taken", value: "18,000+" },
            { label: "Badges Earned", value: "6,200+" },
            { label: "Subjects", value: "8" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="stat-value text-2xl md:text-3xl">{s.value}</div>
              <div className="text-sm text-foreground/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* ─── Footer ─────────────────────────────────── */}
      <footer className="text-center py-8 text-sm text-foreground/40 border-t border-[var(--card-border)]">
        © 2026 KIDO Learning Platform. Built with ❤️ for curious minds.
      </footer>
    </div>
  );
}
