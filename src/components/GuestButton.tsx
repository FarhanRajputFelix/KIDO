"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// One-click "Explore as Guest" — signs into the child demo account and opens
// the kid dashboard. Lets investors/visitors try the product instantly.
export default function GuestButton({ className, label }: { className?: string; label?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const explore = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: "aiza@kido.com",
        password: "password123",
        redirect: false,
      });
      router.push(res?.ok ? "/dashboard" : "/login");
    } catch {
      router.push("/login");
    }
  };

  return (
    <button onClick={explore} disabled={loading} className={className} style={{ opacity: loading ? 0.7 : 1 }}>
      {loading ? "Loading…" : (label || "👀 Explore as Guest")}
    </button>
  );
}
