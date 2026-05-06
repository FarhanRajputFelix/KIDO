from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func, desc
from typing import List, Optional
from datetime import datetime, date, timedelta

from app.core.database import get_db
from app.core.deps import get_current_parent
from app.models.user import User
from app.models.child import ChildProfile
from app.models.parent import ParentProfile
from app.models.activity import ActivityFeed, SafetyAlert
from app.models.screen_time import ScreenTimeLog, ScreenTimeRule
from app.models.friend import FriendRequest, FriendRequestStatus
from app.models.game import GameSession
from app.models.content import WatchLog

router = APIRouter(prefix="/parents", tags=["Parents"])


@router.get("/dashboard")
def get_parent_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    """Full parent dashboard: all children, alerts, screen time summary."""
    children = db.query(ChildProfile).filter(ChildProfile.parent_id == current_user.id).all()

    dashboard = {
        "parent_id": current_user.id,
        "parent_name": current_user.full_name,
        "children_count": len(children),
        "children": [],
        "unread_alerts": 0,
    }

    total_alerts = 0
    for child in children:
        today = date.today()
        today_screen = db.query(func.sum(ScreenTimeLog.duration_minutes)).filter(
            ScreenTimeLog.child_id == child.id,
            ScreenTimeLog.session_date == today,
        ).scalar() or 0

        pending_friends = db.query(FriendRequest).filter(
            FriendRequest.receiver_id == child.id,
            FriendRequest.status == FriendRequestStatus.PENDING,
        ).count()

        unread_alerts = db.query(SafetyAlert).filter(
            SafetyAlert.child_id == child.id,
            SafetyAlert.is_read == False,
        ).count()
        total_alerts += unread_alerts

        recent_activities = db.query(ActivityFeed).filter(
            ActivityFeed.child_id == child.id
        ).order_by(desc(ActivityFeed.created_at)).limit(5).all()

        dashboard["children"].append({
            "id": child.id,
            "username": child.username,
            "age": child.age,
            "xp": child.xp,
            "level": child.level,
            "streak_days": child.streak_days,
            "today_screen_minutes": today_screen,
            "daily_limit_minutes": child.daily_time_limit_minutes,
            "pending_friend_requests": pending_friends,
            "unread_alerts": unread_alerts,
            "recent_activities": [
                {"type": a.activity_type.value, "title": a.title, "at": a.created_at.isoformat()}
                for a in recent_activities
            ],
        })

    dashboard["unread_alerts"] = total_alerts
    return dashboard


@router.get("/children/{child_id}/report")
def get_child_report(
    child_id: int,
    days: int = 7,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    """Weekly/monthly progress report for a child."""
    child = db.query(ChildProfile).filter(
        ChildProfile.id == child_id, ChildProfile.parent_id == current_user.id
    ).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    since = datetime.utcnow() - timedelta(days=days)

    game_sessions = db.query(GameSession).filter(
        GameSession.child_id == child_id,
        GameSession.played_at >= since,
    ).all()

    lessons_completed = db.query(WatchLog).filter(
        WatchLog.child_id == child_id,
        WatchLog.completed == True,
        WatchLog.watched_at >= since,
    ).count()

    screen_logs = db.query(ScreenTimeLog).filter(
        ScreenTimeLog.child_id == child_id,
        ScreenTimeLog.session_date >= since.date(),
    ).all()

    avg_score = 0
    if game_sessions:
        avg_score = sum(g.score for g in game_sessions) / len(game_sessions)

    return {
        "child_id": child_id,
        "username": child.username,
        "report_days": days,
        "xp": child.xp,
        "level": child.level,
        "streak_days": child.streak_days,
        "games_played": len(game_sessions),
        "avg_quiz_score": round(avg_score, 1),
        "lessons_completed": lessons_completed,
        "total_screen_minutes": sum(s.duration_minutes for s in screen_logs),
        "xp_earned_period": sum(g.xp_earned for g in game_sessions),
    }


@router.get("/alerts", response_model=List[dict])
def get_safety_alerts(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    alerts = db.query(SafetyAlert).filter(
        SafetyAlert.parent_id == current_user.id
    ).order_by(desc(SafetyAlert.created_at)).limit(50).all()
    return [
        {
            "id": a.id,
            "child_id": a.child_id,
            "alert_type": a.alert_type,
            "severity": a.severity,
            "message": a.message,
            "is_read": a.is_read,
            "created_at": a.created_at.isoformat(),
        }
        for a in alerts
    ]


@router.patch("/alerts/{alert_id}/read")
def mark_alert_read(
    alert_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    alert = db.query(SafetyAlert).filter(SafetyAlert.id == alert_id, SafetyAlert.parent_id == current_user.id).first()
    if not alert:
        raise HTTPException(status_code=404, detail="Alert not found")
    alert.is_read = True
    db.commit()
    return {"message": "Alert marked as read"}


@router.patch("/children/{child_id}/screen-time")
def update_screen_time_rules(
    child_id: int,
    weekday_limit: int = 90,
    weekend_limit: int = 120,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    child = db.query(ChildProfile).filter(
        ChildProfile.id == child_id, ChildProfile.parent_id == current_user.id
    ).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    child.daily_time_limit_minutes = weekday_limit
    rule = db.query(ScreenTimeRule).filter(ScreenTimeRule.child_id == child_id).first()
    if rule:
        rule.weekday_limit_minutes = weekday_limit
        rule.weekend_limit_minutes = weekend_limit
    else:
        rule = ScreenTimeRule(
            child_id=child_id,
            parent_id=current_user.id,
            weekday_limit_minutes=weekday_limit,
            weekend_limit_minutes=weekend_limit,
        )
        db.add(rule)
    db.commit()
    return {"message": "Screen time limits updated"}
