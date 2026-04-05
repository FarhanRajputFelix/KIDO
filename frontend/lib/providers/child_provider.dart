import 'package:flutter/foundation.dart';
import '../core/api_client.dart';

class ChildProvider extends ChangeNotifier {
  Map<String, dynamic>? _profile;
  List<dynamic> _leaderboard = [];
  List<dynamic> _activities = [];
  List<dynamic> _friends = [];
  List<dynamic> _friendLeaderboard = [];
  List<dynamic> _gameHistory = [];
  bool _isLoading = false;

  Map<String, dynamic>? get profile => _profile;
  List<dynamic> get leaderboard => _leaderboard;
  List<dynamic> get activities => _activities;
  List<dynamic> get friends => _friends;
  List<dynamic> get friendLeaderboard => _friendLeaderboard;
  List<dynamic> get gameHistory => _gameHistory;
  bool get isLoading => _isLoading;
  int get xp => (_profile?['xp'] as int?) ?? 0;
  int get level => (_profile?['level'] as int?) ?? 1;
  int get streakDays => (_profile?['streak_days'] as int?) ?? 0;

  final ApiClient _api = ApiClient();

  Future<void> loadProfile() async {
    _isLoading = true;
    notifyListeners();
    try {
      _profile = await _api.getMyChildProfile();
    } catch (_) {}
    _isLoading = false;
    notifyListeners();
  }

  Future<void> loadLeaderboard() async {
    try {
      _leaderboard = await _api.getGlobalLeaderboard();
      notifyListeners();
    } catch (_) {}
  }

  Future<void> loadFriends() async {
    try {
      _friends = await _api.getFriends();
      _friendLeaderboard = await _api.getFriendLeaderboard();
      notifyListeners();
    } catch (_) {}
  }

  Future<void> loadActivityFeed() async {
    try {
      _activities = await _api.getActivityFeed();
      notifyListeners();
    } catch (_) {}
  }

  Future<void> loadGameHistory() async {
    try {
      _gameHistory = await _api.getGameHistory();
      notifyListeners();
    } catch (_) {}
  }

  Future<bool> sendFriendRequest(String username, String category) async {
    try {
      await _api.sendFriendRequest(username, category);
      return true;
    } catch (_) {
      return false;
    }
  }
}
