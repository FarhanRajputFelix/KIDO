# 🔧 KIDO — What We Implemented & How (by Role)
### Grounded in the actual codebase — use this to defend exactly what exists.

**Stack (facts):** Next.js 15 (App Router, full-stack) · Prisma ORM + Neon PostgreSQL · NextAuth v5 (Credentials + JWT) + bcrypt · AI: Groq `llama-3.3-70b` → Gemini `2.0-flash` → curated fallback banks · Deployed on Vercel · Installable PWA + signed Android APK.

---

## 👑 FARHAN (Lead) — AI / Agentic System / Backend / Architecture

### 1. The Multi-Agent AI Pipeline — `src/lib/agents.ts`
**What:** A function `runAgentPipeline(context)` that runs specialized agents on each learning event.
**How it works:**
- A trigger (e.g., quiz submitted) builds an **`AgentContext`** from the child's data (scores, trend, weak/strong subjects, session length, response time, streak, level).
- Each agent **reads the context, reasons, and returns a structured result + a confidence score** (Learning, Engagement, Behavior, Safety, Parent-Insight, Content-Moderation, etc.).
- A **Contradiction-Detection** step checks if agents disagree; a **Fallback-Recovery** step guarantees a safe result.
- The whole run is saved as an **`AgentTrace`** row (per-agent results, overall confidence, fallback/contradiction flags, final recommendations) → **explainability**.
**Where it's triggered:** `src/app/api/quiz/attempt/route.ts` calls it fire-and-forget after scoring; `src/app/api/agents/trace/route.ts` runs it on demand and turns agent outputs into **real `ParentAlert` rows** (burnout, safety, pace).

### 2. The AI provider layer — `src/lib/gemini.ts`
**What:** One provider-agnostic generator used by every AI feature.
**How:** `generateText()` → tries **Groq** (`callGroq`, OpenAI-compatible) → on failure loops through **Gemini** models → on failure the caller returns a **curated content bank**. A **circuit breaker** skips quota-exhausted models for 60s. Functions: `generateQuiz`, `generateProgressReport`, `chatWithStudent` (tutor), `generateGameChallenge`. **Result: the AI never hard-fails.**

### 3. Authorization & data isolation — `src/lib/access.ts`
**What:** `getAccessibleChild(session, childId)` — the single security gate.
**How:** Returns the child only if **parent owns it / teacher has it in a classroom / admin / child-self**; else `null` → route returns **403**. Applied to **all 11 child-scoped routes** (chat, quiz, report, game, screen-time, quiz-attempt, agents-trace, friends, children-manage, classrooms-join, videos-watch). *This is our equivalent of Firebase Security Rules.*

### 4. Auth & data model
- `src/lib/auth.ts` + `mobile-auth.ts` — NextAuth v5 Credentials provider, **JWT** sessions, **bcrypt** password hashing, role in token (parent/child/teacher/admin), optional email-verification gate.
- `prisma/schema.prisma` — the relational learning graph: `User, Child, Quiz, QuizAttempt, ChatSession, ChatMessage, FriendRequest, Classroom, AgentTrace, GameAttempt, FriendMessage, ParentAlert, ScreenTimeLog, ProgressReport, VerificationCode`.
- `src/app/api/quiz/attempt/route.ts` — **scoring engine**: grades answers, computes XP (difficulty-weighted), updates level (`calculateLevel`), updates streak, logs activity, triggers the agent pipeline.
- `src/app/api/dashboard/route.ts` — returns **role-specific** data (parent/teacher/child/admin).

---

## 🎨 ZUBAIR KHAN — UI / UX / Frontend

### 1. Role-based dashboards — `src/app/dashboard/{kid,parent,teacher,admin}/page.tsx`
- **Kid:** XP/level/streak hero, subject cards, badges, friends, pending friend requests, activity feed, bottom nav. (`dashboard/kid`)
- **Parent:** child switcher, tabs — Overview, **Alerts**, **Friends (approve)**, **Classrooms (approve)**, AI Reports, Screen-Time, AI Agents; **Add Child** modal (creates child + optional login). (`dashboard/parent`)
- **Teacher:** create classroom + **copyable join code**, enrolled/pending counts, AI quiz generator. (`dashboard/teacher`)

### 2. AI Tutor (multi-session) — `src/app/chat/page.tsx`
**How:** Loads chat **sessions** from `/api/ai/chat`, sidebar with **+ New Chat**, click a session to load its messages, send → POST creates/continues a session, delete a session. Renders markdown-ish formatting.

