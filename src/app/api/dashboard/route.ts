import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMobileSession } from "@/lib/mobile-auth";

// GET /api/dashboard — Role-based dashboard data
export async function GET(req: NextRequest) {
  try {
    const session = await getMobileSession(req);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userRole = (session.user as any).role;

    // ─── Admin Dashboard ───────────────────────────────
    if (userRole === "admin") {
      const [totalUsers, totalChildren, totalQuizzes, totalContent, recentUsers] = await Promise.all([
        prisma.user.count(),
        prisma.child.count(),
        prisma.quiz.count(),
        prisma.content.count(),
        prisma.user.findMany({
          orderBy: { createdAt: "desc" },
          take: 10,
          select: { id: true, name: true, email: true, role: true, avatar: true, createdAt: true },
        }),
      ]);

      const teachers = await prisma.user.findMany({
        where: { role: "teacher" },
        select: { id: true, name: true, email: true, avatar: true, createdAt: true },
      });

      const classrooms = await prisma.classroom.findMany({
        include: { teacher: { select: { name: true } } },
      });

      const allChildren = await prisma.child.findMany({
        take: 20,
        orderBy: { xp: "desc" },
        include: { parent: { select: { name: true, email: true } } },
      });

      return NextResponse.json({
        role: "admin",
        stats: { totalUsers, totalChildren, totalQuizzes, totalContent, totalTeachers: teachers.length, totalClassrooms: classrooms.length },
        recentUsers,
        teachers,
        classrooms,
        topStudents: allChildren,
      });
    }

    // ─── Teacher Dashboard ─────────────────────────────
    if (userRole === "teacher") {
      const classrooms = await prisma.classroom.findMany({
        where: { teacherId: userId },
        include: { lessons: true },
      });

      // Get all students in teacher's classrooms
      const allStudentIds: string[] = [];
      for (const c of classrooms) {
        const ids = JSON.parse(c.studentIds) as string[];
        allStudentIds.push(...ids);
      }

      const uniqueStudentIds = [...new Set(allStudentIds)];
      const students = await prisma.child.findMany({
        where: { id: { in: uniqueStudentIds } },
        include: {
          quizAttempts: {
            orderBy: { completedAt: "desc" },
            take: 5,
            include: { quiz: { select: { title: true, subject: true } } },
          },
          parent: { select: { name: true, email: true } },
        },
      });

      // Subject performance analysis
      const subjectStats: Record<string, { total: number; correct: number; count: number }> = {};
      for (const student of students) {
        for (const attempt of student.quizAttempts) {
          const subj = attempt.quiz.subject;
          if (!subjectStats[subj]) subjectStats[subj] = { total: 0, correct: 0, count: 0 };
          subjectStats[subj].total += attempt.totalQuestions;
          subjectStats[subj].correct += attempt.score;
          subjectStats[subj].count += 1;
        }
      }

      return NextResponse.json({
        role: "teacher",
        classrooms,
        students,
        subjectStats,
        stats: {
          totalStudents: students.length,
          totalClassrooms: classrooms.length,
          avgScore: students.length > 0
            ? Math.round(students.reduce((sum, s) => sum + s.quizAttempts.reduce((a, q) => a + (q.score / q.totalQuestions) * 100, 0) / Math.max(1, s.quizAttempts.length), 0) / students.length)
            : 0,
        },
      });
    }

    // ─── Parent Dashboard ──────────────────────────────
    if (userRole === "parent") {
      const children = await prisma.child.findMany({
        where: { parentId: userId },
        include: {
          quizAttempts: { orderBy: { completedAt: "desc" }, take: 10 },
          watchLogs: { orderBy: { watchedAt: "desc" }, take: 5 },
          activities: { orderBy: { createdAt: "desc" }, take: 10 },
          alerts: { where: { isRead: false }, orderBy: { createdAt: "desc" } },
          sentFriendRequests: { include: { toChild: true } },
          receivedFriendRequests: { include: { fromChild: true } },
          screenTimeLogs: { orderBy: { date: "desc" }, take: 7 },
          progressReports: { orderBy: { generatedAt: "desc" }, take: 3 },
        },
      });

      const totalXP = children.reduce((sum, c) => sum + c.xp, 0);
      const totalQuizzes = children.reduce((sum, c) => sum + c.totalQuizzes, 0);
      const avgStreak = children.length
        ? Math.round(children.reduce((sum, c) => sum + c.streak, 0) / children.length)
        : 0;
      const unreadAlerts = children.reduce((sum, c) => sum + c.alerts.length, 0);

      // Friend requests awaiting this parent's approval (any pending request
      // involving one of their children).
      const pendingFriendApprovals = children.flatMap(child => [
        ...child.sentFriendRequests.filter(r => !r.parentApproved && r.status !== "rejected"),
        ...child.receivedFriendRequests.filter(r => !r.parentApproved && r.status !== "rejected"),
      ]);

      // Classroom enrollments awaiting this parent's approval.
      const childIds = children.map(c => c.id);
      const childNameById: Record<string, string> = Object.fromEntries(children.map(c => [c.id, c.name]));
      const allClassrooms = await prisma.classroom.findMany({
        include: { teacher: { select: { name: true } } },
      });
      const safeIds = (s: string) => { try { return JSON.parse(s) as string[]; } catch { return []; } };
      const pendingClassroomApprovals = allClassrooms.flatMap(cls =>
        safeIds(cls.pendingStudentIds)
          .filter(cid => childIds.includes(cid))
          .map(cid => ({
            classroomId: cls.id,
            classroomName: cls.name,
            subject: cls.subject,
            teacherName: cls.teacher?.name || "A teacher",
            childId: cid,
            childName: childNameById[cid],
          }))
      );

      return NextResponse.json({
        role: "parent",
        children,
        pendingFriendApprovals,
        pendingClassroomApprovals,
        stats: { totalChildren: children.length, totalXP, totalQuizzes, avgStreak, unreadAlerts },
      });
    }

    // ─── Child/Kid Dashboard ───────────────────────────
    const userRow = await prisma.user.findUnique({ where: { id: userId } });
    const childName = userRow?.name || "";

    const child = await prisma.child.findFirst({
      where: { name: childName },
      include: {
        quizAttempts: {
          orderBy: { completedAt: "desc" },
          take: 10,
          include: { quiz: true },
        },
        activities: { orderBy: { createdAt: "desc" }, take: 15 },
        sentFriendRequests: {
          where: { status: "approved", parentApproved: true },
          include: { toChild: true },
        },
        receivedFriendRequests: {
          where: { status: "approved", parentApproved: true },
          include: { fromChild: true },
        },
        sentChallenges: { include: { challenged: true } },
        receivedChallenges: { include: { challenger: true } },
        screenTimeLogs: { orderBy: { date: "desc" }, take: 1 },
      },
    });

    if (!child) {
      return NextResponse.json({ role: "child", child: null });
    }

    // Get friend details for progress viewing
    const friendIds = [
      ...child.sentFriendRequests.map(r => r.toChildId),
      ...child.receivedFriendRequests.map(r => r.fromChildId),
    ];

    const friendsProgress = friendIds.length > 0
      ? await prisma.child.findMany({
          where: { id: { in: friendIds } },
          select: { id: true, name: true, avatar: true, xp: true, level: true, streak: true, totalQuizzes: true },
        })
      : [];

    return NextResponse.json({
      role: "child",
      child,
      friendsProgress,
      todayScreenTime: child.screenTimeLogs[0] || { minutes: 0 },
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
