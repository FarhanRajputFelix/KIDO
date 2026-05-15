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
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [childId, setChildId] = useState<string | null>(null);
  const [childName, setChildName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch child info and chat history
  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) {
            setChildId(child.id);
            setChildName(child.name);
            // Load chat history
            fetch(`/api/ai/chat?childId=${child.id}`)
              .then(r => r.json())
              .then(h => {
                if (h.messages) setMessages(h.messages);
              });
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
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to chat context");
      }
      if (data.message) {
        setMessages(prev => [...prev, { role: "assistant", content: data.message.content }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "Oops! My AI brain is currently thinking about something else. Please try again! 😊" }]);
    }
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format markdown-like content
  const formatContent = (text: string) => {
    return text
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="chat-code-block"><code>$2</code></pre>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="chat-inline-code">$1</code>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-primary-500 hover:underline font-bold" style="text-decoration: underline;">$1</a>')
      .replace(/\n/g, '<br/>');
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-float">🤖</div>
          <p className="text-foreground/50">Loading KIDO AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Chat Header */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-foreground/50 hover:text-foreground no-underline">←</Link>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-lg">🤖</div>
            <div>
              <h1 className="font-bold text-sm">KIDO AI</h1>
              <p className="text-xs text-foreground/50">{isTyping ? "Thinking..." : "Your learning buddy"}</p>
            </div>
          </div>
        </div>
        <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">Back to Dashboard</Link>
      </nav>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6" style={{ maxHeight: "calc(100vh - var(--nav-height) - 80px)" }}>
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message if no history */}
          {messages.length === 0 && (
            <div className="text-center py-12 animate-slide-up">
              <div className="text-6xl mb-4 animate-float">🤖</div>
              <h2 className="text-2xl font-bold mb-2">Hi {childName || "there"}! 👋</h2>
              <p className="text-foreground/50 mb-6 max-w-md mx-auto">
                I&apos;m KIDO AI, your personal learning buddy! Ask me anything about your subjects and I&apos;ll help you learn.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  "🧮 Help me with fractions",
                  "🔬 How do volcanoes work?",
                  "💻 What is a variable in coding?",
                  "📚 Explain photosynthesis",
                  "🌍 Tell me about ancient Egypt",
                  "🎨 What makes colors mix?",
                ].map(q => (
                  <button
                    key={q}
                    onClick={() => { setInput(q); }}
                    className="px-4 py-2 rounded-xl bg-[var(--card)] border border-[var(--card-border)] text-sm hover:border-primary-500 transition-all cursor-pointer"
                    style={{ border: "1px solid var(--card-border)" }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-slide-up`}>
              <div className={`max-w-[80%] ${msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"}`}>
                {msg.role === "assistant" && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs">🤖</div>
                    <span className="text-xs font-bold text-primary-500">KIDO AI</span>
                  </div>
                )}
                <div className="chat-content" dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }} />
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-slide-up">
              <div className="chat-bubble-ai">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs">🤖</div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-[var(--card-border)] bg-[var(--card)] p-4">
        <div className="max-w-3xl mx-auto flex gap-3">
          <textarea
            className="input flex-1 resize-none"
            rows={1}
            placeholder="Ask me anything! 🚀"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping || !childId}
          />
          <button
            onClick={handleSend}
            disabled={isTyping || !input.trim() || !childId}
            className="btn-primary px-6"
          >
            {isTyping ? "..." : "Send ✨"}
          </button>
        </div>
        <p className="text-center text-xs text-foreground/30 mt-2">KIDO AI learns with you — powered by Google Gemini</p>
      </div>
    </div>
  );
}
