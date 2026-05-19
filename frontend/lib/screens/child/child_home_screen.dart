import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/auth_provider.dart';
import '../../providers/child_provider.dart';
import '../../models/child.dart';
import 'chat_screen.dart';
import 'quiz_screen.dart';
import 'games_screen.dart';
import 'leaderboard_screen.dart';

class ChildHomeScreen extends StatefulWidget {
  const ChildHomeScreen({super.key});
  @override
  State<ChildHomeScreen> createState() => _ChildHomeScreenState();
}

class _ChildHomeScreenState extends State<ChildHomeScreen> {
  int _tab = 0;
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      await context.read<ChildProvider>().loadChildren();
    } catch (_) {}
    if (mounted) setState(() => _loading = false);
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();
    final child = context.watch<ChildProvider>().selectedChild;
    final firstName = auth.user?.name.split(' ').first ?? 'Learner';

    final screens = [
      _HomeTab(child: child, onTab: (i) => setState(() => _tab = i)),
      child != null ? QuizScreen(childId: child.id) : const _NoChild(),
      child != null ? GamesScreen(childId: child.id) : const _NoChild(),
      child != null ? ChatScreen(childId: child.id, childName: child.name) : const _NoChild(),
      const LeaderboardScreen(),
    ];

    return Scaffold(
      appBar: AppBar(
        title: Text('Hi, $firstName! 👋'),
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
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : IndexedStack(index: _tab, children: screens),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _tab,
        onDestinationSelected: (i) => setState(() => _tab = i),
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.quiz_outlined), selectedIcon: Icon(Icons.quiz), label: 'Quiz'),
          NavigationDestination(icon: Icon(Icons.games_outlined), selectedIcon: Icon(Icons.games), label: 'Games'),
          NavigationDestination(icon: Icon(Icons.chat_outlined), selectedIcon: Icon(Icons.chat), label: 'AI Tutor'),
          NavigationDestination(icon: Icon(Icons.leaderboard_outlined), selectedIcon: Icon(Icons.leaderboard), label: 'Ranks'),
        ],
      ),
    );
  }
}

class _HomeTab extends StatelessWidget {
  final Child? child;
  final void Function(int) onTab;
  const _HomeTab({this.child, required this.onTab});

  @override
  Widget build(BuildContext context) {
    if (child == null) return const _NoChild();
    final c = child!;
    return RefreshIndicator(
      onRefresh: () => context.read<ChildProvider>().loadChildren(),
      child: ListView(padding: const EdgeInsets.all(16), children: [
        Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            gradient: const LinearGradient(colors: [Color(0xFF6C63FF), Color(0xFF3F3D9E)]),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              CircleAvatar(
                radius: 28,
                backgroundColor: Colors.white.withOpacity(0.2),
                child: Text(c.name[0], style: const TextStyle(color: Colors.white, fontSize: 22, fontWeight: FontWeight.bold)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
                  Text(c.name, style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                  Text('Level ${c.level}  •  ${c.streak} day streak 🔥', style: const TextStyle(color: Colors.white70, fontSize: 13)),
                ]),
              ),
            ]),
            const SizedBox(height: 20),
            Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
              const Text('XP to next level', style: TextStyle(color: Colors.white70, fontSize: 12)),
              Text('${c.xp % 500}/500', style: const TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
            ]),
            const SizedBox(height: 6),
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: LinearProgressIndicator(
                value: c.levelProgress,
                backgroundColor: Colors.white.withOpacity(0.2),
                valueColor: const AlwaysStoppedAnimation(Colors.white),
                minHeight: 8,
              ),
            ),
          ]),
        ),
        const SizedBox(height: 16),
        Row(children: [
          _stat('🏆', '${c.xp}', 'XP', KidoTheme.gold),
          const SizedBox(width: 10),
          _stat('📝', '${c.totalQuizzes}', 'Quizzes', KidoTheme.accent),
          const SizedBox(width: 10),
          _stat('🔥', '${c.streak}', 'Streak', KidoTheme.streak),
        ]),
        const SizedBox(height: 20),
        const Text('Quick Actions', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1.3,
          children: [
            _action('🧠', 'Quiz', 'Test your knowledge', KidoTheme.primary, () => onTab(1)),
            _action('🎮', 'Games', 'Learn while having fun', KidoTheme.secondary, () => onTab(2)),
            _action('💬', 'AI Tutor', 'Get instant help', KidoTheme.accent, () => onTab(3)),
            _action('🏅', 'Leaderboard', 'See top learners', KidoTheme.gold, () => onTab(4)),
          ],
        ),
        const SizedBox(height: 80),
      ]),
    );
  }

  Widget _stat(String emoji, String val, String label, Color color) => Expanded(
    child: Container(
      padding: const EdgeInsets.symmetric(vertical: 14),
      decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(16)),
      child: Column(children: [
        Text(emoji, style: const TextStyle(fontSize: 20)),
        const SizedBox(height: 4),
        Text(val, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w800, color: color)),
        Text(label, style: const TextStyle(fontSize: 11, color: KidoTheme.textSecondary)),
      ]),
    ),
  );

  Widget _action(String emoji, String title, String sub, Color color, VoidCallback onTap) => GestureDetector(
    onTap: onTap,
    child: Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: color.withOpacity(0.08),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: color.withOpacity(0.2)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(emoji, style: const TextStyle(fontSize: 26)),
        const Spacer(),
        Text(title, style: TextStyle(fontWeight: FontWeight.w700, color: color, fontSize: 13)),
        Text(sub, style: const TextStyle(fontSize: 10, color: KidoTheme.textSecondary)),
      ]),
    ),
  );
}

class _NoChild extends StatelessWidget {
  const _NoChild();
  @override
  Widget build(BuildContext context) => const Center(
    child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      Text('🚀', style: TextStyle(fontSize: 60)),
      SizedBox(height: 16),
      Text('No profile found', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
      SizedBox(height: 8),
      Text('Ask your parent to set up your account', style: TextStyle(color: KidoTheme.textSecondary)),
    ]),
  );
}
