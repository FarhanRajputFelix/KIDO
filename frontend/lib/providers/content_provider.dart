import 'package:flutter/foundation.dart';
import '../core/api_client.dart';

class ContentProvider extends ChangeNotifier {
  List<dynamic> _leaderboard = [];
  bool _isLoading = false;

  List<dynamic> get leaderboard => _leaderboard;
  bool get isLoading => _isLoading;

  final ApiClient _api = ApiClient();

  Future<void> loadLeaderboard() async {
    _isLoading = true;
    notifyListeners();
    try {
      _leaderboard = await _api.getLeaderboard();
    } catch (_) {}
    _isLoading = false;
    notifyListeners();
  }
}
