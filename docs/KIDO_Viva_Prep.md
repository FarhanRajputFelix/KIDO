# 🎓 KIDO — Viva Preparation Guide (CSC-4101 AI, SZABIST)

> Study this. Speak in your own words. Every answer ties back to the textbook (Russell & Norvig) and the marking rubric.

---

## 0. The one-line pitch (memorize this)
> "KIDO is a **rational, beneficial multi-agent system** for children under 15. Its agents **perceive** a child's learning state, **reason** about it using a ReAct loop, **call tools** to act, and **reflect** to stay correct — all **bounded by verifiable parental consent** so the system stays provably beneficial."

This single sentence hits: rational agent, beneficial machine, ReAct, tool-calling, reflection, safety.

---

## 1. Core textbook concepts you MUST be able to define

**Intelligent agent (Ch. 2):** an entity that **perceives** its environment through sensors and **acts** upon it through actuators to achieve goals.

**Rational agent:** selects the action **expected to maximize its performance measure**, given its percepts and knowledge.

**Beneficial machine (Ch. 1, "standard model" critique):** AI should be **provably beneficial and aligned with human values** — it should not blindly optimize its own objective. In KIDO, human values = **the parent's authority**; agents never act on social/enrollment decisions without parental approval.

**ReAct pattern (Reason + Act):** instead of one-shot text-in/text-out, the agent **reasons** about its state, **identifies missing information**, and **calls external tools** to fulfill the goal — looping until done.

### PEAS for KIDO (be ready to write this on the board)
| | |
|---|---|
| **Performance measure** | Learning gain (quiz-accuracy trend), engagement without burnout, streak retention, **zero safety incidents**, parental-consent compliance |
| **Environment** | The child's knowledge state, activity history, social graph, screen-time |
| **Actuators** | Generate quiz/tutor/game/video recommendations, adapt difficulty, raise parent alerts, gate friend/classroom requests |
| **Sensors** | Quiz scores, response times, session length, watch logs, messages, screen-time logs |

### Task-environment properties (and why they fit the Karachi/real-world brief)
- **Partially observable** — we never fully see the child's true understanding, only proxies (scores, timing).
- **Stochastic** — a child's performance varies unpredictably.
- **Sequential** — today's actions affect tomorrow's learning path.
- **Dynamic** — the child's state changes over time.
- **Continuous-ish / multi-agent** — multiple specialized agents act together.

---

## 2. The Agentic AI Workflow (this earns the 15% "Agentic Workflow" marks)

**Why it is *agentic*, not a chatbot wrapper:**
A wrapper does `prompt → text`. KIDO runs an autonomous loop with **three rubric-named capabilities**:

1. **Tool-calling** — agents call real tools, not just generate text:
   - `read child profile / quiz history` (database query)
   - `generateText()` (LLM: Groq → Gemini fallback)
   - `score & update XP/level/streak` (business logic)
   - `createParentAlert()` (actuator)
   - `fallback content banks` (deterministic tool when the LLM is unavailable)

2. **Planning** — on a trigger (e.g., quiz submitted), the orchestrator **plans which agents to run and in what order**, building a shared context each agent reads/writes.

3. **Reflection** — a **Contradiction-Detection** meta-agent checks whether agents disagree, and a **Fallback-Recovery** agent guarantees a safe output if the LLM fails or quota is hit. This self-checking *is* reflection.

