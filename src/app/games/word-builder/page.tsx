"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Puzzle {
  type: string;
  scrambled?: string;
  sentence?: string;
  question?: string;
  text?: string;
  answer: string;
  hint: string;
  points: number;
}

export default function WordBuilderGame() {
  const { status } = useSession();
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [childId, setChildId] = useState<string | null>(null);
  const submittedRef = useRef(false);

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
              body: JSON.stringify({ childId: child.id, gameType: "word-builder" }),
            })
              .then(r => r.json())
              .then(g => { setGameData(g.game); setLoading(false); })
              .catch(() => setLoading(false));
          }
        });
    }
  }, [status]);

  // Persist attempt + award XP once when the game ends.
  useEffect(() => {
    if (gameOver && childId && !submittedRef.current) {
      submittedRef.current = true;
      fetch("/api/games/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          gameType: "word-builder",
          score,
          totalPoints: gameData?.challenge?.totalPoints || 100,
          xpReward: gameData?.challenge?.xpReward || 30,
        }),
      }).catch(() => {});
    }
  }, [gameOver, childId, score, gameData]);

  const puzzles: Puzzle[] = gameData?.challenge?.puzzles || [];

  const checkAnswer = () => {
    const correct = userAnswer.trim().toLowerCase() === puzzles[currentPuzzle].answer.toLowerCase();
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + puzzles[currentPuzzle].points);
    setShowResult(true);
  };

  const nextPuzzle = () => {
    setShowResult(false);
    setUserAnswer("");
    setShowHint(false);
    if (currentPuzzle + 1 >= puzzles.length) {
      setGameOver(true);
    } else {
      setCurrentPuzzle(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-float">🔤</div>
          <p className="text-foreground/50 text-lg">AI is creating word puzzles for you...</p>
          <div className="animate-shimmer h-2 w-48 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const total = gameData?.challenge?.totalPoints || 100;
    const percentage = Math.round((score / total) * 100);
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="card card-glow text-center max-w-md animate-scale-in">
          <div className="text-6xl mb-4">{percentage >= 80 ? "🏆" : percentage >= 50 ? "⭐" : "💪"}</div>
          <h2 className="text-2xl font-extrabold mb-2">Game Over!</h2>
          <div className="stat-value text-4xl mb-2">{score} / {total}</div>
          <p className="text-foreground/50 mb-6">Points earned</p>
          <div className="text-sm text-xp font-bold mb-6">+{gameData?.challenge?.xpReward || 30} XP Earned! 🎉</div>
          <div className="flex gap-3">
            <Link href="/games" className="btn-secondary flex-1 no-underline">Back to Games</Link>
            <button onClick={() => window.location.reload()} className="btn-primary flex-1">Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  const puzzle = puzzles[currentPuzzle];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/games" className="text-foreground/50 hover:text-foreground no-underline">←</Link>
          <span className="font-bold">🔤 Word Builder</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-xp">{score} pts</span>
          <span className="text-sm text-foreground/50">{currentPuzzle + 1}/{puzzles.length}</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Progress */}
          <div className="xp-bar-track mb-8">
            <div className="xp-bar-fill" style={{ width: `${((currentPuzzle) / puzzles.length) * 100}%` }} />
          </div>

          <div className="card card-glow text-center animate-scale-in">
            <div className="text-xs text-foreground/50 uppercase tracking-wider mb-2">
              {puzzle?.type === "anagram" ? "Unscramble the Word" : "Fill in the Blank"}
            </div>

            {puzzle?.type === "anagram" ? (
              <div className="text-4xl font-extrabold tracking-widest mb-6 text-primary-500 animate-float">
                {puzzle.scrambled}
              </div>
            ) : (
              <div className="text-xl font-medium mb-6 leading-relaxed">
                {puzzle?.sentence || puzzle?.question || puzzle?.text || "Fill in the missing word: ___"}
              </div>
            )}

            <div className="mb-4">
              <input
                className="input text-center text-lg font-bold"
                placeholder="Type your answer..."
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !showResult && checkAnswer()}
                disabled={showResult}
                autoFocus
              />
            </div>

            {!showHint && !showResult && (
              <button onClick={() => setShowHint(true)} className="text-sm text-primary-500 hover:text-primary-600 mb-4 bg-transparent border-none cursor-pointer">
                💡 Need a hint?
              </button>
            )}

            {showHint && !showResult && (
              <div className="text-sm text-foreground/50 mb-4 p-2 rounded-lg bg-primary-500/5">
                💡 {puzzle?.hint}
              </div>
            )}

            {showResult && (
              <div className={`p-4 rounded-xl mb-4 animate-scale-in ${isCorrect ? "bg-success-500/10 border border-success-500/30" : "bg-accent-500/10 border border-accent-500/30"}`}>
                <div className="text-2xl mb-1">{isCorrect ? "🎉 Correct!" : "❌ Not quite"}</div>
                {!isCorrect && <div className="text-sm text-foreground/60">Answer: <strong>{puzzle?.answer}</strong></div>}
                {isCorrect && <div className="text-sm font-bold text-xp">+{puzzle?.points} points!</div>}
              </div>
            )}

            <div className="flex gap-3">
              {!showResult ? (
                <button onClick={checkAnswer} className="btn-primary flex-1" disabled={!userAnswer.trim()}>
                  Check Answer ✓
                </button>
              ) : (
                <button onClick={nextPuzzle} className="btn-primary flex-1">
                  {currentPuzzle + 1 >= puzzles.length ? "See Results 🏆" : "Next Puzzle →"}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
