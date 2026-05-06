import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/constants.dart';

class ApiClient {
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;

  late final Dio _dio;

  ApiClient._internal() {
    _dio = Dio(BaseOptions(
      baseUrl: KidoConstants.baseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
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
      onError: (error, handler) {
        return handler.next(error);
      },
    ));
  }

  Dio get dio => _dio;

  // ── Auth ──────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _dio.post('/auth/login', data: {
      'username': email,
      'password': password,
    }, options: Options(contentType: 'application/x-www-form-urlencoded'));
    return response.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> register(Map<String, dynamic> data) async {
    final response = await _dio.post('/auth/register', data: data);
    return response.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> getMe() async {
    final response = await _dio.get('/auth/me');
    return response.data as Map<String, dynamic>;
  }

  // ── Children ──────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> getMyChildProfile() async {
    final response = await _dio.get('/children/me/profile');
    return response.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getGlobalLeaderboard() async {
    final response = await _dio.get('/children/leaderboard/global');
    return response.data as List<dynamic>;
  }

  // ── Content ───────────────────────────────────────────────────────────────
  Future<List<dynamic>> getContent({String? category, String? type}) async {
    final params = <String, dynamic>{};
    if (category != null) params['category'] = category;
    if (type != null) params['content_type'] = type;
    final response = await _dio.get('/content/', queryParameters: params);
    return response.data as List<dynamic>;
  }

  Future<List<dynamic>> getRecommendations(int childId) async {
    final response = await _dio.get('/content/recommend/$childId');
    return response.data as List<dynamic>;
  }

  Future<Map<String, dynamic>> logWatch(Map<String, dynamic> data) async {
    final response = await _dio.post('/content/watch-log', data: data);
    return response.data as Map<String, dynamic>;
  }

  // ── Games ─────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> startQuiz({String? category}) async {
    final response = await _dio.post('/games/quiz/start', data: {
      'game_type': 'quiz',
      if (category != null) 'category': category,
    });
    return response.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getGameHistory() async {
    final response = await _dio.get('/games/history');
    return response.data as List<dynamic>;
  }

  // ── Social ────────────────────────────────────────────────────────────────
  Future<List<dynamic>> getFriends() async {
    final response = await _dio.get('/social/friends');
    return response.data as List<dynamic>;
  }

  Future<List<dynamic>> getFriendLeaderboard() async {
    final response = await _dio.get('/social/leaderboard/friends');
    return response.data as List<dynamic>;
  }

  Future<List<dynamic>> getActivityFeed() async {
    final response = await _dio.get('/social/feed');
    return response.data as List<dynamic>;
  }

  Future<Map<String, dynamic>> sendFriendRequest(String username, String category) async {
    final response = await _dio.post('/social/friends/request', data: {
      'receiver_username': username,
      'category': category,
    });
    return response.data as Map<String, dynamic>;
  }

  // ── Parent ────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> getParentDashboard() async {
    final response = await _dio.get('/parents/dashboard');
    return response.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> getChildReport(int childId, {int days = 7}) async {
    final response = await _dio.get('/parents/children/$childId/report', queryParameters: {'days': days});
    return response.data as Map<String, dynamic>;
  }

  Future<List<dynamic>> getSafetyAlerts() async {
    final response = await _dio.get('/parents/alerts');
    return response.data as List<dynamic>;
  }

  // ── AI ────────────────────────────────────────────────────────────────────
  Future<Map<String, dynamic>> getLearningPath(int childId) async {
    final response = await _dio.get('/ai/learning-path/$childId');
    return response.data as Map<String, dynamic>;
  }

  Future<Map<String, dynamic>> getBehaviorAnalysis(int childId) async {
    final response = await _dio.get('/ai/behavior/$childId');
    return response.data as Map<String, dynamic>;
  }
}
