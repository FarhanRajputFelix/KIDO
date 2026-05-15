"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import EventFeed from "@/components/EventFeed";

interface AgentResult {
  agent: string;
  inputSummary: string;
  reasoning: string;
  output: Record<string, any>;
  confidence: number;
  executionMs: number;
  actionsTriggered: string[];
  status: string;
  error?: string;
  memoryUpdates?: string[];
  referencedAgents?: string[];
}

interface Trace {
  id: string;
  sessionId: string;
  triggerEvent: string;
  agentResults: AgentResult[];
  overallConfidence: number;
  fallbackTriggered: boolean;
  contradictionDetected: boolean;
  finalRecommendations: string[];
  createdAt: string;
}

type ReplayState = "idle" | "playing" | "paused" | "completed";

const AGENT_ICONS: Record<string, string> = {
  LearningIntelligenceAgent: "🧠",
  EngagementOptimizationAgent: "⚡",
  BehaviorAnalysisAgent: "📊",
  SafetyModerationAgent: "🛡️",
  FriendApprovalAgent: "🤝",
  SocialModerationAgent: "👁️",
  ParentInsightAgent: "👨‍👩‍👧",
  TeacherSupportAgent: "👨‍🏫",
  ProgressAnalyticsAgent: "📈",
  ContradictionDetectionAgent: "⚠️",
  FallbackRecoveryAgent: "🔄",
};

const AGENT_COLORS: Record<string, string> = {
  LearningIntelligenceAgent: "#6366f1",
  EngagementOptimizationAgent: "#f59e0b",
  BehaviorAnalysisAgent: "#10b981",
  SafetyModerationAgent: "#ef4444",
  FriendApprovalAgent: "#3b82f6",
  SocialModerationAgent: "#8b5cf6",
  ParentInsightAgent: "#ec4899",
  TeacherSupportAgent: "#14b8a6",
  ProgressAnalyticsAgent: "#0ea5e9",
  ContradictionDetectionAgent: "#f97316",
  FallbackRecoveryAgent: "#64748b",
};

const SYSTEM_LABELS: Record<string, { name: string; color: string }> = {
  LearningIntelligenceAgent: { name: "Learning Intelligence", color: "#6366f1" },
  EngagementOptimizationAgent: { name: "Learning Intelligence", color: "#6366f1" },
  BehaviorAnalysisAgent: { name: "Learning Intelligence", color: "#6366f1" },
  SafetyModerationAgent: { name: "Safety & Social", color: "#ef4444" },
  FriendApprovalAgent: { name: "Safety & Social", color: "#ef4444" },
  SocialModerationAgent: { name: "Safety & Social", color: "#ef4444" },
  ParentInsightAgent: { name: "Intelligence Reporting", color: "#ec4899" },
  TeacherSupportAgent: { name: "Intelligence Reporting", color: "#ec4899" },
  ProgressAnalyticsAgent: { name: "Intelligence Reporting", color: "#ec4899" },
  ContradictionDetectionAgent: { name: "Reliability", color: "#f97316" },
  FallbackRecoveryAgent: { name: "Reliability", color: "#f97316" },
};

const _AGENT_LIFECYCLE: string[] = ["WAITING", "RUNNING", "ANALYZING", "COMPLETED"];

function confidenceColor(conf: number): string {
  if (conf >= 0.80) return "#10b981";
  if (conf >= 0.60) return "#f59e0b";
  return "#ef4444";
}

function formatAgentName(name: string): string {
  return name.replace(/Agent$/, "").replace(/([A-Z])/g, " $1").trim();
}

