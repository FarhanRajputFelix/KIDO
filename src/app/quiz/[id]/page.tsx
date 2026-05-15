"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizData {
  id: string;
  title: string;
  subject: string;
  difficulty: string;
  xpReward: number;
  timeLimit: number;
  questions: Question[];
}

interface Results {
  score: number;
  totalQuestions: number;
  percentage: number;
  xpEarned: number;
  newLevel: number;
  leveledUp: boolean;
  streak: number;
  isPerfect: boolean;
}

export default function QuizPlayPage() {
  const params = useParams();
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [childId, setChildId] = useState<string | null>(null);

  // Fetch quiz data
  useEffect(() => {
    fetch(`/api/quiz`)
      .then((r) => r.json())
      .then((d) => {
        const found = d.quizzes?.find((q: QuizData) => q.id === params.id);
        if (found) {
          setQuiz(found);
          setTimeLeft(found.timeLimit || 300);
        }
      });
  }, [params.id]);

  // Get valid child ID
  useEffect(() => {
    if (session?.user) {
      fetch("/api/dashboard")
        .then((r) => r.json())
        .then((d) => {
          const child = d.child || d.children?.[0];
          if (child) setChildId(child.id);
        });
    }
  }, [session]);

  // Timer
  useEffect(() => {
    if (!started || showResult || submitting) return;
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const t = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, timeLeft, showResult, submitting]);

  const handleSubmit = useCallback(async () => {
    if (!quiz || !childId || submitting) return;
    setSubmitting(true);

    const finalAnswers = [...answers];
    if (selectedAnswer !== null) {
      finalAnswers.push(selectedAnswer);
    }
    // Pad remaining unanswered
    while (finalAnswers.length < quiz.questions.length) {
      finalAnswers.push(-1);
    }

    try {
      const res = await fetch("/api/quiz/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          quizId: quiz.id,
          answers: finalAnswers,
          timeTaken: (quiz.timeLimit || 300) - timeLeft,
        }),
      });
      const data = await res.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (e) {
      console.error("Submit error:", e);
    }

    setShowResult(true);
    setSubmitting(false);
  }, [quiz, childId, answers, selectedAnswer, submitting, timeLeft]);

  const handleNext = () => {
    if (selectedAnswer === null) return;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQ + 1 >= (quiz?.questions.length || 0)) {
      // Submit using newAnswers directly
      if (!quiz || !childId || submitting) return;
      setSubmitting(true);
      const finalAnswers = [...newAnswers];
      while (finalAnswers.length < quiz.questions.length) {
        finalAnswers.push(-1);
      }
      fetch("/api/quiz/attempt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childId,
          quizId: quiz.id,
          answers: finalAnswers,
          timeTaken: (quiz.timeLimit || 300) - timeLeft,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.results) setResults(data.results);
          setShowResult(true);
          setSubmitting(false);
        })
        .catch(() => {
          setShowResult(true);
          setSubmitting(false);
        });
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-float">🎯</div>
      </div>
    );
  }

  // Results Screen
  if (showResult) {
    const percentage = results?.percentage ?? 0;
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center animate-scale-in">
          <div className="text-6xl mb-4 animate-bounce-in">
            {percentage >= 80 ? "🎉" : percentage >= 50 ? "👍" : "💪"}
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {percentage >= 80 ? "Excellent!" : percentage >= 50 ? "Good Job!" : "Keep Learning!"}
          </h1>
          <p className="text-foreground/50 mb-6">{quiz.title}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-[var(--background)]">
              <div className="stat-value text-xl">{results?.score ?? 0}/{results?.totalQuestions ?? quiz.questions.length}</div>
              <div className="text-xs text-foreground/50 mt-1">Score</div>
            </div>
            <div className="p-4 rounded-xl bg-[var(--background)]">
              <div className="stat-value text-xl">{percentage}%</div>
              <div className="text-xs text-foreground/50 mt-1">Accuracy</div>
            </div>
            <div className="p-4 rounded-xl bg-[var(--background)]">
              <div className="text-xl font-bold text-xp">+{results?.xpEarned ?? 0}</div>
              <div className="text-xs text-foreground/50 mt-1">XP Earned</div>
            </div>
            <div className="p-4 rounded-xl bg-[var(--background)]">
              <div className="text-xl font-bold">🔥 {results?.streak ?? 0}</div>
              <div className="text-xs text-foreground/50 mt-1">Streak</div>
            </div>
          </div>

          {results?.leveledUp && (
            <div className="p-4 rounded-xl bg-primary-500/10 border border-primary-500/20 mb-6 animate-bounce-in">
              <div className="text-2xl mb-1">⬆️</div>
              <div className="font-bold text-primary-500">Level Up! You&apos;re now Level {results.newLevel}!</div>
            </div>
          )}

          {results?.isPerfect && (
            <div className="p-4 rounded-xl bg-xp/10 border border-xp/20 mb-6 animate-bounce-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-2xl mb-1">💯</div>
              <div className="font-bold text-xp-glow">Perfect Score!</div>
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/quiz" className="btn-secondary flex-1 no-underline">More Quizzes</Link>
            <Link href="/dashboard" className="btn-primary flex-1 no-underline">Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  // Start Screen
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full text-center animate-scale-in">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-foreground/50 mb-6 capitalize">
            {quiz.subject} · {quiz.difficulty} · {quiz.questions.length} questions
          </p>
          <div className="flex items-center justify-center gap-6 mb-8 text-sm">
            <div className="text-center">
              <div className="text-xl font-bold text-xp">+{quiz.xpReward}</div>
              <div className="text-foreground/50">Max XP</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold">⏱ {quiz.timeLimit ? `${Math.round(quiz.timeLimit / 60)}m` : "∞"}</div>
              <div className="text-foreground/50">Time Limit</div>
            </div>
          </div>
          {!childId && (
            <p className="text-sm text-warning-500 mb-4">⚠️ Log in and add a child profile to save progress</p>
          )}
          <button onClick={() => setStarted(true)} className="btn-primary w-full py-3.5">
            Start Quiz 🚀
          </button>
          <Link href="/quiz" className="block mt-3 text-sm text-foreground/50 no-underline hover:text-primary-500">
            ← Back to Quizzes
          </Link>
        </div>
      </div>
    );
  }

  // Quiz Gameplay
  const question = quiz.questions[currentQ];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPct = ((currentQ + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Header */}
      <div className="px-6 py-4 border-b border-[var(--card-border)] bg-[var(--card)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Question {currentQ + 1} of {quiz.questions.length}
          </span>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="px-3 py-1 rounded-lg bg-warning-500/10 text-warning-500 text-xs font-bold hover:bg-warning-500/20 transition-colors"
            >
              End Early ⏹️
            </button>
            <span className={`text-sm font-bold ${timeLeft <= 30 ? "text-accent-500 animate-streak" : ""}`}>
              ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="xp-bar-track h-2">
            <div className="xp-bar-fill h-2" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full animate-slide-up" key={currentQ}>
          <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`quiz-option ${selectedAnswer === idx ? "selected" : ""}`}
              >
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                  style={{
                    background: selectedAnswer === idx ? "#8b5cf6" : "var(--background)",
                    color: selectedAnswer === idx ? "white" : "inherit",
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="btn-primary py-3 px-10"
              style={{ opacity: selectedAnswer === null ? 0.5 : 1 }}
            >
              {currentQ + 1 >= quiz.questions.length ? "Finish Quiz ✨" : "Next Question →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
