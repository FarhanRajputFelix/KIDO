import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding KIDO database...");

  // Clean existing data
  await prisma.chatMessage.deleteMany();
  await prisma.screenTimeLog.deleteMany();
  await prisma.progressReport.deleteMany();
  await prisma.activityFeed.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.watchLog.deleteMany();
  await prisma.parentAlert.deleteMany();
  await prisma.friendRequest.deleteMany();
  await prisma.peerChallenge.deleteMany();
  await prisma.message.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.classroom.deleteMany();
  await prisma.child.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.content.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 12);

  // Create admin user
  const admin = await prisma.user.create({
    data: { email: "admin@kido.com", password, name: "Admin User", role: "admin", avatar: "🛡️" },
  });

  // Create parent user
  const parent = await prisma.user.create({
    data: { email: "parent@kido.com", password, name: "Sara Ahmed", role: "parent", avatar: "👩" },
  });

  // Create teacher user
  const teacher = await prisma.user.create({
    data: { email: "teacher@kido.com", password, name: "Mr. Johnson", role: "teacher", avatar: "👨‍🏫" },
  });

  // Create child user account (for direct kid login)
  const childUser = await prisma.user.create({
    data: { email: "aiza@kido.com", password, name: "Aiza", role: "child", avatar: "🦊" },
  });

  console.log("✅ Users created (admin, parent, teacher, child)");

  // Create children
  const child1 = await prisma.child.create({
    data: {
      name: "Aiza", age: 10, grade: "5th", avatar: "🦊",
      xp: 2750, level: 6, streak: 12, longestStreak: 18,
      lastActiveDate: new Date().toISOString().split("T")[0],
      totalQuizzes: 47, totalWatchTime: 1800,
      badges: JSON.stringify(["first_quiz", "quiz_master", "streak_7", "level_5", "video_watcher"]),
      weakSubjects: JSON.stringify(["history"]),
      strongSubjects: JSON.stringify(["math", "science"]),
      parentId: parent.id,
    },
  });

  const child2 = await prisma.child.create({
    data: {
      name: "Ali", age: 8, grade: "3rd", avatar: "🐼",
      xp: 1200, level: 3, streak: 5, longestStreak: 9,
      lastActiveDate: new Date().toISOString().split("T")[0],
      totalQuizzes: 22, totalWatchTime: 900,
      badges: JSON.stringify(["first_quiz", "streak_7"]),
      weakSubjects: JSON.stringify(["english"]),
      strongSubjects: JSON.stringify(["science", "coding"]),
      parentId: parent.id,
    },
  });

  const child3 = await prisma.child.create({
    data: {
      name: "Zara", age: 12, grade: "7th", avatar: "🦋",
      xp: 4100, level: 9, streak: 24, longestStreak: 30,
      lastActiveDate: new Date().toISOString().split("T")[0],
      totalQuizzes: 89, totalWatchTime: 3600,
      badges: JSON.stringify(["first_quiz", "quiz_master", "perfect_score", "streak_7", "streak_30", "level_5", "video_watcher", "math_whiz"]),
      weakSubjects: JSON.stringify([]),
      strongSubjects: JSON.stringify(["math", "science", "english", "coding"]),
      parentId: parent.id,
    },
  });

  // Also link child user to child1 for direct login
  // (child user's parentId = parent.id so dashboard shows data)

  console.log("✅ Children created");

  // Create quizzes
  const quizzes = await Promise.all([
    prisma.quiz.create({
      data: {
        title: "Solar System Explorer", subject: "science", difficulty: "medium",
        xpReward: 50, timeLimit: 120, ageMin: 8, ageMax: 14,
        questions: JSON.stringify([
          { question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], correctAnswer: 1, explanation: "Mercury is the closest planet to the Sun." },
          { question: "What is the largest planet in our solar system?", options: ["Saturn", "Neptune", "Jupiter", "Uranus"], correctAnswer: 2, explanation: "Jupiter is the largest planet." },
          { question: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correctAnswer: 1, explanation: "There are 8 planets in our solar system." },
          { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correctAnswer: 2, explanation: "Mars is called the Red Planet due to its reddish appearance." },
          { question: "What is the hottest planet?", options: ["Mercury", "Venus", "Mars", "Jupiter"], correctAnswer: 1, explanation: "Venus is the hottest due to its thick atmosphere." },
        ]),
      },
    }),
    prisma.quiz.create({
      data: {
        title: "Math Multiplication Challenge", subject: "math", difficulty: "easy",
        xpReward: 40, timeLimit: 90, ageMin: 6, ageMax: 10,
        questions: JSON.stringify([
          { question: "What is 6 × 7?", options: ["36", "42", "48", "54"], correctAnswer: 1, explanation: "6 × 7 = 42" },
          { question: "What is 8 × 9?", options: ["63", "72", "81", "64"], correctAnswer: 1, explanation: "8 × 9 = 72" },
          { question: "What is 12 × 5?", options: ["55", "60", "65", "50"], correctAnswer: 1, explanation: "12 × 5 = 60" },
          { question: "What is 9 × 9?", options: ["72", "81", "90", "99"], correctAnswer: 1, explanation: "9 × 9 = 81" },
          { question: "What is 7 × 8?", options: ["54", "56", "58", "52"], correctAnswer: 1, explanation: "7 × 8 = 56" },
        ]),
      },
    }),
    prisma.quiz.create({
      data: {
        title: "World Geography Quiz", subject: "geography", difficulty: "medium",
        xpReward: 50, timeLimit: 150, ageMin: 10, ageMax: 14,
        questions: JSON.stringify([
          { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: 1, explanation: "The Nile is about 6,650 km long." },
          { question: "Which continent is the largest?", options: ["Africa", "North America", "Asia", "Europe"], correctAnswer: 2, explanation: "Asia is the largest continent." },
          { question: "What is the capital of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], correctAnswer: 2, explanation: "Tokyo is Japan's capital city." },
          { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3, explanation: "The Pacific Ocean is the largest ocean." },
          { question: "What country has the most people?", options: ["India", "USA", "China", "Indonesia"], correctAnswer: 0, explanation: "India has the world's largest population." },
        ]),
      },
    }),
    prisma.quiz.create({
      data: {
        title: "English Grammar Basics", subject: "english", difficulty: "easy",
        xpReward: 35, timeLimit: 120, ageMin: 6, ageMax: 12,
        questions: JSON.stringify([
          { question: "Which is a noun?", options: ["Run", "Beautiful", "Cat", "Quickly"], correctAnswer: 2, explanation: "Cat is a noun (a person, place, or thing)." },
          { question: "What is the past tense of 'go'?", options: ["Goed", "Went", "Gone", "Going"], correctAnswer: 1, explanation: "'Went' is the past tense of 'go'." },
          { question: "Which sentence is correct?", options: ["She don't like it", "She doesn't like it", "She doesn't likes it", "She don't likes it"], correctAnswer: 1, explanation: "She doesn't like it is grammatically correct." },
          { question: "What is a verb?", options: ["A person", "An action word", "A describing word", "A place"], correctAnswer: 1, explanation: "A verb is an action word." },
          { question: "Choose the correct spelling:", options: ["Beautifull", "Beatiful", "Beautiful", "Beutiful"], correctAnswer: 2, explanation: "Beautiful is the correct spelling." },
        ]),
      },
    }),
    prisma.quiz.create({
      data: {
        title: "Python Programming Basics", subject: "coding", difficulty: "hard",
        xpReward: 75, timeLimit: 180, ageMin: 10, ageMax: 14,
        questions: JSON.stringify([
          { question: "What does 'print()' do in Python?", options: ["Reads input", "Displays output", "Creates variables", "Deletes files"], correctAnswer: 1, explanation: "print() displays output to the screen." },
          { question: "Which is a valid variable name?", options: ["1name", "my-var", "my_var", "class"], correctAnswer: 2, explanation: "my_var uses valid Python naming (underscores, no dashes/numbers first)." },
          { question: "What does 'len()' return?", options: ["The type", "The length", "The sum", "The max"], correctAnswer: 1, explanation: "len() returns the length of an object." },
          { question: "What is a loop?", options: ["A type of variable", "Code that repeats", "A function", "An error"], correctAnswer: 1, explanation: "A loop is code that repeats multiple times." },
          { question: "What symbol is used for comments?", options: ["//", "/*", "#", "--"], correctAnswer: 2, explanation: "# is used for single-line comments in Python." },
        ]),
      },
    }),
    prisma.quiz.create({
      data: {
        title: "Ancient Civilizations", subject: "history", difficulty: "hard",
        xpReward: 70, timeLimit: 180, ageMin: 10, ageMax: 14,
        questions: JSON.stringify([
          { question: "Where were the pyramids built?", options: ["Rome", "Greece", "Egypt", "China"], correctAnswer: 2, explanation: "The famous pyramids were built in Egypt." },
          { question: "Who was the first Roman Emperor?", options: ["Julius Caesar", "Augustus", "Nero", "Caligula"], correctAnswer: 1, explanation: "Augustus was the first Roman Emperor." },
          { question: "What civilization built Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Olmec"], correctAnswer: 2, explanation: "The Inca civilization built Machu Picchu." },
          { question: "The Great Wall was built by which civilization?", options: ["Japanese", "Korean", "Chinese", "Mongolian"], correctAnswer: 2, explanation: "The Great Wall was built by the Chinese." },
          { question: "What is the ancient writing of Egypt called?", options: ["Cuneiform", "Hieroglyphics", "Sanskrit", "Runes"], correctAnswer: 1, explanation: "Egyptian writing is called Hieroglyphics." },
        ]),
      },
    }),
  ]);

  console.log("✅ Quizzes created");

  // Create quiz attempts
  const attempts = [
    { childId: child1.id, quizId: quizzes[0].id, score: 4, totalQuestions: 5, difficulty: "medium", xpEarned: 40 },
    { childId: child1.id, quizId: quizzes[1].id, score: 5, totalQuestions: 5, difficulty: "easy", xpEarned: 40 },
    { childId: child1.id, quizId: quizzes[4].id, score: 3, totalQuestions: 5, difficulty: "hard", xpEarned: 45 },
    { childId: child2.id, quizId: quizzes[1].id, score: 4, totalQuestions: 5, difficulty: "easy", xpEarned: 32 },
    { childId: child2.id, quizId: quizzes[0].id, score: 3, totalQuestions: 5, difficulty: "medium", xpEarned: 30 },
    { childId: child3.id, quizId: quizzes[0].id, score: 5, totalQuestions: 5, difficulty: "medium", xpEarned: 50 },
    { childId: child3.id, quizId: quizzes[4].id, score: 5, totalQuestions: 5, difficulty: "hard", xpEarned: 75 },
    { childId: child3.id, quizId: quizzes[2].id, score: 4, totalQuestions: 5, difficulty: "medium", xpEarned: 40 },
  ];

  for (const a of attempts) {
    await prisma.quizAttempt.create({
      data: { ...a, answers: JSON.stringify([1, 2, 1, 2, 1]), timeTaken: Math.floor(Math.random() * 120) + 30 },
    });
  }

  console.log("✅ Quiz attempts created");

  // Create activity feed
  const activities = [
    { childId: child1.id, type: "quiz_completed", title: 'Completed "Solar System Explorer"', description: "Scored 4/5 (80%)", xpEarned: 40 },
    { childId: child1.id, type: "streak", title: "🔥 12-Day Streak!", description: "Keep it going!", xpEarned: 0 },
    { childId: child1.id, type: "badge_earned", title: 'Earned "Video Explorer" badge', description: "Watched 10 videos", xpEarned: 25 },
    { childId: child2.id, type: "quiz_completed", title: 'Completed "Math Multiplication"', description: "Scored 4/5 (80%)", xpEarned: 32 },
    { childId: child2.id, type: "level_up", title: "Reached Level 3! 🎉", description: "Keep learning!", xpEarned: 0 },
    { childId: child3.id, type: "quiz_completed", title: 'Perfect score on "Solar System"!', description: "Scored 5/5 (100%) 💯", xpEarned: 50 },
    { childId: child3.id, type: "streak", title: "🔥 24-Day Streak!", description: "Amazing dedication!", xpEarned: 0 },
    { childId: child3.id, type: "badge_earned", title: 'Earned "Math Whiz" badge', description: "Completed 10 math quizzes", xpEarned: 25 },
  ];
  for (const a of activities) {
    await prisma.activityFeed.create({ data: a });
  }

  // Create parent alerts (including screen time alert)
  await prisma.parentAlert.createMany({
    data: [
      { childId: child1.id, type: "achievement", title: "Aiza earned a new badge!", message: "Video Explorer badge unlocked", severity: "info" },
      { childId: child2.id, type: "screen_time", title: "⚠️ Ali exceeded screen time limit!", message: "Ali has been active for 145 minutes today (limit: 120 min). Consider taking a break.", severity: "warning" },
      { childId: child2.id, type: "inactivity", title: "Ali hasn't studied today", message: "Encourage Ali to complete a quiz", severity: "warning" },
      { childId: child3.id, type: "achievement", title: "Zara hit a 24-day streak!", message: "Outstanding commitment to learning", severity: "info" },
    ],
  });

  // Create screen time logs
  const today = new Date().toISOString().split("T")[0];
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - i * 86400000);
    return d.toISOString().split("T")[0];
  });

  for (const child of [child1, child2, child3]) {
    for (const day of days) {
      const minutes = Math.floor(Math.random() * 150) + 20;
      await prisma.screenTimeLog.create({
        data: {
          childId: child.id,
          date: day,
          minutes,
          alertTriggered: minutes > 120,
        },
      });
    }
  }

  // Create friend requests
  await prisma.friendRequest.create({
    data: { fromChildId: child1.id, toChildId: child3.id, status: "approved", parentApproved: true },
  });
  await prisma.friendRequest.create({
    data: { fromChildId: child2.id, toChildId: child1.id, status: "pending", parentApproved: false },
  });

  // Create badges
  await prisma.badge.createMany({
    data: [
      { name: "First Quiz", description: "Complete your first quiz", icon: "🎯", category: "quiz", requirement: JSON.stringify({ type: "quizzes", value: 1 }), xpReward: 25 },
      { name: "Quiz Master", description: "Complete 50 quizzes", icon: "🏆", category: "quiz", requirement: JSON.stringify({ type: "quizzes", value: 50 }), xpReward: 100 },
      { name: "Perfect Score", description: "Get 100% on any quiz", icon: "💯", category: "quiz", requirement: JSON.stringify({ type: "perfect_score", value: 1 }), xpReward: 50 },
      { name: "Week Warrior", description: "7-day streak", icon: "🔥", category: "streak", requirement: JSON.stringify({ type: "streak", value: 7 }), xpReward: 50 },
      { name: "Monthly Master", description: "30-day streak", icon: "⚡", category: "streak", requirement: JSON.stringify({ type: "streak", value: 30 }), xpReward: 150 },
      { name: "Rising Star", description: "Reach Level 5", icon: "⭐", category: "learning", requirement: JSON.stringify({ type: "level", value: 5 }), xpReward: 75 },
      { name: "Video Explorer", description: "Watch 10 videos", icon: "📺", category: "learning", requirement: JSON.stringify({ type: "videos", value: 10 }), xpReward: 50 },
      { name: "Math Whiz", description: "Complete 10 math quizzes", icon: "🧮", category: "learning", requirement: JSON.stringify({ type: "subject_quizzes", value: 10 }), xpReward: 75 },
    ],
  });

  // Create classroom
  await prisma.classroom.create({
    data: {
      name: "5th Grade Science",
      subject: "science",
      joinCode: "SCI5TH",
      grade: "5th",
      teacherId: teacher.id,
      studentIds: JSON.stringify([child1.id, child3.id]),
    },
  });

  await prisma.classroom.create({
    data: {
      name: "3rd Grade Math",
      subject: "math",
      joinCode: "MTH3RD",
      grade: "3rd",
      teacherId: teacher.id,
      studentIds: JSON.stringify([child2.id]),
    },
  });

  console.log("✅ All seed data created");
  console.log("\n🎉 Seeding complete!");
  console.log("\n📧 Login credentials:");
  console.log("   Admin:   admin@kido.com / password123");
  console.log("   Parent:  parent@kido.com / password123");
  console.log("   Teacher: teacher@kido.com / password123");
  console.log("   Kid:     aiza@kido.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
