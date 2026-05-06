from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List

from app.core.database import get_db
from app.core.deps import get_current_user, get_current_parent
from app.models.user import User, UserRole
from app.models.child import ChildProfile
from app.models.friend import FriendRequest, Friendship, FriendRequestStatus, FriendCategory
from app.models.activity import ActivityFeed, ActivityType
from app.schemas.social import (
    FriendRequestCreate, FriendRequestApproval, FriendRequestOut,
    FriendOut, LeaderboardEntry, ActivityOut,
)

router = APIRouter(prefix="/social", tags=["Social"])


@router.post("/friends/request", response_model=FriendRequestOut, status_code=201)
def send_friend_request(
    req_data: FriendRequestCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Child sends a friend request by username."""
    my_child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not my_child:
        raise HTTPException(status_code=404, detail="Child profile not found")
    if not my_child.allow_social:
        raise HTTPException(status_code=403, detail="Social features disabled by parent")

    target = db.query(ChildProfile).filter(ChildProfile.username == req_data.receiver_username).first()
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if target.id == my_child.id:
        raise HTTPException(status_code=400, detail="Cannot send request to yourself")

    existing = db.query(FriendRequest).filter(
        FriendRequest.requester_id == my_child.id,
        FriendRequest.receiver_id == target.id,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Friend request already sent")

    friend_req = FriendRequest(
        requester_id=my_child.id,
        receiver_id=target.id,
        category=req_data.category,
        invite_code=req_data.invite_code,
    )
    db.add(friend_req)
    db.commit()
    db.refresh(friend_req)
    return friend_req


@router.post("/friends/parent-approve")
def parent_approve_request(
    approval: FriendRequestApproval,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_parent),
):
    """Parent approves or rejects a pending friend request for their child."""
    req = db.query(FriendRequest).filter(FriendRequest.id == approval.request_id).first()
    if not req:
        raise HTTPException(status_code=404, detail="Friend request not found")

    # Verify ownership
    child = db.query(ChildProfile).filter(
        ChildProfile.id == req.receiver_id,
        ChildProfile.parent_id == current_user.id,
    ).first()
    if not child:
        raise HTTPException(status_code=403, detail="Not your child's request")

    if approval.approve:
        req.status = FriendRequestStatus.APPROVED
        req.parent_approved = True
        req.approved_by_parent_id = current_user.id

        # Create friendship (bidirectional)
        f1 = Friendship(child_id=req.requester_id, friend_id=req.receiver_id, category=req.category)
        f2 = Friendship(child_id=req.receiver_id, friend_id=req.requester_id, category=req.category)
        db.add_all([f1, f2])

        # Log activity
        db.add(ActivityFeed(
            child_id=child.id,
            activity_type=ActivityType.FRIEND_ADDED,
            title="New friend added!",
            description="A new friend joined your circle.",
            xp_earned=10,
        ))
        child.xp += 10
    else:
        req.status = FriendRequestStatus.REJECTED

    db.commit()
    return {"message": "Friend request " + ("approved" if approval.approve else "rejected")}


@router.get("/friends", response_model=List[FriendOut])
def get_friends(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    friendships = db.query(Friendship).filter(Friendship.child_id == child.id).all()
    result = []
    for f in friendships:
        friend_profile = db.query(ChildProfile).filter(ChildProfile.id == f.friend_id).first()
        if friend_profile:
            result.append(FriendOut(
                friend_id=friend_profile.id,
                username=friend_profile.username,
                avatar_url=friend_profile.avatar_url,
                xp=friend_profile.xp,
                level=friend_profile.level,
                streak_days=friend_profile.streak_days,
                category=f.category,
                established_at=f.established_at,
            ))
    return result


@router.get("/leaderboard/friends", response_model=List[LeaderboardEntry])
def get_friend_leaderboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    friend_ids = [f.friend_id for f in db.query(Friendship).filter(Friendship.child_id == child.id).all()]
    friend_ids.append(child.id)  # Include self

    children = (
        db.query(ChildProfile)
        .filter(ChildProfile.id.in_(friend_ids))
        .order_by(desc(ChildProfile.xp))
        .all()
    )
    return [
        LeaderboardEntry(
            rank=i + 1,
            child_id=c.id,
            username=c.username,
            avatar_url=c.avatar_url,
            xp=c.xp,
            level=c.level,
            streak_days=c.streak_days,
            is_friend=(c.id != child.id),
        )
        for i, c in enumerate(children)
    ]


@router.get("/feed", response_model=List[ActivityOut])
def get_activity_feed(
    limit: int = 30,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    friend_ids = [f.friend_id for f in db.query(Friendship).filter(Friendship.child_id == child.id).all()]
    friend_ids.append(child.id)

    activities = (
        db.query(ActivityFeed)
        .filter(ActivityFeed.child_id.in_(friend_ids), ActivityFeed.is_public == True)
        .order_by(desc(ActivityFeed.created_at))
        .limit(limit)
        .all()
    )
    return activities
