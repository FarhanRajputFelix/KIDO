import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/teacher_provider.dart';
import '../../models/classroom.dart';
import '../../models/child.dart';
import 'teacher_ai_agent_screen.dart';
import 'classroom_screen.dart';

class TeacherHomeScreen extends StatefulWidget {
  const TeacherHomeScreen({super.key});
  @override
  State<TeacherHomeScreen> createState() => _TeacherHomeScreenState();
}

class _TeacherHomeScreenState extends State<TeacherHomeScreen> {
  int _tab = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      context.read<TeacherProvider>().loadDashboard();
    });
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final teacher = context.watch<TeacherProvider>();
    final firstName = auth.user?.name.split(' ').first ?? 'Teacher';

    final screens = [
      _OverviewTab(teacher: teacher, onClassroomTap: _openClassroom, onStudentAgentTap: _openAgent),
      _StudentsTab(teacher: teacher, onAgentTap: _openAgent),
      _ClassroomsTab(teacher: teacher, onTap: _openClassroom, onCreate: _createClassroom),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('$firstName\'s Dashboard 📚'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () async {
              await context.read<AuthProvider>().logout();
              if (mounted) Navigator.pushReplacementNamed(context, '/login');
            },
          ),
        ],
      ),
      body: teacher.isLoading
          ? const Center(child: CircularProgressIndicator())
          : IndexedStack(index: _tab, children: screens),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Overview'),
          NavigationDestination(icon: Icon(Icons.people_outlined), selectedIcon: Icon(Icons.people), label: 'Students'),
          NavigationDestination(icon: Icon(Icons.class_outlined), selectedIcon: Icon(Icons.class_), label: 'Classrooms'),
        ],
      ),
    );
  }

  void _openClassroom(Classroom classroom) {
    final tp = context.read<TeacherProvider>();
    final students = tp.students.where((s) => classroom.studentIds.contains(s.id)).toList();
    Navigator.push(context, MaterialPageRoute(builder: (_) => ClassroomScreen(classroom: classroom, students: students)));
  }

  void _openAgent(Child student) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => TeacherAiAgentScreen(student: student)));
  }

  Future<void> _createClassroom() async {
    final result = await showDialog<Map<String, String>>(
      context: context,
      builder: (_) => const _CreateClassroomDialog(),
    );
    if (result != null && mounted) {
      final ok = await context.read<TeacherProvider>().createClassroom(result['name']!, result['subject']!);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(
          content: Text(ok ? 'Classroom created!' : 'Failed to create classroom'),
          backgroundColor: ok ? KidoTheme.success : KidoTheme.error,
        ));
      }
    }
  }
}

class _OverviewTab extends StatelessWidget {
  final TeacherProvider teacher;
  final void Function(Classroom) onClassroomTap;
  final void Function(Child) onStudentAgentTap;
  const _OverviewTab({required this.teacher, required this.onClassroomTap, required this.onStudentAgentTap});

