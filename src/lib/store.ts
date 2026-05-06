import { create } from "zustand";

interface AppState {
  // Current user session info (client-side)
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  setUser: (user: AppState["user"]) => void;

  // Active child (for parent dashboards)
  activeChildId: string | null;
  setActiveChildId: (id: string | null) => void;

  // Quiz state
  currentQuiz: {
    quizId: string;
    currentQuestion: number;
    answers: number[];
    startTime: number;
  } | null;
  startQuiz: (quizId: string) => void;
  answerQuestion: (answerIndex: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;

  // UI state
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  activeChildId: null,
  setActiveChildId: (id) => set({ activeChildId: id }),

  currentQuiz: null,
  startQuiz: (quizId) =>
    set({
      currentQuiz: {
        quizId,
        currentQuestion: 0,
        answers: [],
        startTime: Date.now(),
      },
    }),
  answerQuestion: (answerIndex) =>
    set((state) => ({
      currentQuiz: state.currentQuiz
        ? {
            ...state.currentQuiz,
            answers: [...state.currentQuiz.answers, answerIndex],
          }
        : null,
    })),
  nextQuestion: () =>
    set((state) => ({
      currentQuiz: state.currentQuiz
        ? {
            ...state.currentQuiz,
            currentQuestion: state.currentQuiz.currentQuestion + 1,
          }
        : null,
    })),
  resetQuiz: () => set({ currentQuiz: null }),

  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
