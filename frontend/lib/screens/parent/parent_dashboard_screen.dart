import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../core/api_client.dart';
import '../../providers/auth_provider.dart';

class ParentDashboardScreen extends StatefulWidget {
  const ParentDashboardScreen({super.key});

  @override
  State<ParentDashboardScreen> createState() => _ParentDashboardScreenState();
}

class _ParentDashboardScreenState extends State<ParentDashboardScreen> {
  Map<String, dynamic>? _dashboard;
  List<dynamic> _alerts = [];
  bool _isLoading = true;
  int _selectedTab = 0;

  @override
  void initState() {
    super.initState();
    _loadData();
  }

  Future<void> _loadData() async {
    try {
      final dash = await ApiClient().getParentDashboard();
      final alerts = await ApiClient().getSafetyAlerts();
      setState(() {
        _dashboard = dash;
        _alerts = alerts;
        _isLoading = false;
      });
    } catch (e) {
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
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header
                  Container(
                    padding: const EdgeInsets.all(20),
                    decoration: KidoTheme.gradientBackground,
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Parent Dashboard',
                                style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700),
                              ),
                              Text(
                                'Welcome, ${auth.user?['full_name'] ?? 'Parent'}',
                                style: const TextStyle(color: Colors.white70, fontSize: 13),
                              ),
                            ],
                          ),
                        ),
                        if ((_dashboard?['unread_alerts'] ?? 0) > 0)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                            decoration: BoxDecoration(color: KidoTheme.error, borderRadius: BorderRadius.circular(12)),
                            child: Text(
                              '${_dashboard!['unread_alerts']} Alerts',
                              style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 12),
                            ),
                          ),
                      ],
                    ),
                  ),

                  // Tab Bar
                  Container(
                    color: Colors.white,
                    child: Row(
                      children: [
                        _tab('Children', 0),
                        _tab('Alerts', 1),
                        _tab('Settings', 2),
                      ],
                    ),
                  ),

                  Expanded(
                    child: _selectedTab == 0
                        ? _buildChildrenTab()
                        : _selectedTab == 1
                            ? _buildAlertsTab()
                            : _buildSettingsTab(auth),
                  ),
                ],
              ),
      ),
    );
  }

  Widget _tab(String label, int index) {
    final isSelected = _selectedTab == index;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _selectedTab = index),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 14),
          decoration: BoxDecoration(
            border: Border(
              bottom: BorderSide(color: isSelected ? KidoTheme.primary : Colors.transparent, width: 3),
            ),
          ),
          child: Text(
            label,
            textAlign: TextAlign.center,
            style: TextStyle(
              fontWeight: FontWeight.w600,
              color: isSelected ? KidoTheme.primary : KidoTheme.textSecondary,
              fontSize: 14,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildChildrenTab() {
    final children = _dashboard?['children'] as List<dynamic>? ?? [];
    if (children.isEmpty) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const [
            Text('👶', style: TextStyle(fontSize: 60)),
            SizedBox(height: 12),
            Text('No children added yet', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
            SizedBox(height: 6),
            Text('Use the app to create a child profile', style: TextStyle(color: KidoTheme.textSecondary)),
          ],
        ),
      );
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: children.length,
      itemBuilder: (ctx, i) => _childCard(children[i]),
    );
  }

  Widget _childCard(Map<String, dynamic> child) {
    final screenPct = child['daily_limit_minutes'] > 0
        ? (child['today_screen_minutes'] / child['daily_limit_minutes']).clamp(0.0, 1.0)
        : 0.0;
    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(18),
      decoration: KidoTheme.cardDecoration(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundColor: KidoTheme.primary,
                radius: 24,
                child: Text(child['username'][0].toUpperCase(), style: const TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w700)),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(child['username'], style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                    Text('Level ${child['level']} • ${child['xp']} XP • 🔥${child['streak_days']} streak',
                        style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
                  ],
                ),
              ),
              if (child['pending_friend_requests'] > 0)
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: const BoxDecoration(color: KidoTheme.warning, shape: BoxShape.circle),
                  child: Text('${child['pending_friend_requests']}', style: const TextStyle(color: Colors.white, fontSize: 11, fontWeight: FontWeight.w700)),
                ),
            ],
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text('Screen Time', style: TextStyle(fontSize: 12, color: KidoTheme.textSecondary)),
                        Text('${child['today_screen_minutes']}/${child['daily_limit_minutes']} min',
                            style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: screenPct > 0.8 ? KidoTheme.error : KidoTheme.textPrimary)),
                      ],
                    ),
                    const SizedBox(height: 4),
                    LinearProgressIndicator(
                      value: screenPct,
                      backgroundColor: Colors.grey.shade200,
                      valueColor: AlwaysStoppedAnimation<Color>(screenPct > 0.8 ? KidoTheme.error : KidoTheme.success),
                      minHeight: 6,
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Row(
            children: child['recent_activities'].take(2).map<Widget>((a) {
              return Expanded(
                child: Container(
                  margin: const EdgeInsets.only(right: 6),
                  padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 8),
                  decoration: BoxDecoration(color: KidoTheme.background, borderRadius: BorderRadius.circular(8)),
                  child: Text(a['title'] ?? '', style: const TextStyle(fontSize: 10, color: KidoTheme.textSecondary), maxLines: 1, overflow: TextOverflow.ellipsis),
                ),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  Widget _buildAlertsTab() {
    if (_alerts.isEmpty) {
      return const Center(child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('✅', style: TextStyle(fontSize: 60)),
          SizedBox(height: 12),
          Text('No safety alerts', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
          Text('Everything looks good!', style: TextStyle(color: KidoTheme.textSecondary)),
        ],
      ));
    }
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _alerts.length,
      itemBuilder: (ctx, i) {
        final alert = _alerts[i];
        final sev = alert['severity'] ?? 'low';
        final color = sev == 'critical' ? KidoTheme.error : sev == 'high' ? KidoTheme.warning : KidoTheme.accent;
        return Container(
          margin: const EdgeInsets.only(bottom: 10),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(
            color: color.withOpacity(0.1),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: color.withOpacity(0.3)),
          ),
          child: Row(
            children: [
              Icon(Icons.warning_amber_rounded, color: color, size: 28),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(alert['alert_type'] ?? '', style: TextStyle(fontWeight: FontWeight.w700, color: color, fontSize: 13)),
                    Text(alert['message'] ?? '', style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12)),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildSettingsTab(AuthProvider auth) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.notifications, color: KidoTheme.primary),
            title: const Text('Safety Alerts'),
            subtitle: const Text('Get notified of suspicious activity'),
            trailing: Switch(value: true, onChanged: (_) {}),
          ),
          const Divider(),
          ListTile(
            leading: const Icon(Icons.assessment, color: KidoTheme.accent),
            title: const Text('Weekly Reports'),
            subtitle: const Text('Receive weekly progress reports'),
            trailing: Switch(value: true, onChanged: (_) {}),
          ),
          const Divider(),
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
}