**The loop (say it as a cycle):**
> **OBSERVE** (read the child's state) → **ANALYZE** (each agent reasons) → **DECIDE** (combine results, resolve contradictions) → **ACT** (update progress, raise alerts, adapt difficulty) → **LEARN** (persist an `AgentTrace`; next run uses the new state).

This maps directly to the textbook's **perceive → think → act** agent cycle, extended with reflection.

**Explainability:** every run is saved as an `AgentTrace` (each agent's result + confidence + whether fallback/contradiction fired). You can *show* the examiner the reasoning — strong evidence it's a real agentic system.

---

## 3. The agents — what each perceives and does
Frame each as a mini-agent (perception → decision → action):

| Agent | Perceives | Decides / Acts |
|-------|-----------|----------------|
| **Learning Agent** | quiz scores, weak/strong subjects | recommends next difficulty & learning path |
| **Engagement Agent** | session length, response times | detects boredom → switches format (video ↔ quiz) |
| **Behavior Analyst** | activity/score trends | flags **burnout risk**, mood patterns |
| **Safety Agent** | social messages | blocks unsafe language → critical parent alert |
| **Parent-Insight Agent** | aggregated signals | generates weekly insights & smart alerts |
| **Content-Moderation Agent** | content before serving | screens for unsafe/age-inappropriate material |
| **Contradiction-Detection** (meta) | all agent outputs | flags conflicting signals (reflection) |
| **Fallback-Recovery** (meta) | LLM status | guarantees a safe result if AI fails |

> If asked "how many agents?": *"A core set of specialized task-agents plus two meta-agents for reflection (contradiction detection and fallback recovery)."*

---

## 4. Other functionality (and how it ties to the agent system)
- **Adaptive Quizzes** — the Learning Agent sets difficulty; questions are LLM-generated with a deterministic fallback bank.
- **AI Tutor (multi-session)** — a ReAct tutor that teaches step-by-step, age-tuned; never just gives the answer.
- **AI Games** — word/story/math challenges generated per child.
- **Safe Video Library** — **age-gated** (each child sees only their age band) — this is the Content-Moderation/age-restriction layer in action.
- **Gamification** — XP, levels, streaks, badges, leaderboard = the **performance-measure feedback** that motivates the child.
- **Dashboards** — child, parent, teacher, admin — each a different *view* with role-based access.

---

## 5. Safety & Compliance — the "beneficial machine" (30% of marks: VPC 15 + Data-Min 5 + others)

**Verifiable Parental Consent (VPC) — the headline safety feature:**
- Child sends a friend request → it is **pending** and a **parent alert** is raised → **the friendship/messaging activates ONLY after a parent approves**.
- Same for **classroom enrollment**: a teacher shares a join code → the child requests → **a parent must approve** before the child is enrolled. *A teacher can never add a child unilaterally.*

**Data Minimization (privacy-by-design):** only learning-relevant data is stored; no ads, no third-party trackers; child accounts are provisioned by a parent.

**Access control / isolation:** a central server-side guard (`getAccessibleChild`) ensures a user can only access **their own** child's data — any cross-account attempt is rejected (this is the equivalent of Firebase Security Rules).

**Alignment argument (say this):** *"The agents are powerful but never autonomous over a child's social life — every consequential action is gated by the parent. That is exactly the 'beneficial machine': the AI defers to human (parental) values."*

---

## 6. Handling the "Firebase" question (IMPORTANT — prepare this)
The manual lists Firebase/Firestore/Vertex AI as **one suggested path**. If asked why you didn't use Firebase:

> "The manual lists those as suggested tools, not a hard requirement. We met the **same objectives with an equivalent, production-grade stack**:
> - Firestore **Security Rules** → our **server-side `getAccessibleChild` authorization guard** (role-based: parent/child/teacher/admin).
> - Vertex AI / Genkit → **Groq (Llama-3.3) with a Gemini fallback** — free, fast, and resilient.
> - We deployed live on Vercel with PostgreSQL (Neon) + Prisma, which gave us relational integrity for the learning graph.
> The **agentic workflow, VPC, and data-minimization principles are identical** — only the vendor differs."

This turns a potential weakness into a confident, reasoned engineering decision.

---

## 7. Map your answers to the marking rubric
| Criterion (weight) | What to say / show |
|---|---|
| **Agentic Workflow (15%)** | The OADAL loop + tool-calling + planning + reflection (contradiction & fallback); show an AgentTrace. |
| **Model Accuracy (15%)** | LLM + rule-based hybrid; age-tuned prompts; deterministic fallbacks ensure correct, safe outputs even offline. |
| **UI/UX for <15 (10%)** | Big buttons, emojis, instant visual feedback (XP/level-up), gamified, distraction-free. |
| **Backend Stability (15%)** | Role-based auth guard (our "security rules"), relational schema, validated APIs, deployed & live. |
| **VPC (15%)** | Friend + classroom parent-approval flows; demo it live. |
| **Data Minimization (5%)** | Only learning data; no ads/trackers; parent-provisioned child accounts. |
| **Societal Value (10%)** | Personalization + safety for Pakistan's under-15 learners. |
| **Innovation (5%)** | Multi-agent reflection loop + a real deployed product (not a wrapper). |
| **GitHub/DevOps (5%)** | Atomic commits, README, continuous deploy. |
| **Presentation/Ethics (5%)** | Ethical AI checklist + this defense. |

---

## 8. Rapid-fire viva Q&A (rehearse out loud)

**Q: Define an intelligent agent.** → "Perceives its environment via sensors and acts via actuators to achieve goals; a *rational* agent picks the action that maximizes its expected performance measure."

**Q: What makes KIDO 'agentic' and not a ChatGPT wrapper?** → "It runs an autonomous Observe→Analyze→Decide→Act→Learn loop with tool-calling, planning across multiple agents, and reflection (contradiction detection + fallback). A wrapper just maps a prompt to text."

**Q: Explain the ReAct pattern in your project.** → "The agent reasons about the child's state, identifies what it's missing (e.g., recent scores), calls a tool to fetch it, then acts — e.g., adapt difficulty or raise an alert — looping until the goal is met."

**Q: What is your performance measure?** → (give the PEAS performance line).

**Q: Is your environment fully or partially observable?** → "Partially observable — we infer understanding from proxies like scores and response time, never the child's true mental state. Also stochastic, sequential, dynamic."

**Q: How is it a 'beneficial machine'?** → "Agents never finalize social/enrollment actions; the parent must approve. The system defers to human values — that's provably-beneficial alignment."

**Q: How do you ensure safety/COPPA?** → VPC + age-gating + moderation + data minimization + role-based access.

**Q: What happens if the AI/LLM fails?** → "The Fallback-Recovery agent returns curated, safe content from deterministic banks — the app never hard-fails. That's reflection + robustness."

**Q: Biggest limitation / future work?** → "Free-tier LLM rate limits (paid tier in production); future: CV-based drawing feedback and voice tutoring; richer analytics."

**Q: Your individual contribution?** → (each member states their phase/role from the team slide).

---

## 9. Closing line for the viva
> "KIDO proves that an agentic AI system can be **powerful, explainable, and provably safe for children** — and we've taken it all the way to a **live, deployed, installable product**, not just a prototype."
