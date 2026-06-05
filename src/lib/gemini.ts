import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Current valid Gemini models (as of June 2026)
const MODEL_ORDER = [
  "gemini-2.0-flash",        // Primary — fastest, most capable
  "gemini-2.0-flash-lite",   // Lighter quota limits
  "gemini-1.5-flash-latest", // Stable fallback
];

// Circuit breaker: mark a model as temporarily unavailable
const quotaExhausted = new Map<string, number>();
const CIRCUIT_RESET_MS = 60 * 1000; // 1 minute (quota resets per minute)

async function generateWithFallback(prompt: string): Promise<string> {
  const now = Date.now();
  let lastError: unknown;

  for (const modelName of MODEL_ORDER) {
    const exhaustedAt = quotaExhausted.get(modelName) ?? 0;
    if (now - exhaustedAt < CIRCUIT_RESET_MS) continue;

    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      quotaExhausted.delete(modelName); // Reset on success
      return text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    } catch (err: any) {
      lastError = err;
      const errMsg = err?.message || String(err);
      // Detect quota/rate-limit errors (try next model)
      const isQuota = errMsg.includes("429") || errMsg.includes("quota") ||
                      errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("rate limit") ||
                      err?.status === 429 || err?.httpStatus === 429;
      // Detect deprecated/not found models (permanently skip, do NOT circuit break)
      const isNotFound = errMsg.includes("404") || errMsg.includes("not found") ||
                         errMsg.includes("not supported");

      if (isQuota) {
        console.warn(`[Gemini] ${modelName} quota hit — trying next model`);
        quotaExhausted.set(modelName, now);
      } else if (isNotFound) {
        console.warn(`[Gemini] ${modelName} not found — permanently skipping`);
        quotaExhausted.set(modelName, now + 24 * 60 * 60 * 1000); // Skip for 24h
      } else {
        console.warn(`[Gemini] ${modelName} error:`, errMsg.slice(0, 200));
        quotaExhausted.set(modelName, now);
      }
      continue;
    }
  }

  // All models exhausted — reset circuits for next request
  quotaExhausted.clear();
  throw lastError;
}


// ─── Child Profile for personalization ────────────────
export interface ChildProfile {
  name: string;
  age: number;
  grade: string;
  interests: string[];
  weakSubjects: string[];
  level: number;
  totalQuizzes: number;
}

