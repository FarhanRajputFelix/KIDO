"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardRouter() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = (session?.user as any)?.role;
      switch (role) {
        case "admin":
          router.replace("/dashboard/admin");
          break;
        case "teacher":
          router.replace("/dashboard/teacher");
          break;
        case "parent":
          router.replace("/dashboard/parent");
          break;
        case "child":
          router.replace("/dashboard/kid");
          break;
        default:
          router.replace("/dashboard/parent");
      }
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">🧒</div>
          <p className="text-foreground/50">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-sm">
          <p className="text-lg font-semibold mb-4">Please log in to access your dashboard</p>
          <Link href="/login" className="btn-primary no-underline">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-float">🚀</div>
        <p className="text-foreground/50">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
}
