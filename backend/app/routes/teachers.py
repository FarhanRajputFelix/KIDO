from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
import string, random

from app.core.database import get_db
from app.core.deps import get_current_teacher, get_current_user
from app.models.user import User, UserRole
from app.models.teacher import TeacherProfile, Classroom, ClassroomEnrollment
from app.models.child import ChildProfile
from app.models.content import Content
from app.models.game import GameSession

router = APIRouter(prefix="/teachers", tags=["Teachers"])


def gen_invite_code(length: int = 8) -> str:
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


@router.get("/profile")
def get_teacher_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_teacher),
):
    profile = db.query(TeacherProfile).filter(TeacherProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Teacher profile not found")
    return {
        "id": profile.id,
        "name": current_user.full_name,
        "email": current_user.email,
        "school": profile.school_name,
        "subject": profile.subject_specialty,
        "is_verified": profile.is_verified,
        "total_students": profile.total_students,
        "total_lessons": profile.total_lessons_uploaded,
    }


@router.post("/classrooms", status_code=201)
def create_classroom(
    name: str,
    grade: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_teacher),
):
    teacher = db.query(TeacherProfile).filter(TeacherProfile.user_id == current_user.id).first()
    if not teacher:
        raise HTTPException(status_code=404, detail="Teacher profile not found")

    classroom = Classroom(
        teacher_id=teacher.id,
        name=name,
        grade=grade,
        invite_code=gen_invite_code(),
    )
    db.add(classroom)
    db.commit()
    db.refresh(classroom)
    return {"id": classroom.id, "name": classroom.name, "grade": classroom.grade, "invite_code": classroom.invite_code}


@router.get("/classrooms")
def get_classrooms(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_teacher),
):
    teacher = db.query(TeacherProfile).filter(TeacherProfile.user_id == current_user.id).first()
    classrooms = db.query(Classroom).filter(Classroom.teacher_id == teacher.id).all()
    return [{"id": c.id, "name": c.name, "grade": c.grade, "invite_code": c.invite_code} for c in classrooms]


@router.get("/classrooms/{classroom_id}/students")
def get_students(
    classroom_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_teacher),
):
    teacher = db.query(TeacherProfile).filter(TeacherProfile.user_id == current_user.id).first()
    classroom = db.query(Classroom).filter(Classroom.id == classroom_id, Classroom.teacher_id == teacher.id).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Classroom not found")

    enrollments = db.query(ClassroomEnrollment).filter(
        ClassroomEnrollment.classroom_id == classroom_id,
        ClassroomEnrollment.parent_approved == True,
    ).all()

    students = []
    for e in enrollments:
        child = db.query(ChildProfile).filter(ChildProfile.id == e.child_id).first()
        if child:
            games_played = db.query(GameSession).filter(GameSession.child_id == child.id).count()
            students.append({
                "child_id": child.id,
                "username": child.username,
                "age": child.age,
                "xp": child.xp,
                "level": child.level,
                "streak": child.streak_days,
                "games_played": games_played,
                "lessons_completed": child.lessons_completed,
                "avg_quiz_score": child.avg_quiz_score,
            })
    return sorted(students, key=lambda s: s["xp"], reverse=True)


@router.get("/lessons")
def get_teacher_lessons(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_teacher),
):
    teacher = db.query(TeacherProfile).filter(TeacherProfile.user_id == current_user.id).first()
    lessons = db.query(Content).filter(Content.teacher_id == teacher.id).order_by(desc(Content.created_at)).all()
    return lessons


@router.post("/join-classroom")
def join_classroom(
    invite_code: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Child joins a classroom via invite code."""
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    classroom = db.query(Classroom).filter(Classroom.invite_code == invite_code, Classroom.is_active == True).first()
    if not classroom:
        raise HTTPException(status_code=404, detail="Invalid invite code")

    existing = db.query(ClassroomEnrollment).filter(
        ClassroomEnrollment.classroom_id == classroom.id,
        ClassroomEnrollment.child_id == child.id,
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")

    enrollment = ClassroomEnrollment(
        classroom_id=classroom.id,
        child_id=child.id,
        parent_approved=False,
    )
    db.add(enrollment)
    db.commit()
    return {"message": "Enrollment request submitted. Awaiting parent approval.", "classroom": classroom.name}
