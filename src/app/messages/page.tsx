"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Friend { id: string; name: string; avatar: string; }
interface Msg { id: string; fromChildId: string; toChildId: string; content: string; createdAt: string; }

export default function MessagesPage() {
  const { status } = useSession();
  const [childId, setChildId] = useState<string | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [active, setActive] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) setChildId(child.id);
          if (d.friendsProgress) setFriends(d.friendsProgress);
        });
    }
  }, [status]);

  const loadThread = (friend: Friend) => {
    setActive(friend);
    if (!childId) return;
    fetch(`/api/messages?childId=${childId}&withChildId=${friend.id}`)
      .then(r => r.json())
      .then(d => setMessages(d.messages || []))
      .catch(() => setMessages([]));
  };

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const send = async () => {
    if (!input.trim() || !childId || !active || sending) return;
    const content = input.trim();
    setInput("");
    setSending(true);
    setMessages(prev => [...prev, { id: `tmp-${prev.length}`, fromChildId: childId, toChildId: active.id, content, createdAt: new Date().toISOString() }]);
    try {
      await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ childId, toChildId: active.id, content }),
      });
    } catch { /* ignore */ }
    setSending(false);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F7FF" }}>
      <nav className="flex items-center justify-between px-5 py-4 bg-white border-b border-[var(--card-border)]">
        <Link href="/dashboard" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white" style={{ background: "linear-gradient(135deg,#6C63FF,#3F3D9E)" }}>K</div>
          <span className="text-xl font-black gradient-text">KIDO</span>
        </Link>
        <Link href="/dashboard" className="btn-secondary py-2 px-4 text-sm no-underline">← Back</Link>
      </nav>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6">
        <h1 className="text-2xl font-extrabold mb-1 flex items-center gap-2" style={{ color: "#1a1a2e" }}>💬 Messages</h1>
        <p className="text-sm font-semibold mb-4" style={{ color: "#777587" }}>Chat with your approved friends</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ minHeight: "60vh" }}>
          {/* Friends list */}
          <div className="card p-3" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
            <h3 className="font-bold text-sm mb-2" style={{ color: "#1a1a2e" }}>Friends</h3>
            {friends.length === 0 && <p className="text-xs text-center py-4" style={{ color: "#aaa" }}>No friends yet. Add some from your dashboard!</p>}
            <div className="space-y-1">
              {friends.map(f => (
                <button key={f.id} onClick={() => loadThread(f)}
                  className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-left"
                  style={{ background: active?.id === f.id ? "#6C63FF" : "transparent", color: active?.id === f.id ? "#fff" : "#1a1a2e", border: "none", cursor: "pointer" }}>
                  <span className="text-xl">{f.avatar || "🙂"}</span>
                  <span className="font-semibold text-sm">{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Conversation */}
          <div className="card md:col-span-2 flex flex-col p-0" style={{ boxShadow: "0 3px 0 #e8e5ff" }}>
            {!active ? (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div className="text-4xl mb-2">💬</div>
                  <p className="text-sm font-semibold" style={{ color: "#777587" }}>Pick a friend to start chatting</p>
                </div>
              </div>
            ) : (
              <>
                <div className="px-4 py-3 border-b border-[var(--card-border)] flex items-center gap-2">
                  <span className="text-xl">{active.avatar || "🙂"}</span>
                  <span className="font-bold" style={{ color: "#1a1a2e" }}>{active.name}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: "45vh" }}>
                  {messages.length === 0 && <p className="text-xs text-center py-6" style={{ color: "#aaa" }}>Say hi! 👋</p>}
                  {messages.map(m => {
                    const mine = m.fromChildId === childId;
                    return (
                      <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                        <div className="px-3 py-2 rounded-2xl text-sm max-w-[75%]" style={{ background: mine ? "#6C63FF" : "#f0efff", color: mine ? "#fff" : "#1a1a2e" }}>
                          {m.content}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={endRef} />
                </div>
                <div className="p-3 border-t border-[var(--card-border)] flex gap-2">
                  <input className="input flex-1 py-2 text-sm" placeholder="Type a message..."
                    value={input} onChange={e => setInput(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter") send(); }} />
                  <button onClick={send} disabled={sending || !input.trim()} className="btn-primary py-2 px-4 text-sm">Send</button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
