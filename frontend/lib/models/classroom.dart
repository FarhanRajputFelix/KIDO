class Classroom {
  final String id;
  final String name;
  final String subject;
  final String joinCode;
  final String teacherId;
  final List<String> studentIds;
  final DateTime createdAt;
  final List<Map<String, dynamic>> lessons;

  const Classroom({
    required this.id,
    required this.name,
    required this.subject,
    required this.joinCode,
    required this.teacherId,
    required this.studentIds,
    required this.createdAt,
    required this.lessons,
  });

  factory Classroom.fromJson(Map<String, dynamic> j) {
    List<String> ids = [];
    final raw = j['studentIds'];
    if (raw is List) {
      ids = raw.cast<String>();
    } else if (raw is String) {
      try {
        ids = (raw.replaceAll('[', '').replaceAll(']', '').replaceAll('"', '').split(','))
            .map((e) => e.trim())
            .where((e) => e.isNotEmpty)
            .toList();
      } catch (_) {}
    }
    return Classroom(
      id: j['id'] as String,
      name: j['name'] as String,
      subject: j['subject'] as String? ?? '',
      joinCode: j['joinCode'] as String? ?? '',
      teacherId: j['teacherId'] as String,
      studentIds: ids,
      createdAt: DateTime.tryParse(j['createdAt'] as String? ?? '') ?? DateTime.now(),
      lessons: (j['lessons'] as List<dynamic>? ?? [])
          .cast<Map<String, dynamic>>(),
    );
  }

  int get studentCount => studentIds.length;
}
