class KidoConstants {
  // ── API ─────────────────────────────────────────────────────────────────────
  // Change to your Vercel deployment URL in production
  static const String baseUrl = 'https://isp-exposed-belief-prominent.trycloudflare.com';

  // Mobile-specific endpoints
  static const String mobileLoginPath = '/api/mobile/auth/login';
  static const String mobileRegisterPath = '/api/mobile/auth/register';

  // ── Storage Keys ─────────────────────────────────────────────────────────────
  static const String tokenKey = 'kido_token';
  static const String userIdKey = 'kido_user_id';
  static const String userRoleKey = 'kido_user_role';
  static const String userNameKey = 'kido_user_name';
  static const String userEmailKey = 'kido_user_email';
  static const String childIdKey = 'kido_child_id';

  // ── XP / Levels ──────────────────────────────────────────────────────────────
  static const int xpPerLevel = 500;
  static const List<String> levelTitles = [
    'Beginner', 'Explorer', 'Learner', 'Scholar',
    'Expert', 'Master', 'Legend', 'Champion', 'Prodigy', 'Einstein',
  ];
  static const List<int> streakMilestones = [7, 14, 30, 60, 100];

  // ── Subjects ─────────────────────────────────────────────────────────────────
  static const List<String> subjects = [
    'Math', 'Science', 'English', 'History',
    'Geography', 'Coding', 'Art', 'General',
  ];

  // ── Difficulty ───────────────────────────────────────────────────────────────
  static const List<String> difficulties = ['easy', 'medium', 'hard'];

  static String getLevelTitle(int level) {
    if (level <= 0) return levelTitles[0];
    if (level > levelTitles.length) return levelTitles.last;
    return levelTitles[level - 1];
  }

  static int getLevel(int xp) => (xp / xpPerLevel).floor() + 1;
  static int getXpInCurrentLevel(int xp) => xp % xpPerLevel;
  static double getLevelProgress(int xp) => (xp % xpPerLevel) / xpPerLevel;
}
