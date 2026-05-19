import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'constants.dart';

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;

  late final Dio _dio;

  ApiClient._internal() {
    _dio = Dio(BaseOptions(
      baseUrl: KidoConstants.baseUrl,
      connectTimeout: const Duration(seconds: 20),
      receiveTimeout: const Duration(seconds: 30),
      headers: {'Content-Type': 'application/json'},
    ));

    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final prefs = await SharedPreferences.getInstance();
        final token = prefs.getString(KidoConstants.tokenKey);
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) => handler.next(error),
    ));
  }

  // ── Auth ───────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> mobileLogin(String email, String password) async {
    final res = await _dio.post(KidoConstants.mobileLoginPath,
        data: {'email': email, 'password': password});
    return res.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> mobileRegister(
      String email, String password, String name, String role) async {
    final res = await _dio.post(KidoConstants.mobileRegisterPath,
        data: {'email': email, 'password': password, 'name': name, 'role': role});
    return res.data as Map<String, dynamic>;
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> getDashboard() async {
    final res = await _dio.get('/api/dashboard');
    return res.data as Map<String, dynamic>;
  }

  // ── Children ──────────────────────────────────────────────────────────────
  Future<List<dynamic>> getChildren() async {
    final res = await _dio.get('/api/children');
    return res.data as List<dynamic>;
  }

  Future<Map<String, dynamic>> createChild(Map<String, dynamic> data) async {
    final res = await _dio.post('/api/children/manage', data: data);
    return res.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> updateChild(Map<String, dynamic> data) async {
    final res = await _dio.put('/api/children/manage', data: data);
    return res.data as Map<String, dynamic>;
  }

  // ── AI Chat ────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> sendChatMessage(String childId, String message) async {
    final res = await _dio.post('/api/ai/chat', data: {'childId': childId, 'message': message});
    return res.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getChatHistory(String childId) async {
    final res = await _dio.get('/api/ai/chat', queryParameters: {'childId': childId});
    final data = res.data as Map<String, dynamic>;
    return data['messages'] as List<dynamic>;
  }

  // ── AI Quiz ────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> generateQuiz(
      String childId, String subject, String difficulty) async {
    final res = await _dio.post('/api/ai/quiz',
        data: {'childId': childId, 'subject': subject, 'difficulty': difficulty});
    return res.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> submitQuizAttempt(Map<String, dynamic> data) async {
    final res = await _dio.post('/api/quiz/attempt', data: data);
    return res.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getQuizzes({String? subject, String? difficulty}) async {
    final params = <String, dynamic>{};
    if (subject != null) params['subject'] = subject;
    if (difficulty != null) params['difficulty'] = difficulty;
    final res = await _dio.get('/api/quiz', queryParameters: params);
    return res.data as List<dynamic>;
  }

  // ── AI Game ────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> generateGame(String childId, String gameType) async {
    final res = await _dio.post('/api/ai/game', data: {'childId': childId, 'gameType': gameType});
    return res.data as Map<String, dynamic>;
  }

  // ── AI Report ─────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> generateReport(String childId) async {
    final res = await _dio.post('/api/ai/report', data: {'childId': childId});
    return res.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getReports(String childId) async {
    final res = await _dio.get('/api/ai/report', queryParameters: {'childId': childId});
    final data = res.data as Map<String, dynamic>;
    return data['reports'] as List<dynamic>;
  }

  // ── Agents ─────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> runAgentPipeline(Map<String, dynamic> context) async {
    final res = await _dio.post('/api/agents/trace', data: context);
    return res.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getAgentTraces(String childId) async {
    final res = await _dio.get('/api/agents/trace', queryParameters: {'childId': childId});
    final data = res.data as Map<String, dynamic>;
    return data['traces'] as List<dynamic>;
  }

  // ── Friends ────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> getFriends(String childId) async {
    final res = await _dio.get('/api/friends', queryParameters: {'childId': childId});
    return res.data as Map<String, dynamic>;
  }

  Future<void> sendFriendRequest(String fromChildId, String toChildId) async {
    await _dio.post('/api/friends', data: {'fromChildId': fromChildId, 'toChildId': toChildId});
  }

  Future<void> approveFriendRequest(String requestId, bool approved) async {
    await _dio.post('/api/friends/approve', data: {'requestId': requestId, 'approved': approved});
  }

  // ── Screen Time ────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> getScreenTime(String childId) async {
    final res = await _dio.get('/api/screen-time', queryParameters: {'childId': childId});
    return res.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> logScreenTime(String childId, int minutes) async {
    final res = await _dio.post('/api/screen-time', data: {'childId': childId, 'minutes': minutes});
    return res.data as Map<String, dynamic>;
  }

  // ── Classrooms ─────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> createClassroom(String name, String subject) async {
    final res = await _dio.post('/api/classrooms', data: {'name': name, 'subject': subject});
    return res.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> joinClassroom(String childId, String joinCode) async {
    final res = await _dio.post('/api/classrooms/join', data: {'childId': childId, 'joinCode': joinCode});
    return res.data as Map<String, dynamic>;
  }

  // ── Leaderboard ────────────────────────────────────────────────────────────
  Future<List<dynamic>> getLeaderboard() async {
    final res = await _dio.get('/api/leaderboard');
    final data = res.data as Map<String, dynamic>;
    return data['leaderboard'] as List<dynamic>;
  }
}
