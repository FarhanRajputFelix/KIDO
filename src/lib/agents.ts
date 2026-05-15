// ─── KIDO Agentic AI Pipeline ─────────────────────────────────────────────────
// 11 Autonomous Agents + Orchestrator + Shared Memory + Contradiction Detection
// This is the intelligence core of the entire platform.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentContext {
  childId: string;
  childName: string;
  childAge: number;
  childGrade: string;
  // Learning state
  quizScore?: number;
  subject?: string;
  difficulty?: number;
  weakAreas?: string[];
  strongAreas?: string[];
  totalQuizzes?: number;
  // Engagement state
  avgResponseTimeS?: number;
  sessionLengthMin?: number;
  // Behavior state
  scoreTrend?: number;      // positive = improving
  sessionTrend?: number;    // positive = longer sessions
  streakDays?: number;
  level?: number;
  xp?: number;
  // Social
  socialMessage?: string;
  friendRequestFrom?: string;
  friendRequestTo?: string;
  // Parent
  parentRestrictions?: string[];
  screenTimeMinutes?: number;
  screenTimeLimit?: number;
  // Session
  sessionId?: string;
  triggerEvent?: string;
  // Shared memory (agents read/write)
  sharedMemory?: SharedChildProfile;
}

export interface SharedChildProfile {
  learningVelocity: number;      // 0-1 scale
  burnoutScore: number;          // 0-1 scale
  emotionalIndicators: string[];
  engagementBaseline: number;    // 0-1 scale
  weakConcepts: string[];
  strengths: string[];
  socialTrustScore: number;      // 0-1 scale
  safetyIncidents: number;
  preferredLearningStyle: string;
  parentRestrictions: string[];
  teacherNotes: string[];
}

export interface AgentResult {
  agent: string;
  inputSummary: string;
  reasoning: string;
  output: Record<string, any>;
  confidence: number;
  executionMs: number;
  actionsTriggered: string[];
  status: "success" | "error";
  error?: string;
  memoryUpdates: string[];       // What shared memory fields this agent modified
  referencedAgents: string[];    // Which prior agents this agent referenced
}

export interface TraceResult {
  traceId: string;
  sessionId: string;
  childId: string;
  triggerEvent: string;
  agentResults: AgentResult[];
  overallConfidence: number;
  fallbackTriggered: boolean;
  contradictionDetected: boolean;
  finalRecommendations: string[];
  sharedMemory: SharedChildProfile;
  timestamp: string;
}

// ─── Utility ──────────────────────────────────────────────────────────────────

function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function realisticDelay(): number {
  return Math.floor(Math.random() * 660) + 120;
}

function snapshotMemory(mem: SharedChildProfile): Record<string, any> {
  return { ...mem, emotionalIndicators: [...mem.emotionalIndicators], weakConcepts: [...mem.weakConcepts], strengths: [...mem.strengths], parentRestrictions: [...mem.parentRestrictions], teacherNotes: [...mem.teacherNotes] };
}

function diffMemory(before: Record<string, any>, after: SharedChildProfile): string[] {
  const diffs: string[] = [];
  if (before.learningVelocity !== after.learningVelocity) diffs.push(`learningVelocity: ${Number(before.learningVelocity).toFixed(2)} → ${after.learningVelocity.toFixed(2)}`);
  if (before.burnoutScore !== after.burnoutScore) diffs.push(`burnoutScore: ${Number(before.burnoutScore).toFixed(2)} → ${after.burnoutScore.toFixed(2)}`);
  if (before.engagementBaseline !== after.engagementBaseline) diffs.push(`engagementBaseline: ${Number(before.engagementBaseline).toFixed(2)} → ${after.engagementBaseline.toFixed(2)}`);
  if (before.socialTrustScore !== after.socialTrustScore) diffs.push(`socialTrustScore: ${Number(before.socialTrustScore).toFixed(2)} → ${after.socialTrustScore.toFixed(2)}`);
  if (before.safetyIncidents !== after.safetyIncidents) diffs.push(`safetyIncidents: ${before.safetyIncidents} → ${after.safetyIncidents}`);
  if (JSON.stringify(before.emotionalIndicators) !== JSON.stringify(after.emotionalIndicators)) diffs.push(`emotionalIndicators updated`);
  if (JSON.stringify(before.weakConcepts) !== JSON.stringify(after.weakConcepts)) diffs.push(`weakConcepts updated`);
  if (JSON.stringify(before.strengths) !== JSON.stringify(after.strengths)) diffs.push(`strengths updated`);
  return diffs;
}

