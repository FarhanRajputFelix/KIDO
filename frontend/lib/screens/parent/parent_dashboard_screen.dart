import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';
import '../../providers/auth_provider.dart';
import '../../providers/child_provider.dart';
import '../../models/child.dart';
import 'add_child_screen.dart';
import 'child_detail_screen.dart';
import 'alerts_screen.dart';

class ParentDashboardScreen extends StatefulWidget {
  const ParentDashboardScreen({super.key});
  @override
  State<ParentDashboardScreen> createState() => _ParentDashboardScreenState();
}

class _ParentDashboardScreenState extends State<ParentDashboardScreen> {
  int _tab = 0;
  Map<String, dynamic>? _dashboard;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      _dashboard = await ApiClient().getDashboard();
      if (_dashboard?['children'] != null && mounted) {
        context.read<ChildProvider>().loadFromDashboard(_dashboard!['children'] as List<dynamic>);
      }
    } catch (_) {}
    if (mounted) setState(() => _loading = false);
  }

  List<Map<String, dynamic>> _alerts() {
    final children = _dashboard?['children'] as List<dynamic>? ?? [];
    final result = <Map<String, dynamic>>[];
    for (final c in children) {
      final a = (c as Map<String, dynamic>)['alerts'] as List<dynamic>? ?? [];
      result.addAll(a.cast<Map<String, dynamic>>());
    }
    return result;
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final children = context.watch<ChildProvider>().children;
    final alerts = _alerts();
    final stats = _dashboard?['stats'] as Map<String, dynamic>? ?? {};

    final screens = [
      _Overview(stats: stats, children: children, onRefresh: _load, onChildTap: _openChild),
      _ChildrenTab(children: children, onChildTap: _openChild),
      AlertsScreen(alerts: alerts),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('${auth.user?.name.split(' ').first ?? 'Parent'} Dashboard'),
        actions: [
          IconButton(icon: const Icon(Icons.logout), onPressed: () async {
            await context.read<AuthProvider>().logout();
            if (mounted) Navigator.pushReplacementNamed(context, '/login');
          }),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : IndexedStack(index: _tab, children: screens),
      floatingActionButton: _tab == 1
          ? FloatingActionButton.extended(
              onPressed: () async {
                final ok = await Navigator.push(context, MaterialPageRoute(builder: (_) => const AddChildScreen()));
                if (ok == true) _load();
              },
              icon: const Icon(Icons.add),
              label: const Text('Add Child'),
            )
          : null,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: [
          const NavigationDestination(icon: Icon(Icons.dashboard_outlined), selectedIcon: Icon(Icons.dashboard), label: 'Overview'),
          const NavigationDestination(icon: Icon(Icons.child_care_outlined), selectedIcon: Icon(Icons.child_care), label: 'Children'),
          NavigationDestination(
            icon: Badge(isLabelVisible: alerts.isNotEmpty, label: Text('${alerts.length}'), child: const Icon(Icons.notifications_outlined)),
            selectedIcon: const Icon(Icons.notifications),
            label: 'Alerts',
          ),
        ],
      ),
    );
  }

  void _openChild(Child child) {
    Navigator.push(context, MaterialPageRoute(builder: (_) => ChildDetailScreen(child: child)));
  }
}

class _Overview extends StatelessWidget {
  final Map<String, dynamic> stats;
  final List<Child> children;
  final VoidCallback onRefresh;
  final void Function(Child) onChildTap;
  const _Overview({required this.stats, required this.children, required this.onRefresh, required this.onChildTap});

