from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from datetime import datetime

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.child import ChildProfile
from app.models.content import Content, WatchLog
from app.models.game import GameSession
from app.schemas.ai import LearningPath, LearningPathItem, BehaviorAnalysis, RecommendationRequest
from app.ai.personalization import generate_learning_path
from app.ai.behavior_analysis import analyze_behavior

router = APIRouter(prefix="/ai", tags=["AI Personalization"])


@router.get("/learning-path/{child_id}", response_model=LearningPath)
def get_learning_path(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Generate a personalized learning path for a child."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    return generate_learning_path(child, db)


@router.get("/behavior/{child_id}", response_model=BehaviorAnalysis)
def get_behavior_analysis(
    child_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Analyze child's behavior patterns and engagement."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    return analyze_behavior(child, db)


@router.post("/recommend", response_model=List[dict])
def get_ai_recommendations(
    request: RecommendationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Smart content recommendations powered by engagement history."""
    child = db.query(ChildProfile).filter(ChildProfile.id == request.child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    watched_ids = [w.content_id for w in db.query(WatchLog).filter(WatchLog.child_id == child.id).all()]

    q = db.query(Content).filter(
        Content.is_approved == True,
        Content.age_min <= child.age,
        Content.age_max >= child.age,
        ~Content.id.in_(watched_ids),
    )
    if request.category:
        from app.models.content import ContentCategory
        q = q.filter(Content.category == request.category)
    if request.content_type:
        from app.models.content import ContentType
        q = q.filter(Content.content_type == request.content_type)

    recommendations = q.order_by(desc(Content.avg_rating), desc(Content.view_count)).limit(request.limit).all()
    return [
        {
            "content_id": c.id,
            "title": c.title,
            "category": c.category.value,
            "duration_seconds": c.duration_seconds,
            "thumbnail_url": c.thumbnail_url,
            "reason": "Based on your learning history and weak areas",
        }
        for c in recommendations
    ]
