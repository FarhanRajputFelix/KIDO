import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';
import '../../providers/auth_provider.dart';

class TeacherHomeScreen extends StatefulWidget {
  const TeacherHomeScreen({super.key});

  @override
  State<TeacherHomeScreen> createState() => _TeacherHomeScreenState();
}

class _TeacherHomeScreenState extends State<TeacherHomeScreen> {
  Map<String, dynamic>? _profile;
  List<dynamic> _classrooms = [];
  List<dynamic> _lessons = [];
  bool _isLoading = true;
  int _selectedTab = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final profile = await ApiClient().dio.get('/teachers/profile');
      final classrooms = await ApiClient().dio.get('/teachers/classrooms');
      final lessons = await ApiClient().dio.get('/teachers/lessons');
      setState(() {
        _profile = profile.data as Map<String, dynamic>;
        _classrooms = classrooms.data as List<dynamic>;
        _lessons = lessons.data as List<dynamic>;
        _isLoading = false;
      });
    } catch (_) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final auth = context.watch<AuthProvider>();

    return Scaffold(
      body: SafeArea(
        child: _isLoading
            ? const Center(child: CircularProgressIndicator())
            : Column(
                children: [
                  // Header
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: KidoTheme.gradientBackground,
                    child: Row(
                      children: [
                        const CircleAvatar(radius: 26, backgroundColor: Colors.white24, child: Text('🏫', style: TextStyle(fontSize: 24))),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(_profile?['name'] ?? 'Teacher', style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
                              Text(_profile?['school'] ?? 'KIDO Educator', style: const TextStyle(color: Colors.white70, fontSize: 12)),
                            ],
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                          decoration: BoxDecoration(
                            color: _profile?['is_verified'] == true ? KidoTheme.success : KidoTheme.warning,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: Text(
                            _profile?['is_verified'] == true ? '✓ Verified' : 'Pending',
                            style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w600),
                          ),
                        ),
                      ],
                    ),
                  ),

                  // Stats Row
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        _statCard('${_classrooms.length}', 'Classes', KidoTheme.primary, Icons.class_),
                        const SizedBox(width: 12),
                        _statCard('${_profile?['total_students'] ?? 0}', 'Students', KidoTheme.accent, Icons.people),
                        const SizedBox(width: 12),
                        _statCard('${_lessons.length}', 'Lessons', KidoTheme.secondary, Icons.video_library),
                      ],
                    ),
                  ),

                  // Tabs
                  Container(
                    color: Colors.white,
                    child: Row(
                      children: [
                        _tabBtn('Classes', 0),
                        _tabBtn('Lessons', 1),
                        _tabBtn('Profile', 2),
                      ],
                    ),
                  ),

                  Expanded(
                    child: _selectedTab == 0
                        ? _buildClassesTab()
                        : _selectedTab == 1
                            ? _buildLessonsTab()
                            : _buildProfileTab(auth),
                  ),
                ],
              ),
      ),
    );
  }

  Widget _statCard(String value, String label, Color color, IconData icon) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          color: color.withOpacity(0.1),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(height: 4),
            Text(value, style: TextStyle(fontWeight: FontWeight.w700, color: color, fontSize: 20)),
            Text(label, style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 11)),
          ],
        ),
      ),
    );
  }

  Widget _tabBtn(String label, int index) {
    final isSelected = _selectedTab == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedTab = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            border: Border(bottom: BorderSide(color: isSelected ? KidoTheme.primary : Colors.transparent, width: 3)),
          ),
          child: Text(label, textAlign: TextAlign.center, style: TextStyle(color: isSelected ? KidoTheme.primary : KidoTheme.textSecondary, fontWeight: FontWeight.w600)),
        ),
      ),
    );
  }

  Widget _buildClassesTab() {
    return _classrooms.isEmpty
        ? Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('🏫', style: TextStyle(fontSize: 60)),
                const SizedBox(height: 12),
                const Text('No classrooms yet', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                const SizedBox(height: 16),
                ElevatedButton.icon(
                  onPressed: _showCreateClassroom,
                  icon: const Icon(Icons.add),
                  label: const Text('Create Classroom'),
                ),
              ],
            ),
          )
        : ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: _classrooms.length + 1,
            itemBuilder: (ctx, i) {
              if (i == _classrooms.length) {
                return Padding(
                  padding: const EdgeInsets.only(top: 8),
                  child: ElevatedButton.icon(
                    onPressed: _showCreateClassroom,
                    icon: const Icon(Icons.add),
                    label: const Text('Create Classroom'),
                  ),
                );
              }
              final c = _classrooms[i];
              return Container(
                margin: const EdgeInsets.only(bottom: 12),
                padding: const EdgeInsets.all(16),
                decoration: KidoTheme.cardDecoration(),
                child: Row(
                  children: [
                    Container(
                      width: 48, height: 48,
                      decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
                      child: const Center(child: Text('🏫', style: TextStyle(fontSize: 24))),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(c['name'] ?? '', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                          Text('Grade: ${c['grade']} • Code: ${c['invite_code']}', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
                        ],
                      ),
                    ),
                    IconButton(
                      icon: const Icon(Icons.people, color: KidoTheme.primary),
                      onPressed: () => Navigator.pushNamed(context, '/teacher/students', arguments: c['id']),
                    ),
                  ],
                ),
              );
            },
          );
  }

  Widget _buildLessonsTab() {
    return _lessons.isEmpty
        ? const Center(child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text('📚', style: TextStyle(fontSize: 60)),
              SizedBox(height: 12),
              Text('No lessons uploaded yet', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
              SizedBox(height: 8),
              Text('Upload your first lesson!', style: TextStyle(color: KidoTheme.textSecondary)),
            ],
          ))
        : ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: _lessons.length,
            itemBuilder: (ctx, i) {
              final lesson = _lessons[i];
              return ListTile(
                leading: const Text('📺', style: TextStyle(fontSize: 28)),
                title: Text(lesson['title'] ?? '', style: const TextStyle(fontWeight: FontWeight.w600)),
                subtitle: Text('${lesson['category']} • ${lesson['view_count']} views'),
                trailing: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: lesson['is_approved'] == true ? KidoTheme.success.withOpacity(0.1) : KidoTheme.warning.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    lesson['is_approved'] == true ? 'Approved' : 'Pending',
                    style: TextStyle(color: lesson['is_approved'] == true ? KidoTheme.success : KidoTheme.warning, fontSize: 11, fontWeight: FontWeight.w600),
                  ),
                ),
              );
            },
          );
  }

  Widget _buildProfileTab(AuthProvider auth) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          const SizedBox(height: 20),
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

  void _showCreateClassroom() {
    final nameCtrl = TextEditingController();
    final gradeCtrl = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Create Classroom'),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            TextField(controller: nameCtrl, decoration: const InputDecoration(labelText: 'Class Name')),
            const SizedBox(height: 10),
            TextField(controller: gradeCtrl, decoration: const InputDecoration(labelText: 'Grade')),
          ],
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              try {
                await ApiClient().dio.post('/teachers/classrooms', queryParameters: {
                  'name': nameCtrl.text,
                  'grade': gradeCtrl.text,
                });
                Navigator.pop(ctx);
                _loadData();
              } catch (_) {}
            },
            child: const Text('Create'),
          ),
        ],
      ),
    );
  }
}