// ─── Fallback question banks (when all Gemini quota exhausted) ────────────
const QUESTION_BANKS: Record<string, Array<{ question: string; options: string[]; correctAnswer: number; explanation: string }>> = {
  Math: [
    { question: "What is 7 × 8?", options: ["54", "56", "64", "48"], correctAnswer: 1, explanation: "7 × 8 = 56. Think of 7 groups of 8 objects." },
    { question: "What is 144 ÷ 12?", options: ["10", "11", "12", "14"], correctAnswer: 2, explanation: "144 ÷ 12 = 12. It's also 12 squared divided by 12!" },
    { question: "Which is a prime number?", options: ["9", "15", "17", "21"], correctAnswer: 2, explanation: "17 is prime — it can only be divided by 1 and 17." },
    { question: "What is 25% of 80?", options: ["15", "20", "25", "40"], correctAnswer: 1, explanation: "25% means one-quarter. 80 ÷ 4 = 20." },
    { question: "What is the perimeter of a square with side 6?", options: ["12", "18", "24", "36"], correctAnswer: 2, explanation: "Perimeter = 4 × side = 4 × 6 = 24." },
  ],
  Science: [
    { question: "What is the closest star to Earth?", options: ["Alpha Centauri", "Sirius", "The Sun", "Polaris"], correctAnswer: 2, explanation: "The Sun is our nearest star — about 150 million km away!" },
    { question: "What gas do plants absorb to make food?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: 2, explanation: "Plants absorb CO₂ and use sunlight to produce food through photosynthesis." },
    { question: "How many bones does an adult human body have?", options: ["106", "206", "306", "256"], correctAnswer: 1, explanation: "Adults have 206 bones. Babies are born with about 270, which fuse over time." },
    { question: "What is H₂O?", options: ["Salt", "Sugar", "Water", "Acid"], correctAnswer: 2, explanation: "H₂O is the chemical formula for water — 2 hydrogen atoms + 1 oxygen atom." },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], correctAnswer: 2, explanation: "Mars looks red due to iron oxide (rust) on its surface." },
  ],
  English: [
    { question: "What is a synonym for 'happy'?", options: ["Sad", "Angry", "Joyful", "Tired"], correctAnswer: 2, explanation: "Joyful means very happy — a perfect synonym!" },
    { question: "Which word is a noun?", options: ["Run", "Beautiful", "Happiness", "Quickly"], correctAnswer: 2, explanation: "Happiness is a noun — it names a feeling or thing." },
    { question: "What punctuation ends a question?", options: ["Period", "Question mark", "Exclamation mark", "Comma"], correctAnswer: 1, explanation: "A question mark (?) always goes at the end of a question." },
    { question: "What is the plural of 'child'?", options: ["Childs", "Children", "Childes", "Childrens"], correctAnswer: 1, explanation: "Child → Children. It's an irregular plural that doesn't follow the normal -s rule." },
    { question: "Which word is an antonym of 'ancient'?", options: ["Old", "Modern", "Historic", "Wise"], correctAnswer: 1, explanation: "Modern means new/recent — the opposite of ancient." },
  ],
  History: [
    { question: "Who was the first President of the United States?", options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], correctAnswer: 2, explanation: "George Washington became the 1st US President in 1789." },
    { question: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2, explanation: "World War II ended in 1945 — VE Day (May 8) in Europe and VJ Day (Aug 15) in the Pacific." },
    { question: "Which ancient wonder was located in Egypt?", options: ["Hanging Gardens", "Colossus of Rhodes", "Great Pyramid of Giza", "Lighthouse of Alexandria"], correctAnswer: 2, explanation: "The Great Pyramid of Giza is the only ancient wonder still largely intact today." },
    { question: "Who invented the telephone?", options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Benjamin Franklin"], correctAnswer: 2, explanation: "Alexander Graham Bell made the first telephone call on March 10, 1876." },
    { question: "Which civilization built the Machu Picchu?", options: ["Aztec", "Maya", "Inca", "Olmec"], correctAnswer: 2, explanation: "The Inca built Machu Picchu around 1450 AD high in the Andes mountains of Peru." },
  ],
  Geography: [
    { question: "What is the largest continent?", options: ["Africa", "North America", "Asia", "Europe"], correctAnswer: 2, explanation: "Asia is the largest continent, covering about 30% of Earth's land area." },
    { question: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Mississippi", "Yangtze"], correctAnswer: 1, explanation: "The Nile in Africa is the longest river at about 6,650 km." },
    { question: "How many continents are there?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "There are 7 continents: Africa, Antarctica, Asia, Australia, Europe, N. America, S. America." },
    { question: "What is the capital of France?", options: ["London", "Berlin", "Madrid", "Paris"], correctAnswer: 3, explanation: "Paris has been the capital of France for over 1,000 years!" },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correctAnswer: 3, explanation: "The Pacific Ocean is the largest, covering about 46% of all ocean area." },
  ],
  Coding: [
    { question: "What does HTML stand for?", options: ["Hyper Transfer Markup Language", "HyperText Markup Language", "High Text Making Language", "HyperText Making Links"], correctAnswer: 1, explanation: "HTML = HyperText Markup Language — the building block of web pages." },
    { question: "What is a 'loop' in coding?", options: ["A bug", "A type of variable", "Code that repeats", "A function name"], correctAnswer: 2, explanation: "A loop repeats code multiple times until a condition is met." },
    { question: "Which symbol starts a comment in Python?", options: ["//", "/*", "#", "--"], correctAnswer: 2, explanation: "In Python, # marks the start of a comment — code that's not executed." },
    { question: "What is an 'algorithm'?", options: ["A coding language", "Step-by-step instructions to solve a problem", "A type of computer", "A database"], correctAnswer: 1, explanation: "An algorithm is a set of step-by-step instructions — like a recipe for the computer!" },
    { question: "What does 'print()' do in Python?", options: ["Prints on paper", "Deletes text", "Shows text on screen", "Saves a file"], correctAnswer: 2, explanation: "print() displays text or values on the screen — great for showing output!" },
  ],
  General: [
    { question: "How many colors are in a rainbow?", options: ["5", "6", "7", "8"], correctAnswer: 2, explanation: "A rainbow has 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, Violet (ROY G BIV)." },
    { question: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Horse", "Leopard"], correctAnswer: 1, explanation: "The cheetah can reach speeds of 112 km/h (70 mph) — the fastest land animal!" },
    { question: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correctAnswer: 1, explanation: "A hexagon has 6 sides. Think of a honeycomb — bees build hexagonal cells!" },
    { question: "What is the boiling point of water in Celsius?", options: ["90°C", "95°C", "100°C", "110°C"], correctAnswer: 2, explanation: "Water boils at 100°C (212°F) at sea level atmospheric pressure." },
    { question: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: 1, explanation: "Saturn has 146 confirmed moons — the most of any planet in our solar system!" },
  ],
};

function getFallbackQuestions(subject: string) {
  const bank = QUESTION_BANKS[subject] || QUESTION_BANKS["General"];
  return [...bank].sort(() => Math.random() - 0.5).slice(0, 5);
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

  try {
    const text = await generateWithFallback(prompt);
    return JSON.parse(text);
  } catch {
    // All models quota-exhausted → return curated fallback quiz
    return {
      title: `${subject} Challenge for ${childProfile.name}!`,
      subject,
      difficulty: autoDifficulty,
      questions: getFallbackQuestions(subject),
    };
  }
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

  try {
    const text = await generateWithFallback(prompt);
    return JSON.parse(text);
  } catch {
    // Fallback report using actual child data
    const avgScore = childData.recentQuizzes.length
      ? childData.recentQuizzes.reduce((s, q) => s + q.score / q.total, 0) / childData.recentQuizzes.length * 100
      : 0;
    const name = childData.profile.name;
    return {
      content: `# 📊 Progress Report for ${name}\n\n## 🌟 Overall Performance\n${name} is making **great progress**! With ${childData.profile.totalQuizzes} quizzes completed and a ${childData.streak}-day streak, ${name} shows strong dedication to learning.\n\n## 📈 Quiz Performance\n${avgScore > 0 ? `Average score: **${Math.round(avgScore)}%**` : "No quizzes completed yet — let's get started!"}\n\n## 🔥 Streak & Engagement\n- Current streak: **${childData.streak} days**\n- Best streak ever: **${childData.longestStreak} days**\n- Total study time: **${childData.totalWatchTime} minutes**\n\n## 💪 Keep It Up!\nEvery quiz makes you smarter, ${name}! Keep learning and you'll reach Level ${childData.profile.level + 1} soon!`,
      interests: childData.profile.interests.length ? childData.profile.interests : ["General Learning"],
      recommendations: [
        `Practice ${childData.profile.weakSubjects[0] || "new subjects"} daily to improve`,
        "Take at least one quiz per day to maintain your streak",
        "Try harder difficulty quizzes to earn more XP",
      ],
      strengths: childData.profile.interests.length ? childData.profile.interests : ["Curiosity", "Dedication"],
      weaknesses: childData.profile.weakSubjects.length ? childData.profile.weakSubjects : ["Keep exploring new topics"],
    };
  }
}

// ─── AI Chatbot ──────────────────────────────────────
export async function chatWithStudent(
  messages: Array<{ role: string; content: string }>,
  childProfile: ChildProfile
): Promise<string> {
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

  try {
    return await generateWithFallback(prompt);
  } catch {
    const lastMsg = messages[messages.length - 1]?.content || "";
    return `Hi ${childProfile.name}! 👋 I'm KIDO AI, your learning buddy!\n\nI'm having a little trouble connecting right now, but I'm still here to help! 🌟\n\nYou asked: **"${lastMsg}"**\n\nTry asking me again in a moment, or explore one of these fun topics:\n- 🔢 **Math puzzles** — I love showing step-by-step solutions!\n- 🔬 **Science facts** — Did you know the Sun is 4.6 billion years old?\n- 📚 **English stories** — Let's build your vocabulary together!\n- 💻 **Coding** — I can teach you Python, JavaScript and more!\n\n[Watch educational videos for kids](https://www.youtube.com/results?search_query=educational+videos+for+kids)\n\nKeep learning — you're doing amazing! 🚀`;
  }
}

// ─── AI Game Challenge Generator ─────────────────────
export async function generateGameChallenge(
  gameType: "word-builder" | "story-creator" | "math-arena",
  childProfile: ChildProfile,
  context?: string
): Promise<any> {
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
      {"type": "anagram", "scrambled": "SCRAMBLED_WORD", "answer": "WORD", "hint": "A helpful hint", "points": 10},
      {"type": "fill-blank", "question": "The sentence with a blank here: ___ .", "answer": "Answer", "hint": "Hint here", "points": 10}
    ],
    "totalPoints": 50,
    "xpReward": 30
  }
}
Important: Make sure to provide 5 puzzles. Make them 100% unique!`,

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
    "choices": ["Choice A - exciting option", "Choice B - mysterious option", "Choice C - funny option"],
    "vocabulary": ["word1", "word2"],
    "writingTip": "A helpful writing tip",
    "xpReward": 25
  }
}
CRITICAL: You MUST use the exact key "storyPart" for the story text.`,

    "math-arena": `You are a math game AI for kids. Create math challenges for ${childProfile.name} (age ${childProfile.age}, ${childProfile.grade} grade).

Return ONLY valid JSON (no markdown):
{
  "type": "math-arena",
  "challenge": {
    "title": "Fun math challenge title",
    "timeLimit": 60,
    "problems": [
      {"question": "Math problem", "options": ["A","B","C","D"], "correctAnswer": 0, "points": 10, "difficulty": "easy"},
      {"question": "Harder problem", "options": ["A","B","C","D"], "correctAnswer": 1, "points": 15, "difficulty": "medium"},
      {"question": "Even harder", "options": ["A","B","C","D"], "correctAnswer": 2, "points": 20, "difficulty": "medium"},
      {"question": "Challenge", "options": ["A","B","C","D"], "correctAnswer": 0, "points": 25, "difficulty": "hard"},
      {"question": "Bonus", "options": ["A","B","C","D"], "correctAnswer": 3, "points": 30, "difficulty": "hard"}
    ],
    "totalPoints": 100,
    "xpReward": 40
  }
}`,
  };

  const fallbacks: Record<string, any> = {
    "word-builder": {
      type: "word-builder",
      challenge: {
        title: `Word Wizard Challenge for ${childProfile.name}!`,
        instructions: "Unscramble the letters or fill in the blank. Good luck! 🧩",
        puzzles: [
          { type: "anagram", scrambled: "ELPPA", answer: "APPLE", hint: "A fruit that keeps doctors away", points: 10 },
          { type: "fill-blank", question: "The ___ shines brightly in the sky.", answer: "SUN", hint: "It gives us light and warmth", points: 10 },
          { type: "anagram", scrambled: "KOBO", answer: "BOOK", hint: "You read this to learn", points: 10 },
          { type: "fill-blank", question: "A ___ has eight legs.", answer: "SPIDER", hint: "It spins a web", points: 10 },
          { type: "anagram", scrambled: "RASTE", answer: "STARE", hint: "To look at something for a long time", points: 10 },
        ],
        totalPoints: 50,
        xpReward: 30,
      },
    },
    "story-creator": {
      type: "story-creator",
      challenge: {
        title: `${childProfile.name}'s Adventure Begins!`,
        storyPart: context || `Once upon a time, in a land where knowledge was magic, a young explorer named ${childProfile.name} discovered a glowing portal in the school library. The portal shimmered with all the colors of the rainbow, and a voice whispered, "Only the wisest child may enter and unlock the secrets within." ${childProfile.name} took a deep breath and stepped forward, heart pounding with excitement...`,
        prompt: "What should happen next?",
        choices: [
          "Step through the portal into an ancient library floating in the clouds",
          "Call a friend to join the adventure first",
          "Look for clues around the portal before entering",
        ],
        vocabulary: ["explorer", "shimmered", "whispered"],
        writingTip: "Great stories have a hero, a challenge, and a surprise twist!",
        xpReward: 25,
      },
    },
    "math-arena": {
      type: "math-arena",
      challenge: {
        title: `Math Arena Battle for ${childProfile.name}!`,
        timeLimit: 60,
        problems: [
          { question: "What is 15 + 27?", options: ["40", "42", "44", "38"], correctAnswer: 1, points: 10, difficulty: "easy" },
          { question: "What is 9 × 6?", options: ["45", "52", "54", "56"], correctAnswer: 2, points: 15, difficulty: "easy" },
          { question: "What is 144 ÷ 12?", options: ["10", "11", "12", "13"], correctAnswer: 2, points: 20, difficulty: "medium" },
          { question: "If a train travels 60 km/h for 3 hours, how far does it go?", options: ["120 km", "150 km", "180 km", "200 km"], correctAnswer: 2, points: 25, difficulty: "medium" },
          { question: "What is 15% of 200?", options: ["25", "30", "35", "40"], correctAnswer: 1, points: 30, difficulty: "hard" },
        ],
        totalPoints: 100,
        xpReward: 40,
      },
    },
  };

  try {
    const text = await generateWithFallback(prompts[gameType]);
    return JSON.parse(text);
  } catch {
    return fallbacks[gameType];
  }
}

