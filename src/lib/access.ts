import { prisma } from "@/lib/prisma";
import type { MobileSession } from "@/lib/mobile-auth";

/**
 * Central authorization for child-scoped data.
 *
 * Every API route that accepts a `childId` from the client MUST call this
 * before reading or writing that child's data. Without it, any authenticated
 * account could read/write ANY child's chat, quizzes, reports, etc. by simply
 * passing a different id (the bug that let children/teachers/parents see each
 * other's chats).
 *
 * Access rules:
 *   - admin   → any child
 *   - parent  → only children where child.parentId === user.id
 *   - teacher → only children enrolled in one of the teacher's classrooms
 *   - child   → only their own profile (matched to their login account)
 *
 * Returns the child record if access is allowed, otherwise null.
 */
export async function getAccessibleChild(session: MobileSession, childId: string) {
  if (!session?.user || !childId) return null;

  const userId = session.user.id;
  const role = session.user.role;

  const child = await prisma.child.findUnique({ where: { id: childId } });
  if (!child) return null;

  // Admins can access everything.
  if (role === "admin") return child;

  // Parents own their children directly.
  if (child.parentId === userId) return child;

  // Teachers can access students enrolled in their classrooms.
  if (role === "teacher") {
    const classrooms = await prisma.classroom.findMany({
      where: { teacherId: userId },
      select: { studentIds: true },
    });
    const enrolled = classrooms.some((c) => {
      try {
        return (JSON.parse(c.studentIds) as string[]).includes(childId);
      } catch {
        return false;
      }
    });
    if (enrolled) return child;
  }

  // Child accounts can only reach their own profile. Child logins are matched
  // to a Child record by the account name (legacy design); a parent-owned
  // child is already covered by the parentId check above.
  if (role === "child") {
    const account = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });
    if (account && account.name === child.name) return child;
  }

  return null;
}
