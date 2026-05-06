from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import datetime, timedelta
from app.models.child import ChildProfile
from app.models.activity import SafetyAlert
from app.models.game import GameSession
from app.models.content import WatchLog


SUSPICIOUS_KEYWORDS = [
    "hate", "kill", "violence", "inappropriate", "adult", "18+", "xxx",
    "drug", "weapon", "bully", "abuse"
]


def check_content_safety(text: str) -> bool:
    """Return True if content is safe, False if flagged."""
    lower = text.lower()
    return not any(kw in lower for kw in SUSPICIOUS_KEYWORDS)


def check_inactivity_alert(child: ChildProfile, db: Session) -> None:
    """Fire alert if child has been suddenly inactive after regular usage."""
    recent_sessions = db.query(GameSession).filter(
        GameSession.child_id == child.id,
        GameSession.played_at >= datetime.utcnow() - timedelta(days=14),
    ).count()

    if child.games_played > 10 and recent_sessions == 0:
        existing = db.query(SafetyAlert).filter(
            SafetyAlert.child_id == child.id,
            SafetyAlert.alert_type == "sudden_inactivity",
            SafetyAlert.is_resolved == False,
        ).first()
        if not existing:
            alert = SafetyAlert(
                child_id=child.id,
                parent_id=child.parent_id,
                alert_type="sudden_inactivity",
                severity="medium",
                message=f"{child.username} has not played any games in 14 days after previously being very active.",
            )
            db.add(alert)
            db.commit()


def check_screen_time_exceeded(child: ChildProfile, today_minutes: int, db: Session) -> None:
    """Fire alert if screen time is exceeded."""
    if today_minutes > child.daily_time_limit_minutes:
        existing = db.query(SafetyAlert).filter(
            SafetyAlert.child_id == child.id,
            SafetyAlert.alert_type == "screen_time_exceeded",
            SafetyAlert.created_at >= datetime.utcnow() - timedelta(hours=24),
        ).first()
        if not existing:
            alert = SafetyAlert(
                child_id=child.id,
                parent_id=child.parent_id,
                alert_type="screen_time_exceeded",
                severity="low",
                message=f"{child.username} has exceeded their daily screen time limit ({today_minutes} min vs limit {child.daily_time_limit_minutes} min).",
            )
            db.add(alert)
            db.commit()
