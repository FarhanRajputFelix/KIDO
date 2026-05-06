from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from app.models.friend import FriendRequestStatus, FriendCategory
from app.models.activity import ActivityType


class FriendRequestCreate(BaseModel):
    receiver_username: str
    category: FriendCategory = FriendCategory.SCHOOL
    invite_code: Optional[str] = None


class FriendRequestApproval(BaseModel):
    request_id: int
    approve: bool


class FriendRequestOut(BaseModel):
    id: int
    requester_id: int
    receiver_id: int
    status: FriendRequestStatus
    category: FriendCategory
    parent_approved: bool
    created_at: datetime

    class Config:
        from_attributes = True


class FriendOut(BaseModel):
    friend_id: int
    username: str
    avatar_url: Optional[str] = None
    xp: int
    level: int
    streak_days: int
    category: FriendCategory
    established_at: datetime

    class Config:
        from_attributes = True


class LeaderboardEntry(BaseModel):
    rank: int
    child_id: int
    username: str
    avatar_url: Optional[str] = None
    xp: int
    level: int
    streak_days: int
    is_friend: bool = False


class ActivityOut(BaseModel):
    id: int
    child_id: int
    activity_type: ActivityType
    title: str
    description: Optional[str] = None
    xp_earned: int
    created_at: datetime

    class Config:
        from_attributes = True
