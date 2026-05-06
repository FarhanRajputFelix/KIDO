"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "parent",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed");
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-slide-up">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold no-underline mb-4">
            <span className="text-3xl">🧒</span>
            <span className="gradient-text">KIDO</span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Create your account</h1>
          <p className="text-foreground/50 mt-1">Start your learning journey today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card animate-scale-in space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="label" htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              className="input"
              placeholder="Sara Ahmed"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              name="email"
              type="email"
              className="input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="role">I am a</label>
            <select
              id="role"
              name="role"
              className="input"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="parent">👨‍👩‍👧 Parent</option>
              <option value="teacher">👨‍🏫 Teacher</option>
            </select>
          </div>

          <div>
            <label className="label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              name="password"
              type="password"
              className="input"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="reg-confirm">Confirm Password</label>
            <input
              id="reg-confirm"
              name="confirmPassword"
              type="password"
              className="input"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="text-center text-sm text-foreground/50">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-500 font-medium no-underline hover:underline">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
