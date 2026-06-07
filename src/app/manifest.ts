import type { MetadataRoute } from "next";

// Web App Manifest — makes KIDO installable on phones/desktop ("Add to Home
// Screen"). To ship a real Android .apk/.aab, point https://pwabuilder.com at
// the deployed URL — it reads this manifest and packages a signed APK (and
// generates icons automatically).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KIDO — Learn & Play",
    short_name: "KIDO",
    description: "Safe, AI-powered learning and games for kids — quizzes, videos, an AI tutor, and more.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F8F7FF",
    theme_color: "#6C63FF",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      // Add /icon-192.png and /icon-512.png to public/ for richer install icons,
      // or let PWABuilder generate them from the deployed site.
    ],
  };
}
