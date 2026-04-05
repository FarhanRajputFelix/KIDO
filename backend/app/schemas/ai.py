from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime


class LearningPathItem(BaseModel):
    content_id: int
    title: str
    category: str
    reason: str
    priority: int


class LearningPath(BaseModel):
    child_id: int
    items: List[LearningPathItem]
    weak_areas: List[str]
    strong_areas: List[str]
    generated_at: datetime


class BehaviorAnalysis(BaseModel):
    child_id: int
    engagement_score: float       # 0-100
    stress_indicators: List[str]
    activity_trend: str           # "increasing", "stable", "decreasing"
    recommendations: List[str]
    alerts: List[str]
    analyzed_at: datetime


class RecommendationRequest(BaseModel):
    child_id: int
    content_type: Optional[str] = None   # "video", "game"
    category: Optional[str] = None
    limit: int = 10


class AIInsight(BaseModel):
    insight_type: str
    message: str
    confidence: float
    action_required: bool = False
