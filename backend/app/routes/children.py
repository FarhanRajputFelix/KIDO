from datetime import date
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional

from app.core.database import get_db
from app.core.deps import get_current_user, get_current_parent
from app.models.user import User, UserRole
from app.models.child import ChildProfile
from app.models.activity import ActivityFeed, ActivityType
from app.schemas.child import ChildProfileCreate, ChildProfileOut, ChildProfileUpdate, XPAward, ChildLeaderboardEntry
from app.services.streak_service import update_streak
from app.services.game_service import check_level_up

router = APIRouter(prefix="/children", tags=["Children"])

XP_PER_LEVEL = 500


@router.post("/", response_model=ChildProfileOut, status_code=status.HTTP_201_CREATED)
def create_child(
    child_data: ChildProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    """Parent creates a child profile."""
    existing = db.query(ChildProfile).filter(ChildProfile.username == child_data.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already taken")

    # Create child user account
    from app.core.security import get_password_hash
    import random, string
    auto_password = ''.join(random.choices(string.ascii_letters + string.digits, k=12))

    child_user = User(
        email=f"{child_data.username}@kido.child",
        full_name=child_data.username,
        password_hash=get_password_hash(auto_password),
        role=UserRole.CHILD,
    )
    db.add(child_user)
    db.flush()

    child = ChildProfile(
        user_id=child_user.id,
        parent_id=current_user.id,
        username=child_data.username,
        age=child_data.age,
        grade=child_data.grade,
        avatar_url=child_data.avatar_url,
        daily_time_limit_minutes=child_data.daily_time_limit_minutes,
    )
    db.add(child)
    db.commit()
    db.refresh(child)
    return child


@router.get("/{child_id}", response_model=ChildProfileOut)
def get_child(child_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")
    # Parents can see their own child; children can see themselves
    if current_user.role == UserRole.CHILD and child.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    if current_user.role == UserRole.PARENT and child.parent_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    return child


@router.get("/me/profile", response_model=ChildProfileOut)
def get_my_profile(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")
    # Update streak on login
    update_streak(child, db)
    return child


@router.patch("/{child_id}", response_model=ChildProfileOut)
def update_child(
    child_id: int,
    updates: ChildProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id, ChildProfile.parent_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found or access denied")
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(child, field, value)
    db.commit()
    db.refresh(child)
    return child


@router.post("/{child_id}/award-xp", response_model=ChildProfileOut)
def award_xp(
    child_id: int,
    award: XPAward,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Award XP to a child (internal use by game/content services)."""
    child = db.query(ChildProfile).filter(ChildProfile.id == child_id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child not found")

    child.xp += award.xp_amount
    child.total_points += award.xp_amount

    # Level up check
    new_level = check_level_up(child.xp)
    leveled_up = new_level > child.level
    child.level = new_level

    # Log activity
    activity = ActivityFeed(
        child_id=child_id,
        activity_type=ActivityType.LEVEL_UP if leveled_up else ActivityType.LESSON_COMPLETED,
        title=f"+{award.xp_amount} XP earned!",
        description=f"Earned from {award.source}",
        xp_earned=award.xp_amount,
    )
    db.add(activity)
    db.commit()
    db.refresh(child)
    return child


@router.get("/leaderboard/global", response_model=List[ChildLeaderboardEntry])
def get_global_leaderboard(
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    children = db.query(ChildProfile).filter(ChildProfile.is_active == True).order_by(desc(ChildProfile.xp)).limit(limit).all()
    return [
        ChildLeaderboardEntry(
            child_id=c.id,
            username=c.username,
            avatar_url=c.avatar_url,
            xp=c.xp,
            level=c.level,
            streak_days=c.streak_days,
            rank=idx + 1,
        )
        for idx, c in enumerate(children)
    ]
