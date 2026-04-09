# 🚀 KIDO – Safe, Intelligent & Interactive Digital World for Children

<div align="center">

![KIDO Banner](https://img.shields.io/badge/KIDO-AI%20Learning%20Ecosystem-6C63FF?style=for-the-badge&logo=flutter&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=flat-square&logo=fastapi)
![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=flat-square&logo=flutter)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=flat-square&logo=postgresql)
![License](https://img.shields.io/badge/License-Educational-blue?style=flat-square)

**An AI-powered, gamified learning ecosystem for children aged 6–14**

[📖 API Docs](http://localhost:8000/docs) • [🏫 Architecture](#-system-architecture) • [🚀 Quick Start](#-quick-start)

</div>

---

## 📌 Overview

**KIDO** combines **education, entertainment, social motivation, and safety** into a single platform — controlled by parents and supported by verified educators.

> 🎯 **Core Idea:** Build daily learning habits in children using **games, AI personalization, and safe social interaction.**

---

## 🧠 Core Features

| Pillar | Features |
|--------|----------|
| 🎮 **Gamified Learning** | Adaptive quizzes, XP system, levels, badges, daily streaks |
| 📺 **Safe Video Platform** | Age-filtered lessons, no ads/comments, AI content filtering |
| 🤖 **Agentic AI System** | Autonomous Multi-Agent System: Learning, Engagement, Safety, Moderation |
| 🔐 **Parent Control Panel** | Real-time monitoring, friend approvals, screen time limits, safety alerts |
| 👥 **Controlled Social** | Parent-approved friends only, leaderboard, activity feed |
| 🏫 **Teacher Integration** | Classroom management, lesson uploads, student progress tracking |

---

## 🛠 Technology Stack

```
┌─────────────────────────────────────────────────────┐
│           Mobile App (Flutter 3.x)                  │
│   Provider • Dio • go_router • fl_chart             │
├─────────────────────────────────────────────────────┤
│         Backend API (FastAPI + Python)              │
│   SQLAlchemy • Alembic • JWT • Pydantic             │
├─────────────────────────────────────────────────────┤
│        Database (PostgreSQL 15)                     │
│           Redis (caching)                           │
├─────────────────────────────────────────────────────┤
│              AI Services                            │
│   Rule-based personalization + OpenAI API (opt.)   │
└─────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
kido/
├── backend/
│   ├── app/
│   │   ├── core/           # config, database, security, deps
│   │   ├── models/         # SQLAlchemy ORM models (10 models)
│   │   ├── schemas/        # Pydantic request/response schemas
│   │   ├── routes/         # FastAPI routers (8 routers)
│   │   ├── services/       # Business logic (streak, game, safety)
│   │   └── ai/             # Personalization & behavior analysis
│   ├── migrations/         # Alembic DB migrations
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── render.yaml         # Render.com deployment
│   └── requirements.txt
├── frontend/
│   └── lib/
│       ├── core/           # theme, constants, api_client
│       ├── providers/      # auth, child, content providers
│       └── screens/
│           ├── auth/       # login, register
│           ├── child/      # home (5-tab), XP dashboard
│           ├── games/      # quiz with adaptive difficulty
│           ├── parent/     # dashboard, alerts, screen time
│           └── teacher/    # classrooms, students, lessons
└── docs/
    ├── diagrams/           # DB schema, system architecture
    ├── pitch/              # Investor pitch
    └── presentation/       # Product presentation
```

---

## 🚀 Quick Start

### Backend

```bash
cd backend

# 1. Create virtual environment
python -m venv venv
venv\Scripts\activate       # Windows
source venv/bin/activate    # macOS/Linux

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and SECRET_KEY

# 4. Run (tables auto-created on startup)
uvicorn app.main:app --reload --port 8000

# API Docs available at:
# http://localhost:8000/docs      ← Swagger UI
# http://localhost:8000/redoc     ← ReDoc
```

### Using Docker

```bash
cd backend
docker-compose up --build
# API: http://localhost:8000
# PostgreSQL: localhost:5432
```

### Frontend (Flutter)

```bash
cd frontend
flutter pub get
flutter run
```

---

## 🔗 API Endpoints

| Module | Endpoints |
|--------|-----------|
| 🔐 Auth | `POST /auth/register` `POST /auth/login` `GET /auth/me` |
| 👧 Children | `POST /children/` `GET /children/me/profile` `POST /children/{id}/award-xp` `GET /children/leaderboard/global` |
| 📺 Content | `GET /content/` `GET /content/{id}` `POST /content/watch-log` `GET /content/recommend/{child_id}` |
| 🎮 Games | `POST /games/quiz/start` `POST /games/quiz/submit` `GET /games/history` |
| 👥 Social | `POST /social/friends/request` `POST /social/friends/parent-approve` `GET /social/leaderboard/friends` `GET /social/feed` |
| 👨‍👩‍👧 Parents | `GET /parents/dashboard` `GET /parents/children/{id}/report` `GET /parents/alerts` |
| 🏫 Teachers | `POST /teachers/classrooms` `GET /teachers/classrooms/{id}/students` `POST /teachers/join-classroom` |
| 🤖 Agentic AI | `POST /agents/run-all/{id}` `POST /agents/run/{type}/{id}` `POST /agents/event/{type}/{id}` |
| 🦾 AI (Legacy) | `GET /ai/learning-path/{id}` `GET /ai/behavior/{id}` `POST /ai/recommend` |

---

## 🎮 Gamification System

```
XP Earned → Level Up (every 500 XP) → Unlock Badges
    ↓
Daily Streak → Milestone Bonuses (7/14/30/60/100 days)
    ↓
Friend Leaderboard → Healthy Competition
    ↓
AI Adaptive Difficulty → Personalized Challenge
```

**Difficulty Adjustment:**
- Score ≥ 85% → Hard questions
- Score 65–84% → Medium questions  
- Score < 65% → Easy questions (build confidence)

---

## 🤖 Agentic AI System (Autonomous Intelligence)

The **Agentic AI System** is the core intelligence layer of KIDO, moving beyond reactive responses to autonomous intelligence.

### 🧠 Core AI Agents

| Agent | Responsibility | Key Actions |
|-------|----------------|-------------|
| 🎓 **Learning Agent** | Personal Tutor AI | Track progress, identify weak subjects, generate personalized plans. |
| 🎯 **Engagement Agent** | Retention Engine | Monitor attention, detect boredom, switch content formats (video ↔ game). |
| 👥 **Social Safety Agent** | Interaction Monitor | Detect bullying, unsafe language, and suspicious social patterns. |
| 👨‍👩‍👧 **Parent Assistant** | Parental Insights | Generate weekly reports, suggest improvements, send smart alerts. |
| 🏫 **Teacher Support** | Educator Support | Auto-generate assignments, identify struggling students. |
| 🎥 **Content Moderation**| Safety Guard | Real-time content scanning for language and visual safety. |
| 🧠 **Behavior Analysis**| Pattern Recognition | Analyze emotional/behavioral trends (stress indicators, activity drops). |

### ⚙️ System Workflow

`User Activity → Data Collection → AI Agents Analysis → Decision Engine → Automated Actions`

---

## 🔐 Safety Architecture

| Layer | Implementation |
|-------|----------------|
| Role-Based Access | RBAC via JWT claims (child/parent/teacher/admin) |
| Friend System | Parent must approve every friend request |
| Content Filtering | Age-gated (age_min/age_max), keyword blocklist |
| Screen Time | Configurable daily limits + alerts when exceeded |
| Inactivity Alerts | Auto-detects sudden engagement drop |
| Data Privacy | COPPA-aware • minimal data collection |

---

## 🚀 Deployment

### Render.com (Recommended — Free Tier)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Point to this repo — `render.yaml` handles everything automatically

### Environment Variables (Production)

```bash
DATABASE_URL=postgresql://...
SECRET_KEY=<generate with: python -c "import secrets; print(secrets.token_hex(32))">
ENVIRONMENT=production
OPENAI_API_KEY=sk-...   # Optional
```

---

## 🗺 Development Roadmap

- [x] **Phase 1 (MVP):** Auth, short lessons, quizzes, XP, streaks, leaderboard
- [x] **Phase 2:** Friend system (parent-approved), parent dashboard, activity feed
- [x] **Phase 3:** Teacher & classroom system, content platform
- [x] **Phase 4:** Agentic AI System (Multi-Agent Layer), behavior analysis
- [ ] **Phase 5 (Future):** Voice assistant, emotion AI, AR/VR learning, multi-language

---

## 🔐 Security & Compliance

- **COPPA** (Children's Online Privacy Protection Act) compliant design
- **GDPR-K** (Kids Data Protection) aware
- End-to-end HTTPS (TLS) in production
- Bcrypt password hashing
- JWT with refresh tokens
- No third-party trackers or ads

---

## 👨‍💻 Team

- **Project Lead:** Farhan (FarhanRajputFelix)  
- **Organization:** FelixX-Tech  
- **Repository:** https://github.com/FarhanRajputFelix/KIDO

---

## 📄 License

This project is developed for educational and research purposes.  
Production licensing to be defined upon commercial deployment.

---

<div align="center">

**KIDO = Learning + Safety + Social Motivation + Entertainment**

⭐ Star this repo if you find it useful!

</div>
