class AgentResult {
  final String agentName;
  final String status;
  final Map<String, dynamic> output;
  final double confidence;

  const AgentResult({
    required this.agentName,
    required this.status,
    required this.output,
    required this.confidence,
  });

  factory AgentResult.fromJson(Map<String, dynamic> j) => AgentResult(
        agentName: j['agentName'] as String? ?? j['agent'] as String? ?? 'Unknown',
        status: j['status'] as String? ?? 'completed',
        output: j['output'] as Map<String, dynamic>? ??
            j['result'] as Map<String, dynamic>? ??
            {},
        confidence: (j['confidence'] as num?)?.toDouble() ?? 0.8,
      );

  String get emoji {
    switch (agentName) {
      case 'LearningIntelligence': return '🧠';
      case 'EngagementOptimization': return '⚡';
      case 'BehaviorAnalysis': return '🔍';
      case 'SafetyModeration': return '🛡️';
      case 'FriendApproval': return '🤝';
      case 'SocialModeration': return '💬';
      case 'ParentInsight': return '👨‍👩‍👧';
      case 'TeacherSupport': return '📚';
      case 'ProgressAnalytics': return '📊';
      case 'ContradictionDetection': return '⚖️';
      case 'FallbackRecovery': return '🔄';
      default: return '🤖';
    }
  }

  String get displayName {
    switch (agentName) {
      case 'LearningIntelligence': return 'Learning Intelligence';
      case 'EngagementOptimization': return 'Engagement Optimizer';
      case 'BehaviorAnalysis': return 'Behavior Analysis';
      case 'SafetyModeration': return 'Safety Moderation';
      case 'FriendApproval': return 'Friend Approval';
      case 'SocialModeration': return 'Social Moderation';
      case 'ParentInsight': return 'Parent Insight';
      case 'TeacherSupport': return 'Teacher Support';
      case 'ProgressAnalytics': return 'Progress Analytics';
      case 'ContradictionDetection': return 'Contradiction Detect';
      case 'FallbackRecovery': return 'Fallback Recovery';
      default: return agentName;
    }
  }
}

class AgentTrace {
  final String id;
  final String childId;
  final List<AgentResult> agentResults;
  final double overallConfidence;
  final List<String> recommendations;
  final DateTime createdAt;

  const AgentTrace({
    required this.id,
    required this.childId,
    required this.agentResults,
    required this.overallConfidence,
    required this.recommendations,
    required this.createdAt,
  });

  factory AgentTrace.fromJson(Map<String, dynamic> j) {
    List<AgentResult> results = [];
    final raw = j['agentResults'];
    if (raw is List) {
      results = raw.map((r) => AgentResult.fromJson(r as Map<String, dynamic>)).toList();
    } else if (raw is Map) {
      results = (raw as Map<String, dynamic>)
          .entries
          .map((e) => AgentResult(
                agentName: e.key,
                status: 'completed',
                output: e.value as Map<String, dynamic>? ?? {},
                confidence: 0.8,
              ))
          .toList();
    }

    List<String> recs = [];
    final rawRecs = j['recommendations'];
    if (rawRecs is List) recs = rawRecs.cast<String>();

    return AgentTrace(
      id: j['id'] as String,
      childId: j['childId'] as String,
      agentResults: results,
      overallConfidence: (j['overallConfidence'] as num?)?.toDouble() ?? 0.8,
      recommendations: recs,
      createdAt: DateTime.tryParse(j['createdAt'] as String? ?? '') ?? DateTime.now(),
    );
  }
}
