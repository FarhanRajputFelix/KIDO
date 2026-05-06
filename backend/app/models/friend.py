import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SAEnum
from sqlalchemy.orm import relationship
from app.core.database import Base


class FriendRequestStatus(str, enum.Enum):
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"
    BLOCKED = "blocked"


class FriendCategory(str, enum.Enum):
    FAMILY = "family"
    SCHOOL = "school"
    NEIGHBOR = "neighbor"
    OTHER = "other"


class FriendRequest(Base):
    __tablename__ = "friend_requests"

    id = Column(Integer, primary_key=True, index=True)
    requester_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    receiver_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    status = Column(SAEnum(FriendRequestStatus), default=FriendRequestStatus.PENDING)
    category = Column(SAEnum(FriendCategory), default=FriendCategory.SCHOOL)
    parent_approved = Column(Boolean, default=False)
    approved_by_parent_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    invite_code = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    requester = relationship("ChildProfile", foreign_keys=[requester_id], backref="sent_requests")
    receiver = relationship("ChildProfile", foreign_keys=[receiver_id], backref="received_requests")


class Friendship(Base):
    __tablename__ = "friendships"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    friend_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    category = Column(SAEnum(FriendCategory), default=FriendCategory.SCHOOL)
    established_at = Column(DateTime, default=datetime.utcnow)

    child = relationship("ChildProfile", foreign_keys=[child_id], backref="friendships")
    friend = relationship("ChildProfile", foreign_keys=[friend_id])
