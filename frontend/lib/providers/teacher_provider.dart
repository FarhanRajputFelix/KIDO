import 'package:flutter/foundation.dart';
import '../core/api_client.dart';
import '../models/classroom.dart';
import '../models/child.dart';
import '../models/agent_trace.dart';

class TeacherProvider extends ChangeNotifier {
  List<Classroom> _classrooms = [];
  List<Child> _students = [];
  Map<String, List<AgentTrace>> _studentTraces = {};
  AgentTrace? _runningTrace;
  bool _isLoading = false;
  bool _isRunningAgents = false;
  String? _error;
  Map<String, dynamic>? _dashboardStats;

  List<Classroom> get classrooms => _classrooms;
  List<Child> get students => _students;
  Map<String, List<AgentTrace>> get studentTraces => _studentTraces;
  AgentTrace? get runningTrace => _runningTrace;
  bool get isLoading => _isLoading;
  bool get isRunningAgents => _isRunningAgents;
  String? get error => _error;
  Map<String, dynamic>? get dashboardStats => _dashboardStats;

  final ApiClient _api = ApiClient();

  Future<void> loadDashboard() async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final data = await _api.getDashboard();
      _classrooms = (data['classrooms'] as List<dynamic>? ?? [])
          .map((e) => Classroom.fromJson(e as Map<String, dynamic>))
          .toList();
      _students = (data['students'] as List<dynamic>? ?? [])
          .map((e) => Child.fromJson(e as Map<String, dynamic>))
          .toList();
      _dashboardStats = data['stats'] as Map<String, dynamic>?;
    } catch (e) {
      _error = 'Failed to load dashboard';
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<bool> createClassroom(String name, String subject) async {
    try {
      final data = await _api.createClassroom(name, subject);
      final classroom = Classroom.fromJson(data['classroom'] as Map<String, dynamic>);
      _classrooms.add(classroom);
      notifyListeners();
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<void> loadStudentTraces(String childId) async {
    try {
      final list = await _api.getAgentTraces(childId);
      _studentTraces[childId] = list
          .map((e) => AgentTrace.fromJson(e as Map<String, dynamic>))
          .toList();
      notifyListeners();
    } catch (_) {}
  }

  // Run full 11-agent pipeline for a student — the Teacher AI Agent
  Future<AgentTrace?> runAgentPipeline(Child student) async {
    _isRunningAgents = true;
    _runningTrace = null;
    _error = null;
    notifyListeners();

    try {
      // Build agent context from student data
      final context = {
        'childId': student.id,
        'childName': student.name,
        'age': student.age,
        'xp': student.xp,
        'level': student.level,
        'streak': student.streak,
        'totalQuizzes': student.totalQuizzes,
        'strongSubjects': student.strongSubjects,
        'weakSubjects': student.weakSubjects,
        'badges': student.badges,
        // Pass dummy quiz data so agents have something to work with
        'quizScore': 0,
        'totalQuestions': 5,
        'subject': student.weakSubjects.isNotEmpty ? student.weakSubjects.first : 'General',
        'difficulty': 'medium',
        'timeTaken': 180,
        'answers': [],
      };

      final data = await _api.runAgentPipeline(context);
      final trace = AgentTrace.fromJson(data['trace'] as Map<String, dynamic>? ?? data);
      _runningTrace = trace;

      // Cache in student traces
      _studentTraces[student.id] = [
        trace,
        ...(_studentTraces[student.id] ?? []),
      ];
    } catch (e) {
      _error = 'Agent pipeline failed: ${e.toString()}';
    }

    _isRunningAgents = false;
    notifyListeners();
    return _runningTrace;
  }

  List<Child> getStudentsForClassroom(Classroom classroom) {
    return _students
        .where((s) => classroom.studentIds.contains(s.id))
        .toList();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
