import type { MetadataRoute } from "next";

// Web App Manifest — makes KIDO installable on phones/desktop ("Add to Home
// Screen"). To ship a real Android .apk/.aab, point https://pwabuilder.com at
// the deployed URL — it reads this manifest and packages a signed APK (and
// generates icons automatically).
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "KIDO — Learn & Play",
    short_name: "KIDO",
    description: "Safe, AI-powered learning and games for kids — quizzes, videos, an AI tutor, and more.",
    start_url: "/",
    scope: "/",
    lang: "en",
    dir: "ltr",
    display: "standalone",
    display_override: ["standalone", "minimal-ui"],
    orientation: "portrait",
    categories: ["education", "kids", "games"],
    background_color: "#F8F7FF",
    theme_color: "#6C63FF",
    shortcuts: [
      { name: "AI Tutor", short_name: "Tutor", url: "/chat", description: "Chat with the AI learning buddy" },
      { name: "Quizzes", short_name: "Quizzes", url: "/quiz", description: "Take a quiz" },
      { name: "Videos", short_name: "Videos", url: "/videos", description: "Watch learning videos" },
    ],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
