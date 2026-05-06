import { XP_PER_LEVEL, STREAK_BONUSES, DIFFICULTY_THRESHOLDS, BADGE_DEFINITIONS } from "./constants";

// Calculate level from XP
export function calculateLevel(xp: number): number {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

// Calculate XP progress within current level
export function xpProgress(xp: number): { current: number; needed: number; percentage: number } {
  const current = xp % XP_PER_LEVEL;
  return {
    current,
    needed: XP_PER_LEVEL,
    percentage: Math.round((current / XP_PER_LEVEL) * 100),
  };
}

// Get streak bonus
export function getStreakBonus(streak: number): number {
  let bonus = 0;
  for (const [milestone, xp] of Object.entries(STREAK_BONUSES)) {
    if (streak >= parseInt(milestone)) {
      bonus = xp;
    }
  }
  return bonus;
}

// Determine adaptive difficulty based on recent scores
export function getAdaptiveDifficulty(recentScores: number[]): string {
  if (recentScores.length === 0) return "medium";
  const average = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
  if (average >= DIFFICULTY_THRESHOLDS.hard) return "hard";
  if (average >= DIFFICULTY_THRESHOLDS.medium) return "medium";
  return "easy";
}

// Check which badges a child has earned
export function checkBadgeEligibility(stats: {
  totalQuizzes: number;
  streak: number;
  level: number;
  friends: number;
  videosWatched: number;
  perfectScores: number;
  subjectQuizzes: Record<string, number>;
}): string[] {
  const earned: string[] = [];
  for (const badge of BADGE_DEFINITIONS) {
    const req = badge.requirement;
    switch (req.type) {
      case "quizzes":
        if (stats.totalQuizzes >= req.value) earned.push(badge.id);
        break;
      case "streak":
        if (stats.streak >= req.value) earned.push(badge.id);
        break;
      case "level":
        if (stats.level >= req.value) earned.push(badge.id);
        break;
      case "friends":
        if (stats.friends >= req.value) earned.push(badge.id);
        break;
      case "videos":
        if (stats.videosWatched >= req.value) earned.push(badge.id);
        break;
      case "perfect_score":
        if (stats.perfectScores >= req.value) earned.push(badge.id);
        break;
      case "subject_quizzes":
        const subject = (req as any).subject;
        if (subject && (stats.subjectQuizzes[subject] || 0) >= req.value)
          earned.push(badge.id);
        break;
    }
  }
  return earned;
}

// Format XP display
export function formatXP(xp: number): string {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M`;
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`;
  return xp.toString();
}

// Generate a random join code for classrooms
export function generateJoinCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Format relative time
export function timeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return then.toLocaleDateString();
}

// Clsx utility for conditional classnames
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
