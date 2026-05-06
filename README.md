# 🧒 KIDO — AI-Powered Learning Ecosystem

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js%2014+-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://prisma.io)
[![NextAuth.js](https://img.shields.io/badge/NextAuth.js-FF4500?style=for-the-badge&logo=nextauth.js&logoColor=white)](https://next-auth.js.org)

KIDO is a cutting-edge, gamified learning platform designed for children aged 6-14. It transforms education into an immersive adventure, using adaptive AI to personalize the learning journey and a robust gamification engine to keep kids engaged.

---

## 🌟 Key Features

### 🧠 Adaptive Learning Path
Our AI-driven quiz engine automatically adjusts difficulty based on real-time performance, ensuring children are always challenged but never frustrated.

### 🎮 Ultimate Gamification
- **XP & Levels:** Earn experience points for every activity and level up.
- **Streaks:** Maintain daily learning streaks to earn massive bonuses.
- **Badges:** Collect unique badges for milestones like "Quiz Master" or "Week Warrior."
- **Leaderboards:** Friendly competition to see who's the top learner.

### 🛡️ Parent & Teacher Control
- **Real-time Analytics:** Track progress across subjects like Math, Science, and Coding.
- **Smart Alerts:** Get notified about achievements, inactivity, or screen-time limits.
- **Safe Environment:** Managed social features and content moderation.

### 🔭 Interactive Discovery
- **Video Library:** Engaging educational content across 8+ subjects.
- **Peer Challenges:** Safely challenge friends to subject-specific duels.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14/15 (App Router), React 19, Tailwind CSS
- **State Management:** Zustand
- **Database:** Prisma ORM (SQLite for Dev, PostgreSQL for Prod)
- **Auth:** NextAuth.js v5 (Beta)
- **Animations:** Custom CSS Design System + Framer Motion-style micro-animations
- **Charts:** Recharts

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/FarhanRajputFelix/Kido.git
   cd Kido/kido-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```
   *Edit `.env` and add your `AUTH_SECRET`.*

4. **Database Initialization:**
   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. **Run Development Server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the adventure!

---

## ☁️ Deployment on Vercel

1. Push your code to GitHub.
2. Link your repository to a new project on [Vercel](https://vercel.com/new).
3. Set environment variables:
   - `DATABASE_URL`: Your hosted database URL (Supabase/Neon).
   - `AUTH_SECRET`: A secure random string.
4. Vercel will automatically detect Next.js and deploy.

> [!IMPORTANT]
> Since this project uses SQLite by default, you MUST migrate to a hosted PostgreSQL/MySQL database for production deployment on Vercel.

---

## 📄 License
This project is licensed under the MIT License.

---

Built with ❤️ for the next generation of thinkers.
