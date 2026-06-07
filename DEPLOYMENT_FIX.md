# 🚑 KIDO — Why Vercel Shows "No Response" and How to Fix It

The code on Vercel is actually fine. The reason **nothing works in production** (no AI reply,
no database, login problems) is that **your secrets live only in your local `.env` file, which is
git-ignored and therefore NEVER uploaded to Vercel.** Vercel has no idea what your database or
Gemini key is.

You must add them in the Vercel dashboard. This takes ~5 minutes and is the single most important fix.

---

## 1. Add Environment Variables in Vercel (THE root cause)

Go to: **Vercel → your KIDO project → Settings → Environment Variables**

Add these four (select **Production**, **Preview**, and **Development** for each):

| Name | Value |
|------|-------|
| `DATABASE_URL` | Your Neon Postgres URL (the `postgresql://...neon.tech/neondb?sslmode=require` string) |
| `AUTH_SECRET` | A long random string. Generate with: `openssl rand -base64 32` |
| `GEMINI_API_KEY` | A **valid** Google AI Studio key — see section 2 ⚠️ |
| `RESEND_API_KEY` | API key from https://resend.com/api-keys (for signup verification emails) |
| `EMAIL_FROM` | *(optional)* `KIDO <noreply@yourdomain.com>` after you verify a domain in Resend. Leave unset to use Resend's test sender. |
| `NODE_ENV` | `production` |

> Do **NOT** set `NEXTAUTH_URL` on Vercel. NextAuth v5 (`trustHost: true`, already configured in
> `src/lib/auth.ts`) auto-detects the correct Vercel URL. A hardcoded value will break login.

After adding them, **redeploy** (Deployments → ⋯ → Redeploy). Env vars only take effect on a new build.

---

## 2. ⚠️ Your Gemini API key is INVALID — this is why the AI never replies

The key currently in `.env` is:

```
GEMINI_API_KEY="AQ.Ab8RN6Jd..."
```

Real Google AI Studio keys **start with `AIza`** (e.g. `AIzaSyD...`). A key starting with `AQ.` is an
OAuth token, not an API key, and the `@google/generative-ai` SDK cannot use it. Every AI call fails
and the app silently falls back to canned text — that's the "AI didn't reply" behavior.

**Get a real key (free):**
1. Go to https://aistudio.google.com/apikey
2. Click **Create API key** → copy the value (begins with `AIza`)
3. Put it in your local `.env` **and** in Vercel's `GEMINI_API_KEY` env var
4. Redeploy

Quick local test once you have a real key:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"
```
A JSON list of models = the key works. A `400/403` = the key is still wrong.

---

## 3. Database — push the new schema (REQUIRED this time)

This update added email verification, which needs DB changes: a new `VerificationCode`
table and an `emailVerified` column on `User`. **You must push the schema** or signup/login
will throw. From your machine:

```bash
cd kido-app
npm run db:push      # creates/updates all tables in Neon (adds VerificationCode + emailVerified)
npm run db:seed      # optional: demo content/quizzes (demo users are pre-verified)
```

> ⚠️ **Existing accounts:** the new login gate blocks users whose email isn't verified.
> Any accounts created **before** this update have `emailVerified = NULL` and would be locked
> out. Mark them verified once with this SQL (Neon SQL editor or `psql`):
> ```sql
> UPDATE "User" SET "emailVerified" = NOW() WHERE "emailVerified" IS NULL;
> ```

Without `db:push`, the tables don't exist and every API call throws — looking like "nothing is connected."

---

## 4. Local machine fix (already done in this session)

Your local `package.json` had 15 garbage characters (`U7888888888888`) before the opening `{`,
which would break `npm install` / `npm run build` locally. **This has been repaired.** (The version
committed to GitHub was already clean, so Vercel was unaffected.)

---

## 5. What the privacy fix changed (already done in this session)

Previously, any logged-in account could read **any** child's chat, quizzes, reports, screen time,
etc. by passing a different `childId` — that's why "one child's chat was visible to other children,
teachers, and parents."

A central guard (`src/lib/access.ts → getAccessibleChild`) now runs on every child-scoped API route.
Access rules:
- **Parent** → only their own children
- **Teacher** → only students in their classrooms
- **Child** → only their own profile
- **Admin** → everything

Unauthorized access now returns `403`.

---

## 6. Email verification (new in this update)

New signups now go: **Register → /verify (enter 6-digit code) → Login**. The code is emailed
via Resend and expires in 15 minutes. There's a "Resend code" button on the verify screen.
If `RESEND_API_KEY` is missing, the code is printed to the server logs instead of emailed, so
local testing isn't blocked.

---

## Checklist
- [ ] `DATABASE_URL`, `AUTH_SECRET`, `GEMINI_API_KEY`, `RESEND_API_KEY`, `NODE_ENV` set in Vercel
- [ ] `GEMINI_API_KEY` starts with `AIza` (regenerated from Google AI Studio)
- [ ] `NEXTAUTH_URL` NOT set on Vercel
- [ ] `npm run db:push` run against the Neon database (adds VerificationCode + emailVerified)
- [ ] Existing users backfilled: `UPDATE "User" SET "emailVerified" = NOW() WHERE "emailVerified" IS NULL;`
- [ ] Redeployed after adding env vars
