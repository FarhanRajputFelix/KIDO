import 'dart:async';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/theme.dart';
import '../../providers/teacher_provider.dart';
import '../../models/child.dart';
import '../../models/agent_trace.dart';

class TeacherAiAgentScreen extends StatefulWidget {
  final Child student;
  const TeacherAiAgentScreen({super.key, required this.student});
  @override
  State<TeacherAiAgentScreen> createState() => _TeacherAiAgentScreenState();
}

class _TeacherAiAgentScreenState extends State<TeacherAiAgentScreen> with TickerProviderStateMixin {
  AgentTrace? _trace;
  int _runningAgentIndex = -1;
  late AnimationController _pulseCtrl;
  Timer? _agentTimer;
  bool _hasRun = false;

  static const _agentNames = [
    'LearningIntelligence', 'EngagementOptimization', 'BehaviorAnalysis',
    'SafetyModeration', 'FriendApproval', 'SocialModeration',
    'ParentInsight', 'TeacherSupport', 'ProgressAnalytics',
    'ContradictionDetection', 'FallbackRecovery',
  ];

  static const _agentEmojis = ['🧠', '⚡', '🔍', '🛡️', '🤝', '💬', '👨‍👩‍👧', '📚', '📊', '⚖️', '🔄'];
  static const _agentLabels = [
    'Learning Intelligence', 'Engagement Optimizer', 'Behavior Analysis',
    'Safety Moderation', 'Friend Approval', 'Social Moderation',
    'Parent Insight', 'Teacher Support', 'Progress Analytics',
    'Contradiction Detect', 'Fallback Recovery',
  ];
  static const _agentDescs = [
    'Analyzing learning velocity and weak concepts...',
    'Detecting fatigue signals and engagement patterns...',
    'Identifying burnout risk and behavioral trends...',
    'Scanning for safety concerns and content issues...',
    'Evaluating social trust and friendship requests...',
    'Monitoring screen time and social behavior...',
    'Generating parent-facing insights and alerts...',
    'Creating teaching recommendations for this student...',
    'Computing holistic performance analytics...',
    'Cross-validating all agent signals for consistency...',
    'Running recovery checks and finalizing pipeline...',
  ];

  @override
  void initState() {
    super.initState();
    _pulseCtrl = AnimationController(vsync: this, duration: const Duration(milliseconds: 800))..repeat(reverse: true);
    _loadExistingTraces();
  }

  @override
  void dispose() {
    _pulseCtrl.dispose();
    _agentTimer?.cancel();
    super.dispose();
  }

  Future<void> _loadExistingTraces() async {
    await context.read<TeacherProvider>().loadStudentTraces(widget.student.id);
    final traces = context.read<TeacherProvider>().studentTraces[widget.student.id];
    if (traces != null && traces.isNotEmpty && mounted) {
      setState(() { _trace = traces.first; _hasRun = true; });
    }
  }

  Future<void> _runPipeline() async {
    setState(() { _trace = null; _runningAgentIndex = 0; _hasRun = false; });
    _simulateAgents();
    final result = await context.read<TeacherProvider>().runAgentPipeline(widget.student);
    _agentTimer?.cancel();
    if (mounted) setState(() { _trace = result; _runningAgentIndex = -1; _hasRun = true; });
  }

  void _simulateAgents() {
    int idx = 0;
    _agentTimer = Timer.periodic(const Duration(milliseconds: 600), (t) {
      if (!mounted) { t.cancel(); return; }
      setState(() => _runningAgentIndex = idx);
      idx++;
      if (idx >= _agentNames.length) t.cancel();
    });
  }

