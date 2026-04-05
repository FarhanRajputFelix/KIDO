from datetime import date, timedelta
from sqlalchemy.orm import Session
from app.models.child import ChildProfile
from app.models.activity import ActivityFeed, ActivityType


def update_streak(child: ChildProfile, db: Session) -> None:
    """Update daily streak. Call on every child login/activity."""
    today = date.today()
    yesterday = today - timedelta(days=1)

    if child.last_active_date == today:
        return  # Already updated today

    if child.last_active_date == yesterday:
        # Consecutive day — extend streak
        child.streak_days += 1
        if child.streak_days > child.longest_streak:
            child.longest_streak = child.streak_days

        # Bonus XP for milestones
        milestone_xp = 0
        if child.streak_days in {7, 14, 30, 60, 100}:
            milestone_xp = child.streak_days * 5
            child.xp += milestone_xp
            db.add(ActivityFeed(
                child_id=child.id,
                activity_type=ActivityType.STREAK_ACHIEVED,
                title=f"🔥 {child.streak_days}-day streak!",
                description=f"Amazing consistency! +{milestone_xp} bonus XP",
                xp_earned=milestone_xp,
            ))
    elif child.last_active_date is None or child.last_active_date < yesterday:
        # Streak broken or first time
        if child.streak_days > 0:
            db.add(ActivityFeed(
                child_id=child.id,
                activity_type=ActivityType.STREAK_ACHIEVED,
                title="Streak reset",
                description=f"Previous streak: {child.streak_days} days. Start again!",
                xp_earned=0,
            ))
        child.streak_days = 1  # Start fresh

    child.last_active_date = today
    db.commit()
