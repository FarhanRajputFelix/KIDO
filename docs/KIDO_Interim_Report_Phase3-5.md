# KIDO AI — Interim Project Report (Phase 3–5)
**Architecture Design · Implementation · AI Integration**

---

## 1. Project Overview

**KIDO** is an AI-powered children's educational platform built using **Next.js 15**, **Prisma ORM** (PostgreSQL/Neon), **NextAuth v5**, and **Google Gemini 2.0 Flash**. It features role-based dashboards (Admin, Parent, Teacher, Kid), adaptive AI quiz generation, an AI chatbot tutor, gamified learning with XP/streaks/badges, and an autonomous **11-agent Antigravity Intelligence Pipeline** that monitors, analyzes, and protects children's learning journeys in real-time.

**GitHub Repository:** [github.com/FarhanRajputFelix/kido](https://github.com/FarhanRajputFelix/kido)  
*(Note: Full repository permissions granted to **muhammadsuleman-art** (`muhammad.suleman@szabist.pk`))*

---

## 2. Development Methodology

We used **Agile (Sprint-based)** development with 1-week sprints:

| Sprint | Phase | Focus |
|--------|-------|-------|
| Week 3 | Architecture Design | Database schema, API design, auth system |
| Week 4 | Core Implementation | Dashboards, quiz system, AI integration |
| Week 5 | AI Integration & Polish | 11-agent pipeline, agent trace visualization, seed data |

### Team Contributions

| Member | Role | Responsibilities |
|--------|------|-----------------|
| Farhan Rajput | Team Lead / Full-Stack | Architecture, AI pipeline, deployment |
| Ali | Backend | API routes, Prisma schema, authentication |
| Aiza | Frontend | Dashboard UI, components, responsive design |
| Hamza | AI Integration | Gemini prompts, agent logic, testing |

---

## 3. Architecture Design (Phase 3)

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        KIDO Platform                            │
├──────────────┬──────────────────────────────┬───────────────────┤
│   Frontend   │        Backend (API)         │   AI Layer        │
│  Next.js 15  │  18 API Routes (App Router)  │  Gemini 2.0 Flash │
│  React 19    │  NextAuth v5 (JWT)           │  11 Agents        │
│  Tailwind    │  Prisma ORM                  │  Agent Traces     │
└──────┬───────┴──────────────┬───────────────┴────────┬──────────┘
       │                      │                        │
       │              ┌───────┴────────┐       ┌───────┴────────┐
       │              │  PostgreSQL    │       │  Google Gemini  │
       │              │  (Neon Cloud)  │       │  (2.0 Flash)    │
       │              │  16 Models     │       │  4 AI Features  │
       │              └────────────────┘       └────────────────┘
```

### Database Schema: 16 Models

| Model | Purpose |
|-------|---------|
| User | Authentication, roles (admin/parent/teacher/child) |
| Child | Student profiles, XP, level, streak, badges |
| Quiz / QuizAttempt | AI-generated quizzes and submission tracking |
| ChatMessage | AI chatbot conversation history |
| AgentTrace | 11-agent pipeline audit trail |
| Classroom / Lesson | Teacher classroom management |
| FriendRequest | Safe social connections with parent approval |
| ScreenTimeLog | Daily screen time monitoring |
| ProgressReport | AI-generated progress reports |
| ActivityFeed / ParentAlert | Real-time activity and alert system |
| Content / WatchLog / Badge | Learning content, video tracking, achievements |
| PeerChallenge / Message | Gamified social features |

---

## 4. Core Implementation (Phase 4)

### 39 Routes (14 Pages + 21 API Endpoints + 4 Dynamic)

**Frontend Pages:**
- `/` — Landing page with feature showcase
- `/login`, `/register` — Authentication with demo credentials
- `/dashboard` → Role-based redirect to `/dashboard/kid|parent|teacher|admin`
- `/chat` — AI chatbot with markdown rendering and typing indicators
- `/quiz` → `/quiz/[id]` — AI-generated quiz selection and interactive quiz-taking
- `/games` → `/games/word-builder|story-creator|math-arena` — 3 AI-powered games
- `/explore` — Subject browser
- `/leaderboard` — XP-ranked player standings
- `/achievements` — Badge collection system
- `/agents` — **11-Agent Trace Visualization** (showpiece) with cinematic replay

**Key API Endpoints:**
- `POST /api/ai/chat` — Gemini-powered conversational AI tutor
- `POST /api/ai/quiz` — Adaptive quiz generation based on child profile
- `POST /api/ai/game` — AI game challenge generation (3 game types)
- `POST /api/ai/report` — AI progress report generation
- `POST /api/agents/trace` — Run full 11-agent pipeline
- `POST /api/quiz/attempt` — Score quiz + trigger agent pipeline
- `CRUD /api/classrooms` — Teacher classroom management
- `POST /api/classrooms/join` — Student join via code

### Gamification System
- **XP & Levels:** Earned from quizzes, games, and streaks
- **Streaks:** Daily activity tracking with bonus multipliers
- **Badges:** 8 achievement types (First Quiz, Quiz Master, Perfect Score, etc.)
- **Leaderboard:** Global XP ranking with podium display
- **Friend Challenges:** Safe peer competition with parent approval

---

## 5. AI Integration (Phase 5)

### Google Gemini 2.0 Flash Integration

| Feature | Description |
|---------|-------------|
| AI Chat | Personalized tutor with age-appropriate responses, markdown, video links |
| Quiz Gen | Adaptive difficulty based on child profile (weak/strong subjects) |
| Games | 3 game types: Word Builder, Story Creator, Math Arena |
| Reports | Comprehensive progress analysis with recommendations |

### 11-Agent Antigravity Intelligence Pipeline

The core AI differentiator — a sequential pipeline of autonomous agents that processes every quiz submission:

```
Quiz Submit → [1] Learning Intelligence → [2] Engagement Optimization
           → [3] Behavior Analysis → [4] Safety Moderation
           → [5] Friend Approval → [6] Social Moderation
           → [7] Parent Insight → [8] Teacher Support
           → [9] Progress Analytics → [10] Contradiction Detection
           → [11] Fallback Recovery → AgentTrace (DB)
```

**Key Agent Capabilities:**
1. **Learning Intelligence** — Adjusts difficulty based on score patterns
2. **Engagement Optimization** — Detects fatigue, recommends breaks
3. **Behavior Analysis** — Identifies burnout risk from behavioral signals
4. **Safety Moderation** — Content filtering and toxicity detection
5. **Contradiction Detection** — Cross-validates agent signals for consistency
6. **Fallback Recovery** — System resilience with automatic recovery

**Shared Memory Architecture:** Agents communicate via shared memory, enabling downstream agents to reference upstream decisions for coherent, cross-validated reasoning.

**Agent Trace Visualization:** Interactive page with cinematic replay, confidence rings, timeline view, reasoning chains, and shared context update indicators.

---

## 6. Current Status & Verification

| Metric | Status |
|--------|--------|
| Build | ✅ Passes (Exit 0) |
| Routes | 39/39 compiled |
| TypeScript | Zero type errors |
| Database | 16 models synced |
| Seed Data | 5 users, 4 children, 6 quizzes, 8 badges, 3 agent traces |
| AI Features | Ready (requires GEMINI_API_KEY) |

**Demo Credentials:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kido.com | password123 |
| Parent | parent@kido.com | password123 |
| Teacher | teacher@kido.com | password123 |
| Kid (Aiza) | aiza@kido.com | password123 |
| Kid (Hamza) | hamza@kido.com | password123 |

---

## 7. Tech Stack Summary

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS |
| Backend | Next.js App Router, API Routes |
| Database | PostgreSQL (Neon Cloud), Prisma 5.22 |
| Auth | NextAuth v5, JWT, bcryptjs |
| AI | Google Gemini 2.0 Flash |
| State | Zustand |
| Charts | Recharts |
| Deploy | Vercel (production-ready) |

---

*Submitted by Team KIDO — May 14, 2026*
