"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function StoryCreatorGame() {
  const { status } = useSession();
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [childId, setChildId] = useState<string | null>(null);
  const [storyParts, setStoryParts] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [round, setRound] = useState(0);
  const [finished, setFinished] = useState(false);
  const submittedRef = useRef(false);

  // Persist attempt + award XP once when the story finishes.
  useEffect(() => {
    if (finished && childId && !submittedRef.current) {
      submittedRef.current = true;
      fetch("/api/games/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          gameType: "story-creator",
          xpReward: gameData?.challenge?.xpReward || 25,
        }),
      }).catch(() => {});
    }
  }, [finished, childId, gameData]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) {
            setChildId(child.id);
            fetch("/api/ai/game", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ childId: child.id, gameType: "story-creator" }),
            })
              .then(r => r.json())
              .then(g => {
                setGameData(g.game);
                const start = g.game?.challenge?.storyPart || g.game?.challenge?.storyStart || g.game?.challenge?.text || "Let's begin a story...";
                setStoryParts([start]);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          }
        });
    }
  }, [status]);

  const handleContinueStory = async (text?: string) => {
    const contribution = text || userInput.trim();
    if (!contribution || !childId) return;

    setStoryParts(prev => [...prev, contribution]);
    setUserInput("");
    setIsGenerating(true);

    if (round >= 3) {
      setFinished(true);
      setIsGenerating(false);
      return;
    }

    try {
      const res = await fetch("/api/ai/game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          gameType: "story-creator",
          context: [...storyParts, contribution].join("\n\n"),
        }),
      });
      const data = await res.json();
      const newPart = data.game?.challenge?.storyPart || data.game?.challenge?.storyStart || data.game?.challenge?.text;
      if (newPart) {
        setGameData(data.game);
        setStoryParts(prev => [...prev, newPart]);
      }
    } catch (e) {
      console.error(e);
    }

    setRound(prev => prev + 1);
    setIsGenerating(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-float">📖</div>
          <p className="text-foreground/50 text-lg">AI is crafting a story for you...</p>
          <div className="animate-shimmer h-2 w-48 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto">
          <div className="card card-glow text-center mb-6 animate-scale-in">
            <div className="text-5xl mb-4">📚</div>
            <h2 className="text-2xl font-extrabold mb-2">Your Story is Complete!</h2>
            <div className="text-sm font-bold text-xp mb-4">+{gameData?.challenge?.xpReward || 25} XP Earned! 🎉</div>
          </div>

          <div className="card">
            <h3 className="font-bold mb-4">📖 Full Story</h3>
            <div className="space-y-4">
              {storyParts.map((part, i) => (
                <div key={i} className={`p-4 rounded-xl ${i % 2 === 0 ? "bg-primary-500/5 border-l-4 border-primary-500" : "bg-accent-500/5 border-l-4 border-accent-500"}`}>
                  <div className="text-xs text-foreground/40 mb-1">{i % 2 === 0 ? "🤖 AI" : "✍️ You"}</div>
                  <p className="text-sm leading-relaxed">{part}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Link href="/games" className="btn-secondary flex-1 no-underline">Back to Games</Link>
            <button onClick={() => window.location.reload()} className="btn-primary flex-1">New Story</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/games" className="text-foreground/50 hover:text-foreground no-underline">←</Link>
          <span className="font-bold">📖 Story Creator</span>
        </div>
        <span className="text-sm text-foreground/50">Round {round + 1}/4</span>
      </nav>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Story so far */}
          <div className="space-y-4 mb-6">
            {storyParts.map((part, i) => (
              <div key={i} className={`card p-4 animate-slide-up ${i % 2 === 0 ? "border-l-4 border-primary-500" : "border-l-4 border-accent-500"}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-xs text-foreground/40 mb-1">{i % 2 === 0 ? "🤖 AI" : "✍️ You"}</div>
                <p className="text-sm leading-relaxed">{part}</p>
              </div>
            ))}
          </div>

          {/* AI is generating */}
          {isGenerating && (
            <div className="card text-center py-6 animate-slide-up">
              <div className="text-3xl animate-float mb-2">✨</div>
              <p className="text-foreground/50">AI is continuing the story...</p>
            </div>
          )}

          {/* User input */}
          {!isGenerating && (
            <div className="card animate-slide-up">
              <h3 className="font-bold mb-2">{gameData?.challenge?.prompt || "What happens next?"}</h3>

              {/* Quick choices */}
              {gameData?.challenge?.choices && (
                <div className="space-y-2 mb-4">
                  {gameData.challenge.choices.map((choice: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => handleContinueStory(choice)}
                      className="w-full text-left p-3 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:border-primary-500 transition-all text-sm cursor-pointer"
                      style={{ border: "1px solid var(--card-border)" }}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-xs text-foreground/40 mb-2">Or write your own continuation:</div>
              <textarea
                className="input w-full resize-none"
                rows={3}
                placeholder="Write what happens next..."
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
              />
              <button onClick={() => handleContinueStory()} className="btn-primary w-full mt-3" disabled={!userInput.trim()}>
                Continue Story ✍️
              </button>

              {gameData?.challenge?.writingTip && (
                <div className="mt-4 p-3 rounded-xl bg-info-500/10 border border-info-500/20">
                  <div className="text-xs font-bold text-info-500 mb-1">💡 Writing Tip</div>
                  <p className="text-xs text-foreground/60">{gameData.challenge.writingTip}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