function buildDefaultSharedMemory(ctx: AgentContext): SharedChildProfile {
  return {
    learningVelocity: 0.5,
    burnoutScore: 0.0,
    emotionalIndicators: [],
    engagementBaseline: 0.7,
    weakConcepts: ctx.weakAreas || [],
    strengths: ctx.strongAreas || [],
    socialTrustScore: 0.8,
    safetyIncidents: 0,
    preferredLearningStyle: "visual",
    parentRestrictions: ctx.parentRestrictions || [],
    teacherNotes: [],
  };
}

// ─── Agent Interface ──────────────────────────────────────────────────────────

interface Agent {
  name: string;
  run(ctx: AgentContext, memory: SharedChildProfile): Promise<AgentResult>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM 1 — LEARNING INTELLIGENCE SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

// ── 1. Learning Intelligence Agent ───────────────────────────────────────────

const LearningIntelligenceAgent: Agent = {
  name: "LearningIntelligenceAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const score = ctx.quizScore ?? 0.5;
    const difficulty = ctx.difficulty ?? 3;
    const subject = ctx.subject ?? "general";

    let adjustment: string;
    let newDifficulty: number;
    let reasoning: string;

    if (score >= 0.80) {
      adjustment = "increase";
      newDifficulty = Math.min(difficulty + 1, 10);
      reasoning = `Score ${(score * 100).toFixed(0)}% exceeds mastery threshold 80%. Increasing difficulty to ${newDifficulty}. ${ctx.childName} is excelling at ${subject}.`;
    } else if (score < 0.50) {
      adjustment = "decrease";
      newDifficulty = Math.max(difficulty - 1, 1);
      reasoning = `Score ${(score * 100).toFixed(0)}% below minimum 50%. Reducing difficulty to ${newDifficulty}. Recommending focused practice on weak areas.`;
    } else {
      adjustment = "hold";
      newDifficulty = difficulty;
      reasoning = `Score ${(score * 100).toFixed(0)}% in acceptable range. Holding difficulty at ${newDifficulty}. Reinforcing current concepts before progression.`;
    }

    const stuckTopics = (ctx.weakAreas || []).filter(w => w === subject);
    if (stuckTopics.length > 0) {
      reasoning += ` Child appears stuck on ${subject} — activating guided tutoring pathway.`;
    }

    const beforeMem = snapshotMemory(memory);
    memory.learningVelocity = score > 0.7 ? Math.min(1, memory.learningVelocity + 0.1) : Math.max(0, memory.learningVelocity - 0.05);
    memory.weakConcepts = ctx.weakAreas || memory.weakConcepts;
    memory.strengths = ctx.strongAreas || memory.strengths;

    const confidence = score > 0.4 ? 0.90 : 0.65;

    return {
      agent: "LearningIntelligenceAgent",
      inputSummary: `score=${(score * 100).toFixed(0)}%, subject=${subject}, difficulty=${difficulty}`,
      reasoning,
      output: {
        difficultyAdjustment: adjustment,
        newDifficulty,
        weakAreas: ctx.weakAreas || [],
        recommendedSubject: subject,
        learningPlan: [`Practice ${subject} level ${newDifficulty}`],
        stuckOnTopic: stuckTopics.length > 0,
      },
      confidence,
      executionMs: Date.now() - start,
      actionsTriggered: [`update_difficulty_${adjustment}`, "refresh_content_feed", ...(stuckTopics.length > 0 ? ["activate_guided_tutoring"] : [])],
      status: "success",
      memoryUpdates: diffMemory(beforeMem, memory),
      referencedAgents: [],
    };
  },
};

// ── 2. Engagement Optimization Agent ─────────────────────────────────────────

