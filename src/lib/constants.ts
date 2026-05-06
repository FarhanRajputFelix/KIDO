// ─── Gamification Constants ──────────────────────────
export const XP_PER_LEVEL = 500;
export const STREAK_BONUSES: Record<number, number> = {
  7: 100,
  14: 250,
  30: 500,
  60: 1000,
  100: 2500,
};

// ─── Difficulty Thresholds ───────────────────────────
export const DIFFICULTY_THRESHOLDS = {
  hard: 85,
  medium: 65,
  easy: 0,
};

// ─── Badge Definitions ──────────────────────────────
export const BADGE_DEFINITIONS = [
  { id: "first_quiz", name: "First Quiz!", description: "Complete your first quiz", icon: "🎯", category: "quiz", requirement: { type: "quizzes", value: 1 } },
  { id: "quiz_master", name: "Quiz Master", description: "Complete 50 quizzes", icon: "🏆", category: "quiz", requirement: { type: "quizzes", value: 50 } },
  { id: "perfect_score", name: "Perfect Score", description: "Get 100% on any quiz", icon: "💯", category: "quiz", requirement: { type: "perfect_score", value: 1 } },
  { id: "streak_7", name: "Week Warrior", description: "7-day streak", icon: "🔥", category: "streak", requirement: { type: "streak", value: 7 } },
  { id: "streak_30", name: "Monthly Master", description: "30-day streak", icon: "⚡", category: "streak", requirement: { type: "streak", value: 30 } },
  { id: "streak_100", name: "Century Club", description: "100-day streak", icon: "👑", category: "streak", requirement: { type: "streak", value: 100 } },
  { id: "level_5", name: "Rising Star", description: "Reach Level 5", icon: "⭐", category: "learning", requirement: { type: "level", value: 5 } },
  { id: "level_10", name: "Knowledge Seeker", description: "Reach Level 10", icon: "🌟", category: "learning", requirement: { type: "level", value: 10 } },
  { id: "first_friend", name: "Social Butterfly", description: "Add your first friend", icon: "🦋", category: "social", requirement: { type: "friends", value: 1 } },
  { id: "video_watcher", name: "Video Explorer", description: "Watch 10 videos", icon: "📺", category: "learning", requirement: { type: "videos", value: 10 } },
  { id: "math_whiz", name: "Math Whiz", description: "Complete 10 math quizzes", icon: "🧮", category: "learning", requirement: { type: "subject_quizzes", value: 10, subject: "math" } },
  { id: "science_star", name: "Science Star", description: "Complete 10 science quizzes", icon: "🔬", category: "learning", requirement: { type: "subject_quizzes", value: 10, subject: "science" } },
];

// ─── Subjects ────────────────────────────────────────
export const SUBJECTS = [
  { id: "math", name: "Mathematics", icon: "🧮", color: "#6366f1" },
  { id: "science", name: "Science", icon: "🔬", color: "#10b981" },
  { id: "english", name: "English", icon: "📚", color: "#f59e0b" },
  { id: "history", name: "History", icon: "🏛️", color: "#ef4444" },
  { id: "geography", name: "Geography", icon: "🌍", color: "#3b82f6" },
  { id: "coding", name: "Coding", icon: "💻", color: "#8b5cf6" },
  { id: "art", name: "Art & Music", icon: "🎨", color: "#ec4899" },
  { id: "general", name: "General Knowledge", icon: "🧠", color: "#14b8a6" },
];

// ─── Avatar Options ──────────────────────────────────
export const AVATARS = [
  "🦁", "🐼", "🦊", "🐱", "🐶", "🦄", "🐸", "🦋",
  "🐯", "🐧", "🐨", "🐰", "🦉", "🐬", "🦒", "🐙",
];

// ─── Screen Time Presets ─────────────────────────────
export const SCREEN_TIME_PRESETS = [
  { label: "30 min", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "1.5 hours", value: 90 },
  { label: "2 hours", value: 120 },
  { label: "3 hours", value: 180 },
];