  @override
  Widget build(BuildContext context) {
    final teacher = context.watch<TeacherProvider>();
    final s = widget.student;
    final isRunning = teacher.isRunningAgents;

    return Scaffold(
      appBar: AppBar(
        title: const Text('AI Agent Analysis'),
        actions: [
          if (!isRunning)
            ElevatedButton.icon(
              onPressed: _runPipeline,
              icon: const Text('🤖', style: TextStyle(fontSize: 16)),
              label: const Text('Run'),
              style: ElevatedButton.styleFrom(
                backgroundColor: KidoTheme.accent,
                foregroundColor: Colors.white,
                padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                minimumSize: Size.zero,
              ),
            ),
          const SizedBox(width: 8),
        ],
      ),
      body: ListView(padding: const EdgeInsets.all(16), children: [
        _studentBanner(s),
        const SizedBox(height: 20),
        _pipelineHeader(isRunning),
        const SizedBox(height: 16),
        ..._buildAgentCards(isRunning),
        if (_hasRun && _trace != null && !isRunning) ...[
          const SizedBox(height: 24),
          _resultsSection(_trace!),
        ],
        const SizedBox(height: 80),
      ]),
    );
  }

  Widget _studentBanner(Child s) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      gradient: const LinearGradient(colors: [Color(0xFF6C63FF), Color(0xFF3F3D9E)]),
      borderRadius: BorderRadius.circular(20),
    ),
    child: Row(children: [
      CircleAvatar(radius: 26, backgroundColor: Colors.white.withOpacity(0.2),
        child: Text(s.name[0], style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold))),
      const SizedBox(width: 14),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(s.name, style: const TextStyle(color: Colors.white, fontSize: 17, fontWeight: FontWeight.w700)),
        Text('Age ${s.age} • Level ${s.level} • ${s.totalQuizzes} quizzes', style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ])),
      Column(crossAxisAlignment: CrossAxisAlignment.end, children: [
        Text('${s.xp} XP', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
        Text('${s.streak}🔥 streak', style: const TextStyle(color: Colors.white70, fontSize: 12)),
      ]),
    ]),
  );

  Widget _pipelineHeader(bool isRunning) => Container(
    padding: const EdgeInsets.all(16),
    decoration: BoxDecoration(
      color: isRunning ? KidoTheme.accent.withOpacity(0.08) : KidoTheme.background,
      borderRadius: BorderRadius.circular(16),
      border: Border.all(color: isRunning ? KidoTheme.accent.withOpacity(0.4) : Colors.grey.shade200),
    ),
    child: Row(children: [
      AnimatedBuilder(
        animation: _pulseCtrl,
        builder: (_, __) => Container(
          width: 12, height: 12,
          decoration: BoxDecoration(
            color: isRunning ? KidoTheme.accent.withOpacity(0.4 + 0.6 * _pulseCtrl.value) : Colors.grey.shade400,
            shape: BoxShape.circle,
          ),
        ),
      ),
      const SizedBox(width: 10),
      Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Text(
          isRunning ? '11-Agent Pipeline Running...' : _hasRun ? 'Pipeline Complete ✅' : '11-Agent AI Pipeline',
          style: TextStyle(fontWeight: FontWeight.w700, color: isRunning ? KidoTheme.accent : KidoTheme.textPrimary),
        ),
        Text(
          isRunning
              ? 'Agents are analyzing ${widget.student.name}\'s data...'
              : _hasRun
                  ? 'Tap "Run" to re-analyze'
                  : 'Tap "Run" to analyze this student with all 11 AI agents',
          style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 12),
        ),
      ])),
    ]),
  );

  List<Widget> _buildAgentCards(bool isRunning) {
    final completedResults = _trace?.agentResults ?? [];
    final completedNames = completedResults.map((r) => r.agentName).toSet();

    return List.generate(_agentNames.length, (i) {
      final name = _agentNames[i];
      final emoji = _agentEmojis[i];
      final label = _agentLabels[i];
      final desc = _agentDescs[i];

      AgentStatus status;
      AgentResult? result;

      if (isRunning) {
        if (i < _runningAgentIndex) {
          status = AgentStatus.done;
        } else if (i == _runningAgentIndex) {
          status = AgentStatus.running;
        } else {
          status = AgentStatus.waiting;
        }
      } else if (_hasRun) {
        if (completedNames.contains(name)) {
          status = AgentStatus.done;
          result = completedResults.firstWhere((r) => r.agentName == name);
        } else {
          status = AgentStatus.waiting;
        }
      } else {
        status = AgentStatus.idle;
      }

      return _AgentCard(
        index: i + 1,
        emoji: emoji,
        label: label,
        description: desc,
        status: status,
        result: result,
        pulseCtrl: _pulseCtrl,
      );
    });
  }

  Widget _resultsSection(AgentTrace trace) {
    final color = trace.overallConfidence >= 0.8 ? KidoTheme.success : trace.overallConfidence >= 0.6 ? KidoTheme.warning : KidoTheme.error;
    return Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
      const Text('Pipeline Results', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800, color: KidoTheme.textPrimary)),
      const SizedBox(height: 12),
      Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(color: color.withOpacity(0.08), borderRadius: BorderRadius.circular(16), border: Border.all(color: color.withOpacity(0.3))),
        child: Row(children: [
          Text('${(trace.overallConfidence * 100).round()}%', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w900, color: color)),
          const SizedBox(width: 16),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('Overall Confidence', style: TextStyle(fontWeight: FontWeight.w700)),
            Text(trace.overallConfidence >= 0.8 ? '✅ High confidence analysis' : trace.overallConfidence >= 0.6 ? '⚠️ Moderate confidence' : '❌ Low confidence — more data needed',
              style: TextStyle(color: color, fontSize: 12)),
          ])),
        ]),
      ),
      if (trace.recommendations.isNotEmpty) ...[
        const SizedBox(height: 16),
        const Text('Teacher Recommendations', style: TextStyle(fontSize: 15, fontWeight: FontWeight.w700)),
        const SizedBox(height: 8),
        ...trace.recommendations.map((rec) => Container(
          margin: const EdgeInsets.only(bottom: 8),
          padding: const EdgeInsets.all(14),
          decoration: BoxDecoration(color: KidoTheme.primary.withOpacity(0.05), borderRadius: BorderRadius.circular(12), border: Border.all(color: KidoTheme.primary.withOpacity(0.2))),
          child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
            const Text('💡', style: TextStyle(fontSize: 16)),
            const SizedBox(width: 8),
            Expanded(child: Text(rec, style: const TextStyle(color: KidoTheme.textPrimary, height: 1.4))),
          ]),
        )),
      ],
    ]);
  }
}

