import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';

class LeaderboardScreen extends StatefulWidget {
  const LeaderboardScreen({super.key});
  @override
  State<LeaderboardScreen> createState() => _LeaderboardScreenState();
}

class _LeaderboardScreenState extends State<LeaderboardScreen> {
  List<dynamic> _board = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      _board = await ApiClient().getLeaderboard();
    } catch (_) {}
    if (mounted) setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const Center(child: CircularProgressIndicator());
    return RefreshIndicator(
      onRefresh: _load,
      child: ListView(padding: const EdgeInsets.all(16), children: [
        const Text('🏆 Global Leaderboard', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
        const Text('Top learners worldwide', style: TextStyle(color: KidoTheme.textSecondary)),
        const SizedBox(height: 24),
        if (_board.length >= 3) _podiumSection(),
        const SizedBox(height: 20),
        ..._board.asMap().entries.skip(_board.length >= 3 ? 3 : 0).map((e) => _rankRow(e.value, e.key + 1)),
        const SizedBox(height: 80),
      ]),
    );
  }

  Widget _podiumSection() => SizedBox(
    height: 200,
    child: Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
      _podium(_board[1], 2, 130),
      _podium(_board[0], 1, 170),
      _podium(_board[2], 3, 100),
    ]),
  );

  Widget _podium(dynamic entry, int rank, double height) {
    final e = entry as Map<String, dynamic>;
    final color = rank == 1 ? KidoTheme.gold : rank == 2 ? const Color(0xFFC0C0C0) : const Color(0xFFCD7F32);
    final medal = rank == 1 ? '👑' : rank == 2 ? '🥈' : '🥉';
    return Expanded(
      child: Column(mainAxisAlignment: MainAxisAlignment.end, children: [
        Text(medal, style: const TextStyle(fontSize: 24)),
        const SizedBox(height: 4),
        CircleAvatar(
          radius: rank == 1 ? 26 : 20,
          backgroundColor: color.withOpacity(0.2),
          child: Text(
            (e['name']?.toString() ?? '?')[0].toUpperCase(),
            style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: rank == 1 ? 20 : 16),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          e['name']?.toString() ?? '',
          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: KidoTheme.textPrimary),
          overflow: TextOverflow.ellipsis,
          maxLines: 1,
        ),
        Text('${e['xp'] ?? 0} XP', style: TextStyle(fontSize: 10, color: color, fontWeight: FontWeight.w600)),
        const SizedBox(height: 4),
        Container(
          height: height,
          decoration: BoxDecoration(
            color: color.withOpacity(0.15),
            borderRadius: const BorderRadius.vertical(top: Radius.circular(10)),
          ),
          child: Center(child: Text('#$rank', style: TextStyle(color: color, fontWeight: FontWeight.w800, fontSize: 18))),
        ),
      ]),
    );
  }

  Widget _rankRow(dynamic entry, int rank) {
    final e = entry as Map<String, dynamic>;
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8)],
      ),
      child: Row(children: [
        SizedBox(
          width: 32,
          child: Text('#$rank', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.textSecondary)),
        ),
        CircleAvatar(
          radius: 18,
          backgroundColor: KidoTheme.primary.withOpacity(0.1),
          child: Text(
            (e['name']?.toString() ?? '?')[0].toUpperCase(),
            style: const TextStyle(color: KidoTheme.primary, fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(e['name']?.toString() ?? '', style: const TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.textPrimary)),
          Text('Level ${e['level'] ?? 1}', style: const TextStyle(fontSize: 12, color: KidoTheme.textSecondary)),
        ])),
        Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
          Text('${e['xp'] ?? 0} XP', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.gold)),
          if (e['streak'] != null && (e['streak'] as int) > 0)
            Text('${e['streak']}🔥', style: const TextStyle(fontSize: 11)),
        ]),
      ]),
    );
  }
}
