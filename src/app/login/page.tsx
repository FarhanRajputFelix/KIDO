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
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
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
          <h1 className="text-2xl font-bold mt-4">Welcome back!</h1>
          <p className="text-foreground/50 mt-1">Log in to continue learning</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card animate-scale-in space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-accent-500/10 border border-accent-500/20 text-accent-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              placeholder="parent@kido.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5"
            style={{ opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center text-sm text-foreground/50">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary-500 font-medium no-underline hover:underline">
              Sign Up
            </Link>
          </div>
        </form>

        {/* Demo credentials */}
        <div className="mt-6 card text-center animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <p className="text-sm font-semibold mb-2">🧪 Demo Credentials</p>
          <p className="text-xs text-foreground/50">
            <span className="font-medium">Parent:</span> parent@kido.com / password123
          </p>
          <p className="text-xs text-foreground/50 mt-1">
            <span className="font-medium">Teacher:</span> teacher@kido.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}
