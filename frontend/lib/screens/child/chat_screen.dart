import 'package:flutter/material.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/chat_provider.dart';

class ChatScreen extends StatefulWidget {
  final String childId;
  final String childName;
  const ChatScreen({super.key, required this.childId, required this.childName});
  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final _ctrl = TextEditingController();
  final _scroll = ScrollController();

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<ChatProvider>().loadHistory(widget.childId);
    });
  }

  @override
  void dispose() {
    _ctrl.dispose();
    _scroll.dispose();
    super.dispose();
  }

  void _scrollToBottom() {
    if (_scroll.hasClients) {
      Future.delayed(const Duration(milliseconds: 150), () {
        if (_scroll.hasClients) {
          _scroll.animateTo(
            _scroll.position.maxScrollExtent,
            duration: const Duration(milliseconds: 300),
            curve: Curves.easeOut,
          );
        }
      });
    }
  }

  Future<void> _send() async {
    final text = _ctrl.text.trim();
    if (text.isEmpty) return;
    _ctrl.clear();
    await context.read<ChatProvider>().sendMessage(widget.childId, text);
    _scrollToBottom();
  }

  @override
  Widget build(BuildContext context) {
    final chat = context.watch<ChatProvider>();
    if (chat.messages.isNotEmpty) _scrollToBottom();

    return Column(children: [
      Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: const BoxDecoration(
          gradient: LinearGradient(colors: [Color(0xFF4ECDC4), Color(0xFF2BB5AB)]),
        ),
        child: Row(children: [
          Container(
            width: 44, height: 44,
            decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(14)),
            child: const Center(child: Text('🤖', style: TextStyle(fontSize: 22))),
          ),
          const SizedBox(width: 12),
          Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('KIDO AI Tutor', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 16)),
            Text('Helping ${widget.childName} learn', style: const TextStyle(color: Colors.white70, fontSize: 12)),
          ]),
        ]),
      ),
      Expanded(
        child: chat.isLoading
            ? const Center(child: CircularProgressIndicator())
            : chat.messages.isEmpty
                ? _emptyState()
                : ListView.builder(
                    controller: _scroll,
                    padding: const EdgeInsets.all(12),
                    itemCount: chat.messages.length,
                    itemBuilder: (_, i) => _bubble(chat.messages[i]),
                  ),
      ),
      if (chat.isSending)
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Row(children: [
            SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2)),
            SizedBox(width: 8),
            Text('AI is thinking...', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
          ]),
        ),
      Container(
        padding: const EdgeInsets.fromLTRB(12, 8, 12, 16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -2))],
        ),
        child: Row(children: [
          Expanded(
            child: TextField(
              controller: _ctrl,
              decoration: const InputDecoration(hintText: 'Ask me anything...', isDense: true),
              onSubmitted: (_) => _send(),
              textInputAction: TextInputAction.send,
              maxLines: null,
            ),
          ),
          const SizedBox(width: 8),
          GestureDetector(
            onTap: _send,
            child: Container(
              width: 44, height: 44,
              decoration: BoxDecoration(color: KidoTheme.accent, borderRadius: BorderRadius.circular(14)),
              child: const Icon(Icons.send, color: Colors.white, size: 20),
            ),
          ),
        ]),
      ),
    ]);
  }

  Widget _bubble(ChatMessage msg) {
    final isUser = msg.isUser;
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          if (!isUser) ...[
            Container(
              width: 34, height: 34,
              decoration: BoxDecoration(color: KidoTheme.accent.withOpacity(0.15), borderRadius: BorderRadius.circular(10)),
              child: const Center(child: Text('🤖', style: TextStyle(fontSize: 18))),
            ),
            const SizedBox(width: 8),
          ],
          Flexible(
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
              constraints: BoxConstraints(maxWidth: MediaQuery.of(context).size.width * 0.72),
              decoration: BoxDecoration(
                color: isUser ? KidoTheme.primary : Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: const Radius.circular(18),
                  topRight: const Radius.circular(18),
                  bottomLeft: Radius.circular(isUser ? 18 : 4),
                  bottomRight: Radius.circular(isUser ? 4 : 18),
                ),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 8, offset: const Offset(0, 2))],
              ),
              child: isUser
                  ? Text(msg.content, style: const TextStyle(color: Colors.white))
                  : MarkdownBody(
                      data: msg.content,
                      styleSheet: MarkdownStyleSheet(p: const TextStyle(color: KidoTheme.textPrimary, height: 1.4)),
                    ),
            ),
          ),
          if (isUser) const SizedBox(width: 8),
        ],
      ),
    );
  }

  Widget _emptyState() => Center(
    child: Padding(
      padding: const EdgeInsets.all(32),
      child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        const Text('🤖', style: TextStyle(fontSize: 72)),
        const SizedBox(height: 16),
        const Text('Ask me anything!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
        const SizedBox(height: 8),
        const Text('I can help with any subject\nand explain things step by step',
            textAlign: TextAlign.center, style: TextStyle(color: KidoTheme.textSecondary, height: 1.5)),
        const SizedBox(height: 24),
        Wrap(
          spacing: 8, runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [
            'What is 12 × 8?',
            'Explain photosynthesis',
            'How does gravity work?',
            'Help me with fractions',
          ].map((s) => ActionChip(
            label: Text(s, style: const TextStyle(fontSize: 12)),
            onPressed: () { _ctrl.text = s; _send(); },
            backgroundColor: KidoTheme.accent.withOpacity(0.1),
            labelStyle: const TextStyle(color: KidoTheme.accent),
          )).toList(),
        ),
      ]),
    ),
  );
}
