"use client";

import { useEffect, useState } from "react";

interface AIEvent {
  id: string;
  icon: string;
  message: string;
  type: string;
  severity: string;
  time: string;
  color: string;
}

const EVENT_CONFIG: Record<string, { icon: string; color: string }> = {
  burnout_risk: { icon: "⚠️", color: "#f59e0b" },
  safety_incidents: { icon: "🛡️", color: "#ef4444" },
  learning_pace_slow: { icon: "📉", color: "#f97316" },
  low_engagement: { icon: "💤", color: "#8b5cf6" },
  screen_time: { icon: "⏱️", color: "#3b82f6" },
  difficulty_change: { icon: "🧠", color: "#6366f1" },
  social: { icon: "👥", color: "#10b981" },
  achievement: { icon: "🏆", color: "#f59e0b" },
  quiz_completed: { icon: "🎯", color: "#10b981" },
  agent_trace: { icon: "🤖", color: "#6366f1" },
  default: { icon: "ℹ️", color: "#64748b" },
};

function timeSince(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

export default function EventFeed({ childId, maxEvents = 12 }: { childId?: string; maxEvents?: number }) {
  const [events, setEvents] = useState<AIEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    if (!childId) return;
    try {
      const [alertsRes, tracesRes] = await Promise.all([
        fetch(`/api/dashboard`),
        fetch(`/api/agents/trace?childId=${childId}`),
      ]);

      const alertData = await alertsRes.json();
      const traceData = await tracesRes.json();

      const aiEvents: AIEvent[] = [];

      // Parse alerts into events
      const children = alertData.children || (alertData.child ? [alertData.child] : []);
      for (const child of children) {
        if (child.alerts) {
          for (const alert of child.alerts) {
            const cfg = EVENT_CONFIG[alert.type] || EVENT_CONFIG.default;
            aiEvents.push({
              id: alert.id,
              icon: cfg.icon,
              message: alert.title,
              type: alert.type,
              severity: alert.severity,
              time: alert.createdAt || new Date().toISOString(),
              color: cfg.color,
            });
          }
        }
        // Activity events
        if (child.activities) {
          for (const act of child.activities.slice(0, 5)) {
            const cfg = EVENT_CONFIG[act.type] || EVENT_CONFIG.default;
            aiEvents.push({
              id: act.id,
              icon: cfg.icon,
              message: act.title,
              type: act.type,
              severity: "info",
              time: act.createdAt,
              color: cfg.color,
            });
          }
        }
      }

      // Parse traces into events
      if (traceData.traces) {
        for (const trace of traceData.traces.slice(0, 5)) {
          const warnings = trace.agentResults?.filter((r: any) => r.confidence < 0.7) || [];
          const actions = trace.agentResults?.flatMap((r: any) => r.actionsTriggered || []) || [];
          
          aiEvents.push({
            id: `trace-${trace.id}`,
            icon: trace.contradictionDetected ? "⚠️" : "🧠",
            message: trace.contradictionDetected
              ? `Contradiction detected — AI cross-validation triggered`
              : `AI intelligence sync completed (${(trace.overallConfidence * 100).toFixed(0)}% confidence)`,
            type: "agent_trace",
            severity: trace.contradictionDetected ? "warning" : "info",
            time: trace.createdAt,
            color: trace.contradictionDetected ? "#f97316" : "#6366f1",
          });

          // Add key actions as events
          if (actions.includes("alert_parent") || actions.includes("recommend_break")) {
            aiEvents.push({
              id: `trace-action-${trace.id}`,
              icon: "⚡",
              message: `AI recommended break for learning fatigue`,
              type: "burnout_risk",
              severity: "warning",
              time: trace.createdAt,
              color: "#f59e0b",
            });
          }
          if (actions.includes("block_message")) {
            aiEvents.push({
              id: `trace-safety-${trace.id}`,
              icon: "🛡️",
              message: `Message blocked by Safety Moderation Agent`,
              type: "safety_incidents",
              severity: "critical",
              time: trace.createdAt,
              color: "#ef4444",
            });
          }
        }
      }

      // Sort by time (newest first) and limit
      aiEvents.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
      setEvents(aiEvents.slice(0, maxEvents));
    } catch (e) {
      console.error("EventFeed error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
    const interval = setInterval(fetchEvents, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childId]);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--background)] animate-pulse">
            <div className="w-8 h-8 rounded-full bg-foreground/10" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 w-3/4 rounded bg-foreground/10" />
              <div className="h-2 w-1/3 rounded bg-foreground/5" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-6">
        <div className="text-2xl mb-2">🤖</div>
        <p className="text-xs text-foreground/40">No AI events yet. Complete a learning session to generate insights.</p>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2 mb-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
        </span>
        <span className="text-[10px] uppercase tracking-wider text-foreground/40 font-bold">AI Systems Active · 11 Agents</span>
      </div>
      {events.map((event, i) => (
        <div
          key={event.id}
          className="flex items-start gap-2.5 p-2.5 rounded-xl transition-all hover:bg-foreground/5"
          style={{
            animation: `slideUp 0.3s ease ${i * 0.05}s both`,
            borderLeft: `3px solid ${event.color}`,
          }}
        >
          <span className="text-sm mt-0.5 shrink-0">{event.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium leading-snug truncate">{event.message}</div>
            <div className="text-[10px] text-foreground/40 mt-0.5">{timeSince(event.time)}</div>
          </div>
          {event.severity === "critical" && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-500/10 text-red-500">ALERT</span>
          )}
          {event.severity === "warning" && (
            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-500/10 text-amber-500">WARN</span>
          )}
        </div>
      ))}
    </div>
  );
}
