"use client";

import { useEffect } from "react";

// Registers the PWA service worker (enables install + store packaging).
export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
