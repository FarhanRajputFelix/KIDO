"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Message {
  id?: string;
  role: string;
  content: string;
  createdAt?: string;
}

export default function ChatPage() {
  const { status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [childId, setChildId] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) {
            setChildId(child.id);
            setChildName(child.name);
            fetch(`/api/ai/chat?childId=${child.id}`)
              .then(r => r.json())
              .then(h => { if (h.messages) setMessages(h.messages); });
          }
        });
    }
  }, [status]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !childId || isTyping) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, message: userMsg }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed");
      if (data.message) setMessages(prev => [...prev, { role: "assistant", content: data.message.content }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! Let me think again. Try asking me something! 😊" }]);
    }
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const formatContent = (text: string) =>
    text
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$2</code></pre>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="chat-inline-code">$1</code>')
      .replace(/\n/g, '<br/>');

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#F8F7FF" }}>
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">🤖</div>
          <p className="font-bold" style={{ color: "#6C63FF" }}>Loading Kido AI...</p>
        </div>
      </div>
    );
  }

  const quickPrompts = [
    "🧮 Help me with fractions",
    "🔬 How do volcanoes work?",
    "💻 What is a variable?",
    "📚 Explain photosynthesis",
    "🌍 Ancient Egypt facts",
    "🎨 How do colors mix?",
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F7FF" }}>
      {/* Stitch-style chat header */}
      <div className="bg-white border-b border-[var(--card-border)] px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Robot avatar */}
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl"
                 style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)", boxShadow: "0 3px 0 #2d2b70" }}>
              🤖
            </div>
            <div>
              <div className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>Kido AI</div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: isTyping ? "#f59e0b" : "#10b981" }} />
                <span className="text-xs font-semibold" style={{ color: "#777587" }}>
                  {isTyping ? "Thinking..." : "Your learning buddy"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="chip chip-gold">⚡ 5 XP / chat</div>
            <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Back</Link>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5" style={{ maxHeight: "calc(100vh - 140px)" }}>
        <div className="max-w-2xl mx-auto space-y-4">

          {/* Welcome state */}
          {messages.length === 0 && (
            <div className="text-center py-8 animate-slide-up">
              <div className="text-6xl mb-4 animate-float">🤖</div>
              <h2 className="text-2xl font-extrabold mb-2" style={{ color: "#1a1a2e" }}>
                Hi {childName || "there"}! 👋
              </h2>
              <p className="text-sm font-semibold mb-6 max-w-xs mx-auto" style={{ color: "#777587" }}>
                I&apos;m Kido AI — your personal learning buddy! Ask me anything and I&apos;ll help you learn.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickPrompts.map(q => (
                  <button key={q} onClick={() => setInput(q)}
                    className="chip chip-purple hover:bg-[#6C63FF] hover:text-white transition-all cursor-pointer text-xs py-2 px-3">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message bubbles */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
              {msg.role === "assistant" && (
                <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-base mr-2 shrink-0"
                     style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)" }}>
                  🤖
                </div>
              )}
              <div>
                {msg.role === "assistant" && (
                  <div className="text-xs font-bold mb-1 ml-1" style={{ color: "#6C63FF" }}>Kido AI</div>
                )}
                <div className={msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}>
                  <div className="chat-content" dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-base mr-2 shrink-0"
                   style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)" }}>🤖</div>
              <div className="chat-bubble-ai">
                <div className="flex gap-1.5 items-center">
                  {[0, 150, 300].map(delay => (
                    <div key={delay} className="w-2.5 h-2.5 rounded-full animate-bounce"
                         style={{ background: "#6C63FF", animationDelay: `${delay}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input bar - Stitch style */}
      <div className="bg-white border-t border-[var(--card-border)] px-5 py-4">
        <div className="max-w-2xl mx-auto flex gap-3">
          <textarea
            className="input flex-1 resize-none"
            rows={1}
            placeholder="Ask Kido AI anything! 🚀"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping || !childId}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim() || !childId}
            className="btn-primary w-14 h-12 rounded-2xl p-0 text-xl shrink-0"
            style={{ opacity: isTyping || !input.trim() || !childId ? 0.5 : 1 }}>
            ✨
          </button>
        </div>
        <p className="text-center text-xs mt-2 font-semibold" style={{ color: "#c5c0ff" }}>
          Powered by Google Gemini AI · Safe for Kids 🛡️
        </p>
      </div>
    </div>
  );
}
