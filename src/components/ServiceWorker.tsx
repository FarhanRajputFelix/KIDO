"use client";

import { useEffect } from "react";

// Registers the PWA service worker (enables install + store packaging).
export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const onLoad = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
      window.addEventListener("load", onLoad);
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);
  return null;
}
