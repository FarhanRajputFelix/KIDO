from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from sqlalchemy import desc

from app.models.child import ChildProfile
from app.models.game import GameSession
from app.models.content import WatchLog
from app.schemas.ai import BehaviorAnalysis


def analyze_behavior(child: ChildProfile, db: Session) -> BehaviorAnalysis:
    """
    Analyze child's behavioral patterns over the last 14 days.
    Detects engagement trends, stress indicators, and activity drops.
    """
    now = datetime.utcnow()
    period_14 = now - timedelta(days=14)
    period_7 = now - timedelta(days=7)

    # Activity in last 14 days vs last 7 days
    all_games = db.query(GameSession).filter(
        GameSession.child_id == child.id,
        GameSession.played_at >= period_14,
    ).all()
    recent_games = [g for g in all_games if g.played_at >= period_7]
    older_games = [g for g in all_games if g.played_at < period_7]

    # Trend detection
    if len(recent_games) > len(older_games) * 1.2:
        activity_trend = "increasing"
    elif len(recent_games) < len(older_games) * 0.5:
        activity_trend = "decreasing"
    else:
        activity_trend = "stable"

    # Engagement score (0-100)
    if child.games_played == 0:
        engagement_score = 0.0
    else:
        streak_factor = min(child.streak_days * 3, 30)
        score_factor = child.avg_quiz_score * 0.4
        activity_factor = min(len(recent_games) * 5, 30)
        engagement_score = round(min(streak_factor + score_factor + activity_factor, 100.0), 1)

    # Stress indicators
    stress_indicators = []
    if child.avg_quiz_score < 40:
        stress_indicators.append("Low quiz scores — content may be too difficult")
    if activity_trend == "decreasing":
        stress_indicators.append("Significant drop in activity over last 7 days")
    if child.streak_days == 0 and child.games_played > 5:
        stress_indicators.append("Streak lost after regular activity")
    if len(recent_games) == 0 and child.games_played > 0:
        stress_indicators.append("No activity in the last 7 days")

    # Recommendations
    recs = []
    if activity_trend == "decreasing":
        recs.append("Try introducing a new game category to re-engage the child")
        recs.append("Consider reducing daily difficulty temporarily")
    if child.avg_quiz_score < 50:
        recs.append("Recommend easier quiz levels to rebuild confidence")
    if engagement_score > 80:
        recs.append("Child is highly engaged — consider unlocking advanced content")
    if not recs:
        recs.append("Child is performing well — maintain current routine")

    # Alerts for parent
    alerts = []
    if engagement_score < 20:
        alerts.append("⚠️ Very low engagement — requires parent attention")
    if "Significant drop" in str(stress_indicators):
        alerts.append("📉 Activity dropped significantly this week")

    return BehaviorAnalysis(
        child_id=child.id,
        engagement_score=engagement_score,
        stress_indicators=stress_indicators,
        activity_trend=activity_trend,
        recommendations=recs,
        alerts=alerts,
        analyzed_at=now,
    )