  @override
  Widget build(BuildContext context) {
    final stats = teacher.dashboardStats ?? {};
    return RefreshIndicator(
      onRefresh: () => context.read<TeacherProvider>().loadDashboard(),
      child: ListView(padding: const EdgeInsets.all(16), children: [
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [Color(0xFF6C63FF), Color(0xFF4B44D6)]),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('AI-Powered Teaching', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w800)),
            const SizedBox(height: 4),
            const Text('Your intelligent classroom assistant', style: TextStyle(color: Colors.white70, fontSize: 13)),
            const SizedBox(height: 20),
            Row(children: [
              _heroStat('${teacher.classrooms.length}', 'Classrooms'),
              _divider(),
              _heroStat('${teacher.students.length}', 'Students'),
              _divider(),
              _heroStat('${stats['avgScore'] ?? 0}%', 'Avg Score'),
            ]),
          ]),
        ),
        const SizedBox(height: 20),
        // AI Agent Banner
        GestureDetector(
          onTap: teacher.students.isNotEmpty ? () => onStudentAgentTap(teacher.students.first) : null,
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: KidoTheme.accent.withOpacity(0.08),
              borderRadius: BorderRadius.circular(18),
              border: Border.all(color: KidoTheme.accent.withOpacity(0.3)),
            ),
            child: Row(children: [
              Container(
                width: 48, height: 48,
                decoration: BoxDecoration(color: KidoTheme.accent.withOpacity(0.2), borderRadius: BorderRadius.circular(14)),
                child: const Center(child: Text('🤖', style: TextStyle(fontSize: 24))),
              ),
              const SizedBox(width: 14),
              const Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text('11-Agent AI Pipeline', style: TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.textPrimary, fontSize: 15)),
                SizedBox(height: 2),
                Text('Run deep analysis on any student', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
              ])),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: KidoTheme.accent, borderRadius: BorderRadius.circular(10)),
                child: const Text('Run Now', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 12)),
              ),
            ]),
          ),
        ),
        const SizedBox(height: 20),
        if (teacher.classrooms.isNotEmpty) ...[
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            const Text('My Classrooms', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            TextButton(onPressed: null, child: const Text('See all')),
          ]),
          ...teacher.classrooms.take(3).map((c) => _classroomTile(c, onClassroomTap)),
        ],
        if (teacher.students.isNotEmpty) ...[
          const SizedBox(height: 20),
          Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
            const Text('Recent Students', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
            Text('${teacher.students.length} total', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
          ]),
          const SizedBox(height: 8),
          ...teacher.students.take(3).map((s) => _studentTile(s, onStudentAgentTap)),
        ],
        const SizedBox(height: 80),
      ]),
    );
  }

  Widget _heroStat(String val, String label) => Expanded(child: Column(children: [
    Text(val, style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800)),
    Text(label, style: const TextStyle(color: Colors.white70, fontSize: 11)),
  ]));

  Widget _divider() => Container(width: 1, height: 32, color: Colors.white.withOpacity(0.3), margin: const EdgeInsets.symmetric(horizontal: 8));

  Widget _classroomTile(Classroom c, void Function(Classroom) onTap) => GestureDetector(
    onTap: () => onTap(c),
    child: Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8)]),
      child: Row(children: [
        Container(width: 40, height: 40, decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
          child: const Center(child: Text('🏫', style: TextStyle(fontSize: 20)))),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(c.name, style: const TextStyle(fontWeight: FontWeight.w700)),
          Text('${c.subject} • ${c.studentCount} students • Code: ${c.joinCode}', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
        ])),
        const Icon(Icons.arrow_forward_ios, size: 14, color: KidoTheme.textSecondary),
      ]),
    ),
  );

  Widget _studentTile(Child s, void Function(Child) onTap) => GestureDetector(
    onTap: () => onTap(s),
    child: Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(14),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 8)]),
      child: Row(children: [
        CircleAvatar(radius: 20, backgroundColor: KidoTheme.accent.withOpacity(0.1),
          child: Text(s.name[0], style: const TextStyle(color: KidoTheme.accent, fontWeight: FontWeight.bold))),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(s.name, style: const TextStyle(fontWeight: FontWeight.w700)),
          Text('Level ${s.level} • ${s.totalQuizzes} quizzes', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
        ])),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
          decoration: BoxDecoration(color: KidoTheme.accent.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
          child: const Text('🤖 Analyze', style: TextStyle(color: KidoTheme.accent, fontSize: 11, fontWeight: FontWeight.w600)),
        ),
      ]),
    ),
  );
}

class _StudentsTab extends StatelessWidget {
  final TeacherProvider teacher;
  final void Function(Child) onAgentTap;
  const _StudentsTab({required this.teacher, required this.onAgentTap});

