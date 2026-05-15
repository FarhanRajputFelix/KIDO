import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

function getModel() {
  return genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
}

// ─── Child Profile for personalization ────────────────
export interface ChildProfile {
  name: string;
  age: number;
  grade: string;
  interests: string[];     // strong subjects = interests
  weakSubjects: string[];
  level: number;
  totalQuizzes: number;
}

// ─── AI Quiz Generator ───────────────────────────────
export async function generateQuiz(
  childProfile: ChildProfile,
  subject: string,
  difficulty?: string
): Promise<{
  title: string;
  subject: string;
  difficulty: string;
  questions: Array<{
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }>;
}> {
  const model = getModel();

  const autoDifficulty = difficulty || (
    childProfile.totalQuizzes > 50 ? "hard" :
    childProfile.totalQuizzes > 20 ? "medium" : "easy"
  );

  const prompt = `You are an educational AI for children. Generate a quiz for a child with this profile:
- Name: ${childProfile.name}
- Age: ${childProfile.age} years old
- Grade: ${childProfile.grade}
- Interests: ${childProfile.interests.join(", ") || "general learning"}
- Areas needing improvement: ${childProfile.weakSubjects.join(", ") || "none identified yet"}
- Current level: ${childProfile.level}
- Quizzes completed: ${childProfile.totalQuizzes}

Generate a ${autoDifficulty} difficulty quiz about "${subject}" with exactly 5 questions.
Make questions age-appropriate for a ${childProfile.age}-year-old in ${childProfile.grade} grade.
If the subject is one of their weak areas, make questions slightly easier to build confidence.
If it's their strength, include 1-2 challenging bonus-style questions.

Return ONLY valid JSON (no markdown, no code blocks):
{
  "title": "Fun quiz title related to the topic",
  "subject": "${subject}",
  "difficulty": "${autoDifficulty}",
  "questions": [
    {
      "question": "Question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Brief kid-friendly explanation of the correct answer"
    }
  ]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(text);
}

// ─── AI Progress Report Generator ────────────────────
export async function generateProgressReport(childData: {
  profile: ChildProfile;
  recentQuizzes: Array<{ subject: string; score: number; total: number; difficulty: string }>;
  totalWatchTime: number;
  streak: number;
  longestStreak: number;
  badges: string[];
}): Promise<{
  content: string;
  interests: string[];
  recommendations: string[];
  strengths: string[];
  weaknesses: string[];
}> {
  const model = getModel();

  const quizSummary = childData.recentQuizzes.map(q =>
    `${q.subject}: ${q.score}/${q.total} (${q.difficulty})`
  ).join("\n");

  const prompt = `You are an educational analyst AI. Generate a comprehensive progress report for a child:

CHILD PROFILE:
- Name: ${childData.profile.name}
- Age: ${childData.profile.age}, Grade: ${childData.profile.grade}
- Level: ${childData.profile.level}, XP Progress
- Current streak: ${childData.streak} days (Best: ${childData.longestStreak})
- Total quizzes: ${childData.profile.totalQuizzes}
- Watch time: ${childData.totalWatchTime} minutes
- Badges earned: ${childData.badges.join(", ") || "none yet"}
- Strong subjects: ${childData.profile.interests.join(", ") || "exploring"}
- Weak subjects: ${childData.profile.weakSubjects.join(", ") || "none identified"}

RECENT QUIZ RESULTS:
${quizSummary || "No recent quizzes"}

Generate a detailed, encouraging progress report. Include:
1. Overall performance summary
2. Detected interests and learning patterns
3. Subject-by-subject analysis
4. Personalized recommendations for improvement
5. Encouragement and next milestones

Return ONLY valid JSON (no markdown, no code blocks):
{
  "content": "Full narrative report in markdown format (use headers, bullet points, emojis)",
  "interests": ["detected interest 1", "detected interest 2"],
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["area for improvement 1"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(text);
}

// ─── AI Chatbot ──────────────────────────────────────
export async function chatWithStudent(
  messages: Array<{ role: string; content: string }>,
  childProfile: ChildProfile
): Promise<string> {
  const model = getModel();

  const systemContext = `You are KIDO AI, a friendly, encouraging educational assistant for children.
You are chatting with ${childProfile.name}, who is ${childProfile.age} years old and in ${childProfile.grade} grade.
Their interests include: ${childProfile.interests.join(", ") || "various subjects"}.
They need help with: ${childProfile.weakSubjects.join(", ") || "general learning"}.

RULES:
- Use age-appropriate language for a ${childProfile.age}-year-old
- Be enthusiastic, encouraging, and patient
- Use emojis to make responses fun 🎉
- When explaining concepts, use analogies kids can relate to
- Provide step-by-step tutoring. If they are stuck on a topic, DO NOT just give the answer. Guide them, teach them step-by-step!
- IMPORTANT: When they struggle or want to learn a new topic, show them a video! Format it exactly as: [Watch video: X](https://www.youtube.com/results?search_query=educational+video+for+kids+about+X)
- IMPORTANT: Provide a drawing or visual representation when helpful using emojis or simple text diagrams. Make it colorful and kid-friendly if possible.
- If they ask about math, show step-by-step solutions
- If they ask about science, include fun facts
- For coding questions, show simple code examples
- Keep responses engaging but thorough
- Never use complex jargon without explanation
- Encourage curiosity and further exploration`;

  const conversationHistory = messages.map(m => 
    `${m.role === "user" ? childProfile.name : "KIDO AI"}: ${m.content}`
  ).join("\n\n");

  const prompt = `${systemContext}\n\nConversation so far:\n${conversationHistory}\n\nRespond to the latest message as KIDO AI. Use markdown formatting for rich responses (headers, bold, code blocks, lists, etc).`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

// ─── AI Game Challenge Generator ─────────────────────
export async function generateGameChallenge(
  gameType: "word-builder" | "story-creator" | "math-arena",
  childProfile: ChildProfile,
  context?: string
): Promise<any> {
  const model = getModel();

  const prompts: Record<string, string> = {
    "word-builder": `You are a highly creative word game AI for kids. Create a UNIQUE word puzzle for ${childProfile.name} (age ${childProfile.age}, ${childProfile.grade} grade).
Their interests: ${childProfile.interests.join(", ") || "general"}.

CRITICAL INSTRUCTION: GENERATE COMPLETELY NEW QUESTIONS EVERY TIME. DO NOT USE THE EXAMPLES AS FINAL OUTPUT. Be extremely creative and match their interests.

Return ONLY valid JSON (no markdown):
{
  "type": "word-builder",
  "challenge": {
    "title": "Fun unique title",
    "instructions": "Clear kid-friendly instructions",
    "puzzles": [
      {
        "type": "anagram",
        "scrambled": "SCRAMBLED_WORD", 
        "answer": "WORD",
        "hint": "A helpful hint",
        "points": 10
      },
      {
        "type": "fill-blank",
        "question": "The sentence with a blank here: ___ .",
        "answer": "Answer",
        "hint": "Hint here",
        "points": 10
      }
    ],
    "totalPoints": 50,
    "xpReward": 30
  }
}
Important: Make sure to provide 5 puzzles. Make them 100% unique! Use the exact keys shown (like "question" for fill-blank)!`,

    "story-creator": `You are a creative story AI for kids. Create a story prompt for ${childProfile.name} (age ${childProfile.age}, ${childProfile.grade} grade).
Their interests: ${childProfile.interests.join(", ") || "adventure"}.
${context ? `Continue this story: ${context}` : "Start a new story."}

Return ONLY valid JSON (no markdown):
{
  "type": "story-creator",
  "challenge": {
    "title": "Story title",
    "storyPart": "${context ? "The NEXT 2-3 paragraphs. DO NOT repeat the old story." : "An engaging 2-3 paragraph story opening themed around their interests..."}",
    "prompt": "What should happen next? Choose one or write your own!",
    "choices": [
      "Choice A - exciting option",
      "Choice B - mysterious option",
      "Choice C - funny option"
    ],
    "vocabulary": ["word1", "word2"],
    "writingTip": "A helpful writing tip",
    "xpReward": 25
  }
}
CRITICAL: You MUST use the exact key "storyPart" for the story text. Do not use any other key.`,

    "math-arena": `You are a math game AI for kids. Create math challenges for ${childProfile.name} (age ${childProfile.age}, ${childProfile.grade} grade).
Their math level based on grade: ${childProfile.grade}.

Return ONLY valid JSON (no markdown):
{
  "type": "math-arena",
  "challenge": {
    "title": "Fun math challenge title",
    "timeLimit": 60,
    "problems": [
      {
        "question": "Math problem text",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "points": 10,
        "difficulty": "easy"
      },
      {
        "question": "Harder math problem",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 1,
        "points": 15,
        "difficulty": "medium"
      },
      {
        "question": "Even harder problem",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 2,
        "points": 20,
        "difficulty": "medium"
      },
      {
        "question": "Challenge problem",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 0,
        "points": 25,
        "difficulty": "hard"
      },
      {
        "question": "Bonus problem",
        "options": ["A", "B", "C", "D"],
        "correctAnswer": 3,
        "points": 30,
        "difficulty": "hard"
      }
    ],
    "totalPoints": 100,
    "xpReward": 40
  }
}
Include problems appropriate for ${childProfile.grade} grade. 
Progressive difficulty from easy to hard. Include word problems, arithmetic, and logic.`
  };

  const result = await model.generateContent(prompts[gameType]);
  const text = result.response.text().replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  return JSON.parse(text);
}
