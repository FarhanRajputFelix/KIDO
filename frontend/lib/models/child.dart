class Child {
  final String id;
  final String name;
  final int age;
  final String? grade;
  final int xp;
  final int level;
  final int streak;
  final int longestStreak;
  final int totalQuizzes;
  final String? avatar;
  final List<String> badges;
  final List<String> strongSubjects;
  final List<String> weakSubjects;
  final String parentId;
  final DateTime createdAt;

  const Child({
    required this.id,
    required this.name,
    required this.age,
    this.grade,
    required this.xp,
    required this.level,
    required this.streak,
    required this.longestStreak,
    required this.totalQuizzes,
    this.avatar,
    required this.badges,
    required this.strongSubjects,
    required this.weakSubjects,
    required this.parentId,
    required this.createdAt,
  });

  static List<String> _parseJsonList(dynamic val) {
    if (val == null) return [];
    if (val is List) return val.cast<String>();
    try {
      final s = val as String;
      if (s.isEmpty || s == '[]') return [];
      return (s.replaceAll('[', '').replaceAll(']', '').replaceAll('"', '').split(','))
          .map((e) => e.trim())
          .where((e) => e.isNotEmpty)
          .toList();
    } catch (_) {
      return [];
    }
  }

  factory Child.fromJson(Map<String, dynamic> j) => Child(
        id: j['id'] as String,
        name: j['name'] as String,
        age: j['age'] as int,
        grade: j['grade'] as String?,
        xp: j['xp'] as int? ?? 0,
        level: j['level'] as int? ?? 1,
        streak: j['streak'] as int? ?? 0,
        longestStreak: j['longestStreak'] as int? ?? 0,
        totalQuizzes: j['totalQuizzes'] as int? ?? 0,
        avatar: j['avatar'] as String?,
        badges: _parseJsonList(j['badges']),
        strongSubjects: _parseJsonList(j['strongSubjects']),
        weakSubjects: _parseJsonList(j['weakSubjects']),
        parentId: j['parentId'] as String,
        createdAt: DateTime.tryParse(j['createdAt'] as String? ?? '') ?? DateTime.now(),
      );

  double get levelProgress => (xp % 500) / 500.0;
  int get xpToNextLevel => 500 - (xp % 500);
}
