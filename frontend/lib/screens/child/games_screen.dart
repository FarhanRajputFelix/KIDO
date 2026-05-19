import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';

class GamesScreen extends StatefulWidget {
  final String childId;
  const GamesScreen({super.key, required this.childId});
  @override
  State<GamesScreen> createState() => _GamesScreenState();
}

class _GamesScreenState extends State<GamesScreen> {
  String? _selectedGame;
  Map<String, dynamic>? _gameData;
  bool _loading = false;
  String? _error;

  static const _games = [
    {'id': 'word-builder', 'emoji': '📝', 'title': 'Word Builder', 'desc': 'Build words from letters & clues', 'color': 0xFF6C63FF},
    {'id': 'story-creator', 'emoji': '📖', 'title': 'Story Creator', 'desc': 'Create amazing interactive stories', 'color': 0xFFFF6B6B},
    {'id': 'math-arena', 'emoji': '🔢', 'title': 'Math Arena', 'desc': 'Solve math challenges & puzzles', 'color': 0xFF4ECDC4},
  ];

  Future<void> _loadGame(String gameType) async {
    setState(() { _loading = true; _error = null; _selectedGame = gameType; _gameData = null; });
    try {
      final data = await ApiClient().generateGame(widget.childId, gameType);
      setState(() { _gameData = data; _loading = false; });
    } catch (_) {
      setState(() { _error = 'Failed to load game. Check your connection.'; _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_selectedGame != null) return _gameView();
    return ListView(padding: const EdgeInsets.all(16), children: [
      const SizedBox(height: 8),
      const Text('AI Games 🎮', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
      const Text('AI-powered games that adapt to your level', style: TextStyle(color: KidoTheme.textSecondary)),
      const SizedBox(height: 24),
      ..._games.map((g) => GestureDetector(
        onTap: () => _loadGame(g['id'] as String),
        child: Container(
          margin: const EdgeInsets.only(bottom: 16),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Color(g['color'] as int).withOpacity(0.08),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Color(g['color'] as int).withOpacity(0.2)),
          ),
          child: Row(children: [
            Container(
              width: 64, height: 64,
              decoration: BoxDecoration(color: Color(g['color'] as int).withOpacity(0.15), borderRadius: BorderRadius.circular(18)),
              child: Center(child: Text(g['emoji'] as String, style: const TextStyle(fontSize: 30))),
            ),
            const SizedBox(width: 16),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(g['title'] as String, style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
              const SizedBox(height: 4),
              Text(g['desc'] as String, style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 13, height: 1.3)),
            ])),
            Icon(Icons.arrow_forward_ios_rounded, color: Color(g['color'] as int), size: 18),
          ]),
        ),
      )),
    ]);
  }

  Widget _gameView() {
    final game = _games.firstWhere((g) => g['id'] == _selectedGame);
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => setState(() { _selectedGame = null; _gameData = null; }),
        ),
        title: Text(game['title'] as String),
      ),
      body: _loading
          ? const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              CircularProgressIndicator(),
              SizedBox(height: 16),
              Text('🤖 Generating your challenge...', style: TextStyle(color: KidoTheme.textSecondary)),
            ]))
          : _error != null
              ? Center(child: Padding(
                  padding: const EdgeInsets.all(24),
                  child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
                    const Text('❌', style: TextStyle(fontSize: 48)),
                    const SizedBox(height: 16),
                    Text(_error!, style: const TextStyle(color: KidoTheme.error), textAlign: TextAlign.center),
                    const SizedBox(height: 16),
                    ElevatedButton(onPressed: () => _loadGame(_selectedGame!), child: const Text('Try Again')),
                  ]),
                ))
              : _renderGame(),
    );
  }

  Widget _renderGame() {
    if (_gameData == null) return const Center(child: CircularProgressIndicator());
    final challenge = (_gameData!['challenge'] ?? _gameData) as Map<String, dynamic>;
    return ListView(padding: const EdgeInsets.all(20), children: [
      Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            colors: [KidoTheme.primary.withOpacity(0.08), KidoTheme.accent.withOpacity(0.08)],
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          const Text('Your Challenge', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w700, color: KidoTheme.textSecondary, letterSpacing: 0.5)),
          const SizedBox(height: 10),
          Text(
            challenge['question']?.toString() ?? challenge['task']?.toString() ?? challenge['challenge']?.toString() ?? 'Complete the challenge!',
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600, color: KidoTheme.textPrimary, height: 1.4),
          ),
        ]),
      ),
      const SizedBox(height: 16),
      if (challenge['hint'] != null)
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: KidoTheme.gold.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
          child: Row(children: [
            const Text('💡', style: TextStyle(fontSize: 22)),
            const SizedBox(width: 10),
            Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              const Text('Hint', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 12, color: KidoTheme.gold)),
              const SizedBox(height: 2),
              Text(challenge['hint'].toString(), style: const TextStyle(color: KidoTheme.textPrimary, height: 1.3)),
            ])),
          ]),
        ),
      if (challenge['hint'] != null) const SizedBox(height: 16),
      if (challenge['answer'] != null || challenge['solution'] != null)
        OutlinedButton.icon(
          onPressed: () => showDialog(
            context: context,
            builder: (_) => AlertDialog(
              title: const Text('Answer 🎉'),
              content: Text(challenge['answer']?.toString() ?? challenge['solution']?.toString() ?? ''),
              actions: [TextButton(onPressed: () => Navigator.pop(context), child: const Text('Got it!'))],
            ),
          ),
          icon: const Icon(Icons.lightbulb_outline),
          label: const Text('Show Answer'),
        ),
      const SizedBox(height: 12),
      ElevatedButton.icon(
        onPressed: () => _loadGame(_selectedGame!),
        icon: const Text('🎲'),
        label: const Text('Next Challenge'),
      ),
    ]);
  }
}
