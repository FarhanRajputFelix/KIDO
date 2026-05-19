class QuizQuestion {
  final String question;
  final List<String> options;
  final String answer;
  final String? explanation;

  const QuizQuestion({
    required this.question,
    required this.options,
    required this.answer,
    this.explanation,
  });

  factory QuizQuestion.fromJson(Map<String, dynamic> j) => QuizQuestion(
        question: j['question'] as String,
        options: (j['options'] as List<dynamic>).cast<String>(),
        answer: j['answer'] as String,
        explanation: j['explanation'] as String?,
      );
}

class Quiz {
  final String id;
  final String title;
  final String subject;
  final String difficulty;
  final int timeLimit;
  final int xpReward;
  final List<QuizQuestion> questions;
  final DateTime createdAt;

  const Quiz({
    required this.id,
    required this.title,
    required this.subject,
    required this.difficulty,
    required this.timeLimit,
    required this.xpReward,
    required this.questions,
    required this.createdAt,
  });

  factory Quiz.fromJson(Map<String, dynamic> j) {
    List<QuizQuestion> questions = [];
    final raw = j['questions'];
    if (raw is List) {
      questions = raw.map((q) => QuizQuestion.fromJson(q as Map<String, dynamic>)).toList();
    } else if (raw is String) {
      try {
        // JSON string fallback — questions remain empty if unparseable
      } catch (_) {}
    }
    return Quiz(
      id: j['id'] as String,
      title: j['title'] as String,
      subject: j['subject'] as String? ?? 'General',
      difficulty: j['difficulty'] as String? ?? 'medium',
      timeLimit: j['timeLimit'] as int? ?? 300,
      xpReward: j['xpReward'] as int? ?? 50,
      questions: questions,
      createdAt: DateTime.tryParse(j['createdAt'] as String? ?? '') ?? DateTime.now(),
    );
  }
}

class QuizAttempt {
  final String id;
  final String quizId;
  final String childId;
  final int score;
  final int totalQuestions;
  final int xpEarned;
  final String difficulty;
  final DateTime completedAt;

  const QuizAttempt({
    required this.id,
    required this.quizId,
    required this.childId,
    required this.score,
    required this.totalQuestions,
    required this.xpEarned,
    required this.difficulty,
    required this.completedAt,
  });

  double get percentage => totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  factory QuizAttempt.fromJson(Map<String, dynamic> j) => QuizAttempt(
        id: j['id'] as String,
        quizId: j['quizId'] as String,
        childId: j['childId'] as String,
        score: j['score'] as int? ?? 0,
        totalQuestions: j['totalQuestions'] as int? ?? 1,
        xpEarned: j['xpEarned'] as int? ?? 0,
        difficulty: j['difficulty'] as String? ?? 'medium',
        completedAt: DateTime.tryParse(j['completedAt'] as String? ?? '') ?? DateTime.now(),
      );
}
