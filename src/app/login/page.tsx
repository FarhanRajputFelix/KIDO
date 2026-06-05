"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) setError("Invalid email or password");
      else router.push("/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F7FF" }}>
      {/* Left Stitch hero panel */}
      <div className="hidden md:flex flex-col justify-center px-12 w-[420px] shrink-0 hero-banner rounded-none" style={{ borderRadius: 0 }}>
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-3 no-underline mb-10">
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl"
                 style={{ background: "#FFD700", color: "#1a1a2e", boxShadow: "0 3px 0 #b8970a" }}>K</div>
            <span className="text-2xl font-black text-white">KIDO</span>
          </Link>
          <div className="text-7xl mb-6 animate-float">🤖</div>
          <h2 className="text-3xl font-black text-white leading-tight mb-3">
            Ready to<br />learn today?
          </h2>
          <p className="text-white/70 text-base">
            Unlock badges, earn XP, and become a<br />learning superstar with KIDO AI!
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-4">
          {["🏆 Earn XP for every quiz", "🔥 Build learning streaks", "🛡️ Safe & parent-approved"].map(f => (
            <div key={f} className="flex items-center gap-3 glass rounded-2xl px-4 py-3">
              <span className="text-sm font-semibold text-white">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <Link href="/" className="flex items-center gap-2 no-underline mb-8 md:hidden">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg text-white"
               style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)", boxShadow: "0 3px 0 #2d2b70" }}>K</div>
          <span className="text-2xl font-black gradient-text">KIDO</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold mb-1" style={{ color: "#1a1a2e" }}>Welcome back!</h1>
            <p className="text-sm font-semibold" style={{ color: "#777587" }}>Log in to continue your adventure 🚀</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="alert-urgent text-sm text-center font-semibold">{error}</div>
            )}

            <div>
              <label className="label" htmlFor="email">EMAIL</label>
              <input id="email" type="email" className="input" placeholder="parent@kido.com"
                value={email} onChange={e => setEmail(e.target.value)} required />
            </div>

            <div>
              <label className="label" htmlFor="password">PASSWORD</label>
              <input id="password" type="password" className="input" placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)} required />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base"
                    style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "⏳ Signing in..." : "Sign In →"}
            </button>

            <p className="text-center text-sm" style={{ color: "#777587" }}>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-bold no-underline" style={{ color: "#6C63FF" }}>Sign Up</Link>
            </p>
          </form>

          {/* Demo credentials - Stitch card style */}
          <div className="mt-8 card" style={{ background: "#f0efff", border: "1.5px solid #c5c0ff" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🧪</span>
              <span className="font-extrabold text-sm" style={{ color: "#1a1a2e" }}>Demo Credentials</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="chip chip-purple">Parent</span>
                <span className="font-semibold" style={{ color: "#464555" }}>parent@kido.com / password123</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="chip chip-purple">Teacher</span>
                <span className="font-semibold" style={{ color: "#464555" }}>teacher@kido.com / password123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
