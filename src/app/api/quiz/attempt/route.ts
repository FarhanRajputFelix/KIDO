import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { calculateLevel } from "@/lib/utils";

// POST /api/quiz/attempt - submit a quiz attempt
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { childId, quizId, answers, timeTaken } = await req.json();

    if (!childId || !quizId || !answers) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get the quiz to score
    const quiz = await prisma.quiz.findUnique({ where: { id: quizId } });
    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const questions = JSON.parse(quiz.questions);
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        score++;
      }
    }

    const percentage = Math.round((score / questions.length) * 100);

    // Calculate XP based on score and difficulty
    const difficultyMultiplier =
      quiz.difficulty === "hard" ? 1.5 : quiz.difficulty === "easy" ? 0.75 : 1;
    const xpEarned = Math.round(
      quiz.xpReward * (percentage / 100) * difficultyMultiplier
    );

    // Create the attempt record
    const attempt = await prisma.quizAttempt.create({
      data: {
        childId,
        quizId,
        score,
        totalQuestions: questions.length,
        answers: JSON.stringify(answers),
        timeTaken: timeTaken || null,
        difficulty: quiz.difficulty,
        xpEarned,
      },
    });

    // Update child stats
    const child = await prisma.child.findUnique({ where: { id: childId } });
    if (child) {
      const newXP = child.xp + xpEarned;
      const newLevel = calculateLevel(newXP);

      // Update streak
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      let newStreak = child.streak;
      if (child.lastActiveDate === yesterday) {
        newStreak = child.streak + 1;
      } else if (child.lastActiveDate !== today) {
        newStreak = 1;
      }

      const newLongestStreak = Math.max(child.longestStreak, newStreak);

      // Check for new badges
      const currentBadges = JSON.parse(child.badges);
      const isPerfect = score === questions.length;

      await prisma.child.update({
        where: { id: childId },
        data: {
          xp: newXP,
          level: newLevel,
          streak: newStreak,
          longestStreak: newLongestStreak,
          lastActiveDate: today,
          totalQuizzes: child.totalQuizzes + 1,
        },
      });

      // Log activity
      await prisma.activityFeed.create({
        data: {
          childId,
          type: "quiz_completed",
          title: `Completed "${quiz.title}"`,
          description: `Scored ${score}/${questions.length} (${percentage}%)`,
          xpEarned,
          metadata: JSON.stringify({
            quizId,
            score,
            total: questions.length,
            percentage,
            isPerfect,
          }),
        },
      });

      // Level up activity
      if (newLevel > child.level) {
        await prisma.activityFeed.create({
          data: {
            childId,
            type: "level_up",
            title: `Reached Level ${newLevel}! 🎉`,
            description: `Keep learning to reach Level ${newLevel + 1}!`,
            xpEarned: 0,
          },
        });
      }

      return NextResponse.json({
        attempt,
        results: {
          score,
          totalQuestions: questions.length,
          percentage,
          xpEarned,
          newXP,
          newLevel,
          leveledUp: newLevel > child.level,
          streak: newStreak,
          isPerfect,
        },
      });
    }

    return NextResponse.json({ attempt });
  } catch (error) {
    console.error("Quiz attempt error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
