import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../core/api_client.dart';
import '../core/constants.dart';
import '../models/user.dart';

enum AuthStatus { unknown, authenticated, unauthenticated }

class AuthProvider extends ChangeNotifier {
  AuthStatus _status = AuthStatus.unknown;
  KidoUser? _user;
  bool _isLoading = false;
  String? _error;

  AuthStatus get status => _status;
  KidoUser? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isAuthenticated => _status == AuthStatus.authenticated;
  bool get isParent => _user?.isParent ?? false;
  bool get isChild => _user?.isChild ?? false;
  bool get isTeacher => _user?.isTeacher ?? false;
  bool get isAdmin => _user?.isAdmin ?? false;

  final ApiClient _api = ApiClient();

  Future<void> checkAuth() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString(KidoConstants.tokenKey);
    if (token == null) {
      _status = AuthStatus.unauthenticated;
      notifyListeners();
      return;
    }
    final id = prefs.getString(KidoConstants.userIdKey);
    final email = prefs.getString(KidoConstants.userEmailKey);
    final name = prefs.getString(KidoConstants.userNameKey);
    final role = prefs.getString(KidoConstants.userRoleKey);
    if (id != null && email != null && name != null && role != null) {
      _user = KidoUser(id: id, email: email, name: name, role: role);
      _status = AuthStatus.authenticated;
    } else {
      _status = AuthStatus.unauthenticated;
    }
    notifyListeners();
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final data = await _api.mobileLogin(email, password);
      await _saveSession(data);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = _extractError(e);
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
      final data = await _api.mobileRegister(email, password, name, role);
      await _saveSession(data);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = _extractError(e);
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
    _error = null;
    notifyListeners();
  }

  Future<void> _saveSession(Map<String, dynamic> data) async {
    final prefs = await SharedPreferences.getInstance();
    final token = data['token'] as String;
    final userMap = data['user'] as Map<String, dynamic>;
    await prefs.setString(KidoConstants.tokenKey, token);
    await prefs.setString(KidoConstants.userIdKey, userMap['id'] as String);
    await prefs.setString(KidoConstants.userEmailKey, userMap['email'] as String);
    await prefs.setString(KidoConstants.userNameKey, userMap['name'] as String);
    await prefs.setString(KidoConstants.userRoleKey, userMap['role'] as String);
    _user = KidoUser.fromJson(userMap);
    _status = AuthStatus.authenticated;
  }

  String _extractError(dynamic e) {
    try {
      final msg = (e as dynamic).response?.data?['error'] as String?;
      return msg ?? 'Something went wrong. Try again.';
    } catch (_) {
      return 'Something went wrong. Try again.';
    }
  }
}
