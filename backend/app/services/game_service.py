from app.models.game import DifficultyLevel
from app.models.child import ChildProfile


XP_PER_LEVEL = 500

# XP awards by difficulty and score
XP_TABLE = {
    DifficultyLevel.EASY:   {90: 25, 70: 20, 50: 15, 0: 10},
    DifficultyLevel.MEDIUM: {90: 40, 70: 30, 50: 20, 0: 12},
    DifficultyLevel.HARD:   {90: 60, 70: 45, 50: 30, 0: 15},
    DifficultyLevel.ADAPTIVE: {90: 50, 70: 35, 50: 22, 0: 12},
}


def calculate_xp(score: int, difficulty: DifficultyLevel) -> int:
    """Calculate XP based on score and difficulty."""
    table = XP_TABLE.get(difficulty, XP_TABLE[DifficultyLevel.EASY])
    for threshold in sorted(table.keys(), reverse=True):
        if score >= threshold:
            return table[threshold]
    return 5


def get_adaptive_difficulty(child: ChildProfile) -> DifficultyLevel:
    """Choose quiz difficulty based on child's performance."""
    avg = child.avg_quiz_score
    if avg >= 85:
        return DifficultyLevel.HARD
    elif avg >= 65:
        return DifficultyLevel.MEDIUM
    else:
        return DifficultyLevel.EASY


def check_level_up(xp: int) -> int:
    """Return the current level based on XP."""
    return max(1, xp // XP_PER_LEVEL + 1)