### 3. Age-gated Video Library — `src/app/videos/page.tsx`
**How:** A curated video list with `ageMin/ageMax`; filters to the **child's age** (`ageOk`), **search box**, **category chips**; clicking opens a **YouTube embed** (iframe `youtube-nocookie`); on play, POSTs to `/api/videos/watch` to **award XP once**.

### 4. AI Games + Quiz UI
- `src/app/games/{math-arena,word-builder,story-creator}` — load AI-generated challenges, play, and POST results to `/api/games/attempt` for XP.
- `src/app/quiz` + `quiz/[id]` — take quiz, submit, results screen (score, XP, level-up).
- Leaderboard, Messages, Login, Register, Verify pages.

### 5. Design system — `src/app/globals.css`
**How:** CSS variables for brand colors; reusable classes (`card`, `btn-primary`, `chip`, `hero-banner`, `xp-bar`, `badge`, `chat-bubble`), playful rounded "toy-like" styling, animations, **responsive** (desktop 2-column / mobile), bright kid theme. Plus the floating **KidoBot** component and **EventFeed**.

---

## 📑 SYED MUHAMMAD ASGHAR — Documentation & Research

### What was produced (in `docs/` + repo root):
- **Problem formulation** — Pakistan education-gap analysis, **PEAS**, task-environment classification (partially observable, stochastic, dynamic).
- **Research** — **COPPA / child-safety** requirements; the **beneficial-machine** and **ReAct** framing from Russell & Norvig.
- **Final Report** (`docs/KIDO_Final_Report` → PDF), **README.md**, the **Proposal**, the **Presentation**, the **Viva & Defense guides**, and the **Ethical AI checklist**.
- Ensured the documentation maps the implementation to the **textbook** and the **marking rubric**.

---

## 🧪 CHAUDHARY SABOOR MUNIR — Testing, QA & Deployment

### 1. Testing & QA (how we verified it works)
- **Authorization tests:** attempt to access another family's child → confirmed **403** (via `getAccessibleChild`).
- **Adversarial AI tests:** forced LLM quota/errors → confirmed every feature **falls back** to curated content (no crash).
- **Consent-flow tests:** friend + classroom requests verified to **stay pending until a parent approves**.
- **CI checks:** `tsc --noEmit` type-check + `next build` production build run before every deploy.
- **Cross-device:** responsive layout verified on desktop + mobile.

### 2. Deployment & DevOps
- **Vercel** continuous deploy from GitHub; `vercel.json` + build = `prisma generate && next build`; environment variables configured in Vercel.
- **PWA:** `public/sw.js` (network-first service worker, skips `/api`), `src/app/manifest.ts` (installable manifest), `ServiceWorker.tsx` (registration), and the icon set (192/512/maskable).
- **Android APK:** packaged as a **Trusted Web Activity**, **zip-aligned and signed** with `apksigner` (v1+v2+v3), repointed to the live URL → installable `KIDO-app.apk`.

---

## 🔄 END-TO-END FLOWS (any member should be able to walk these)

**A. Child takes a quiz →** `quiz/[id]` submit → `/api/quiz/attempt` grades it → updates **XP/level/streak** → logs activity → **fires the agent pipeline** → pipeline may raise **parent alerts** → results screen shows score + XP.

**B. Friend request (VPC) →** child enters friend code → `/api/friends` creates a **pending** request + **alerts both parents** → it shows as *pending* on both kids' dashboards → **parent approves** in Parent Panel → `/api/friends/approve` marks it approved → they become friends → can **message** (`/api/messages`, approved-only).

**C. Classroom (VPC) →** teacher creates class (`/api/classrooms`) → shares **join code** → child enters code → `/api/classrooms/join` queues it in **`pendingStudentIds`** + alerts parent → **parent approves** (`/api/classrooms/approve`) → child moves to enrolled `studentIds`.

**D. AI Tutor →** child sends a message → `/api/ai/chat` (auth + access check) → `chatWithStudent()` → **Groq → Gemini → fallback** → saved in the child's **chat session** → rendered in the sidebar UI.

**E. Video →** child opens `/videos` → list filtered by **age** → plays YouTube embed → `/api/videos/watch` awards **XP once**.

---

### One-sentence summary per member
- **Farhan:** built the **agentic AI pipeline, the resilient AI provider layer, the security/authorization guard, and the data model + scoring backend**.
- **Zubair:** built **all the dashboards, the AI-tutor chat, the age-gated video library, games/quiz UI, and the kid-friendly design system**.
- **Asghar:** produced **the research (COPPA, PEAS, textbook mapping), the report, README, presentation, and ethics checklist**.
- **Saboor:** owned **testing (security/adversarial/consent), CI, and deployment (Vercel + PWA + signed APK)**.
