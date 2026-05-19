import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';
import '../../models/child.dart';

class ChildDetailScreen extends StatefulWidget {
  final Child child;
  const ChildDetailScreen({super.key, required this.child});
  @override
  State<ChildDetailScreen> createState() => _ChildDetailScreenState();
}

class _ChildDetailScreenState extends State<ChildDetailScreen> {
  List<dynamic> _reports = [];
  bool _loading = true;
  bool _generatingReport = false;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      _reports = await ApiClient().getReports(widget.child.id);
    } catch (_) {}
    if (mounted) setState(() => _loading = false);
  }

  Future<void> _generateReport() async {
    setState(() => _generatingReport = true);
    try {
      final result = await ApiClient().generateReport(widget.child.id);
      if (mounted) {
        setState(() {
          _reports.insert(0, result['report'] ?? result);
          _generatingReport = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Report generated!')));
      }
    } catch (_) {
      if (mounted) {
        setState(() => _generatingReport = false);
        ScaffoldMessenger.of(context).showSnackBar(const SnackBar(content: Text('Failed to generate report'), backgroundColor: KidoTheme.error));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final c = widget.child;
    return Scaffold(
      appBar: AppBar(
        title: Text(c.name),
        actions: [
          TextButton.icon(
            onPressed: _generatingReport ? null : _generateReport,
            icon: _generatingReport
                ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                : const Icon(Icons.auto_awesome, size: 18),
            label: const Text('AI Report'),
          ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : ListView(padding: const EdgeInsets.all(16), children: [
              _profileCard(c),
              const SizedBox(height: 16),
              _statsRow(c),
              const SizedBox(height: 20),
              if (c.strongSubjects.isNotEmpty) ...[
                const Text('Strong Subjects', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                const SizedBox(height: 8),
                Wrap(spacing: 8, children: c.strongSubjects.map((s) => Chip(
                  label: Text(s), backgroundColor: KidoTheme.success.withOpacity(0.1),
                  labelStyle: const TextStyle(color: KidoTheme.success))).toList()),
                const SizedBox(height: 16),
              ],
              if (c.weakSubjects.isNotEmpty) ...[
                const Text('Needs Improvement', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                const SizedBox(height: 8),
                Wrap(spacing: 8, children: c.weakSubjects.map((s) => Chip(
                  label: Text(s), backgroundColor: KidoTheme.warning.withOpacity(0.1),
                  labelStyle: const TextStyle(color: KidoTheme.warning))).toList()),
                const SizedBox(height: 16),
              ],
              if (_reports.isNotEmpty) ...[
                const Text('AI Progress Reports', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                const SizedBox(height: 12),
                ..._reports.take(3).map((r) => _reportCard(r as Map<String, dynamic>)),
              ],
              const SizedBox(height: 80),
            ]),
    );
  }

  Widget _profileCard(Child c) => Container(
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      gradient: const LinearGradient(colors: [Color(0xFF6C63FF), Color(0xFF3F3D9E)]),
      borderRadius: BorderRadius.circular(24),
    ),
    child: Row(children: [
      CircleAvatar(radius: 32, backgroundColor: Colors.white.withOpacity(0.2),
        child: Text(c.name[0], style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold))),
      const SizedBox(width: 16),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(c.name, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
        Text('Age ${c.age} • ${c.grade ?? 'No grade'}', style: const TextStyle(color: Colors.white70, fontSize: 13)),
        const SizedBox(height: 8),
        ClipRRect(borderRadius: BorderRadius.circular(6), child: LinearProgressIndicator(
          value: c.levelProgress, backgroundColor: Colors.white.withOpacity(0.2),
          valueColor: const AlwaysStoppedAnimation(Colors.white), minHeight: 6)),
        const SizedBox(height: 4),
        Text('Level ${c.level} • ${c.xp % 500}/500 XP', style: const TextStyle(color: Colors.white70, fontSize: 11)),
      ])),
    ]),
  );

  Widget _statsRow(Child c) => Row(children: [
    _st('🏆', '${c.xp}', 'XP', KidoTheme.gold),
    const SizedBox(width: 10),
    _st('🔥', '${c.streak}', 'Streak', KidoTheme.streak),
    const SizedBox(width: 10),
    _st('📝', '${c.totalQuizzes}', 'Quizzes', KidoTheme.accent),
    const SizedBox(width: 10),
    _st('🏅', '${c.longestStreak}', 'Best Streak', KidoTheme.primary),
  ]);

  Widget _st(String emoji, String val, String label, Color color) => Expanded(
    child: Container(
      padding: const EdgeInsets.symmetric(vertical: 12),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
      child: Column(children: [
        Text(emoji, style: const TextStyle(fontSize: 18)),
        const SizedBox(height: 2),
        Text(val, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w800, color: color)),
        Text(label, style: const TextStyle(fontSize: 9, color: KidoTheme.textSecondary)),
      ]),
    ),
  );

  Widget _reportCard(Map<String, dynamic> r) => Container(
    margin: const EdgeInsets.only(bottom: 12),
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8)]),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        const Text('📊', style: TextStyle(fontSize: 18)),
        const SizedBox(width: 8),
        Expanded(child: Text(r['title']?.toString() ?? 'Progress Report', style: const TextStyle(fontWeight: FontWeight.w700))),
        Text(_formatDate(r['generatedAt']?.toString()), style: const TextStyle(fontSize: 11, color: KidoTheme.textSecondary)),
      ]),
      if (r['content'] != null) ...[
        const SizedBox(height: 10),
        Text(r['content'].toString().length > 200 ? r['content'].toString().substring(0, 200) + '...' : r['content'].toString(),
          style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 13, height: 1.4)),
      ],
    ]),
  );

  String _formatDate(String? s) {
    if (s == null) return '';
    try { return DateTime.parse(s).toLocal().toString().split(' ')[0]; } catch (_) { return ''; }
  }
}
