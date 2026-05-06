class KidoConstants {
  // API Base URL — change this to your deployed backend URL
  static const String baseUrl = 'http://localhost:8000';
  static const String apiVersion = 'v1';

  // Storage Keys
  static const String tokenKey = 'kido_access_token';
  static const String refreshTokenKey = 'kido_refresh_token';
  static const String userIdKey = 'kido_user_id';
  static const String userRoleKey = 'kido_user_role';
  static const String childIdKey = 'kido_child_id';

  // XP / Levels
  static const int xpPerLevel = 500;
  static const List<String> levelTitles = [
    'Beginner', 'Explorer', 'Learner', 'Scholar',
    'Expert', 'Master', 'Legend', 'Champion', 'Prodigy', 'Einstein',
  ];

  // Streak colors
  static const List<int> streakMilestones = [7, 14, 30, 60, 100];

  // Game Categories
  static const List<String> gameCategories = [
    'Math', 'Science', 'Language', 'Creativity', 'Ethics', 'General',
  ];

  // Content Categories
  static const List<String> contentCategories = [
    'math', 'science', 'creativity', 'ethics', 'language', 'social_skills', 'nature', 'coding',
  ];

  static String getLevelTitle(int level) {
    if (level <= 0) return levelTitles[0];
    if (level > levelTitles.length) return levelTitles.last;
    return levelTitles[level - 1];
  }
}
