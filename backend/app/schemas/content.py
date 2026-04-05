from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.content import ContentCategory, ContentType


class ContentCreate(BaseModel):
    title: str
    description: Optional[str] = None
    category: ContentCategory
    content_type: ContentType = ContentType.SHORT_VIDEO
    url_key: str
    thumbnail_url: Optional[str] = None
    duration_seconds: int = 60
    age_min: int = 6
    age_max: int = 14
    tags: Optional[str] = None


class ContentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[ContentCategory] = None
    is_featured: Optional[bool] = None
    age_min: Optional[int] = None
    age_max: Optional[int] = None


class ContentOut(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    category: ContentCategory
    content_type: ContentType
    url_key: str
    thumbnail_url: Optional[str] = None
    duration_seconds: int
    age_min: int
    age_max: int
    view_count: int
    avg_rating: float
    tags: Optional[str] = None
    teacher_id: Optional[int] = None
    is_featured: bool
    created_at: datetime

    class Config:
        from_attributes = True


class WatchLogCreate(BaseModel):
    content_id: int
    watch_duration_seconds: int
    completed: bool = False


class WatchLogOut(BaseModel):
    id: int
    child_id: int
    content_id: int
    watch_duration_seconds: int
    completed: bool
    xp_earned: int
    watched_at: datetime

    class Config:
        from_attributes = True
