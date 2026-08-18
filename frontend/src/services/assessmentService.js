// Member 2 — Assessment & Question API layer.
// FOR NOW: mock data + fake delay, no backend dependency.
// NEXT WEEK: swap function bodies for real calls through services/api.js.
// Function names/return shapes are the contract — don't change them.

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));

let MOCK_ASSESSMENTS = [
  {
    id: "a1",
    title: "Backend Engineer — Katas Round",
    status: "open",
    timeLimitMinutes: 90,
    invitedCount: 42,
    submittedCount: 31,
    closesAt: "2026-08-20T18:00:00Z",
    tags: ["Flask", "SQL", "Data structures"],
    questions: [
      { id: "q1", type: "mcq", prompt: "Which data structure gives O(1) average lookup time?" },
      { id: "q2", type: "text", prompt: "Explain REST vs RPC." },
      { id: "q3", type: "kata", prompt: "Reverse a linked list", source: "manual" },
    ],
  },
  {
    id: "a2",
    title: "Frontend Engineer — React Whiteboard",
    status: "open",
    timeLimitMinutes: 75,
    invitedCount: 18,
    submittedCount: 9,
    closesAt: "2026-08-23T18:00:00Z",
    tags: ["React", "Redux", "BDD"],
    questions: [],
  },
  {
    id: "a3",
    title: "Junior Dev — Screening MCQ",
    status: "draft",
    timeLimitMinutes: 30,
    invitedCount: 0,
    submittedCount: 0,
    closesAt: null,
    tags: [],
    questions: [{ id: "q1", type: "mcq", prompt: "Big-O of binary search?" }],
  },
];

/** GET /assessments */
export async function fetchAssessments() {
  await delay();
  return [...MOCK_ASSESSMENTS];
}

/** GET /assessments/:id — used by later branches (edit/review) */
export async function fetchAssessmentById(id) {
  await delay();
  const found = MOCK_ASSESSMENTS.find((a) => a.id === id);
  if (!found) throw new Error("Assessment not found");
  return found;
}

/** POST /assessments — create a new draft assessment */
export async function createAssessment(payload) {
  await delay();
  const newAssessment = {
    id: `a${MOCK_ASSESSMENTS.length + 1}`,
    status: "draft",
    invitedCount: 0,
    submittedCount: 0,
    closesAt: null,
    questions: [],
    ...payload,
  };
  MOCK_ASSESSMENTS = [newAssessment, ...MOCK_ASSESSMENTS];
  return newAssessment;
}

/** PATCH /assessments/:id */
export async function updateAssessment(id, changes) {
  await delay();
  MOCK_ASSESSMENTS = MOCK_ASSESSMENTS.map((a) =>
    a.id === id ? { ...a, ...changes } : a
  );
  return MOCK_ASSESSMENTS.find((a) => a.id === id);
}

/** POST /assessments/:id/publish — draft -> open */
export async function publishAssessment(id) {
  await delay();
  return updateAssessment(id, { status: "open" });
}

/** POST /assessments/:id/questions */
export async function addQuestion(assessmentId, question) {
  await delay();
  const assessment = MOCK_ASSESSMENTS.find((a) => a.id === assessmentId);
  const newQuestion = { id: `q${Date.now()}`, ...question };
  assessment.questions.push(newQuestion);
  return newQuestion;
}

/** GET /codewars/toy-problem — stub for Member 4's Codewars integration */
export async function fetchCodewarsKata() {
  await delay(600);
  return {
    type: "kata",
    source: "codewars",
    prompt: "Reverse a singly linked list",
    difficulty: "6 kyu",
  };
}
