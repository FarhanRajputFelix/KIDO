from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.models.game import GameType, DifficultyLevel


class QuizQuestion(BaseModel):
    question: str
    option_a: str
    option_b: str
    option_c: Optional[str] = None
    option_d: Optional[str] = None
    correct_answer: str
    explanation: Optional[str] = None
    image_url: Optional[str] = None


class QuizSubmit(BaseModel):
    session_id: int
    answers: List[Dict[str, str]]  # [{"question_id": "1", "answer": "a"}]
    duration_seconds: int


class GameSessionCreate(BaseModel):
    game_type: GameType
    category: Optional[str] = None


class GameSessionOut(BaseModel):
    id: int
    child_id: int
    game_type: GameType
    difficulty: DifficultyLevel
    category: Optional[str] = None
    score: int
    max_score: int
    xp_earned: int
    correct_answers: int
    total_questions: int
    completed: bool
    duration_seconds: int
    played_at: datetime

    class Config:
        from_attributes = True


class GameStartResponse(BaseModel):
    session_id: int
    questions: List[QuizQuestion]
    difficulty: DifficultyLevel
    time_limit_seconds: int = 300


class GameResultResponse(BaseModel):
    session_id: int
    score: int
    max_score: int
    xp_earned: int
    correct_answers: int
    total_questions: int
    accuracy_percent: float
    new_level: Optional[int] = None
    badges_earned: List[str] = []
    next_difficulty: DifficultyLevel
