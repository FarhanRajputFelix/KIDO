import 'package:flutter/material.dart';
import '../../core/theme.dart';

class AlertsScreen extends StatelessWidget {
  final List<Map<String, dynamic>> alerts;
  const AlertsScreen({super.key, required this.alerts});

  @override
  Widget build(BuildContext context) {
    if (alerts.isEmpty) {
      return const Center(child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
        Text('✅', style: TextStyle(fontSize: 64)),
        SizedBox(height: 16),
        Text('All clear!', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
        SizedBox(height: 8),
        Text('No alerts for your children', style: TextStyle(color: KidoTheme.textSecondary)),
      ]));
    }

    return ListView(padding: const EdgeInsets.all(16), children: [
      const Text('Parent Alerts', style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
      const SizedBox(height: 4),
      Text('${alerts.length} alert(s) need your attention', style: const TextStyle(color: KidoTheme.textSecondary)),
      const SizedBox(height: 16),
      ...alerts.map((a) => _alertCard(a)),
      const SizedBox(height: 80),
    ]);
  }

  Widget _alertCard(Map<String, dynamic> a) {
    final type = a['type']?.toString() ?? 'info';
    final severity = a['severity']?.toString() ?? 'info';
    final color = severity == 'critical' ? KidoTheme.error : severity == 'warning' ? KidoTheme.warning : KidoTheme.accent;
    final emoji = type.contains('safety') ? '🛡️' : type.contains('screen') ? '📱' : type.contains('burnout') ? '😓' : type.contains('achievement') ? '🏆' : '📢';

    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.05),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Container(
          width: 40, height: 40,
          decoration: BoxDecoration(color: color.withOpacity(0.15), borderRadius: BorderRadius.circular(12)),
          child: Center(child: Text(emoji, style: const TextStyle(fontSize: 20))),
        ),
        const SizedBox(width: 12),
        Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Text(a['title']?.toString() ?? type.replaceAll('_', ' ').toUpperCase(),
              style: TextStyle(fontWeight: FontWeight.w700, color: color)),
          const SizedBox(height: 4),
          Text(a['message']?.toString() ?? '', style: const TextStyle(color: KidoTheme.textPrimary, height: 1.4)),
          const SizedBox(height: 4),
          Text(_formatDate(a['createdAt']?.toString()), style: const TextStyle(fontSize: 11, color: KidoTheme.textSecondary)),
        ])),
        Container(
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(8)),
          child: Text(severity.toUpperCase(), style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.w700)),
        ),
      ]),
    );
  }

  String _formatDate(String? s) {
    if (s == null) return '';
    try { return DateTime.parse(s).toLocal().toString().split(' ')[0]; } catch (_) { return ''; }
  }
}