// ─── Floating KidoBot Tutor (stateless, no child profile required) ─────────
export async function chatTutor(
  message: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const historyText = history.slice(-8).map(m =>
    `${m.role === "user" ? "Student" : "Kido Bot"}: ${m.content}`
  ).join("\n\n");

  const prompt = `You are Kido Bot, a fun and friendly AI teaching assistant for children aged 6-14.
Your job is to help students understand topics they are curious about or stuck on.

RULES:
- Use simple, age-appropriate language
- Use emojis to make responses engaging 🎉
- Give clear step-by-step explanations when teaching a concept
- For math: show step-by-step working with examples
- For science: include a fun real-world example or fact
- Keep answers concise (max 3-4 short paragraphs)
- If asked about unsafe topics, gently redirect to learning
- Be encouraging — always praise curiosity!
- Use everyday examples kids can relate to
${historyText ? `\nConversation so far:\n${historyText}\n` : ""}
Student asks: ${message}

Kido Bot (respond helpfully and encouragingly):`;

  try {
    return await generateWithFallback(prompt);
  } catch {
    return `Oops! My AI brain is taking a short break 🤖💤\n\nTry asking me again in a moment!\n\n**Fun fact while you wait:** 🌟 Did you know the human brain can store about 2.5 million gigabytes of information? That's more than any computer ever built! 🧠`;
  }
}
