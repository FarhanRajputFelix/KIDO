"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Problem {
  question: string;
  text?: string;
  options: string[];
  correctAnswer: number;
  points: number;
  difficulty: string;
}

export default function MathArenaGame() {
  const { status } = useSession();
  const [gameData, setGameData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/dashboard")
        .then(r => r.json())
        .then(d => {
          const child = d.child || d.children?.[0];
          if (child) {
            fetch("/api/ai/game", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ childId: child.id, gameType: "math-arena" }),
            })
              .then(r => r.json())
              .then(g => {
                setGameData(g.game);
                setTimeLeft(g.game?.challenge?.timeLimit || 60);
                setLoading(false);
                setIsRunning(true);
              })
              .catch(() => setLoading(false));
          }
        });
    }
  }, [status]);

  // Timer
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setGameOver(true);
      setIsRunning(false);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [timeLeft, isRunning]);

  const problems: Problem[] = gameData?.challenge?.problems || gameData?.challenge?.questions || [];

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
    const correct = index === problems[currentProblem].correctAnswer;
    if (correct) setScore(prev => prev + problems[currentProblem].points);
    setShowResult(true);
  };

  const nextProblem = () => {
    setSelected(null);
    setShowResult(false);
    if (currentProblem + 1 >= problems.length) {
      setGameOver(true);
      setIsRunning(false);
    } else {
      setCurrentProblem(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-float">🧮</div>
          <p className="text-foreground/50 text-lg">AI is creating math challenges...</p>
          <div className="animate-shimmer h-2 w-48 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
    );
  }

  if (!loading && problems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card text-center max-w-sm">
          <div className="text-5xl mb-4 text-accent-500 animate-float">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Oops! Something went wrong.</h2>
          <p className="text-foreground/50 mb-4">The AI got confused and didn&apos;t build the math questions properly.</p>
          <button onClick={() => window.location.reload()} className="btn-primary w-full">Try Again 🔄</button>
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
          <h2 className="text-2xl font-extrabold mb-2">Math Arena Complete!</h2>
          <div className="stat-value text-4xl mb-2">{score} / {total}</div>
          <p className="text-foreground/50 mb-2">Points earned</p>
          {timeLeft > 0 && <p className="text-sm text-success-500 mb-4">⏱️ {timeLeft}s remaining!</p>}
          <div className="text-sm font-bold text-xp mb-6">+{gameData?.challenge?.xpReward || 40} XP Earned! 🎉</div>
          <div className="flex gap-3">
            <Link href="/games" className="btn-secondary flex-1 no-underline">Back to Games</Link>
            <button onClick={() => window.location.reload()} className="btn-primary flex-1">Play Again</button>
          </div>
        </div>
      </div>
    );
  }

  const problem = problems[currentProblem];
  const timerPercentage = (timeLeft / (gameData?.challenge?.timeLimit || 60)) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-3 border-b border-[var(--card-border)] bg-[var(--card)]" style={{ height: "var(--nav-height)" }}>
        <div className="flex items-center gap-4">
          <Link href="/games" className="text-foreground/50 hover:text-foreground no-underline">←</Link>
          <span className="font-bold">🧮 Math Arena</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-xp">{score} pts</span>
          <div className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold text-sm ${timeLeft <= 10 ? "bg-accent-500/10 text-accent-500 animate-pulse-glow" : "bg-primary-500/10 text-primary-500"}`}>
            ⏱️ {timeLeft}s
          </div>
          <span className="text-sm text-foreground/50">{currentProblem + 1}/{problems.length}</span>
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full">
          {/* Timer Bar */}
          <div className="h-2 rounded-full bg-[var(--card-border)] mb-8">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${timerPercentage}%`,
                background: timerPercentage <= 25 ? "#f43f5e" : timerPercentage <= 50 ? "#f59e0b" : "#8b5cf6",
              }}
            />
          </div>

          {/* Problem Card */}
          <div className="card text-center animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase ${
                problem?.difficulty === "hard" ? "bg-accent-500/10 text-accent-500" :
                problem?.difficulty === "medium" ? "bg-warning-500/10 text-warning-500" :
                "bg-success-500/10 text-success-500"
              }`}>
                {problem?.difficulty}
              </span>
              <span className="text-sm font-bold text-xp">{problem?.points} pts</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">{problem?.question || problem?.text || "Solve the problem shown below!"}</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {problem?.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  disabled={showResult}
                  className={`quiz-option justify-center text-center ${
                    showResult
                      ? i === problem.correctAnswer
                        ? "correct"
                        : i === selected
                        ? "incorrect"
                        : ""
                      : selected === i
                      ? "selected"
                      : ""
                  }`}
                >
                  <span className="font-bold">{option}</span>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="animate-scale-in mb-4">
                <p className={`text-lg font-bold ${selected === problem?.correctAnswer ? "text-success-500" : "text-accent-500"}`}>
                  {selected === problem?.correctAnswer ? "🎉 Correct!" : `❌ Answer: ${problem?.options[problem.correctAnswer]}`}
                </p>
              </div>
            )}

            {showResult && (
              <button onClick={nextProblem} className="btn-primary w-full">
                {currentProblem + 1 >= problems.length ? "See Results 🏆" : "Next Problem →"}
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
