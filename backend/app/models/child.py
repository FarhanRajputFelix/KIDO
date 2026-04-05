from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Date, ForeignKey, Float
from sqlalchemy.orm import relationship
from app.core.database import Base


class ChildProfile(Base):
    __tablename__ = "child_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    parent_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    age = Column(Integer, nullable=False)
    avatar_url = Column(String, nullable=True)
    grade = Column(String, nullable=True)

    # Gamification
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    total_points = Column(Integer, default=0)
    streak_days = Column(Integer, default=0)
    last_active_date = Column(Date, nullable=True)
    longest_streak = Column(Integer, default=0)

    # Learning stats
    lessons_completed = Column(Integer, default=0)
    games_played = Column(Integer, default=0)
    avg_quiz_score = Column(Float, default=0.0)
    focus_score = Column(Float, default=0.0)

    # Parental controls
    daily_time_limit_minutes = Column(Integer, default=120)
    is_active = Column(Boolean, default=True)
    allow_social = Column(Boolean, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", foreign_keys=[user_id], backref="child_profile")
    parent = relationship("User", foreign_keys=[parent_id], backref="children")
    achievements = relationship("Achievement", back_populates="child")
    game_sessions = relationship("GameSession", back_populates="child")
    activities = relationship("ActivityFeed", back_populates="child")
    screen_time_logs = relationship("ScreenTimeLog", back_populates="child")
