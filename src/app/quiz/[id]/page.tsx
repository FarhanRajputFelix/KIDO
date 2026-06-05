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
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#F8F7FF" }}>
      {/* Stitch-style header: avatar left, question count, timer right */}
      <div className="px-5 py-4 bg-white border-b border-[var(--card-border)]">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🙂</span>
            <div>
              <div className="font-extrabold text-base" style={{ color: "#1a1a2e" }}>
                Hi, {session?.user?.name?.split(" ")[0] || "Learner"}!
              </div>
              <div className="text-xs font-semibold" style={{ color: "#777587" }}>
                QUESTION {currentQ + 1} OF {quiz.questions.length}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm"
                 style={{ background: timeLeft <= 30 ? "#fff0f1" : "#fef9c3", color: timeLeft <= 30 ? "#f43f5e" : "#705d00", boxShadow: "0 2px 0 " + (timeLeft <= 30 ? "#fca5a5" : "#FFD700") }}>
              ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
            <div className="chip chip-purple">🔥 {quiz.xpReward} XP</div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="max-w-xl mx-auto mt-3">
          <div className="w-full h-2.5 rounded-full" style={{ background: "#e8e5ff" }}>
            <div className="h-full rounded-full transition-all duration-500"
                 style={{ width: `${progressPct}%`, background: "linear-gradient(90deg,#6C63FF,#FFD700)" }} />
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="flex-1 flex items-start justify-center px-4 pt-6 pb-24">
        <div className="max-w-xl w-full animate-slide-up" key={currentQ}>
          {/* Golden question number circle + card */}
          <div className="relative mb-6">
            <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-white text-lg absolute -top-5 -left-1 z-10"
                 style={{ background: "#FFD700", color: "#1a1a2e", boxShadow: "0 3px 0 #b8970a" }}>
              {currentQ + 1}
            </div>
            <div className="card pt-10 text-center" style={{ boxShadow: "0 4px 0 #e8e5ff" }}>
              <h2 className="text-xl md:text-2xl font-extrabold" style={{ color: "#1a1a2e" }}>
                {question.question}
              </h2>
            </div>
          </div>

          {/* 2x2 Option Grid - Stitch style */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`quiz-option flex-col gap-2 py-6 ${
                  selectedAnswer === idx ? "selected-active" : ""
                }`}
              >
                <span className="text-2xl font-black">{option}</span>
                <span className="text-xs font-semibold opacity-70">Choice {letters[idx]}</span>
              </button>
            ))}
          </div>

          {/* AI hint bubble */}
          <div className="flex items-start gap-3 mb-6">
            <span className="text-2xl">🤖</span>
            <div className="chat-bubble-ai text-sm">
              &ldquo;You&apos;re doing great! Take your time and think it through! 🚀&rdquo;
            </div>
          </div>

          {/* Next button */}
          <div className="flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className="btn-primary w-14 h-14 rounded-full p-0 text-xl"
              style={{ opacity: selectedAnswer === null ? 0.45 : 1 }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