  @override
  Widget build(BuildContext context) {
    if (teacher.students.isEmpty) {
      return const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text('👩‍🎓', style: TextStyle(fontSize: 60)),
        SizedBox(height: 16),
        Text('No students yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        SizedBox(height: 8),
        Text('Create a classroom and share the join code', style: TextStyle(color: KidoTheme.textSecondary)),
      ]));
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: teacher.students.length,
      itemBuilder: (_, i) {
        final s = teacher.students[i];
        return GestureDetector(
          onTap: () => onAgentTap(s),
          child: Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18),
              boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10)]),
            child: Row(children: [
              CircleAvatar(radius: 24, backgroundColor: KidoTheme.primary.withOpacity(0.1),
                child: Text(s.name[0], style: const TextStyle(color: KidoTheme.primary, fontSize: 18, fontWeight: FontWeight.bold))),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(s.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                Text('Age ${s.age} • Level ${s.level} • ${s.totalQuizzes} quizzes', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
                if (s.weakSubjects.isNotEmpty)
                  Text('Needs help: ${s.weakSubjects.take(2).join(', ')}', style: const TextStyle(color: KidoTheme.warning, fontSize: 11)),
              ])),
              ElevatedButton.icon(
                onPressed: () => onAgentTap(s),
                icon: const Text('🤖', style: TextStyle(fontSize: 14)),
                label: const Text('Analyze', style: TextStyle(fontSize: 12)),
                style: ElevatedButton.styleFrom(padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6), minimumSize: Size.zero),
              ),
            ]),
          ),
        );
      },
    );
  }
}

class _ClassroomsTab extends StatelessWidget {
  final TeacherProvider teacher;
  final void Function(Classroom) onTap;
  final VoidCallback onCreate;
  const _ClassroomsTab({required this.teacher, required this.onTap, required this.onCreate});

  @override
  Widget build(BuildContext context) => ListView(padding: const EdgeInsets.all(16), children: [
    ElevatedButton.icon(
      onPressed: onCreate,
      icon: const Icon(Icons.add),
      label: const Text('Create New Classroom'),
    ),
    const SizedBox(height: 20),
    if (teacher.classrooms.isEmpty)
      const Center(child: Column(children: [
        SizedBox(height: 40),
        Text('🏫', style: TextStyle(fontSize: 60)),
        SizedBox(height: 16),
        Text('No classrooms yet', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        SizedBox(height: 8),
        Text('Create your first classroom above', style: TextStyle(color: KidoTheme.textSecondary)),
      ]))
    else
      ...teacher.classrooms.map((c) => GestureDetector(
        onTap: () => onTap(c),
        child: Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18),
            boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10)]),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Container(width: 48, height: 48, decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(14)),
                child: const Center(child: Text('🏫', style: TextStyle(fontSize: 24)))),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(c.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                Text(c.subject, style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 13)),
              ])),
              Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                Text('${c.studentCount} students', style: const TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.primary)),
                const Icon(Icons.arrow_forward_ios, size: 14, color: KidoTheme.textSecondary),
              ]),
            ]),
            const SizedBox(height: 10),
            Row(children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                decoration: BoxDecoration(color: KidoTheme.accent.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
                child: Row(children: [
                  const Text('🔑', style: TextStyle(fontSize: 14)),
                  const SizedBox(width: 4),
                  Text('Join Code: ${c.joinCode}', style: const TextStyle(color: KidoTheme.accent, fontWeight: FontWeight.w700)),
                ]),
              ),
            ]),
          ]),
        ),
      )),
    const SizedBox(height: 80),
  ]);
}

class _CreateClassroomDialog extends StatefulWidget {
  const _CreateClassroomDialog();
  @override
  State<_CreateClassroomDialog> createState() => _CreateClassroomDialogState();
}

class _CreateClassroomDialogState extends State<_CreateClassroomDialog> {
  final _nameCtrl = TextEditingController();
  String _subject = 'Math';
  final _subjects = ['Math', 'Science', 'English', 'History', 'Geography', 'Coding', 'Art'];

  @override
  Widget build(BuildContext context) => AlertDialog(
    title: const Text('Create Classroom'),
    content: Column(mainAxisSize: MainAxisSize.min, children: [
      TextField(controller: _nameCtrl, decoration: const InputDecoration(labelText: 'Classroom Name')),
      const SizedBox(height: 16),
      DropdownButtonFormField<String>(
        value: _subject,
        items: _subjects.map((s) => DropdownMenuItem(value: s, child: Text(s))).toList(),
        onChanged: (v) => setState(() => _subject = v!),
        decoration: const InputDecoration(labelText: 'Subject'),
      ),
    ]),
    actions: [
      TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
      ElevatedButton(
        onPressed: () {
          if (_nameCtrl.text.trim().isNotEmpty) {
            Navigator.pop(context, {'name': _nameCtrl.text.trim(), 'subject': _subject});
          }
        },
        child: const Text('Create'),
      ),
    ],
  );
}
