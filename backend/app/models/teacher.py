from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class TeacherProfile(Base):
    __tablename__ = "teacher_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    school_name = Column(String, nullable=True)
    school_email_domain = Column(String, nullable=True)
    subject_specialty = Column(String, nullable=True)
    grade_levels = Column(String, nullable=True)  # CSV: "Grade 1,Grade 2"
    is_verified = Column(Boolean, default=False)
    verification_code = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    total_students = Column(Integer, default=0)
    total_lessons_uploaded = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", backref="teacher_profile")
    lessons = relationship("Content", back_populates="teacher")


class Classroom(Base):
    __tablename__ = "classrooms"

    id = Column(Integer, primary_key=True, index=True)
    teacher_id = Column(Integer, ForeignKey("teacher_profiles.id"), nullable=False)
    name = Column(String, nullable=False)
    grade = Column(String, nullable=False)
    invite_code = Column(String, unique=True, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    teacher = relationship("TeacherProfile", backref="classrooms")
    enrollments = relationship("ClassroomEnrollment", back_populates="classroom")


class ClassroomEnrollment(Base):
    __tablename__ = "classroom_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    classroom_id = Column(Integer, ForeignKey("classrooms.id"), nullable=False)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    parent_approved = Column(Boolean, default=False)
    joined_at = Column(DateTime, default=datetime.utcnow)

    classroom = relationship("Classroom", back_populates="enrollments")
    child = relationship("ChildProfile", backref="enrollments")
