import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SAEnum, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class ActivityType(str, enum.Enum):
    LESSON_COMPLETED = "lesson_completed"
    GAME_WON = "game_won"
    STREAK_ACHIEVED = "streak_achieved"
    BADGE_EARNED = "badge_earned"
    LEVEL_UP = "level_up"
    FRIEND_ADDED = "friend_added"
    CHALLENGE_COMPLETED = "challenge_completed"


class ActivityFeed(Base):
    __tablename__ = "activity_feed"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    activity_type = Column(SAEnum(ActivityType), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    xp_earned = Column(Integer, default=0)
    reference_id = Column(Integer, nullable=True)   # FK to game/content/badge
    reference_type = Column(String, nullable=True)  # "game", "content", "badge"
    is_public = Column(Boolean, default=True)       # Visible to friends
    created_at = Column(DateTime, default=datetime.utcnow)

    child = relationship("ChildProfile", back_populates="activities")


class SafetyAlert(Base):
    __tablename__ = "safety_alerts"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    parent_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    alert_type = Column(String, nullable=False)   # "suspicious_activity", "behavior_change", etc.
    severity = Column(String, default="low")      # low, medium, high, critical
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    is_resolved = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    child = relationship("ChildProfile", backref="safety_alerts")
