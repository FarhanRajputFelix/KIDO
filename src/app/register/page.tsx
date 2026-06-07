"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "", role: "parent" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) { setError("Passwords don't match"); return; }
    if (formData.password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password, role: formData.role }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Registration failed");
      else router.push(`/verify?email=${encodeURIComponent(formData.email.trim().toLowerCase())}`);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    { value: "parent", icon: "👨‍👩‍👧", label: "Parent", desc: "Monitor & manage your child" },
    { value: "teacher", icon: "👨‍🏫", label: "Teacher", desc: "Manage classrooms & quizzes" },
    { value: "child", icon: "🧒", label: "Student", desc: "Learn, play & earn XP" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F7FF" }}>
      {/* Left panel */}
      <div className="hidden md:flex flex-col justify-center px-12 w-[420px] shrink-0 hero-banner" style={{ borderRadius: 0 }}>
        <Link href="/" className="flex items-center gap-3 no-underline mb-10">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-black text-xl"
               style={{ background: "#FFD700", color: "#1a1a2e", boxShadow: "0 3px 0 #b8970a" }}>K</div>
          <span className="text-2xl font-black text-white">KIDO</span>
        </Link>
        <div className="text-7xl mb-6 animate-bounce-in">🌟</div>
        <h2 className="text-3xl font-black text-white leading-tight mb-3">
          Join KIDO<br />Learning!
        </h2>
        <p className="text-white/70 text-base mb-8">
          Start your AI-powered learning journey. Unlock knowledge, earn badges, and grow every day.
        </p>
        <div className="alert-gold rounded-2xl p-4">
          <p className="font-bold text-sm" style={{ color: "#705d00" }}>🏆 New members unlock 3 starter badges on first login!</p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <Link href="/" className="flex items-center gap-2 no-underline mb-6 md:hidden">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white"
               style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)" }}>K</div>
          <span className="text-xl font-black gradient-text">KIDO</span>
        </Link>

        <div className="w-full max-w-sm">
          <div className="text-center mb-7">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1a1a2e" }}>Create your account</h1>
            <p className="text-sm font-semibold" style={{ color: "#777587" }}>Start your learning journey today!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="alert-urgent text-sm text-center font-semibold">{error}</div>}

            <div>
              <label className="label" htmlFor="name">FULL NAME</label>
              <input id="name" name="name" type="text" className="input" placeholder="Sara Ahmed"
                value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <label className="label" htmlFor="reg-email">EMAIL</label>
              <input id="reg-email" name="email" type="email" className="input" placeholder="you@example.com"
                value={formData.email} onChange={handleChange} required />
            </div>

            {/* Role selector - Stitch card style */}
            <div>
              <label className="label">I AM A</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(r => (
                  <button key={r.value} type="button"
                    onClick={() => setFormData({ ...formData, role: r.value })}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all text-center"
                    style={{
                      borderColor: formData.role === r.value ? "#6C63FF" : "#e8e5ff",
                      background: formData.role === r.value ? "#f0efff" : "white",
                      boxShadow: formData.role === r.value ? "0 3px 0 #6C63FF44" : "0 2px 0 #e8e5ff",
                    }}>
                    <span className="text-2xl">{r.icon}</span>
                    <span className="text-xs font-bold" style={{ color: formData.role === r.value ? "#6C63FF" : "#1a1a2e" }}>{r.label}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs mt-1 text-center font-semibold" style={{ color: "#777587" }}>
                {roles.find(r => r.value === formData.role)?.desc}
              </p>
            </div>

            <div>
              <label className="label" htmlFor="reg-password">PASSWORD</label>
              <input id="reg-password" name="password" type="password" className="input" placeholder="At least 6 characters"
                value={formData.password} onChange={handleChange} required />
            </div>

            <div>
              <label className="label" htmlFor="reg-confirm">CONFIRM PASSWORD</label>
              <input id="reg-confirm" name="confirmPassword" type="password" className="input" placeholder="••••••••"
                value={formData.confirmPassword} onChange={handleChange} required />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base"
                    style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? "⏳ Creating account..." : "Create Account 🚀"}
            </button>

            <p className="text-center text-sm" style={{ color: "#777587" }}>
              Already have an account?{" "}
              <Link href="/login" className="font-bold no-underline" style={{ color: "#6C63FF" }}>Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