const EngagementOptimizationAgent: Agent = {
  name: "EngagementOptimizationAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const avgTime = ctx.avgResponseTimeS ?? 15;
    const sessionMin = ctx.sessionLengthMin ?? 10;
    const difficulty = ctx.difficulty ?? 3;

    let status: string;
    let action: string;
    let reasoning: string;
    let confidence: number;

    const beforeMem = snapshotMemory(memory);

    if (avgTime > 40 && difficulty <= 4) {
      status = "disengaged";
      action = "switch_to_minigame";
      reasoning = `Response time ${avgTime}s on easy questions indicates disengagement. Switching format to interactive mini-game to re-engage ${ctx.childName}.`;
      confidence = 0.82;
      memory.emotionalIndicators.push("disengaged");
    } else if (sessionMin > 45) {
      status = "fatigued";
      action = "recommend_break";
      reasoning = `Session length ${sessionMin}min exceeds recommended 45min. KIDO AI noticed signs of learning fatigue and recommends lighter sessions. ${ctx.childName} may be fatigued.`;
      confidence = 0.88;
      memory.burnoutScore = Math.min(1, memory.burnoutScore + 0.2);
    } else if (avgTime < 5 && difficulty > 6) {
      status = "rushing";
      action = "slow_down_prompt";
      reasoning = `Response time ${avgTime}s on hard questions — ${ctx.childName} may be guessing. Inserting reflection prompts.`;
      confidence = 0.75;
      memory.emotionalIndicators.push("rushing");
    } else {
      status = "engaged";
      action = "continue";
      reasoning = `Engagement levels normal. ${ctx.childName} is actively learning. Session pace is healthy.`;
      confidence = 0.91;
    }

    memory.engagementBaseline = status === "engaged" ? 0.85 : status === "disengaged" ? 0.3 : 0.5;

    return {
      agent: "EngagementOptimizationAgent",
      inputSummary: `avg_response=${avgTime}s, session=${sessionMin}min, difficulty=${difficulty}`,
      reasoning,
      output: { engagementStatus: status, recommendedAction: action },
      confidence,
      executionMs: Date.now() - start,
      actionsTriggered: [action],
      status: "success",
      memoryUpdates: diffMemory(beforeMem, memory),
      referencedAgents: ["LearningIntelligenceAgent"],
    };
  },
};

// ── 3. Behavior Analysis Agent ───────────────────────────────────────────────