function timeSince(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// ── SVG Confidence Ring ──────────────────────────────────────────────────────
function ConfidenceRing({ value, size = 100 }: { value: number; size?: number }) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - value * circumference;
  const color = confidenceColor(value);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--card-border)" strokeWidth={strokeWidth} />
        <circle
          cx={size / 2} cy={size / 2} r={radius} fill="none"
          stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.5s ease, stroke 0.5s ease" }}
        />
      </svg>
      {/* Pulsing glow */}
      <div className="absolute inset-0 rounded-full" style={{ boxShadow: `0 0 20px ${color}30, 0 0 40px ${color}15`, animation: "pulse 2s ease-in-out infinite" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-extrabold" style={{ color }}>{(value * 100).toFixed(0)}%</div>
        <div className="text-[9px] text-foreground/50 font-medium uppercase tracking-wider">Confidence</div>
      </div>
    </div>
  );
}

// ── Agent Status Badge ───────────────────────────────────────────────────────
function AgentStatusBadge({ status, color }: { status: string; color: string }) {
  const statusColors: Record<string, { bg: string; text: string }> = {
    WAITING: { bg: "var(--card-border)", text: "var(--foreground)" },
    RUNNING: { bg: `${color}25`, text: color },
    ANALYZING: { bg: `${color}35`, text: color },
    COMPLETED: { bg: `${color}15`, text: color },
    WARNING: { bg: "#f59e0b20", text: "#f59e0b" },
    FAILED: { bg: "#ef444420", text: "#ef4444" },
    RECOVERED: { bg: "#10b98120", text: "#10b981" },
  };
  const s = statusColors[status] || statusColors.WAITING;
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
      style={{ background: s.bg, color: s.text, transition: "all 0.3s ease" }}
    >
      {status === "RUNNING" && <span className="inline-block animate-spin mr-1">⚙</span>}
      {status}
    </span>
  );
}

