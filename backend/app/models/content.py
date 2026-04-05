import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SAEnum, Text, Float
from sqlalchemy.orm import relationship
from app.core.database import Base


class ContentCategory(str, enum.Enum):
    MATH = "math"
    SCIENCE = "science"
    CREATIVITY = "creativity"
    ETHICS = "ethics"
    LANGUAGE = "language"
    SOCIAL_SKILLS = "social_skills"
    NATURE = "nature"
    CODING = "coding"


class ContentType(str, enum.Enum):
    SHORT_VIDEO = "short_video"    # 30-90 sec
    LONG_VIDEO = "long_video"      # 5-15 min
    INTERACTIVE = "interactive"
    LESSON = "lesson"


class Content(Base):
    __tablename__ = "content"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=True)
    category = Column(SAEnum(ContentCategory), nullable=False)
    content_type = Column(SAEnum(ContentType), nullable=False, default=ContentType.SHORT_VIDEO)
    url_key = Column(String, nullable=False)        # S3 key or CDN path
    thumbnail_url = Column(String, nullable=True)
    duration_seconds = Column(Integer, nullable=False, default=60)
    age_min = Column(Integer, default=6)
    age_max = Column(Integer, default=14)
    teacher_id = Column(Integer, ForeignKey("teacher_profiles.id"), nullable=True)
    is_approved = Column(Boolean, default=True)
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)
    avg_rating = Column(Float, default=0.0)
    tags = Column(String, nullable=True)             # CSV: "animals,fun,grade3"
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    teacher = relationship("TeacherProfile", back_populates="lessons")
    watch_logs = relationship("WatchLog", back_populates="content")


class WatchLog(Base):
    __tablename__ = "watch_logs"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    content_id = Column(Integer, ForeignKey("content.id"), nullable=False)
    watch_duration_seconds = Column(Integer, default=0)
    completed = Column(Boolean, default=False)
    xp_earned = Column(Integer, default=0)
    watched_at = Column(DateTime, default=datetime.utcnow)

    child = relationship("ChildProfile", backref="watch_logs")
    content = relationship("Content", back_populates="watch_logs")
