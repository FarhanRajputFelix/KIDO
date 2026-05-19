import 'package:flutter/foundation.dart';
import '../core/api_client.dart';
import '../models/child.dart';

class ChildProvider extends ChangeNotifier {
  List<Child> _children = [];
  Child? _selectedChild;
  bool _isLoading = false;
  String? _error;

  List<Child> get children => _children;
  Child? get selectedChild => _selectedChild;
  bool get isLoading => _isLoading;
  String? get error => _error;

  final ApiClient _api = ApiClient();

  Future<void> loadChildren() async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final list = await _api.getChildren();
      _children = list.map((e) => Child.fromJson(e as Map<String, dynamic>)).toList();
      if (_children.isNotEmpty && _selectedChild == null) {
        _selectedChild = _children.first;
      }
    } catch (e) {
      _error = 'Failed to load children';
    }
    _isLoading = false;
    notifyListeners();
  }

  void selectChild(Child child) {
    _selectedChild = child;
    notifyListeners();
  }

  Future<bool> createChild({
    required String name,
    required int age,
    String? grade,
  }) async {
    try {
      final result = await _api.createChild({
        'name': name,
        'age': age,
        if (grade != null) 'grade': grade,
      });
      final child = Child.fromJson(result['child'] as Map<String, dynamic>);
      _children.add(child);
      _selectedChild ??= child;
      notifyListeners();
      return true;
    } catch (_) {
      return false;
    }
  }

  void loadFromDashboard(List<dynamic> childrenJson) {
    _children = childrenJson
        .map((e) => Child.fromJson(e as Map<String, dynamic>))
        .toList();
    if (_children.isNotEmpty) _selectedChild ??= _children.first;
    notifyListeners();
  }
}
