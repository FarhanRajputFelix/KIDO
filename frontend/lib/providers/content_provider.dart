import 'package:flutter/foundation.dart';
import '../core/api_client.dart';

class ContentProvider extends ChangeNotifier {
  List<dynamic> _allContent = [];
  List<dynamic> _recommendations = [];
  bool _isLoading = false;

  List<dynamic> get allContent => _allContent;
  List<dynamic> get recommendations => _recommendations;
  bool get isLoading => _isLoading;

  final ApiClient _api = ApiClient();

  Future<void> loadContent({String? category, String? type}) async {
    _isLoading = true;
    notifyListeners();
    try {
      _allContent = await _api.getContent(category: category, type: type);
    } catch (_) {}
    _isLoading = false;
    notifyListeners();
  }

  Future<void> loadRecommendations(int childId) async {
    try {
      _recommendations = await _api.getRecommendations(childId);
      notifyListeners();
    } catch (_) {}
  }

  Future<void> logWatchCompleted(int contentId, int durationSeconds) async {
    try {
      await _api.logWatch({
        'content_id': contentId,
        'watch_duration_seconds': durationSeconds,
        'completed': true,
      });
    } catch (_) {}
  }
}
