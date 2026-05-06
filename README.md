# 🧒 KIDO — AI-Powered Learning Ecosystem

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Next.js](https://img.shields.io/badge/Next.js%2015-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com)
[![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=flat-square&logo=flutter)](https://flutter.dev)

KIDO is a comprehensive, multi-platform learning ecosystem designed for children aged 6-14. It combines a **Next.js Web Experience**, a **FastAPI AI Backend**, and a **Flutter Mobile App** to create a seamless, safe, and gamified educational journey.

---

## 🏛️ System Architecture

KIDO is built on a modern, distributed architecture:

1.  **Web Portal (Next.js):** The primary hub for interactive learning, parent dashboards, and teacher controls.
2.  **AI Backend (FastAPI):** A high-performance intelligence layer handling autonomous agents, behavioral analysis, and safety moderation.
3.  **Mobile App (Flutter):** On-the-go learning experience for children with offline support.
4.  **Database (Prisma/SQLite/Postgres):** Unified data layer for progress tracking and personal profiles.

---

## 🌟 Key Features

-   **🧠 Adaptive Learning Path:** AI-driven quiz engine that adjusts difficulty in real-time.
-   **🎮 Ultimate Gamification:** XP, levels, daily streaks, and milestone badges.
-   **🛡️ Parent & Teacher Dashboard:** Real-time monitoring, screen-time limits, and safety alerts.
-   **🤖 Agentic AI System:** Autonomous agents for learning assistance and social moderation.
-   **🔭 Interactive Discovery:** Ad-free video library and peer-to-peer challenges.

---

## 📁 Repository Structure

```text
KIDO/
├── kido-app/        # Next.js Web Application (Root Hub)
├── backend/         # FastAPI AI Backend Services
├── frontend/        # Flutter Mobile Application
└── docs/            # System documentation & diagrams
```

---

## 🚀 Quick Start (Web App)

1.  **Installation:**
    ```bash
    npm install
    ```
2.  **Environment Setup:**
    ```bash
    cp .env.example .env
    # Add your AUTH_SECRET and DATABASE_URL
    ```
3.  **Database Sync:**
    ```bash
    npx prisma db push
    npx prisma db seed
    ```
4.  **Run Dev Server:**
    ```bash
    npm run dev
    ```

---

## 🚀 Quick Start (Backend)

1.  **Setup:**
    ```bash
    cd backend
    python -m venv venv
    source venv/bin/activate # or venv\Scripts\activate on Windows
    pip install -r requirements.txt
    ```
2.  **Run:**
    ```bash
    uvicorn app.main:app --reload
    ```

---

## ☁️ Deployment (Vercel & Database)

### 1. Database Setup (Required for Vercel)
Vercel does not support persistent SQLite files. You **MUST** use a hosted PostgreSQL database (e.g., [Supabase](https://supabase.com) or [Neon](https://neon.tech)).

- Create a new PostgreSQL database.
- Get the Connection String.
- Add `DATABASE_URL` to your Vercel Project Environment Variables.

### 2. Update Provider
In `prisma/schema.prisma`, change the provider from `sqlite` to `postgresql`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 3. Deploy
- Push your changes to GitHub.
- Vercel will automatically redeploy and use your new database.

---

## 📄 License
This project is licensed under the MIT License for educational and research purposes.

Built with ❤️ by the **FelixX-Tech** team.
