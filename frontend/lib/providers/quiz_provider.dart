import 'package:flutter/foundation.dart';
import '../core/api_client.dart';
import '../models/quiz.dart';

class QuizProvider extends ChangeNotifier {
  Quiz? _currentQuiz;
  bool _isGenerating = false;
  bool _isSubmitting = false;
  Map<String, dynamic>? _lastResult;
  String? _error;
  List<QuizAttempt> _attempts = [];

  Quiz? get currentQuiz => _currentQuiz;
  bool get isGenerating => _isGenerating;
  bool get isSubmitting => _isSubmitting;
  Map<String, dynamic>? get lastResult => _lastResult;
  String? get error => _error;
  List<QuizAttempt> get attempts => _attempts;

  final ApiClient _api = ApiClient();

  Future<bool> generateQuiz(String childId, String subject, String difficulty) async {
    _isGenerating = true;
    _error = null;
    _currentQuiz = null;
    notifyListeners();
    try {
      final data = await _api.generateQuiz(childId, subject, difficulty);
      _currentQuiz = Quiz.fromJson(data['quiz'] as Map<String, dynamic>? ?? data);
      _isGenerating = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Failed to generate quiz. Check your connection.';
      _isGenerating = false;
      notifyListeners();
      return false;
    }
  }

  Future<Map<String, dynamic>?> submitAttempt({
    required String quizId,
    required String childId,
    required List<String> answers,
    required int timeTaken,
  }) async {
    _isSubmitting = true;
    notifyListeners();
    try {
      final result = await _api.submitQuizAttempt({
        'quizId': quizId,
        'childId': childId,
        'answers': answers,
        'timeTaken': timeTaken,
      });
      _lastResult = result;
      _isSubmitting = false;
      notifyListeners();
      return result;
    } catch (_) {
      _isSubmitting = false;
      notifyListeners();
      return null;
    }
  }

  void clearQuiz() {
    _currentQuiz = null;
    _lastResult = null;
    _error = null;
    notifyListeners();
  }
}