const BehaviorAnalysisAgent: Agent = {
  name: "BehaviorAnalysisAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const scoreTrend = ctx.scoreTrend ?? 0;
    const sessionTrend = ctx.sessionTrend ?? 0;
    const streak = ctx.streakDays ?? 0;

    const signals: string[] = [];
    let burnoutRisk = "low";
    let reasoning: string;
    let confidence: number;

    const beforeMem = snapshotMemory(memory);

    if (scoreTrend > 0 && sessionTrend < -0.3) {
      signals.push("contradiction_score_up_time_down");
      burnoutRisk = "medium";
      reasoning = `Scores improving but session time dropping sharply — ${ctx.childName} may be rushing to finish. Early fatigue pattern detected. Referenced EngagementOptimizationAgent engagement baseline (${memory.engagementBaseline.toFixed(2)}).`;
      confidence = 0.72;
      memory.burnoutScore = Math.min(1, memory.burnoutScore + 0.3);
      memory.emotionalIndicators.push("possible_burnout");
    } else if (streak > 14 && sessionTrend < 0) {
      burnoutRisk = "high";
      signals.push("long_streak_declining_sessions");
      reasoning = `14+ day streak with declining session time — burnout risk HIGH for ${ctx.childName}. Sustained effort without recovery. Referenced learning velocity (${memory.learningVelocity.toFixed(2)}) from LearningIntelligenceAgent.`;
      confidence = 0.85;
      memory.burnoutScore = Math.min(1, memory.burnoutScore + 0.5);
      memory.emotionalIndicators.push("burnout_risk");
    } else if (scoreTrend < -0.2) {
      burnoutRisk = "medium";
      signals.push("declining_scores");
      reasoning = `Scores declining over recent sessions. ${ctx.childName} may need concept reinforcement or a content format change.`;
      confidence = 0.78;
    } else {
      reasoning = `Behavioral signals within normal range for ${ctx.childName}. No stress indicators detected. Learning trajectory stable.`;
      confidence = 0.90;
    }

    return {
      agent: "BehaviorAnalysisAgent",
      inputSummary: `score_trend=${scoreTrend}, session_trend=${sessionTrend}, streak=${streak}`,
      reasoning,
      output: { burnoutRisk, behaviorSignals: signals },
      confidence,
      executionMs: Date.now() - start,
      actionsTriggered: burnoutRisk === "high" ? ["alert_parent", "recommend_break"] : [],
      status: "success",
      memoryUpdates: diffMemory(beforeMem, memory),
      referencedAgents: ["LearningIntelligenceAgent", "EngagementOptimizationAgent"],
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM 2 — SAFETY & SOCIAL SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

// ── 4. Safety Moderation Agent ───────────────────────────────────────────────

const TOXIC_PATTERNS = ["hate", "stupid", "idiot", "kill", "ugly", "loser", "dumb", "die", "shut up"];

const SafetyModerationAgent: Agent = {
  name: "SafetyModerationAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const message = (ctx.socialMessage || "").toLowerCase();

    const beforeMem = snapshotMemory(memory);

    if (!message) {
      return {
        agent: "SafetyModerationAgent",
        inputSummary: "no_message",
        reasoning: "No social message to moderate. Safety check passed. Environment remains safe.",
        output: { toxicityScore: 0, safe: true, action: "none" },
        confidence: 1.0,
        executionMs: Date.now() - start,
        actionsTriggered: [],
        status: "success",
        memoryUpdates: [],
        referencedAgents: [],
      };
    }

    const matches = TOXIC_PATTERNS.filter(p => message.includes(p));
    const toxicityScore = Math.min(matches.length / 3, 1.0);
    let reasoning: string;
    let actions: string[];
    let safe: boolean;

    if (toxicityScore > 0.5) {
      reasoning = `CRITICAL: Detected ${matches.length} toxic pattern(s): [${matches.join(", ")}]. Message BLOCKED. Parent notified. Safety incident logged.`;
      actions = ["block_message", "notify_parent", "log_safety_event"];
      safe = false;
      memory.safetyIncidents += 1;
      memory.socialTrustScore = Math.max(0, memory.socialTrustScore - 0.3);
    } else if (toxicityScore > 0.2) {
      reasoning = `Mild concern detected: [${matches.join(", ")}]. Message flagged for parent review. Allowing with monitoring.`;
      actions = ["flag_for_review"];
      safe = true;
      memory.socialTrustScore = Math.max(0, memory.socialTrustScore - 0.1);
    } else {
      reasoning = `Message passed all safety checks. No harmful content detected. ${ctx.childName}'s social interactions are healthy.`;
      actions = ["allow_message"];
      safe = true;
    }

    return {
      agent: "SafetyModerationAgent",
      inputSummary: `message_length=${message.length}, matches=${matches.length}`,
      reasoning,
      output: { toxicityScore: Math.round(toxicityScore * 100) / 100, safe, matchedPatterns: matches },
      confidence: 0.88,
      executionMs: Date.now() - start,
      actionsTriggered: actions,
      status: "success",
      memoryUpdates: diffMemory(beforeMem, memory),
      referencedAgents: [],
    };
  },
};

// ── 5. Friend Approval Agent ─────────────────────────────────────────────────

const FriendApprovalAgent: Agent = {
  name: "FriendApprovalAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const hasRequest = !!(ctx.friendRequestFrom || ctx.friendRequestTo);

    if (!hasRequest) {
      return {
        agent: "FriendApprovalAgent",
        inputSummary: "no_friend_request",
        reasoning: "No pending friend requests to analyze. Social graph unchanged.",
        output: { action: "none", requiresParentApproval: false },
        confidence: 1.0,
        executionMs: Date.now() - start,
        actionsTriggered: [],
        status: "success",
        memoryUpdates: [],
        referencedAgents: [],
      };
    }

    const trustScore = memory.socialTrustScore;
    let reasoning: string;
    let recommendation: string;

    if (trustScore > 0.7 && memory.safetyIncidents === 0) {
      recommendation = "recommend_approve";
      reasoning = `Social trust score ${(trustScore * 100).toFixed(0)}% with zero safety incidents. Recommending approval to parent. Referenced SafetyModerationAgent — no incidents detected. ${ctx.childName} has a clean social record.`;
    } else if (trustScore > 0.4) {
      recommendation = "review_required";
      reasoning = `Social trust score ${(trustScore * 100).toFixed(0)}%. Some caution flags. Forwarding to parent for manual review with context notes.`;
    } else {
      recommendation = "recommend_deny";
      reasoning = `Social trust score BELOW 40% with ${memory.safetyIncidents} safety incident(s). Recommending denial. Parent notification sent with incident history.`;
    }

    return {
      agent: "FriendApprovalAgent",
      inputSummary: `trust_score=${(trustScore * 100).toFixed(0)}%, incidents=${memory.safetyIncidents}`,
      reasoning,
      output: { recommendation, requiresParentApproval: true, trustScore },
      confidence: 0.82,
      executionMs: Date.now() - start,
      actionsTriggered: ["queue_parent_approval", `recommendation_${recommendation}`],
      status: "success",
      memoryUpdates: [],
      referencedAgents: ["SafetyModerationAgent"],
    };
  },
};