  @override
  Widget build(BuildContext context) => RefreshIndicator(
    onRefresh: () async => onRefresh(),
    child: ListView(padding: const EdgeInsets.all(16), children: [
      const Text('Family Overview', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
      const SizedBox(height: 16),
      Row(children: [
        _stat('👨‍👧', '${stats['totalChildren'] ?? children.length}', 'Children', KidoTheme.primary),
        const SizedBox(width: 10),
        _stat('🏆', '${stats['totalXP'] ?? 0}', 'Total XP', KidoTheme.gold),
        const SizedBox(width: 10),
        _stat('📝', '${stats['totalQuizzes'] ?? 0}', 'Quizzes', KidoTheme.accent),
      ]),
      if ((stats['unreadAlerts'] as int? ?? 0) > 0) ...[
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          decoration: BoxDecoration(color: KidoTheme.warning.withOpacity(0.1), borderRadius: BorderRadius.circular(14), border: Border.all(color: KidoTheme.warning.withOpacity(0.3))),
          child: Row(children: [
            const Text('⚠️', style: TextStyle(fontSize: 18)),
            const SizedBox(width: 8),
            Text('${stats['unreadAlerts']} unread alert(s)', style: const TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.warning)),
          ]),
        ),
      ],
      const SizedBox(height: 24),
      const Text('Your Children', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
      const SizedBox(height: 12),
      if (children.isEmpty)
        Container(
          padding: const EdgeInsets.all(24),
          decoration: BoxDecoration(color: KidoTheme.background, borderRadius: BorderRadius.circular(20)),
          child: const Column(children: [
            Text('👶', style: TextStyle(fontSize: 40)),
            SizedBox(height: 8),
            Text('No children added yet', style: TextStyle(fontWeight: FontWeight.w600)),
            Text('Go to Children tab to add your first child', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 13)),
          ]),
        )
      else
        ...children.map((c) => _childCard(c)),
      const SizedBox(height: 80),
    ]),
  );

  Widget _stat(String emoji, String val, String label, Color color) => Expanded(
    child: Container(
      padding: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
      child: Column(children: [
        Text(emoji, style: const TextStyle(fontSize: 20)),
        const SizedBox(height: 4),
        Text(val, style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: color)),
        Text(label, style: const TextStyle(fontSize: 11, color: KidoTheme.textSecondary)),
      ]),
    ),
  );

  Widget _childCard(Child c) => GestureDetector(
    onTap: () => onChildTap(c),
    child: Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10)]),
      child: Row(children: [
        CircleAvatar(radius: 24, backgroundColor: KidoTheme.primary.withOpacity(0.1),
          child: Text(c.name[0], style: const TextStyle(color: KidoTheme.primary, fontSize: 18, fontWeight: FontWeight.bold))),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(c.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
          Text('Age ${c.age} • Level ${c.level} • ${c.streak}🔥', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
          const SizedBox(height: 5),
          ClipRRect(borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(value: c.levelProgress, backgroundColor: Colors.grey.shade200, valueColor: const AlwaysStoppedAnimation(KidoTheme.primary), minHeight: 4)),
        ])),
        const SizedBox(width: 8),
        Text('${c.xp} XP', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.gold, fontSize: 12)),
        const SizedBox(width: 4),
        const Icon(Icons.arrow_forward_ios, size: 14, color: KidoTheme.textSecondary),
      ]),
    ),
  );
}

class _ChildrenTab extends StatelessWidget {
  final List<Child> children;
  final void Function(Child) onChildTap;
  const _ChildrenTab({required this.children, required this.onChildTap});

  @override
  Widget build(BuildContext context) {
    if (children.isEmpty) {
      return const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text('👶', style: TextStyle(fontSize: 64)),
        SizedBox(height: 16),
        Text('No children yet', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
        SizedBox(height: 8),
        Text('Tap + Add Child below', style: TextStyle(color: KidoTheme.textSecondary)),
      ]));
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: children.length,
      itemBuilder: (_, i) {
        final c = children[i];
        return GestureDetector(
          onTap: () => onChildTap(c),
          child: Container(
            margin: const EdgeInsets.only(bottom: 12),
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(18), boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10)]),
            child: Row(children: [
              CircleAvatar(radius: 26, backgroundColor: KidoTheme.primary.withOpacity(0.1),
                child: Text(c.name[0], style: const TextStyle(color: KidoTheme.primary, fontSize: 20, fontWeight: FontWeight.bold))),
              const SizedBox(width: 14),
              Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                Text(c.name, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                Text('Age ${c.age} • ${c.totalQuizzes} quizzes completed', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
                if (c.strongSubjects.isNotEmpty) ...[
                  const SizedBox(height: 4),
                  Text('Strong: ${c.strongSubjects.take(2).join(', ')}', style: const TextStyle(color: KidoTheme.success, fontSize: 11)),
                ],
              ])),
              Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
                Text('${c.xp} XP', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.gold)),
                Text('Lv ${c.level}', style: const TextStyle(color: KidoTheme.primary, fontSize: 12, fontWeight: FontWeight.w600)),
                Text('${c.streak}🔥', style: const TextStyle(fontSize: 12)),
              ]),
              const SizedBox(width: 6),
              const Icon(Icons.arrow_forward_ios, size: 14, color: KidoTheme.textSecondary),
            ]),
          ),
        );
      },
    );
  }
}
