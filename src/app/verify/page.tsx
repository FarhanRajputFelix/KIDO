"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function VerifyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (code.trim().length !== 6) { setError("Enter the 6-digit code"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: code.trim() }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || "Verification failed");
      else router.push("/login?verified=true");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    try {
      const res = await fetch("/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setInfo(data.devNotice || "A new code has been sent to your email.");
    } catch {
      setError("Could not resend the code. Try again.");
    }
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-7">
        <div className="text-6xl mb-3">📧</div>
        <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1a1a2e" }}>Verify your email</h1>
        <p className="text-sm font-semibold" style={{ color: "#777587" }}>
          We sent a 6-digit code to{" "}
          <span style={{ color: "#6C63FF" }}>{email || "your email"}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4">
        {error && <div className="alert-urgent text-sm text-center font-semibold">{error}</div>}
        {info && <div className="alert-gold text-sm text-center font-semibold" style={{ color: "#705d00" }}>{info}</div>}

        <input
          inputMode="numeric"
          maxLength={6}
          className="input text-center"
          style={{ fontSize: "28px", letterSpacing: "10px", fontWeight: 800 }}
          placeholder="000000"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          required
        />

        <button type="submit" disabled={loading} className="btn-primary w-full py-4 text-base"
                style={{ opacity: loading ? 0.7 : 1 }}>
          {loading ? "⏳ Verifying..." : "Verify & Continue ✅"}
        </button>

        <p className="text-center text-sm" style={{ color: "#777587" }}>
          Didn&apos;t get it?{" "}
          <button type="button" onClick={handleResend} className="font-bold" style={{ color: "#6C63FF" }}>
            Resend code
          </button>
        </p>
        <p className="text-center text-sm" style={{ color: "#777587" }}>
          <Link href="/register" className="font-bold no-underline" style={{ color: "#6C63FF" }}>← Back to sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10" style={{ background: "#F8F7FF" }}>
      <Link href="/" className="flex items-center gap-2 no-underline mb-6">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white"
             style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)" }}>K</div>
        <span className="text-xl font-black gradient-text">KIDO</span>
      </Link>
      <Suspense fallback={<div className="text-center font-bold" style={{ color: "#6C63FF" }}>Loading...</div>}>
        <VerifyForm />
      </Suspense>
    </div>
  );
}