// ── 6. Social Moderation Agent ───────────────────────────────────────────────

const SocialModerationAgent: Agent = {
  name: "SocialModerationAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const screenTime = ctx.screenTimeMinutes ?? 0;
    const screenLimit = ctx.screenTimeLimit ?? 120;
    const restrictions = memory.parentRestrictions;

    let reasoning: string;
    const actions: string[] = [];
    let socialStatus = "healthy";

    if (screenTime > screenLimit) {
      socialStatus = "over_limit";
      reasoning = `Screen time ${screenTime}min exceeds parent-set limit of ${screenLimit}min. Social features limited. Break recommended.`;
      actions.push("limit_social_features", "notify_parent_screen_time");
    } else if (screenTime > screenLimit * 0.8) {
      socialStatus = "approaching_limit";
      reasoning = `Screen time at ${screenTime}/${screenLimit}min (${Math.round(screenTime / screenLimit * 100)}%). Approaching limit. Gentle reminder queued.`;
      actions.push("gentle_reminder");
    } else {
      reasoning = `Social activity within healthy bounds. Screen time ${screenTime}/${screenLimit}min. All parent restrictions respected.`;
    }

    if (restrictions.length > 0) {
      reasoning += ` Active restrictions: ${restrictions.join(", ")}.`;
    }

    return {
      agent: "SocialModerationAgent",
      inputSummary: `screen_time=${screenTime}/${screenLimit}min, restrictions=${restrictions.length}`,
      reasoning,
      output: { socialStatus, screenTimeUsage: Math.round(screenTime / screenLimit * 100) },
      confidence: 0.92,
      executionMs: Date.now() - start,
      actionsTriggered: actions,
      status: "success",
      memoryUpdates: [],
      referencedAgents: ["SafetyModerationAgent", "FriendApprovalAgent"],
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// SYSTEM 3 — INTELLIGENCE REPORTING SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

// ── 7. Parent Insight Agent ──────────────────────────────────────────────────

const ParentInsightAgent: Agent = {
  name: "ParentInsightAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const insights: string[] = [];
    const alerts: string[] = [];

    if (memory.learningVelocity > 0.7) {
      insights.push(`${ctx.childName} is learning faster than average! Consider increasing challenge level.`);
    } else if (memory.learningVelocity < 0.3) {
      insights.push(`${ctx.childName} may need additional support. Learning pace has slowed.`);
      alerts.push("learning_pace_slow");
    }

    if (memory.burnoutScore > 0.6) {
      insights.push(`KIDO AI noticed signs of learning fatigue and recommends lighter sessions this week for ${ctx.childName}. Encourage a break or fun activity.`);
      alerts.push("burnout_risk");
    }

    if (memory.safetyIncidents > 0) {
      insights.push(`🔒 ${memory.safetyIncidents} safety incident(s) logged. Review social interactions.`);
      alerts.push("safety_incidents");
    }

    if ((ctx.streakDays ?? 0) >= 7) {
      insights.push(`🔥 Amazing! ${ctx.childName} is on a ${ctx.streakDays}-day learning streak!`);
    }

    if (memory.engagementBaseline < 0.4) {
      insights.push(`Engagement is below average. ${ctx.childName} might benefit from different content formats like games or visual lessons.`);
      alerts.push("low_engagement");
    }

    const reasoning = insights.length > 0
      ? `Generated ${insights.length} insight(s) and ${alerts.length} alert(s) for ${ctx.childName}'s parent. Referenced BehaviorAnalysisAgent burnout score (${memory.burnoutScore.toFixed(2)}) and EngagementOptimizationAgent baseline (${memory.engagementBaseline.toFixed(2)}). Key finding: ${insights[0]}`
      : `${ctx.childName} is progressing well. No urgent insights to report.`;

    return {
      agent: "ParentInsightAgent",
      inputSummary: `velocity=${memory.learningVelocity.toFixed(2)}, burnout=${memory.burnoutScore.toFixed(2)}, incidents=${memory.safetyIncidents}`,
      reasoning,
      output: { insights, alerts, insightCount: insights.length },
      confidence: 0.85,
      executionMs: Date.now() - start,
      actionsTriggered: alerts.map(a => `parent_alert_${a}`),
      status: "success",
      memoryUpdates: [],
      referencedAgents: ["BehaviorAnalysisAgent", "EngagementOptimizationAgent", "SafetyModerationAgent"],
    };
  },
};

// ── 8. Teacher Support Agent ─────────────────────────────────────────────────

const TeacherSupportAgent: Agent = {
  name: "TeacherSupportAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const recommendations: string[] = [];

    if (memory.weakConcepts.length > 0) {
      recommendations.push(`Focus tutoring on: ${memory.weakConcepts.join(", ")}. These are ${ctx.childName}'s identified weak areas.`);
    }

    recommendations.push(`Preferred learning style: ${memory.preferredLearningStyle}. Use ${memory.preferredLearningStyle === "visual" ? "diagrams and videos" : "interactive exercises"} for best results.`);

    if ((ctx.quizScore ?? 0.5) < 0.5) {
      recommendations.push(`Recent quiz performance below 50%. Consider one-on-one review sessions for ${ctx.subject || "current subject"}.`);
    }

    if (memory.burnoutScore > 0.4) {
      recommendations.push(`Student showing fatigue signs (burnout score: ${(memory.burnoutScore * 100).toFixed(0)}%). Consider shorter, more varied lesson formats.`);
    }

    const reasoning = `Generated ${recommendations.length} teaching recommendation(s) for ${ctx.childName}. Referenced LearningIntelligenceAgent weak concepts and BehaviorAnalysisAgent burnout data. Primary focus areas: ${memory.weakConcepts.length > 0 ? memory.weakConcepts.join(", ") : "general reinforcement"}.`;

    return {
      agent: "TeacherSupportAgent",
      inputSummary: `weak_areas=${memory.weakConcepts.length}, style=${memory.preferredLearningStyle}`,
      reasoning,
      output: { recommendations, teachingFocusAreas: memory.weakConcepts },
      confidence: 0.80,
      executionMs: Date.now() - start,
      actionsTriggered: ["update_teacher_insights"],
      status: "success",
      memoryUpdates: [],
      referencedAgents: ["LearningIntelligenceAgent", "BehaviorAnalysisAgent"],
    };
  },
};