export default function AgentTracePage() {
  const { status } = useSession();
  const [traces, setTraces] = useState<Trace[]>([]);
  const [selectedTrace, setSelectedTrace] = useState<Trace | null>(null);
  const [expandedAgent, setExpandedAgent] = useState<string | null>(null);
  const [childId, setChildId] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  // Replay state
  const [replayState, setReplayState] = useState<ReplayState>("idle");
  const [replayIndex, setReplayIndex] = useState(0);
  const [replaySpeed, setReplaySpeed] = useState(1);
  const [agentStatuses, setAgentStatuses] = useState<Record<number, string>>({});

  // Fetch child info and traces
  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/dashboard")
      .then(r => r.json())
      .then(d => {
        const child = d.child || d.children?.[0];
        if (child) {
          setChildId(child.id);
          setChildName(child.name);
          return fetch(`/api/agents/trace?childId=${child.id}`);
        }
      })
      .then(r => r?.json())
      .then(d => {
        if (d?.traces) {
          setTraces(d.traces);
          if (d.traces.length > 0) setSelectedTrace(d.traces[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [status]);

  // Replay logic
  const startReplay = useCallback(() => {
    setReplayState("playing");
    setReplayIndex(0);
    setAgentStatuses({});
    setExpandedAgent(null);
  }, []);

  const pauseReplay = useCallback(() => setReplayState("paused"), []);
  const resumeReplay = useCallback(() => setReplayState("playing"), []);

  useEffect(() => {
    if (replayState !== "playing" || !selectedTrace) return;

    const total = selectedTrace.agentResults.length;
    if (replayIndex >= total) {
      setReplayState("completed");
      return;
    }

    // Set current agent status lifecycle transitions
    const currentIdx = replayIndex;
    setAgentStatuses(prev => ({ ...prev, [currentIdx]: "RUNNING" }));

    const analyzeTimer = setTimeout(() => {
      setAgentStatuses(prev => ({ ...prev, [currentIdx]: "ANALYZING" }));
    }, 400 / replaySpeed);

    const completeTimer = setTimeout(() => {
      const agent = selectedTrace.agentResults[currentIdx];
      const finalStatus = agent.status === "error" ? "FAILED"
        : agent.confidence < 0.6 ? "WARNING"
        : "COMPLETED";
      setAgentStatuses(prev => ({ ...prev, [currentIdx]: finalStatus }));
      setReplayIndex(prev => prev + 1);
    }, (800 + (selectedTrace.agentResults[currentIdx]?.executionMs || 300)) / replaySpeed);

    return () => {
      clearTimeout(analyzeTimer);
      clearTimeout(completeTimer);
    };
  }, [replayState, replayIndex, selectedTrace, replaySpeed]);

  // When selecting a new trace, reset replay
  useEffect(() => {
    if (!selectedTrace) return;
    setReplayState("idle");
    setReplayIndex(0);
    setAgentStatuses({});
    // Show all agents immediately when not replaying
    const statuses: Record<number, string> = {};
    selectedTrace.agentResults.forEach((_, i) => { statuses[i] = "COMPLETED"; });
    setAgentStatuses(statuses);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrace?.id]);

  const handleRunAgents = async () => {
    if (!childId || running) return;
    setRunning(true);
    try {
      const res = await fetch("/api/agents/trace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          triggerEvent: "manual_run",
          score: Math.random() * 0.5 + 0.3,
          subject: ["math", "science", "english", "coding"][Math.floor(Math.random() * 4)],
          difficulty: Math.floor(Math.random() * 5) + 3,
          avgResponseTimeS: Math.floor(Math.random() * 40) + 5,
          sessionLengthMin: Math.floor(Math.random() * 50) + 5,
          scoreTrend: (Math.random() - 0.3) * 0.5,
          sessionTrend: (Math.random() - 0.5) * 0.6,
        }),
      });
      const trace = await res.json();
      if (trace.agentResults) {
        const newTrace: Trace = {
          id: trace.traceId || Date.now().toString(),
          sessionId: trace.sessionId,
          triggerEvent: trace.triggerEvent,
          agentResults: trace.agentResults,
          overallConfidence: trace.overallConfidence,
          fallbackTriggered: trace.fallbackTriggered,
          contradictionDetected: trace.contradictionDetected,
          finalRecommendations: trace.finalRecommendations || [],
          createdAt: trace.timestamp || new Date().toISOString(),
        };
        setTraces(prev => [newTrace, ...prev]);
        setSelectedTrace(newTrace);
        // Auto-start replay on new trace
        setTimeout(() => {
          setReplayState("playing");
          setReplayIndex(0);
          setAgentStatuses({});
        }, 200);
      }
    } catch (e) {
      console.error(e);
    }
    setRunning(false);
  };

  const isAgentVisible = (idx: number) => {
    if (replayState === "idle") return true; // show all when not replaying
    return idx < replayIndex || agentStatuses[idx] !== undefined;
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-float">🧠</div>
          <p className="text-foreground/50 text-lg">Loading Agent Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-foreground/50 hover:text-foreground no-underline">←</Link>
          <Link href="/" className="flex items-center gap-2 text-lg font-bold no-underline">
            <span className="text-xl">🧒</span>
            <span className="gradient-text">KIDO</span>
          </Link>
          <span className="px-2 py-1 rounded-lg text-xs font-bold uppercase" style={{ background: "rgba(99,102,241,0.12)", color: "#6366f1" }}>
            Antigravity Agent Trace
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAgents}
            disabled={running || !childId}
            className="btn-primary py-2 px-4 text-sm flex items-center gap-2"
          >
            {running ? (
              <><span className="animate-spin">⚙️</span> Running 11 Agents...</>
            ) : (
              <>🚀 Run Agent Pipeline</>
            )}
          </button>
          <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">Dashboard</Link>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar — Trace History + Event Feed */}
        <aside className="w-72 border-r border-[var(--card-border)] bg-[var(--card)] overflow-y-auto hidden md:block" style={{ maxHeight: "calc(100vh - var(--nav-height))" }}>
          <div className="p-4">
            <h3 className="text-xs uppercase tracking-wider text-foreground/40 mb-3 font-bold">Trace History</h3>
            {traces.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-sm text-foreground/40">No traces yet. Run the agent pipeline!</p>
              </div>
            ) : (
              <div className="space-y-2 mb-6">
                {traces.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setSelectedTrace(t); setExpandedAgent(null); }}
                    className="w-full text-left p-3 rounded-xl transition-all"
                    style={{
                      background: selectedTrace?.id === t.id ? "rgba(99,102,241,0.15)" : "transparent",
                      border: selectedTrace?.id === t.id ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {t.contradictionDetected && <span className="text-xs">⚠️</span>}
                      <span className="text-xs font-bold" style={{ color: confidenceColor(t.overallConfidence) }}>
                        {(t.overallConfidence * 100).toFixed(0)}%
                      </span>
                      <span className="text-xs text-foreground/40">{t.triggerEvent}</span>
                    </div>
                    <div className="text-xs text-foreground/50">{timeSince(t.createdAt)}</div>
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {t.agentResults.slice(0, 5).map((a, i) => (
                        <span key={i} className="text-xs" title={a.agent}>{AGENT_ICONS[a.agent] || "🤖"}</span>
                      ))}
                      {t.agentResults.length > 5 && <span className="text-xs text-foreground/40">+{t.agentResults.length - 5}</span>}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Event Feed in Sidebar */}
            <div className="border-t border-[var(--card-border)] pt-4">
              <h3 className="text-xs uppercase tracking-wider text-foreground/40 mb-3 font-bold">AI Event Stream</h3>
              <EventFeed childId={childId || undefined} maxEvents={8} />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8" style={{ maxHeight: "calc(100vh - var(--nav-height))" }}>
          {selectedTrace ? (
            <div className="max-w-4xl mx-auto">
              {/* Overall Status Banner with Confidence Ring */}
              <div
                className="rounded-2xl p-5 mb-6 animate-slide-up"
                style={{
                  background: selectedTrace.contradictionDetected
                    ? "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(239,68,68,0.08))"
                    : "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
                  border: `1px solid ${selectedTrace.contradictionDetected ? "rgba(249,115,22,0.2)" : "rgba(99,102,241,0.2)"}`,
                }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  {/* Confidence Ring */}
                  <ConfidenceRing value={selectedTrace.overallConfidence} size={100} />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-1">
                      {selectedTrace.contradictionDetected
                        ? "Contradiction Detected — Fallback Triggered"
                        : selectedTrace.fallbackTriggered
                          ? "Fallback Agent Intervened"
                          : "Antigravity Trace Complete"}
                    </h2>
                    <p className="text-sm text-foreground/60">
                      {selectedTrace.agentResults.length} agents executed · {selectedTrace.triggerEvent} · {timeSince(selectedTrace.createdAt)}
                    </p>
                  </div>

                  {/* Replay Controls */}
                  <div className="flex items-center gap-2">
                    {replayState === "idle" || replayState === "completed" ? (
                      <button onClick={startReplay} className="btn-primary py-2 px-4 text-sm flex items-center gap-2" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                        ▶ {replayState === "completed" ? "Replay" : "Replay AI Reasoning"}
                      </button>
                    ) : replayState === "playing" ? (
                      <button onClick={pauseReplay} className="btn-secondary py-2 px-3 text-sm">⏸ Pause</button>
                    ) : (
                      <button onClick={resumeReplay} className="btn-primary py-2 px-3 text-sm" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>▶ Resume</button>
                    )}
                    <select
                      value={replaySpeed}
                      onChange={e => setReplaySpeed(Number(e.target.value))}
                      className="input py-1.5 px-2 text-xs w-16"
                      style={{ background: "var(--card)", border: "1px solid var(--card-border)" }}
                    >
                      <option value={0.5}>0.5x</option>
                      <option value={1}>1x</option>
                      <option value={2}>2x</option>
                    </select>
                  </div>
                </div>

                {/* System Summary */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {["Learning Intelligence", "Safety & Social", "Intelligence Reporting", "Reliability"].map(sys => {
                    const agents = selectedTrace.agentResults.filter(a => SYSTEM_LABELS[a.agent]?.name === sys);
                    const avgConf = agents.length > 0 ? agents.reduce((s, a) => s + a.confidence, 0) / agents.length : 0;
                    const sysColor = agents.length > 0 ? SYSTEM_LABELS[agents[0].agent]?.color : "#64748b";
                    return (
                      <div
                        key={sys}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium"
                        style={{ background: `${sysColor}15`, color: sysColor, border: `1px solid ${sysColor}25` }}
                      >
                        {sys}: {(avgConf * 100).toFixed(0)}%
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Agent Timeline */}
              <div className="space-y-3">
                {selectedTrace.agentResults.map((agent, idx) => {
                  const visible = isAgentVisible(idx);
                  const isExpanded = expandedAgent === agent.agent;
                  const agentColor = AGENT_COLORS[agent.agent] || "#64748b";
                  const icon = AGENT_ICONS[agent.agent] || "🤖";
                  const systemLabel = SYSTEM_LABELS[agent.agent];
                  const currentStatus = agentStatuses[idx] || "WAITING";
                  const memUpdates = agent.memoryUpdates || [];
                  const refAgents = agent.referencedAgents || [];

                  return (
                    <div key={`${agent.agent}-${idx}`}>
                      {/* Shared Context Update Indicator (between agents) */}
                      {idx > 0 && memUpdates.length > 0 && visible && (
                        <div className="flex items-center gap-3 ml-5 my-1.5" style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s" }}>
                          <div className="w-0.5 h-4" style={{ background: `${AGENT_COLORS[selectedTrace.agentResults[idx - 1]?.agent] || "#64748b"}20` }} />
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium" style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.15)" }}>
                            <span>🔄</span>
                            <span>Shared Context Updated: {memUpdates[0]}</span>
                            {memUpdates.length > 1 && <span className="text-foreground/40">+{memUpdates.length - 1} more</span>}
                          </div>
                        </div>
                      )}

                      <div
                        className="animate-slide-up"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "translateY(0)" : "translateY(20px)",
                          transition: "all 0.3s ease",
                          pointerEvents: visible ? "auto" : "none",
                        }}
                      >
                        <div className="flex items-stretch">
                          {/* Timeline dot + line */}
                          <div className="flex flex-col items-center mr-4 relative">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 z-10"
                              style={{
                                background: currentStatus === "RUNNING" ? `${agentColor}35` : `${agentColor}20`,
                                border: `2px solid ${agentColor}`,
                                boxShadow: currentStatus === "RUNNING" ? `0 0 12px ${agentColor}40` : "none",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {icon}
                            </div>
                            {idx < selectedTrace.agentResults.length - 1 && (
                              <div className="w-0.5 flex-1 min-h-[20px]" style={{ background: `${agentColor}30` }} />
                            )}
                          </div>

                          {/* Agent Card */}
                          <div
                            className="flex-1 rounded-xl overflow-hidden mb-1 cursor-pointer transition-all"
                            onClick={() => setExpandedAgent(isExpanded ? null : agent.agent)}
                            style={{
                              background: "var(--card)",
                              border: `1px solid ${isExpanded ? agentColor + "40" : "var(--card-border)"}`,
                            }}
                          >
                            {/* Header */}
                            <div className="flex items-center gap-3 p-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                                  <span className="font-bold text-sm">{formatAgentName(agent.agent)}</span>
                                  {systemLabel && (
                                    <span className="text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: `${systemLabel.color}15`, color: systemLabel.color }}>
                                      {systemLabel.name}
                                    </span>
                                  )}
                                  <AgentStatusBadge status={currentStatus} color={agentColor} />
                                </div>
                                <div className="text-xs text-foreground/50 truncate">
                                  {agent.executionMs}ms · {agent.actionsTriggered.length} action(s) · {agent.inputSummary}
                                </div>
                              </div>

                              {/* Confidence */}
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="w-20 h-2 rounded-full overflow-hidden" style={{ background: "var(--card-border)" }}>
                                  <div
                                    className="h-full rounded-full transition-all duration-700"
                                    style={{
                                      width: currentStatus === "COMPLETED" || currentStatus === "WARNING" ? `${agent.confidence * 100}%` : "0%",
                                      background: `linear-gradient(90deg, ${confidenceColor(agent.confidence)}, ${confidenceColor(agent.confidence)}cc)`,
                                    }}
                                  />
                                </div>
                                <span className="text-sm font-bold w-10 text-right" style={{ color: confidenceColor(agent.confidence) }}>
                                  {(agent.confidence * 100).toFixed(0)}%
                                </span>
                                <span className="text-foreground/30 transition-transform" style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                              <div className="px-4 pb-4 border-t border-[var(--card-border)] animate-slide-up">
                                <div className="pt-4 space-y-4">
                                  {/* Referenced Agents */}
                                  {refAgents.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5">
                                      <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold mr-1.5 self-center">Referenced:</span>
                                      {refAgents.map(ref => (
                                        <span key={ref} className="px-2 py-0.5 rounded-lg text-[10px] font-medium flex items-center gap-1"
                                          style={{ background: `${AGENT_COLORS[ref] || "#64748b"}12`, color: AGENT_COLORS[ref] || "#64748b", border: `1px solid ${AGENT_COLORS[ref] || "#64748b"}20` }}>
                                          {AGENT_ICONS[ref] || "🤖"} {formatAgentName(ref)}
                                        </span>
                                      ))}
                                    </div>
                                  )}

                                  {/* Reasoning */}
                                  <div>
                                    <h4 className="text-xs uppercase tracking-wider text-foreground/40 font-bold mb-2">Reasoning Chain</h4>
                                    <div className="p-3 rounded-lg text-sm leading-relaxed" style={{ background: `${agentColor}08`, borderLeft: `3px solid ${agentColor}` }}>
                                      {agent.reasoning}
                                    </div>
                                  </div>

                                  {/* Why This Happened */}
                                  {agent.actionsTriggered.length > 0 && (
                                    <div>
                                      <h4 className="text-xs uppercase tracking-wider text-foreground/40 font-bold mb-2">Why This Happened</h4>
                                      <div className="p-3 rounded-lg text-xs text-foreground/70 leading-relaxed" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                                        {agent.agent === "LearningIntelligenceAgent" && agent.output?.difficultyAdjustment === "increase" && "• Average score exceeded mastery threshold (80%)\n• Learning velocity is accelerating\n• Student demonstrates strong concept retention"}
                                        {agent.agent === "LearningIntelligenceAgent" && agent.output?.difficultyAdjustment === "decrease" && "• Score dropped below minimum threshold (50%)\n• Concept gaps detected in current subject\n• Guided practice recommended before progression"}
                                        {agent.agent === "EngagementOptimizationAgent" && agent.output?.engagementStatus === "fatigued" && "• Session time exceeded 45-minute threshold\n• Response patterns indicate declining focus\n• Break recommended to prevent burnout"}
                                        {agent.agent === "BehaviorAnalysisAgent" && agent.output?.burnoutRisk !== "low" && "• Behavioral patterns show stress indicators\n• Score-session time correlation is abnormal\n• Proactive intervention recommended"}
                                        {agent.agent === "SafetyModerationAgent" && !agent.output?.safe && "• Content matched safety filter patterns\n• Automatic message blocking activated\n• Parent notification generated"}
                                        {agent.agent === "ContradictionDetectionAgent" && agent.output?.detected && "• Cross-agent signals show inconsistency\n• Learning data contradicts engagement data\n• Profile recalibration initiated"}
                                        {agent.agent === "FallbackRecoveryAgent" && agent.output?.issues?.length > 0 && "• System validation detected anomalies\n• Recovery protocols activated\n• Parent notification with context generated"}
                                        {!["LearningIntelligenceAgent", "EngagementOptimizationAgent", "BehaviorAnalysisAgent", "SafetyModerationAgent", "ContradictionDetectionAgent", "FallbackRecoveryAgent"].includes(agent.agent) && "• Analysis completed based on cross-agent data\n• Recommendations generated from behavioral patterns\n• Insights updated in monitoring dashboard"}
                                      </div>
                                    </div>
                                  )}

                                  {/* Memory Updates */}
                                  {memUpdates.length > 0 && (
                                    <div>
                                      <h4 className="text-xs uppercase tracking-wider text-foreground/40 font-bold mb-2">Shared Memory Updated</h4>
                                      <div className="flex flex-wrap gap-1.5">
                                        {memUpdates.map((update, i) => (
                                          <span key={i} className="px-2.5 py-1 rounded-lg text-[11px] font-mono" style={{ background: "rgba(99,102,241,0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.15)" }}>
                                            {update}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Actions */}
                                  {agent.actionsTriggered.length > 0 && (
                                    <div>
                                      <h4 className="text-xs uppercase tracking-wider text-foreground/40 font-bold mb-2">Actions Triggered</h4>
                                      <div className="flex flex-wrap gap-1.5">
                                        {agent.actionsTriggered.map((action, i) => (
                                          <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium"
                                            style={{ background: `${agentColor}12`, color: agentColor, border: `1px solid ${agentColor}20` }}>
                                            {action}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Output */}
                                  <div>
                                    <h4 className="text-xs uppercase tracking-wider text-foreground/40 font-bold mb-2">Agent Output</h4>
                                    <pre className="p-3 rounded-lg text-xs overflow-x-auto" style={{ background: "var(--background)", border: "1px solid var(--card-border)" }}>
                                      {JSON.stringify(agent.output, null, 2)}
                                    </pre>
                                  </div>

                                  {/* Confidence Detail */}
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs text-foreground/50">Confidence:</span>
                                    <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: "var(--card-border)" }}>
                                      <div
                                        className="h-full rounded-full transition-all duration-1000"
                                        style={{
                                          width: `${agent.confidence * 100}%`,
                                          background: `linear-gradient(90deg, ${confidenceColor(agent.confidence)}, ${confidenceColor(agent.confidence)}88)`,
                                        }}
                                      />
                                    </div>
                                    <span className="text-sm font-bold" style={{ color: confidenceColor(agent.confidence) }}>
                                      {(agent.confidence * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recommendations */}
              {selectedTrace.finalRecommendations.length > 0 && (
                <div className="card mt-6 animate-slide-up">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <span className="text-xl">💡</span> AI Recommendations
                  </h3>
                  <div className="space-y-2">
                    {selectedTrace.finalRecommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--background)]">
                        <span className="text-sm shrink-0 mt-0.5">→</span>
                        <span className="text-sm">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto">
              <div className="text-6xl mb-6 animate-float">🧠</div>
              <h2 className="text-2xl font-bold mb-3">
                <span className="gradient-text">Antigravity Agent Intelligence</span>
              </h2>
              <p className="text-foreground/50 mb-2 leading-relaxed">
                KIDO uses 11 autonomous AI agents that monitor, analyze, adapt, and protect {childName || "your child"}&apos;s learning journey in real-time. The system continuously validates whether learning signals actually make sense together.
              </p>
              <div className="grid grid-cols-2 gap-2 mt-6 w-full text-left">
                {Object.entries(AGENT_ICONS).map(([name, icon]) => (
                  <div key={name} className="flex items-center gap-2 p-2 rounded-lg text-xs" style={{ background: `${AGENT_COLORS[name]}08` }}>
                    <span>{icon}</span>
                    <span className="text-foreground/70">{formatAgentName(name)}</span>
                  </div>
                ))}
              </div>
              <button onClick={handleRunAgents} disabled={running || !childId} className="btn-primary mt-8 py-3 px-8">
                {running ? "⚙️ Running..." : "🚀 Run Full Agent Pipeline"}
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
