import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/constants.dart';
import '../../providers/child_provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/content_provider.dart';

class ChildHomeScreen extends StatefulWidget {
  const ChildHomeScreen({super.key});

  @override
  State<ChildHomeScreen> createState() => _ChildHomeScreenState();
}

class _ChildHomeScreenState extends State<ChildHomeScreen> {
  int _selectedIndex = 0;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final childProvider = context.read<ChildProvider>();
      childProvider.loadProfile();
      childProvider.loadActivityFeed();
      context.read<ContentProvider>().loadContent();
    });
  }

  @override
  Widget build(BuildContext context) {
    final child = context.watch<ChildProvider>();
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      body: SafeArea(
        child: _selectedIndex == 0
            ? _buildHome(child)
            : _selectedIndex == 1
                ? _buildGamesTab()
                : _selectedIndex == 2
                    ? _buildVideosTab()
                    : _selectedIndex == 3
                        ? _buildSocialTab()
                        : _buildProfileTab(child, auth),
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (i) => setState(() => _selectedIndex = i),
        backgroundColor: Colors.white,
        elevation: 0,
        destinations: const [
          NavigationDestination(icon: Icon(Icons.home_outlined), selectedIcon: Icon(Icons.home), label: 'Home'),
          NavigationDestination(icon: Icon(Icons.sports_esports_outlined), selectedIcon: Icon(Icons.sports_esports), label: 'Games'),
          NavigationDestination(icon: Icon(Icons.play_circle_outline), selectedIcon: Icon(Icons.play_circle), label: 'Videos'),
          NavigationDestination(icon: Icon(Icons.group_outlined), selectedIcon: Icon(Icons.group), label: 'Friends'),
          NavigationDestination(icon: Icon(Icons.person_outline), selectedIcon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }

  Widget _buildHome(ChildProvider child) {
    final profile = child.profile;
    final name = profile?['username'] ?? 'Explorer';
    final xp = profile?['xp'] ?? 0;
    final level = profile?['level'] ?? 1;
    final streak = profile?['streak_days'] ?? 0;
    final xpToNext = KidoConstants.xpPerLevel - (xp % KidoConstants.xpPerLevel);
    final progress = (xp % KidoConstants.xpPerLevel) / KidoConstants.xpPerLevel;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Hey, $name! 👋', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
                    const Text('Ready to learn today?', style: TextStyle(color: KidoTheme.textSecondary, fontSize: 13)),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: KidoTheme.streak.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const Text('🔥', style: TextStyle(fontSize: 18)),
                    const SizedBox(width: 4),
                    Text('$streak', style: const TextStyle(fontWeight: FontWeight.w700, color: KidoTheme.streak, fontSize: 16)),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 20),

          // XP Progress Card
          Container(
            padding: const EdgeInsets.all(20),
            decoration: KidoTheme.cardDecoration(color: KidoTheme.primary),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: Colors.white.withOpacity(0.2), borderRadius: BorderRadius.circular(20)),
                      child: Text('Level $level', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
                    ),
                    const Spacer(),
                    Text('$xp XP', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 18)),
                  ],
                ),
                const SizedBox(height: 12),
                Text(KidoConstants.getLevelTitle(level), style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(10),
                  child: LinearProgressIndicator(
                    value: progress,
                    backgroundColor: Colors.white.withOpacity(0.3),
                    valueColor: const AlwaysStoppedAnimation<Color>(KidoTheme.gold),
                    minHeight: 10,
                  ),
                ),
                const SizedBox(height: 6),
                Text('$xpToNext XP to next level', style: const TextStyle(color: Colors.white70, fontSize: 11)),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // Quick Actions
          const Text('Quick Start', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: KidoTheme.textPrimary)),
          const SizedBox(height: 12),
          Row(
            children: [
              _quickAction('🧩', 'Quiz', KidoTheme.primary, () => setState(() => _selectedIndex = 1)),
              const SizedBox(width: 12),
              _quickAction('📺', 'Watch', KidoTheme.accent, () => setState(() => _selectedIndex = 2)),
              const SizedBox(width: 12),
              _quickAction('🏆', 'Rank', KidoTheme.secondary, () => setState(() => _selectedIndex = 3)),
            ],
          ),

          const SizedBox(height: 20),

          // Recent Activity
          const Text('Recent Activity', style: TextStyle(fontWeight: FontWeight.w700, fontSize: 16, color: KidoTheme.textPrimary)),
          const SizedBox(height: 12),
          ...child.activities.take(3).map((a) => _activityCard(a)),
          if (child.activities.isEmpty)
            Center(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  children: const [
                    Text('🌟', style: TextStyle(fontSize: 40)),
                    SizedBox(height: 8),
                    Text('No activities yet — start playing!', style: TextStyle(color: KidoTheme.textSecondary)),
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }

  Widget _quickAction(String emoji, String label, Color color, VoidCallback onTap) {
    return Expanded(
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 18),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(18),
            border: Border.all(color: color.withOpacity(0.3)),
          ),
          child: Column(
            children: [
              Text(emoji, style: const TextStyle(fontSize: 28)),
              const SizedBox(height: 4),
              Text(label, style: TextStyle(fontWeight: FontWeight.w600, color: color, fontSize: 13)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _activityCard(Map<String, dynamic> activity) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      padding: const EdgeInsets.all(14),
      decoration: KidoTheme.cardDecoration(),
      child: Row(
        children: [
          Container(
            width: 40, height: 40,
            decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.1), shape: BoxShape.circle),
            child: const Center(child: Text('⭐', style: TextStyle(fontSize: 18))),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(activity['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: KidoTheme.textPrimary)),
                if (activity['xp_earned'] != null && activity['xp_earned'] > 0)
                  Text('+${activity['xp_earned']} XP', style: const TextStyle(color: KidoTheme.gold, fontSize: 11, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGamesTab() {
    final categories = ['Math', 'Science', 'Language', 'Creativity', 'General'];
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Games 🎮', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
          const SizedBox(height: 6),
          const Text('Learn through play!', style: TextStyle(color: KidoTheme.textSecondary)),
          const SizedBox(height: 20),
          GridView.count(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            crossAxisCount: 2,
            crossAxisSpacing: 14,
            mainAxisSpacing: 14,
            childAspectRatio: 1.1,
            children: [
              _gameCard('🧠', 'Adaptive Quiz', 'Test your knowledge', KidoTheme.primary, null),
              _gameCard('🔢', 'Math Challenge', 'Numbers & logic', KidoTheme.accent, 'math'),
              _gameCard('🔬', 'Science Quiz', 'Explore the world', KidoTheme.secondary, 'science'),
              _gameCard('🎨', 'Creativity Quiz', 'Art & creativity', Color(0xFFFF9800), 'creativity'),
              _gameCard('📖', 'Language Quiz', 'Words & stories', Color(0xFF9C27B0), 'language'),
              _gameCard('🌍', 'Ethics & Values', 'Right vs wrong', KidoTheme.success, 'ethics'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _gameCard(String emoji, String title, String desc, Color color, String? category) {
    return GestureDetector(
      onTap: () => Navigator.pushNamed(context, '/game/quiz', arguments: category),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [color, color.withOpacity(0.7)],
          ),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(emoji, style: const TextStyle(fontSize: 32)),
            const Spacer(),
            Text(title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14)),
            Text(desc, style: const TextStyle(color: Colors.white70, fontSize: 11)),
          ],
        ),
      ),
    );
  }

  Widget _buildVideosTab() {
    final content = context.watch<ContentProvider>().allContent;
    final isLoading = context.watch<ContentProvider>().isLoading;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: const [
              Text('Watch & Learn 📺', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
              SizedBox(height: 4),
              Text('Safe videos just for you', style: TextStyle(color: KidoTheme.textSecondary)),
            ],
          ),
        ),
        const SizedBox(height: 16),
        // Category chips
        SizedBox(
          height: 40,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: 20),
            children: ['All', 'Math', 'Science', 'Creativity', 'Ethics', 'Language'].map((cat) {
              return GestureDetector(
                onTap: () {
                  context.read<ContentProvider>().loadContent(category: cat == 'All' ? null : cat.toLowerCase());
                },
                child: Container(
                  margin: const EdgeInsets.only(right: 8),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  decoration: BoxDecoration(
                    color: KidoTheme.primary.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: KidoTheme.primary.withOpacity(0.3)),
                  ),
                  child: Text(cat, style: const TextStyle(color: KidoTheme.primary, fontWeight: FontWeight.w600, fontSize: 13)),
                ),
              );
            }).toList(),
          ),
        ),
        const SizedBox(height: 16),
        Expanded(
          child: isLoading
              ? const Center(child: CircularProgressIndicator())
              : content.isEmpty
                  ? const Center(child: Text('No videos available yet 📭'))
                  : ListView.builder(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      itemCount: content.length,
                      itemBuilder: (ctx, i) => _videoCard(content[i]),
                    ),
        ),
      ],
    );
  }

  Widget _videoCard(Map<String, dynamic> item) {
    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      decoration: KidoTheme.cardDecoration(),
      child: ListTile(
        contentPadding: const EdgeInsets.all(12),
        leading: Container(
          width: 60, height: 60,
          decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
          child: const Center(child: Text('🎬', style: TextStyle(fontSize: 28))),
        ),
        title: Text(item['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
        subtitle: Text(
          '${item['category'] ?? ''} • ${(item['duration_seconds'] ?? 0) ~/ 60} min',
          style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12),
        ),
        trailing: const Icon(Icons.play_circle_fill, color: KidoTheme.primary, size: 32),
        onTap: () {},
      ),
    );
  }

  Widget _buildSocialTab() {
    final child = context.watch<ChildProvider>();
    return DefaultTabController(
      length: 3,
      child: Column(
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 20, 20, 12),
            child: Text('Friends & Leaderboard 🏆', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
          ),
          const TabBar(
            labelColor: KidoTheme.primary,
            unselectedLabelColor: KidoTheme.textSecondary,
            indicatorColor: KidoTheme.primary,
            tabs: [Tab(text: 'Friends'), Tab(text: 'Leaderboard'), Tab(text: 'Feed')],
          ),
          Expanded(
            child: TabBarView(
              children: [
                _friendsList(child),
                _leaderboardList(child),
                _feedList(child),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _friendsList(ChildProvider child) {
    if (child.friends.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Text('👫', style: TextStyle(fontSize: 50)),
            const SizedBox(height: 12),
            const Text('No friends yet', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 16)),
            const SizedBox(height: 6),
            const Text('Search for friends to add', style: TextStyle(color: KidoTheme.textSecondary)),
          ],
        ),
      );
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: child.friends.length,
      itemBuilder: (ctx, i) {
        final f = child.friends[i];
        return ListTile(
          leading: CircleAvatar(backgroundColor: KidoTheme.primary, child: Text(f['username']?[0]?.toUpperCase() ?? '?', style: const TextStyle(color: Colors.white))),
          title: Text(f['username'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600)),
          subtitle: Text('${f['xp']} XP • Level ${f['level']} • 🔥${f['streak_days']}'),
        );
      },
    );
  }

  Widget _leaderboardList(ChildProvider child) {
    final list = child.friendLeaderboard.isEmpty ? child.leaderboard : child.friendLeaderboard;
    if (list.isEmpty) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        child.loadLeaderboard();
        child.loadFriends();
      });
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: list.length,
      itemBuilder: (ctx, i) {
        final item = list[i];
        final medals = ['🥇', '🥈', '🥉'];
        return ListTile(
          leading: Text(i < 3 ? medals[i] : '${i + 1}', style: const TextStyle(fontSize: 22)),
          title: Text(item['username'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600)),
          trailing: Text('${item['xp']} XP', style: const TextStyle(color: KidoTheme.primary, fontWeight: FontWeight.w700)),
          subtitle: Text('Level ${item['level']} • 🔥${item['streak_days']} streak'),
        );
      },
    );
  }

  Widget _feedList(ChildProvider child) {
    if (child.activities.isEmpty) {
      return const Center(child: Text('No activity yet 📭'));
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: child.activities.length,
      itemBuilder: (ctx, i) {
        final a = child.activities[i];
        return ListTile(
          leading: const Text('⭐', style: TextStyle(fontSize: 24)),
          title: Text(a['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600)),
          subtitle: Text(a['description'] ?? ''),
          trailing: a['xp_earned'] != null && a['xp_earned'] > 0
              ? Text('+${a['xp_earned']} XP', style: const TextStyle(color: KidoTheme.gold, fontWeight: FontWeight.w700))
              : null,
        );
      },
    );
  }

  Widget _buildProfileTab(ChildProvider child, AuthProvider auth) {
    final profile = child.profile;
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const SizedBox(height: 20),
          CircleAvatar(
            radius: 50,
            backgroundColor: KidoTheme.primary,
            child: Text(
              (profile?['username'] ?? 'K')[0].toUpperCase(),
              style: const TextStyle(color: Colors.white, fontSize: 40, fontWeight: FontWeight.w700),
            ),
          ),
          const SizedBox(height: 12),
          Text(profile?['username'] ?? '...', style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w700, color: KidoTheme.textPrimary)),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _statCard('${profile?['xp'] ?? 0}', 'XP', KidoTheme.primary),
              _statCard('${profile?['level'] ?? 1}', 'Level', KidoTheme.accent),
              _statCard('🔥 ${profile?['streak_days'] ?? 0}', 'Streak', KidoTheme.streak),
              _statCard('${profile?['lessons_completed'] ?? 0}', 'Lessons', KidoTheme.success),
            ],
          ),
          const SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () async { await auth.logout(); if (mounted) Navigator.pushReplacementNamed(context, '/login'); },
              icon: const Icon(Icons.logout),
              label: const Text('Sign Out'),
              style: ElevatedButton.styleFrom(backgroundColor: KidoTheme.error),
            ),
          ),
        ],
      ),
    );
  }

  Widget _statCard(String value, String label, Color color) {
    return Column(
      children: [
        Text(value, style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: color)),
        const SizedBox(height: 2),
        Text(label, style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
      ],
    );
  }
}