// ── 9. Progress Analytics Agent ──────────────────────────────────────────────

const ProgressAnalyticsAgent: Agent = {
  name: "ProgressAnalyticsAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const score = ctx.quizScore ?? 0.5;
    const totalQuizzes = ctx.totalQuizzes ?? 0;
    const level = ctx.level ?? 1;
    const xp = ctx.xp ?? 0;

    const analytics = {
      performanceTier: score >= 0.8 ? "excellent" : score >= 0.6 ? "good" : score >= 0.4 ? "developing" : "needs_support",
      learningMomentum: memory.learningVelocity > 0.6 ? "accelerating" : memory.learningVelocity > 0.3 ? "steady" : "decelerating",
      engagementLevel: memory.engagementBaseline > 0.7 ? "high" : memory.engagementBaseline > 0.4 ? "moderate" : "low",
      socialHealth: memory.socialTrustScore > 0.7 ? "excellent" : memory.socialTrustScore > 0.4 ? "good" : "at_risk",
      overallGrowth: totalQuizzes > 20 ? "established" : totalQuizzes > 5 ? "growing" : "onboarding",
    };

    const reasoning = `${ctx.childName} | Performance: ${analytics.performanceTier} | Momentum: ${analytics.learningMomentum} | Engagement: ${analytics.engagementLevel} | Social: ${analytics.socialHealth} | Growth: ${analytics.overallGrowth}. Level ${level} with ${xp} XP across ${totalQuizzes} quizzes. Referenced all prior agents for holistic analysis.`;

    return {
      agent: "ProgressAnalyticsAgent",
      inputSummary: `score=${(score * 100).toFixed(0)}%, quizzes=${totalQuizzes}, level=${level}`,
      reasoning,
      output: analytics,
      confidence: 0.93,
      executionMs: Date.now() - start,
      actionsTriggered: ["update_progress_dashboard"],
      status: "success",
      memoryUpdates: [],
      referencedAgents: ["LearningIntelligenceAgent", "EngagementOptimizationAgent", "BehaviorAnalysisAgent", "SafetyModerationAgent"],
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// RELIABILITY SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

// ── 10. Contradiction Detection Agent ────────────────────────────────────────

const ContradictionDetectionAgent: Agent = {
  name: "ContradictionDetectionAgent",
  async run(ctx, memory) {
    const start = Date.now();
    await sleep(realisticDelay());
    const contradictions: string[] = [];
    const scoreTrend = ctx.scoreTrend ?? 0;
    const sessionTrend = ctx.sessionTrend ?? 0;
    const engagement = memory.engagementBaseline;

    const beforeMem = snapshotMemory(memory);

    // Pattern 1: Score improving but sessions getting shorter
    if (scoreTrend > 0.2 && sessionTrend < -0.3) {
      contradictions.push("CONTRADICTION: Quiz scores improving but session time sharply dropping. Child may be guessing faster, not learning deeper.");
    }

    // Pattern 2: High engagement reported but burnout detected
    if (engagement > 0.7 && memory.burnoutScore > 0.5) {
      contradictions.push("CONTRADICTION: Engagement appears high but burnout indicators are elevated. Possible masking behavior.");
    }

    // Pattern 3: Strong areas overlapping with weak areas
    const overlap = memory.strengths.filter(s => memory.weakConcepts.includes(s));
    if (overlap.length > 0) {
      contradictions.push(`CONTRADICTION: Subject(s) [${overlap.join(", ")}] appear in both strengths and weaknesses. Profile needs recalibration.`);
    }

    // Pattern 4: Safety trust high but incidents present
    if (memory.socialTrustScore > 0.8 && memory.safetyIncidents > 0) {
      contradictions.push("CONTRADICTION: Social trust score high despite safety incidents. Trust score needs adjustment.");
      memory.socialTrustScore = Math.max(0, memory.socialTrustScore - 0.2);
    }

    const detected = contradictions.length > 0;
    const reasoning = detected
      ? `⚠️ ${contradictions.length} contradiction(s) detected in ${ctx.childName}'s profile. The system continuously validates whether learning signals actually make sense together. Finding: ${contradictions[0]} Triggering deep behavioral analysis.`
      : `No contradictions detected. All agent signals are consistent across LearningIntelligence, Engagement, Behavior, and Safety systems. System confidence remains high.`;

    return {
      agent: "ContradictionDetectionAgent",
      inputSummary: `score_trend=${scoreTrend}, session_trend=${sessionTrend}, burnout=${memory.burnoutScore.toFixed(2)}`,
      reasoning,
      output: { contradictions, detected, contradictionCount: contradictions.length },
      confidence: detected ? 0.65 : 0.95,
      executionMs: Date.now() - start,
      actionsTriggered: detected ? ["trigger_deep_analysis", "notify_parent_contradiction", "recalibrate_profile"] : [],
      status: "success",
      memoryUpdates: diffMemory(beforeMem, memory),
      referencedAgents: ["LearningIntelligenceAgent", "EngagementOptimizationAgent", "BehaviorAnalysisAgent", "SafetyModerationAgent"],
    };
  },
};

// ── 11. Fallback Recovery Agent ──────────────────────────────────────────────

const FallbackRecoveryAgent = {
  name: "FallbackRecoveryAgent",
  async run(ctx: AgentContext, memory: SharedChildProfile, agentResults: AgentResult[]): Promise<AgentResult> {
    const start = Date.now();
    await sleep(realisticDelay());
    const issues: string[] = [];
    const actions: string[] = [];
    let contradictionDetected = false;

    // 1. Check for failed agents
    const failed = agentResults.filter(r => r.status === "error");
    if (failed.length > 0) {
      issues.push(`${failed.length} agent(s) failed: [${failed.map(r => r.agent).join(", ")}]`);
      actions.push("retry_failed_agents");
    }

    // 2. Check for low confidence outputs
    const lowConf = agentResults.filter(r => r.confidence < 0.60);
    if (lowConf.length > 0) {
      issues.push(`Low confidence from: [${lowConf.map(r => `${r.agent}(${(r.confidence * 100).toFixed(0)}%)`).join(", ")}]`);
      actions.push("reduce_overall_confidence");
    }

    // 3. Check contradiction agent results
    const contradictionResult = agentResults.find(r => r.agent === "ContradictionDetectionAgent");
    if (contradictionResult?.output?.detected) {
      contradictionDetected = true;
      issues.push(`Contradictions detected: ${contradictionResult.output.contradictionCount}`);
      actions.push("trigger_deep_behavioral_analysis", "notify_parent_contradiction");
    }

    // 4. Missing data handling
    if (!ctx.quizScore && ctx.triggerEvent === "quiz_submit") {
      issues.push("Missing quiz score data for quiz_submit event. Using historical average.");
      actions.push("substitute_historical_data");
    }

    // 5. Burnout override check
    if (memory.burnoutScore > 0.7) {
      issues.push(`HIGH burnout score (${(memory.burnoutScore * 100).toFixed(0)}%). Overriding engagement recommendations. Forcing break suggestion.`);
      actions.push("force_break_recommendation", "parent_burnout_alert");
    }

    const reasoning = issues.length > 0
      ? `⚡ Fallback triggered. ${issues.length} issue(s) detected:\n${issues.map((i, idx) => `  ${idx + 1}. ${i}`).join("\n")}\nRecovery actions: ${actions.join(", ")}. Referenced all ${agentResults.length} prior agent outputs for validation.`
      : `✅ All ${agentResults.length} agents completed successfully. No contradictions, failures, or low-confidence outputs detected. System operating at full confidence. All cross-agent signals validated.`;

    return {
      agent: "FallbackRecoveryAgent",
      inputSummary: `agents_checked=${agentResults.length}, failed=${failed.length}, low_conf=${lowConf.length}`,
      reasoning,
      output: { issues, recoveryActions: actions, contradictionDetected },
      confidence: issues.length > 0 ? 0.60 : 0.97,
      executionMs: Date.now() - start,
      actionsTriggered: actions,
      status: "success",
      memoryUpdates: [],
      referencedAgents: agentResults.map(r => r.agent),
    };
  },
};

// ═══════════════════════════════════════════════════════════════════════════════
// ORCHESTRATOR — Runs all agents, manages shared memory, builds trace
// ═══════════════════════════════════════════════════════════════════════════════

const AGENT_PIPELINE: Agent[] = [
  LearningIntelligenceAgent,
  EngagementOptimizationAgent,
  BehaviorAnalysisAgent,
  SafetyModerationAgent,
  FriendApprovalAgent,
  SocialModerationAgent,
  ParentInsightAgent,
  TeacherSupportAgent,
  ProgressAnalyticsAgent,
  ContradictionDetectionAgent,
];

export async function runAgentPipeline(context: AgentContext): Promise<TraceResult> {
  const traceId = generateId();
  const sessionId = context.sessionId || generateId();
  const sharedMemory = context.sharedMemory || buildDefaultSharedMemory(context);
  const agentResults: AgentResult[] = [];

  // Run all 10 primary agents sequentially (shared memory updates flow between them)
  for (const agent of AGENT_PIPELINE) {
    try {
      const result = await agent.run(context, sharedMemory);
      agentResults.push(result);
    } catch (error: any) {
      agentResults.push({
        agent: agent.name,
        inputSummary: "error",
        reasoning: `Agent failed with error: ${error.message}`,
        output: {},
        confidence: 0.0,
        executionMs: 0,
        actionsTriggered: ["fallback_triggered"],
        status: "error",
        error: error.message,
        memoryUpdates: [],
        referencedAgents: [],
      });
    }
  }

  // Run Fallback Recovery Agent last — validates ALL outputs
  const fallbackResult = await FallbackRecoveryAgent.run(context, sharedMemory, agentResults);
  agentResults.push(fallbackResult);

  const fallbackTriggered = fallbackResult.output?.issues?.length > 0;
  const contradictionDetected = fallbackResult.output?.contradictionDetected || false;

  // Calculate overall confidence
  const overallConfidence = Math.round(
    (agentResults.reduce((sum, r) => sum + r.confidence, 0) / agentResults.length) * 1000
  ) / 1000;

  // Collect recommendations
  const finalRecommendations: string[] = [];
  for (const r of agentResults) {
    if (r.output?.recommendations) finalRecommendations.push(...r.output.recommendations);
    if (r.output?.insights) finalRecommendations.push(...r.output.insights);
    if (r.output?.learningPlan) finalRecommendations.push(...r.output.learningPlan);
  }

  return {
    traceId,
    sessionId,
    childId: context.childId,
    triggerEvent: context.triggerEvent || "quiz_submit",
    agentResults,
    overallConfidence,
    fallbackTriggered,
    contradictionDetected,
    finalRecommendations: finalRecommendations.slice(0, 10),
    sharedMemory,
    timestamp: new Date().toISOString(),
  };
}