enum AgentStatus { idle, waiting, running, done }

class _AgentCard extends StatelessWidget {
  final int index;
  final String emoji;
  final String label;
  final String description;
  final AgentStatus status;
  final AgentResult? result;
  final AnimationController pulseCtrl;

  const _AgentCard({
    required this.index,
    required this.emoji,
    required this.label,
    required this.description,
    required this.status,
    required this.result,
    required this.pulseCtrl,
  });

  @override
  Widget build(BuildContext context) {
    Color cardColor;
    Color borderColor;
    Widget statusWidget;

    switch (status) {
      case AgentStatus.running:
        cardColor = KidoTheme.accent.withOpacity(0.06);
        borderColor = KidoTheme.accent;
        statusWidget = AnimatedBuilder(
          animation: pulseCtrl,
          builder: (_, __) => Container(
            width: 24, height: 24,
            decoration: BoxDecoration(
              color: KidoTheme.accent.withOpacity(0.2 + 0.8 * pulseCtrl.value),
              borderRadius: BorderRadius.circular(6),
            ),
            child: const Center(child: SizedBox(width: 14, height: 14, child: CircularProgressIndicator(strokeWidth: 2, color: KidoTheme.accent))),
          ),
        );
      case AgentStatus.done:
        cardColor = KidoTheme.success.withOpacity(0.04);
        borderColor = KidoTheme.success.withOpacity(0.3);
        statusWidget = Container(
          width: 24, height: 24,
          decoration: BoxDecoration(color: KidoTheme.success.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
          child: const Icon(Icons.check, size: 14, color: KidoTheme.success),
        );
      case AgentStatus.waiting:
        cardColor = KidoTheme.background;
        borderColor = Colors.grey.shade200;
        statusWidget = Container(
          width: 24, height: 24,
          decoration: BoxDecoration(color: Colors.grey.shade200, borderRadius: BorderRadius.circular(6)),
          child: const Icon(Icons.hourglass_empty, size: 12, color: Colors.grey),
        );
      default:
        cardColor = KidoTheme.background;
        borderColor = Colors.grey.shade100;
        statusWidget = Container(
          width: 24, height: 24,
          decoration: BoxDecoration(color: Colors.grey.shade100, borderRadius: BorderRadius.circular(6)),
          child: Center(child: Text('$index', style: const TextStyle(fontSize: 11, color: Colors.grey, fontWeight: FontWeight.w600))),
        );
    }

    return GestureDetector(
      onTap: result != null ? () => _showDetails(context) : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 300),
        margin: const EdgeInsets.only(bottom: 8),
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: cardColor,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: borderColor),
        ),
        child: Row(children: [
          Text(emoji, style: const TextStyle(fontSize: 20)),
          const SizedBox(width: 10),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Text(label, style: TextStyle(
              fontWeight: FontWeight.w600,
              color: status == AgentStatus.running ? KidoTheme.accent : KidoTheme.textPrimary,
              fontSize: 13,
            )),
            if (status == AgentStatus.running)
              Text(description, style: const TextStyle(color: KidoTheme.accent, fontSize: 11)),
            if (status == AgentStatus.done && result != null)
              _getResultSummary(result!),
          ])),
          const SizedBox(width: 8),
          statusWidget,
          if (result != null) const Icon(Icons.expand_more, size: 16, color: KidoTheme.textSecondary),
        ]),
      ),
    );
  }

  Widget _getResultSummary(AgentResult r) {
    final output = r.output;
    String summary = '';
    if (output['difficultyAdjustment'] != null) summary = 'Difficulty: ${output['difficultyAdjustment']}';
    else if (output['engagementStatus'] != null) summary = 'Status: ${output['engagementStatus']}';
    else if (output['burnoutRisk'] != null) summary = 'Burnout risk: ${output['burnoutRisk']}';
    else if (output['safe'] != null) summary = output['safe'] == true ? 'Content safe ✅' : 'Safety concern ⚠️';
    else if (output['performanceTier'] != null) summary = 'Tier: ${output['performanceTier']}';
    else if (output['detected'] != null) summary = output['detected'] == true ? 'Contradiction found ⚠️' : 'No contradictions ✅';
    else summary = 'Confidence: ${(r.confidence * 100).round()}%';
    return Text(summary, style: const TextStyle(color: KidoTheme.textSecondary, fontSize: 11));
  }

  void _showDetails(BuildContext context) {
    if (result == null) return;
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(24))),
      builder: (_) => DraggableScrollableSheet(
        initialChildSize: 0.6,
        maxChildSize: 0.9,
        minChildSize: 0.3,
        expand: false,
        builder: (_, ctrl) => ListView(controller: ctrl, padding: const EdgeInsets.all(20), children: [
          Center(child: Container(width: 40, height: 4, decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)))),
          const SizedBox(height: 16),
          Row(children: [
            Text(emoji, style: const TextStyle(fontSize: 28)),
            const SizedBox(width: 12),
            Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(label, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
              Text('Confidence: ${(result!.confidence * 100).round()}%', style: const TextStyle(color: KidoTheme.textSecondary)),
            ]),
          ]),
          const SizedBox(height: 20),
          ...result!.output.entries.map((e) => Container(
            margin: const EdgeInsets.only(bottom: 8),
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: BoxDecoration(color: KidoTheme.background, borderRadius: BorderRadius.circular(12)),
            child: Row(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Expanded(child: Text(e.key, style: const TextStyle(fontWeight: FontWeight.w600, color: KidoTheme.textSecondary, fontSize: 12))),
              const SizedBox(width: 8),
              Expanded(flex: 2, child: Text(e.value?.toString() ?? 'N/A', style: const TextStyle(color: KidoTheme.textPrimary, fontSize: 13))),
            ]),
          )),
        ]),
      ),
    );
  }
}
