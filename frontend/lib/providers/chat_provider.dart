import 'package:flutter/foundation.dart';
import '../core/api_client.dart';

class ChatMessage {
  final String id;
  final String role;
  final String content;
  final DateTime createdAt;

  ChatMessage({
    required this.id,
    required this.role,
    required this.content,
    required this.createdAt,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> j) => ChatMessage(
        id: j['id'] as String? ?? DateTime.now().toString(),
        role: j['role'] as String,
        content: j['content'] as String,
        createdAt: DateTime.tryParse(j['createdAt'] as String? ?? '') ?? DateTime.now(),
      );

  bool get isUser => role == 'user';
  bool get isAssistant => role == 'assistant';
}

class ChatProvider extends ChangeNotifier {
  final List<ChatMessage> _messages = [];
  bool _isSending = false;
  bool _isLoading = false;
  String? _error;
  String? _currentChildId;

  List<ChatMessage> get messages => List.unmodifiable(_messages);
  bool get isSending => _isSending;
  bool get isLoading => _isLoading;
  String? get error => _error;

  final ApiClient _api = ApiClient();

  Future<void> loadHistory(String childId) async {
    if (_currentChildId == childId && _messages.isNotEmpty) return;
    _isLoading = true;
    _currentChildId = childId;
    notifyListeners();
    try {
      final list = await _api.getChatHistory(childId);
      _messages.clear();
      _messages.addAll(list.map((e) => ChatMessage.fromJson(e as Map<String, dynamic>)));
    } catch (_) {
      _error = 'Failed to load chat history';
    }
    _isLoading = false;
    notifyListeners();
  }

  Future<void> sendMessage(String childId, String content) async {
    if (content.trim().isEmpty) return;
    _isSending = true;
    _error = null;

    // Optimistic update
    final userMsg = ChatMessage(
      id: DateTime.now().millisecondsSinceEpoch.toString(),
      role: 'user',
      content: content,
      createdAt: DateTime.now(),
    );
    _messages.add(userMsg);
    notifyListeners();

    try {
      final data = await _api.sendChatMessage(childId, content);
      final aiMsg = ChatMessage.fromJson(data['message'] as Map<String, dynamic>);
      _messages.add(aiMsg);
    } catch (_) {
      _error = 'Failed to send message';
      _messages.remove(userMsg);
    }
    _isSending = false;
    notifyListeners();
  }

  void clear() {
    _messages.clear();
    _currentChildId = null;
    notifyListeners();
  }
}
