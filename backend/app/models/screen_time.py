from datetime import datetime, date
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class ScreenTimeLog(Base):
    __tablename__ = "screen_time_logs"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    session_date = Column(Date, nullable=False, default=date.today)
    start_time = Column(DateTime, nullable=False, default=datetime.utcnow)
    end_time = Column(DateTime, nullable=True)
    duration_minutes = Column(Integer, default=0)
    activity_type = Column(String, nullable=True)  # "lesson", "game", "social"
    is_limit_exceeded = Column(Boolean, default=False)

    child = relationship("ChildProfile", back_populates="screen_time_logs")


class ScreenTimeRule(Base):
    __tablename__ = "screen_time_rules"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False, unique=True)
    parent_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    weekday_limit_minutes = Column(Integer, default=90)
    weekend_limit_minutes = Column(Integer, default=120)
    block_after_time = Column(String, nullable=True)   # "21:00"
    block_before_time = Column(String, nullable=True)  # "07:00"
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    child = relationship("ChildProfile", backref="screen_time_rule")
