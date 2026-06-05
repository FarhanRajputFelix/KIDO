"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Msg {
  role: "user" | "bot";
  text: string;
}

const STARTERS = [
  "🧮 Explain fractions",
  "🔬 How do volcanoes work?",
  "💻 What is coding?",
  "📚 What is photosynthesis?",
  "🌍 Tell me about space",
  "🧠 How does the brain work?",
];

export default function KidoBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! 👋 I'm **Kido Bot** — your AI learning buddy!\n\nAsk me anything you're curious about or stuck on, and I'll explain it in a fun way! 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
    else setUnread(0);
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;

    setInput("");
    setBusy(true);
    setMsgs(prev => [...prev, { role: "user", text: q }]);

    try {
      const historyForAPI = msgs.slice(-8).map(m => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.text,
      }));

      const res = await fetch("/api/ai/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q, history: historyForAPI }),
      });

      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't get a response. Please try again! 😊";

      setMsgs(prev => [...prev, { role: "bot", text: reply }]);
      if (!open) setUnread(n => n + 1);
    } catch {
      setMsgs(prev => [
        ...prev,
        { role: "bot", text: "Oops! I lost my connection 😅 Please try again!" },
      ]);
    } finally {
      setBusy(false);
    }
  }, [busy, msgs, open]);

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // Render bot message with basic markdown
  const renderText = (text: string) => {
    const html = text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/`(.*?)`/g, '<code style="background:#f0efff;padding:1px 6px;border-radius:4px;font-size:0.82em;color:#6C63FF">$1</code>')
      .replace(/\n/g, "<br/>");
    return { __html: html };
  };

  return (
    <>
      {/* ── Chat Panel ── */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 20,
            width: 360,
            height: 520,
            background: "white",
            borderRadius: 24,
            boxShadow: "0 8px 48px rgba(108,99,255,0.22), 0 2px 12px rgba(0,0,0,0.08)",
            border: "1.5px solid #e8e5ff",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 9999,
            animation: "kidoSlideUp 0.25s ease",
          }}
        >
          {/* Header */}
          <div style={{
            background: "linear-gradient(135deg,#6C63FF,#3F3D9E)",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 12,
                background: "rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}>🤖</div>
              <div>
                <div style={{ color: "white", fontWeight: 800, fontSize: 14 }}>Kido Bot</div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{
                    width: 7, height: 7, borderRadius: "50%",
                    background: busy ? "#facc15" : "#4ade80",
                  }} />
                  <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontWeight: 600 }}>
                    {busy ? "Thinking..." : "AI Learning Buddy"}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)",
                border: "none", cursor: "pointer",
                color: "white", fontSize: 14, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >✕</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto",
            background: "#F8F7FF",
            padding: "12px 12px 8px",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {msgs.map((m, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: 7,
              }}>
                {m.role === "bot" && (
                  <div style={{
                    width: 28, height: 28, borderRadius: 9,
                    background: "linear-gradient(135deg,#6C63FF,#3F3D9E)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 14, flexShrink: 0, marginBottom: 2,
                  }}>🤖</div>
                )}
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: m.role === "user"
                      ? "linear-gradient(135deg,#6C63FF,#3F3D9E)"
                      : "white",
                    color: m.role === "user" ? "white" : "#1a1a2e",
                    fontSize: 13,
                    fontWeight: 500,
                    lineHeight: 1.55,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  }}
                  dangerouslySetInnerHTML={renderText(m.text)}
                />
              </div>
            ))}

            {/* Quick starters (show with first message only) */}
            {msgs.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {STARTERS.map(s => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    style={{
                      background: "#f0efff", color: "#6C63FF",
                      border: "1.5px solid #e8e5ff",
                      borderRadius: 12, padding: "6px 10px",
                      fontSize: 11, fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >{s}</button>
                ))}
              </div>
            )}

            {/* Typing dots */}
            {busy && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 7 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 9,
                  background: "linear-gradient(135deg,#6C63FF,#3F3D9E)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14, flexShrink: 0,
                }}>🤖</div>
                <div style={{
                  background: "white", padding: "12px 16px",
                  borderRadius: "18px 18px 18px 4px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "#6C63FF",
                      animation: `kidoBounce 0.9s ease ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{
            background: "white",
            borderTop: "1.5px solid #e8e5ff",
            padding: "10px 12px",
            display: "flex", gap: 8, alignItems: "flex-end",
            flexShrink: 0,
          }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything! 🚀"
              rows={1}
              disabled={busy}
              style={{
                flex: 1,
                background: "#F8F7FF",
                border: "1.5px solid #e8e5ff",
                borderRadius: 14,
                padding: "9px 12px",
                fontSize: 13,
                fontWeight: 500,
                color: "#1a1a2e",
                resize: "none",
                outline: "none",
                fontFamily: "inherit",
                minHeight: 38,
                maxHeight: 90,
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={busy || !input.trim()}
              style={{
                width: 38, height: 38, borderRadius: 12,
                background: busy || !input.trim()
                  ? "#e8e5ff"
                  : "linear-gradient(135deg,#6C63FF,#3F3D9E)",
                border: "none", cursor: busy || !input.trim() ? "not-allowed" : "pointer",
                boxShadow: busy || !input.trim() ? "none" : "0 3px 0 #2d2b70",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, color: "white", flexShrink: 0,
                transition: "all 0.15s",
              }}
            >✨</button>
          </div>
        </div>
      )}

      {/* ── Float Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Ask Kido Bot"
        style={{
          position: "fixed",
          bottom: 22,
          right: 22,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: open
            ? "#3F3D9E"
            : "linear-gradient(135deg,#6C63FF,#3F3D9E)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 0 #2d2b70, 0 8px 24px rgba(108,99,255,0.38)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, color: "white",
          zIndex: 9999,
          transition: "transform 0.15s, background 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? "✕" : "🤖"}
        {!open && unread > 0 && (
          <div style={{
            position: "absolute", top: -4, right: -4,
            width: 20, height: 20, borderRadius: "50%",
            background: "#FFD700", color: "#1a1a2e",
            fontSize: 11, fontWeight: 900,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid white",
          }}>{unread}</div>
        )}
      </button>

      {/* Animations */}
      <style>{`
        @keyframes kidoSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes kidoBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%           { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
