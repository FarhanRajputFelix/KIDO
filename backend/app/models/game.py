import enum
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Enum as SAEnum, Text, Float, JSON
from sqlalchemy.orm import relationship
from app.core.database import Base


class GameType(str, enum.Enum):
    QUIZ = "quiz"
    MEMORY = "memory"
    DRAWING = "drawing"
    PUZZLE = "puzzle"
    BRAIN_TEASER = "brain_teaser"


class DifficultyLevel(str, enum.Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"
    ADAPTIVE = "adaptive"


class GameSession(Base):
    __tablename__ = "game_sessions"

    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("child_profiles.id"), nullable=False)
    game_type = Column(SAEnum(GameType), nullable=False, default=GameType.QUIZ)
    difficulty = Column(SAEnum(DifficultyLevel), nullable=False, default=DifficultyLevel.EASY)
    category = Column(String, nullable=True)
    score = Column(Integer, default=0)
    max_score = Column(Integer, default=100)
    xp_earned = Column(Integer, default=0)
    duration_seconds = Column(Integer, default=0)
    correct_answers = Column(Integer, default=0)
    total_questions = Column(Integer, default=0)
    completed = Column(Boolean, default=False)
    game_data = Column(JSON, nullable=True)  # Stores Q&A pairs, moves, etc.
    played_at = Column(DateTime, default=datetime.utcnow)

    child = relationship("ChildProfile", back_populates="game_sessions")


class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=True)
    option_d = Column(String, nullable=True)
    correct_answer = Column(String, nullable=False)  # 'a', 'b', 'c', or 'd'
    explanation = Column(Text, nullable=True)
    category = Column(String, nullable=False)
    difficulty = Column(SAEnum(DifficultyLevel), default=DifficultyLevel.EASY)
    age_min = Column(Integer, default=6)
    age_max = Column(Integer, default=14)
    image_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
