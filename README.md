# 🧒 KIDO — A Safe, Agentic AI Learning Ecosystem for Children

> **CSC-4101 Artificial Intelligence · Spring 2026 · BSCS-6D · SZABIST University, Karachi**
> Live app: **https://kido-orcin.vercel.app**

KIDO is a production-grade learning platform for children under 15. It blends **gamified education** (adaptive quizzes, AI games, an age-restricted video library, and a conversational AI tutor) with an **11-agent reasoning pipeline** that analyses each child's learning signals and surfaces insights/alerts to parents and teachers — all bounded by **verifiable parental consent**, **age-appropriate content gating**, and **privacy-by-design**.

It is **not a thin LLM wrapper**: every autonomous decision flows through a ReAct-style multi-agent workflow with deterministic fallbacks.

---

## ✨ Key Features

| Role | What they get |
|------|---------------|
| **Child** | XP/level/streak/badges dashboard, **multi-session AI Tutor**, **adaptive AI quizzes**, 3 AI games (word/story/math), **age-restricted video library** + search, friends & messaging (parent-gated), leaderboard |
| **Parent** | Multi-child management, **AI insight reports**, alerts (burnout/safety/pace), **friend & classroom approval (VPC)**, screen-time, AI-agent traces, create child + login |
| **Teacher** | Create classrooms with **shareable join codes**, **AI quiz generation** per student, class analytics, enrolled/pending tracking |
| **Admin** | Platform stats, user/teacher/classroom oversight |

---

## 🧠 The Agentic AI Workflow

On each quiz submission, KIDO runs an orchestrated **11-agent pipeline** (`src/lib/agents.ts`). Each agent reasons over shared context, acts, and writes a structured result + confidence; a meta-layer detects contradictions and recovers gracefully. Every run is saved as an `AgentTrace` for **explainability**.

`Learning · Engagement · Behavior · Safety · Friend-Approval · Social-Moderation · Parent-Insight · Teacher-Support · Progress-Analytics · Contradiction-Detection · Fallback-Recovery`

**AI provider chain:** Groq `llama-3.3-70b-versatile` (primary) → Gemini `2.0-flash` (fallback) → curated content banks (always-on).

---

## 🏛️ Tech Stack

- **Framework:** Next.js 15 (App Router, React 19) + Tailwind v4
- **Auth:** NextAuth v5 (Credentials, JWT) + bcrypt, role-based (parent/child/teacher/admin)
- **Database:** Neon Postgres + Prisma ORM
- **AI:** Groq (Llama 3.3) + Google Gemini 2.0 Flash
- **Email (optional):** Resend (6-digit verification)
- **Delivery:** Vercel + PWA (service worker + manifest) + signed Android APK (TWA)

---

## 📁 Project Structure

```
kido-app/
├─ prisma/
│  └─ schema.prisma           # Data model: User, Child, Quiz, ChatSession,
│                             # FriendRequest, Classroom, AgentTrace, GameAttempt…
├─ public/                    # PWA icons (192/512/maskable), sw.js
├─ src/
│  ├─ app/
│  │  ├─ api/                 # Route handlers (the backend)
│  │  │  ├─ ai/               # chat, tutor, quiz, game, report
│  │  │  ├─ agents/trace/     # 11-agent pipeline endpoint
│  │  │  ├─ auth/             # register, verify, [...nextauth]
│  │  │  ├─ children/         # list + manage (parent creates child + login)
│  │  │  ├─ classrooms/       # create, join (pending), approve (parent)
│  │  │  ├─ friends/          # request, approve (parent)
│  │  │  ├─ messages/         # friend-to-friend (approved only)
│  │  │  ├─ quiz/attempt/     # scoring, XP, level, streak
│  │  │  ├─ videos/watch/     # award XP for watching
│  │  │  └─ dashboard/        # role-based dashboard data
│  │  ├─ dashboard/           # parent / teacher / kid / admin UIs
│  │  ├─ chat/                # AI Tutor (multi-session)
│  │  ├─ videos/              # age-filtered video library
│  │  ├─ games/               # math-arena, word-builder, story-creator
│  │  ├─ quiz/ leaderboard/ messages/ register/ verify/ login/
│  │  ├─ manifest.ts          # PWA manifest
│  │  └─ layout.tsx
│  ├─ lib/
│  │  ├─ agents.ts            # 11-agent reasoning pipeline
│  │  ├─ gemini.ts            # provider-agnostic generateText() (Groq→Gemini→fallback)
│  │  ├─ access.ts            # getAccessibleChild() — central authorization guard
│  │  ├─ auth.ts  mobile-auth.ts  prisma.ts  email.ts  utils.ts
│  └─ components/             # KidoBot, EventFeed, ServiceWorker
└─ docs/
   └─ KIDO_Final_Report.html  # Final report (open → Print → Save as PDF)
```

---

## 🔐 Safety & Authorization (highlights)

- **`getAccessibleChild()`** wraps every child-scoped endpoint → a user can only access their own child (parent), classroom students (teacher), or own profile (child). Cross-account access returns `403`.
- **Verifiable Parental Consent:** friend requests and classroom enrolment require a parent to approve before they take effect.
- **Age gating:** the video library only shows content within each child's age band.

---

## 🚀 Local Setup

```bash
# 1. Install
npm install

# 2. Configure environment (.env)  — see .env.example
DATABASE_URL="postgresql://...neon.tech/neondb?sslmode=require"
AUTH_SECRET="<openssl rand -base64 32>"
GROQ_API_KEY="<from https://console.groq.com/keys>"   # primary AI (free)
GEMINI_API_KEY="<from https://aistudio.google.com/apikey>"  # fallback
# RESEND_API_KEY, REQUIRE_EMAIL_VERIFICATION  (optional)

# 3. Database
npm run db:push      # apply schema to Neon
npm run db:seed      # optional demo data

# 4. Run
npm run dev          # http://localhost:3000
```

**Demo logins:** `parent@kido.com / password123`, `teacher@kido.com / password123`.

> ⚠️ On Vercel, set the same env vars in **Project → Settings → Environment Variables**, and **do NOT** set `NODE_ENV` (Vercel manages it; setting it skips devDependencies and breaks the build).

---

## 📦 Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (`prisma generate` + `next build`) |
| `npm run db:push` | Push Prisma schema to the database |
| `npm run db:seed` | Seed demo content |

---

## 👥 Team

| Member | Phase(s) | Role |
|--------|----------|------|
| **Farhan (Lead)** | 1, 4 | AI architecture, agentic system, ML models, system design |
| **Zubair Khan** | 1, 2, 3 | Flutter UI, design system, screens, animations |
| **Fahad** | 2, 3, 4 | FastAPI backend, PostgreSQL, REST APIs, Docker |
| **Syed Muhammad Asghar** | 1, 6 | Documentation, research papers, final report, presentation |
| **Chaudhary Saboor Munir** | 5, 6 | Unit testing, integration testing, QA, deployment support |

---

*Built for CSC-4101 — exploring rational, beneficial AI agents in a real-world, child-safe product.*
