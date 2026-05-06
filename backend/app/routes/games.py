from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
import random

from app.core.database import get_db
from app.core.deps import get_current_user
from app.models.user import User, UserRole
from app.models.game import GameSession, GameType, DifficultyLevel, Quiz
from app.models.child import ChildProfile
from app.models.activity import ActivityFeed, ActivityType
from app.schemas.game import (
    GameSessionCreate, GameSessionOut, GameStartResponse, GameResultResponse,
    QuizQuestion,
)
from app.services.game_service import calculate_xp, get_adaptive_difficulty, check_level_up

router = APIRouter(prefix="/games", tags=["Games"])


@router.post("/quiz/start", response_model=GameStartResponse)
def start_quiz(
    session_data: GameSessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Start a new quiz game session."""
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    difficulty = get_adaptive_difficulty(child)

    # Get questions
    q = db.query(Quiz).filter(
        Quiz.age_min <= child.age,
        Quiz.age_max >= child.age,
        Quiz.difficulty == difficulty,
    )
    if session_data.category:
        q = q.filter(Quiz.category == session_data.category)

    all_questions = q.all()
    if len(all_questions) == 0:
        # Fallback: any difficulty
        all_questions = db.query(Quiz).filter(Quiz.age_min <= child.age, Quiz.age_max >= child.age).all()

    questions = random.sample(all_questions, min(10, len(all_questions)))

    # Create session
    game_session = GameSession(
        child_id=child.id,
        game_type=GameType.QUIZ,
        difficulty=difficulty,
        category=session_data.category,
        total_questions=len(questions),
    )
    db.add(game_session)
    db.commit()
    db.refresh(game_session)

    question_schemas = [
        QuizQuestion(
            question=q.question,
            option_a=q.option_a,
            option_b=q.option_b,
            option_c=q.option_c,
            option_d=q.option_d,
            correct_answer=q.correct_answer,
            explanation=q.explanation,
            image_url=q.image_url,
        )
        for q in questions
    ]

    return GameStartResponse(
        session_id=game_session.id,
        questions=question_schemas,
        difficulty=difficulty,
        time_limit_seconds=300,
    )


@router.post("/quiz/submit", response_model=GameResultResponse)
def submit_quiz(
    session_id: int,
    answers: List[dict],
    duration_seconds: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Submit quiz answers and get results."""
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")

    game_session = db.query(GameSession).filter(GameSession.id == session_id, GameSession.child_id == child.id).first()
    if not game_session:
        raise HTTPException(status_code=404, detail="Game session not found")

    # Score calculation (answers = [{"question_id": "...", "answer": "a"}])
    correct = len([a for a in answers if a.get("correct", False)])
    total = game_session.total_questions or len(answers)
    score = int((correct / max(total, 1)) * 100)
    xp = calculate_xp(score, game_session.difficulty)

    game_session.score = score
    game_session.max_score = 100
    game_session.correct_answers = correct
    game_session.total_questions = total
    game_session.xp_earned = xp
    game_session.duration_seconds = duration_seconds
    game_session.completed = True

    child.xp += xp
    child.total_points += xp
    child.games_played += 1
    old_avg = child.avg_quiz_score
    child.avg_quiz_score = (old_avg * (child.games_played - 1) + score) / child.games_played

    new_level = check_level_up(child.xp)
    leveled_up = new_level > child.level
    old_level = child.level
    child.level = new_level

    # Activity log
    activity = ActivityFeed(
        child_id=child.id,
        activity_type=ActivityType.GAME_WON if score >= 70 else ActivityType.LESSON_COMPLETED,
        title=f"Quiz completed! Score: {score}%",
        description=f"Earned {xp} XP",
        xp_earned=xp,
        reference_id=game_session.id,
        reference_type="game",
    )
    db.add(activity)
    db.commit()

    next_difficulty = get_adaptive_difficulty(child)

    return GameResultResponse(
        session_id=game_session.id,
        score=score,
        max_score=100,
        xp_earned=xp,
        correct_answers=correct,
        total_questions=total,
        accuracy_percent=round((correct / max(total, 1)) * 100, 1),
        new_level=new_level if leveled_up else None,
        badges_earned=[],
        next_difficulty=next_difficulty,
    )


@router.get("/history", response_model=List[GameSessionOut])
def get_game_history(
    limit: int = 20,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    child = db.query(ChildProfile).filter(ChildProfile.user_id == current_user.id).first()
    if not child:
        raise HTTPException(status_code=404, detail="Child profile not found")
    sessions = db.query(GameSession).filter(GameSession.child_id == child.id).order_by(desc(GameSession.played_at)).limit(limit).all()
    return sessions
