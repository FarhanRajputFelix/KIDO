import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../../core/theme.dart';
import '../../models/classroom.dart';
import '../../models/child.dart';

class ClassroomScreen extends StatelessWidget {
  final Classroom classroom;
  final List<Child> students;

  const ClassroomScreen({super.key, required this.classroom, required this.students});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(classroom.name),
        actions: [
          IconButton(
            icon: const Icon(Icons.share),
            onPressed: () => _showJoinCode(context),
          ),
        ],
      ),
      body: ListView(padding: const EdgeInsets.all(16), children: [
        _classroomHeader(context),
        const SizedBox(height: 20),
        _statsRow(),
        const SizedBox(height: 20),
        _joinCodeCard(context),
        const SizedBox(height: 20),
        Row(children: [
          const Text('Students', style: TextStyle(fontSize: 17, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
          const Spacer(),
          Text('${students.length} enrolled', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 13)),
        ]),
        const SizedBox(height: 12),
        if (students.isEmpty)
          _emptyStudents()
        else
          ...students.map((s) => _studentCard(context, s)),
        const SizedBox(height: 80),
      ]),
    );
  }

  Widget _classroomHeader(BuildContext context) => Container(
    padding: const EdgeInsets.all(20),
    decoration: BoxDecoration(
      gradient: const LinearGradient(
        colors: [Color(0xFF6C63FF), Color(0xFF3F3D9E)],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ),
      borderRadius: BorderRadius.circular(24),
    ),
    child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      Row(children: [
        Container(
          width: 52, height: 52,
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.2),
            borderRadius: BorderRadius.circular(16),
          ),
          child: const Center(child: Text('🏫', style: TextStyle(fontSize: 28))),
        ),
        const SizedBox(width: 16),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(classroom.name, style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
          if (classroom.subject.isNotEmpty)
            Text(classroom.subject, style: const TextStyle(color: Colors.white70, fontSize: 13)),
        ])),
      ]),
    ]),
  );

  Widget _statsRow() => Row(children: [
    _statCard('👩‍🎓', '${students.length}', 'Students', KidoTheme.primary),
    const SizedBox(width: 10),
    _statCard('🏆', _avgXp(), 'Avg XP', KidoTheme.gold),
    const SizedBox(width: 10),
    _statCard('🔥', _avgStreak(), 'Avg Streak', KidoTheme.streak),
  ]);

  String _avgXp() {
    if (students.isEmpty) return '0';
    final avg = students.map((s) => s.xp).reduce((a, b) => a + b) ~/ students.length;
    return '$avg';
  }

  String _avgStreak() {
    if (students.isEmpty) return '0';
    final avg = students.map((s) => s.streak).reduce((a, b) => a + b) ~/ students.length;
    return '$avg';
  }

  Widget _statCard(String emoji, String value, String label, Color color) => Expanded(
    child: Container(
      padding: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
      child: Column(children: [
        Text(emoji, style: const TextStyle(fontSize: 20)),
        const SizedBox(height: 4),
        Text(value, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: color)),
        Text(label, style: const TextStyle(fontSize: 10, color: KidoTheme.textSecondary)),
      ]),
    ),
  );

  Widget _joinCodeCard(BuildContext context) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: KidoTheme.accent.withOpacity(0.05),
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: KidoTheme.accent.withOpacity(0.3)),
    ),
    child: Row(children: [
      const Icon(Icons.vpn_key_rounded, color: KidoTheme.accent, size: 22),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        const Text('Join Code', style: TextStyle(fontSize: 11, color: KidoTheme.textSecondary, fontWeight: FontWeight.w600)),
        Text(
          classroom.joinCode.isEmpty ? 'N/A' : classroom.joinCode,
          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w900, color: KidoTheme.accent, letterSpacing: 4),
        ),
      ])),
      GestureDetector(
        onTap: () {
          Clipboard.setData(ClipboardData(text: classroom.joinCode));
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Join code copied!'), duration: Duration(seconds: 2)),
          );
        },
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          decoration: BoxDecoration(
            color: KidoTheme.accent.withOpacity(0.1),
            borderRadius: BorderRadius.circular(10),
          ),
          child: const Row(children: [
            Icon(Icons.copy, size: 16, color: KidoTheme.accent),
            SizedBox(width: 4),
            Text('Copy', style: TextStyle(color: KidoTheme.accent, fontSize: 12, fontWeight: FontWeight.w600)),
          ]),
        ),
      ),
    ]),
  );

  Widget _emptyStudents() => Container(
    padding: const EdgeInsets.all(32),
    decoration: BoxDecoration(
      color: Colors.grey.withOpacity(0.05),
      borderRadius: BorderRadius.circular(16),
    ),
    child: Column(children: [
      const Text('👋', style: TextStyle(fontSize: 48)),
      const SizedBox(height: 12),
      const Text('No students yet', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: KidoTheme.textPrimary)),
      const SizedBox(height: 6),
      const Text('Share the join code above with your students', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 13), textAlign: TextAlign.center),
    ]),
  );

  Widget _studentCard(BuildContext context, Child s) => Container(
    margin: const EdgeInsets.only(bottom: 10),
    padding: const EdgeInsets.all(14),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(16),
      boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8, offset: const Offset(0, 2))],
    ),
    child: Row(children: [
      CircleAvatar(
        radius: 22,
        backgroundColor: KidoTheme.primary.withOpacity(0.15),
        child: Text(s.name[0].toUpperCase(), style: const TextStyle(fontWeight: FontWeight.w800, color: KidoTheme.primary)),
      ),
      const SizedBox(width: 12),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(s.name, style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
        Text('Level ${s.level} • ${s.xp} XP', style: const TextStyle(fontSize: 12, color: KidoTheme.textSecondary)),
        const SizedBox(height: 4),
        ClipRRect(
          borderRadius: BorderRadius.circular(4),
          child: LinearProgressIndicator(
            value: s.levelProgress,
            backgroundColor: KidoTheme.primary.withOpacity(0.1),
            valueColor: const AlwaysStoppedAnimation(KidoTheme.primary),
            minHeight: 4,
          ),
        ),
      ])),
      const SizedBox(width: 8),
      Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
        Row(children: [
          const Text('🔥', style: TextStyle(fontSize: 12)),
          const SizedBox(width: 2),
          Text('${s.streak}', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.streak, fontSize: 13)),
        ]),
        const SizedBox(height: 4),
        Text('Age ${s.age}', style: const TextStyle(fontSize: 11, color: KidoTheme.textSecondary)),
      ]),
    ]),
  );

  void _showJoinCode(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => Padding(
        padding: const EdgeInsets.all(32),
        child: Column(mainAxisSize: MainAxisSize.min, children: [
          const Text('Share This Class', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
          const SizedBox(height: 8),
          Text(classroom.name, style: const TextStyle(color: KidoTheme.textSecondary)),
          const SizedBox(height: 24),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 20),
            decoration: BoxDecoration(
              color: KidoTheme.primary.withOpacity(0.05),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: KidoTheme.primary.withOpacity(0.2)),
            ),
            child: Text(
              classroom.joinCode.isEmpty ? 'N/A' : classroom.joinCode,
              style: const TextStyle(fontSize: 36, fontWeight: FontWeight.w900, color: KidoTheme.primary, letterSpacing: 8),
            ),
          ),
          const SizedBox(height: 16),
          const Text('Students enter this code to join your class in the Kido app',
            style: TextStyle(color: KidoTheme.textSecondary, fontSize: 13), textAlign: TextAlign.center),
          const SizedBox(height: 24),
          SizedBox(width: double.infinity, child: ElevatedButton.icon(
            onPressed: () {
              Clipboard.setData(ClipboardData(text: classroom.joinCode));
              Navigator.pop(context);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Join code copied!')),
              );
            },
            icon: const Icon(Icons.copy),
            label: const Text('Copy Code'),
          )),
          const SizedBox(height: 8),
        ]),
      ),
    );
  }
}
