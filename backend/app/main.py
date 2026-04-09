from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging

from app.core.config import settings
from app.core.database import create_all_tables
from app.routes import auth, children, content, games, social, parents, teachers, ai, agents

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("kido")

app = FastAPI(
    title=settings.APP_NAME,
    description="""
## 🚀 KIDO API — AI-Powered Learning Ecosystem for Children

KIDO is a complete backend API powering a safe, gamified learning platform for children (ages 6–14).

### Key Features
- 🔐 **JWT Authentication** with role-based access (child/parent/teacher/admin)
- 🎮 **Gamified Learning** — adaptive quizzes, XP, levels, achievements
- 📺 **Safe Video Platform** — age-filtered, no ads or external links
- 👥 **Parent-Controlled Social** — friend requests require parent approval
- 👨‍👩‍👧 **Parent Dashboard** — real-time monitoring, reports, safety alerts
- 🏫 **Teacher Integration** — classrooms, lesson uploads, student tracking
- 🤖 **AI Personalization** — learning paths, behavior analysis, recommendations
- 🔥 **Streak System** — daily streaks with milestone bonuses
    """,
    version=settings.APP_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Global Exception Handler ─────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled exception: {exc}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again."},
    )


# ── Startup ────────────────────────────────────────────────────────────────────
@app.on_event("startup")
async def startup_event():
    logger.info("🚀 KIDO API starting up...")
    create_all_tables()
    logger.info("✅ Database tables verified/created")


# ── Routers ────────────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(children.router)
app.include_router(content.router)
app.include_router(games.router)
app.include_router(social.router)
app.include_router(parents.router)
app.include_router(teachers.router)
app.include_router(ai.router)
app.include_router(agents.router)


# ── Root & Health ──────────────────────────────────────────────────────────────
@app.get("/", tags=["Health"])
def root():
    return {
        "message": "Welcome to the KIDO API 🚀",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "status": "healthy",
    }


@app.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }
