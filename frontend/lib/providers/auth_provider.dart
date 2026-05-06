import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/api_client.dart';
import '../core/constants.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthProvider extends ChangeNotifier {
  AuthStatus _status = AuthStatus.unknown;
  Map<String, dynamic>? _user;
  String? _role;
  int? _userId;
  bool _isLoading = false;
  String? _error;

  AuthStatus get status => _status;
  Map<String, dynamic>? get user => _user;
  String? get role => _role;
  int? get userId => _userId;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isParent => _role == 'parent';
  bool get isChild => _role == 'child';
  bool get isTeacher => _role == 'teacher';

  final ApiClient _api = ApiClient();

  Future<void> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(KidoConstants.tokenKey);
    if (token == null) {
      _status = AuthStatus.unauthenticated;
      notifyListeners();
      return;
    }
    try {
      _user = await _api.getMe();
      _role = prefs.getString(KidoConstants.userRoleKey);
      _userId = prefs.getInt(KidoConstants.userIdKey);
      _status = AuthStatus.authenticated;
    } catch (_) {
      _status = AuthStatus.unauthenticated;
    }
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final data = await _api.login(email, password);
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString(KidoConstants.tokenKey, data['access_token']);
      if (data['refresh_token'] != null) {
        await prefs.setString(KidoConstants.refreshTokenKey, data['refresh_token']);
      }
      await prefs.setString(KidoConstants.userRoleKey, data['role']);
      await prefs.setInt(KidoConstants.userIdKey, data['user_id']);
      _role = data['role'];
      _userId = data['user_id'];
      _status = AuthStatus.authenticated;
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Login failed. Check your credentials.';
      _isLoading = false;
      _status = AuthStatus.unauthenticated;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(String email, String password, String name, String role) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      await _api.register({
        'email': email,
        'password': password,
        'full_name': name,
        'role': role,
      });
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = 'Registration failed. Email may already be in use.';
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.clear();
    _status = AuthStatus.unauthenticated;
    _user = null;
    _role = null;
    _userId = null;
    notifyListeners();
  }
}
