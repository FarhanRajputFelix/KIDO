import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import KidoBot from "@/components/KidoBot";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KIDO — AI-Powered Learning for Kids",
  description:
    "Gamified learning ecosystem where children explore, learn, and grow through adaptive quizzes, interactive content, and friendly challenges.",
  keywords: ["education", "kids", "learning", "gamification", "AI", "quiz"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
          {/* Floating AI Teaching Chatbot — available on every page */}
          <KidoBot />
        </Providers>
      </body>
    </html>
  );
}
