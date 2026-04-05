from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base


class Badge(Base):
    __tablename__ = "badges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    description = Column(Text, nullable=True)
    icon_url = Column(String, nullable=True)
    xp_required = Column(Integer, default=0)
    condition_type = Column(String, nullable=True)   # "streak", "quiz_score", "lessons", etc.
    condition_value = Column(Integer, default=0)
    rarity = Column(String, default="common")        # common, rare, epic, legendary
    created_at = Column(DateTime, default=datetime.utcnow)


class Achievement(Base):
    __tablename__ = "achievements"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    badge_id = Column(Integer, ForeignKey("badges.id"), nullable=False)
    earned_at = Column(DateTime, default=datetime.utcnow)
    xp_at_time = Column(Integer, default=0)

    child = relationship("ChildProfile", back_populates="achievements")
    badge = relationship("Badge")


class DailyChallenge(Base):
    __tablename__ = "daily_challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    challenge_type = Column(String, nullable=False)  # "lesson", "game", "streak", "quiz"
    target_value = Column(Integer, default=1)
    xp_reward = Column(Integer, default=50)
    valid_date = Column(DateTime, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class ChallengeCompletion(Base):
    __tablename__ = "challenge_completions"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    challenge_id = Column(Integer, ForeignKey("daily_challenges.id"), nullable=False)
    completed_at = Column(DateTime, default=datetime.utcnow)
    xp_earned = Column(Integer, default=0)

    child = relationship("ChildProfile", backref="challenge_completions")
    challenge = relationship("DailyChallenge")
