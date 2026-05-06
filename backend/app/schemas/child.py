from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class ChildProfileCreate(BaseModel):
    username: str
    age: int
    grade: Optional[str] = None
    avatar_url: Optional[str] = None
    daily_time_limit_minutes: int = 120


class ChildProfileUpdate(BaseModel):
    username: Optional[str] = None
    age: Optional[int] = None
    grade: Optional[str] = None
    avatar_url: Optional[str] = None
    daily_time_limit_minutes: Optional[int] = None
    allow_social: Optional[bool] = None


class XPAward(BaseModel):
    xp_amount: int
    source: str  # "lesson", "game", "streak"
    reference_id: Optional[int] = None


class ChildProfileOut(BaseModel):
    id: int
    user_id: int
    username: str
    age: int
    grade: Optional[str] = None
    avatar_url: Optional[str] = None
    xp: int
    level: int
    total_points: int
    streak_days: int
    longest_streak: int
    lessons_completed: int
    games_played: int
    avg_quiz_score: float
    daily_time_limit_minutes: int
    allow_social: bool
    created_at: datetime

    class Config:
        from_attributes = True


class ChildLeaderboardEntry(BaseModel):
    child_id: int
    username: str
    avatar_url: Optional[str] = None
    xp: int
    level: int
    streak_days: int
    rank: int

    class Config:
        from_attributes = True
