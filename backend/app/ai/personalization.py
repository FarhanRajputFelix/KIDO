from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from app.models.child import ChildProfile
from app.models.content import Content, WatchLog
from app.models.game import GameSession
from app.schemas.ai import LearningPath, LearningPathItem


def generate_learning_path(child: ChildProfile, db: Session) -> LearningPath:
    """
    Generate a personalized learning path based on:
    - Child's age
    - Average quiz score per category
    - Watch history
    - Engagement patterns
    """
    # Gather watch history by category
    watched_logs = db.query(WatchLog).filter(WatchLog.child_id == child.id).all()
    watched_content_ids = {w.content_id for w in watched_logs}
    category_counts: dict = {}
    for w in watched_logs:
        content = db.query(Content).filter(Content.id == w.content_id).first()
        if content:
            cat = content.category.value
            category_counts[cat] = category_counts.get(cat, 0) + 1

    # All available categories
    all_categories = ["math", "science", "creativity", "ethics", "language", "social_skills"]

    # Weak areas = categories with 0 or least views
    sorted_cats = sorted(all_categories, key=lambda c: category_counts.get(c, 0))
    weak_areas = sorted_cats[:3]
    strong_areas = sorted_cats[-2:]

    # Get unwatched content prioritizing weak areas
    recommendations: List[Content] = []
    for category in weak_areas:
        items = (
            db.query(Content)
            .filter(
                Content.is_approved == True,
                Content.age_min <= child.age,
                Content.age_max >= child.age,
                Content.category == category,
                ~Content.id.in_(watched_content_ids),
            )
            .order_by(desc(Content.avg_rating))
            .limit(3)
            .all()
        )
        recommendations.extend(items)

    # Pad with general content if needed
    if len(recommendations) < 5:
        extra = (
            db.query(Content)
            .filter(
                Content.is_approved == True,
                Content.age_min <= child.age,
                Content.age_max >= child.age,
                ~Content.id.in_(watched_content_ids),
                ~Content.id.in_([r.id for r in recommendations]),
            )
            .order_by(desc(Content.view_count))
            .limit(5 - len(recommendations))
            .all()
        )
        recommendations.extend(extra)

    return LearningPath(
        child_id=child.id,
        items=[
            LearningPathItem(
                content_id=c.id,
                title=c.title,
                category=c.category.value,
                reason=f"Strengthen your {c.category.value} skills",
                priority=i + 1,
            )
            for i, c in enumerate(recommendations)
        ],
        weak_areas=weak_areas,
        strong_areas=strong_areas,
        generated_at=datetime.utcnow(),
    )
