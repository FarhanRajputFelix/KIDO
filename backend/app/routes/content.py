from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User, UserRole
from app.models.content import Content, ContentCategory, ContentType, WatchLog
from app.models.child import ChildProfile
from app.schemas.content import ContentCreate, ContentOut, ContentUpdate, WatchLogCreate, WatchLogOut

router = APIRouter(prefix="/content", tags=["Content"])

XP_PER_LESSON_COMPLETION = 30
XP_PER_SHORT_VIDEO = 10


@router.get("/", response_model=List[ContentOut])
def list_content(
    category: Optional[ContentCategory] = None,
    content_type: Optional[ContentType] = None,
    age: Optional[int] = None,
    featured: bool = False,
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all approved content with filtering."""
    q = db.query(Content).filter(Content.is_approved == True)
    if category:
        q = q.filter(Content.category == category)
    if content_type:
        q = q.filter(Content.content_type == content_type)
    if age:
        q = q.filter(Content.age_min <= age, Content.age_max >= age)
    if featured:
        q = q.filter(Content.is_featured == True)
    return q.order_by(desc(Content.view_count)).offset(skip).limit(limit).all()


@router.get("/{content_id}", response_model=ContentOut)
def get_content(content_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    content = db.query(Content).filter(Content.id == content_id, Content.is_approved == True).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    # Increment view count
    content.view_count += 1
    db.commit()
    db.refresh(content)
    return content


@router.post("/watch-log", response_model=WatchLogOut, status_code=201)
def log_watch(
    log_data: WatchLogCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Log a child's watch session and award XP."""
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    content = db.query(Content).filter(Content.id == log_data.content_id).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")

    xp = XP_PER_LESSON_COMPLETION if log_data.completed else XP_PER_SHORT_VIDEO
    watch_log = WatchLog(
        child_id=child.id,
        content_id=log_data.content_id,
        watch_duration_seconds=log_data.watch_duration_seconds,
        completed=log_data.completed,
        xp_earned=xp,
    )
    db.add(watch_log)
    if log_data.completed:
        child.xp += xp
        child.lessons_completed += 1

    db.commit()
    db.refresh(watch_log)
    return watch_log


@router.post("/", response_model=ContentOut, status_code=201)
def create_content(
    content_data: ContentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Teachers or admins can upload content."""
    if current_user.role not in [UserRole.TEACHER, UserRole.ADMIN]:
        raise HTTPException(status_code=403, detail="Only teachers can upload content")

    from app.models.teacher import TeacherProfile
    teacher_profile = db.query(TeacherProfile).filter(TeacherProfile.user_id == current_user.id).first()

    content = Content(
        **content_data.model_dump(),
        teacher_id=teacher_profile.id if teacher_profile else None,
        is_approved=(current_user.role == UserRole.ADMIN),
    )
    db.add(content)
    db.commit()
    db.refresh(content)
    return content


@router.get("/recommend/{child_id}", response_model=List[ContentOut])
def get_recommendations(
    child_id: int,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Simple rule-based content recommendations for a child."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    # Get watched content IDs
    watched_ids = [w.content_id for w in db.query(WatchLog).filter(WatchLog.child_id == child_id).all()]

    # Recommend unwatched content for child's age
    recommendations = (
        db.query(Content)
        .filter(
            Content.is_approved == True,
            Content.age_min <= child.age,
            Content.age_max >= child.age,
            ~Content.id.in_(watched_ids),
        )
        .order_by(desc(Content.avg_rating), desc(Content.view_count))
        .limit(limit)
        .all()
    )
    return recommendations
