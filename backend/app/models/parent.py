from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class ParentProfile(Base):
    __tablename__ = "parent_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    phone_number = Column(String, nullable=True)
    notification_email = Column(String, nullable=True)
    receive_weekly_report = Column(Boolean, default=True)
    receive_safety_alerts = Column(Boolean, default=True)
    emergency_contact = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", backref="parent_profile")
