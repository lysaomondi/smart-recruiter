import api from './api';

// Member 2 — Assessment & Question API layer.
// FOR NOW: mock data + fake delay, no backend dependency.
// NEXT WEEK: swap function bodies for real calls through services/api.js.
// Function names/return shapes are the contract — don't change them.

const delay = (ms = 400) => new Promise((res) => setTimeout(res, ms));
const useRemoteApi = import.meta.env.VITE_USE_API === 'true';

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
  if (useRemoteApi) return api.get('/assessments');
  await delay();
  return [...MOCK_ASSESSMENTS];
}

/** GET /assessments/:id — used by later branches (edit/review) */
export async function fetchAssessmentById(id) {
  if (useRemoteApi) return api.get(`/assessments/${id}`);
  await delay();
  const found = MOCK_ASSESSMENTS.find((a) => a.id === id);
  if (!found) throw new Error("Assessment not found");
  return found;
}

/** POST /assessments — create a new draft assessment */
export async function createAssessment(payload) {
  if (useRemoteApi) return api.post('/assessments', payload);
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
  if (useRemoteApi) return api.patch(`/assessments/${id}`, changes);
  await delay();
  MOCK_ASSESSMENTS = MOCK_ASSESSMENTS.map((a) =>
    a.id === id ? { ...a, ...changes } : a
  );
  return MOCK_ASSESSMENTS.find((a) => a.id === id);
}

/** POST /assessments/:id/publish — draft -> open */
export async function publishAssessment(id) {
  if (useRemoteApi) return api.post(`/assessments/${id}/publish`);
  await delay();
  return updateAssessment(id, { status: "open" });
}

/** POST /assessments/:id/questions */
export async function addQuestion(assessmentId, question) {
  if (useRemoteApi) return api.post(`/assessments/${assessmentId}/questions`, question);
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

// Interviewee mock API. The backend directory currently contains route
// scaffolds only, so these keep the interviewee flow usable during local
// development without requesting an unavailable localhost server.
const INTERVIEWEE_ASSESSMENTS = [
  {
    id: "ia1",
    title: "Frontend Fundamentals Assessment",
    description: "A short assessment covering React and JavaScript basics.",
    status: "upcoming",
    startDate: "2026-08-25T09:00:00Z",
    duration: 30,
    totalPoints: 30,
    technologies: ["React", "JavaScript"],
    questions: [
      {
        id: "iaq1",
        type: "multiple_choice",
        text: "Which hook is used to manage component state?",
        options: ["useState", "useMemo", "useContext", "useRef"],
        points: 10,
      },
      {
        id: "iaq2",
        type: "subjective",
        text: "Describe the purpose of a React component key.",
        points: 10,
      },
      {
        id: "iaq3",
        type: "coding",
        text: "Outline how you would reverse an array without mutating it.",
        points: 10,
      },
    ],
  },
  {
    id: "ia2",
    title: "JavaScript Screening",
    status: "completed",
    score: 84,
    duration: 20,
    questions: [],
  },
];

const TRIAL_ASSESSMENT = {
  id: "trial",
  duration: 15,
  questions: [
    {
      id: "trial-q1",
      type: "multiple_choice",
      text: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Computer Style Syntax", "Code Styling System"],
      points: 5,
    },
    {
      id: "trial-q2",
      type: "subjective",
      text: "Briefly explain the difference between let and const.",
      points: 5,
    },
  ],
};

const assessmentService = {
  getMyAssessments: async () => {
    if (useRemoteApi) return api.get('/interviewee/assessments');
    await delay();
    return INTERVIEWEE_ASSESSMENTS.map((assessment) => ({ ...assessment }));
  },
  getAssessmentById: async (assessmentId) => {
    if (useRemoteApi) return api.get(`/interviewee/assessments/${assessmentId}`);
    await delay();
    const assessment = INTERVIEWEE_ASSESSMENTS.find(({ id }) => id === assessmentId);
    if (!assessment) throw new Error("Assessment not found");
    return { ...assessment };
  },
  startAttempt: async (assessmentId) => {
    if (useRemoteApi) return api.post(`/interviewee/assessments/${assessmentId}/start`);
    await delay();
    const assessment = INTERVIEWEE_ASSESSMENTS.find(({ id }) => id === assessmentId);
    if (!assessment) throw new Error("Assessment not found");
    return { id: `attempt-${assessmentId}`, assessmentId, timeRemaining: assessment.duration * 60, answers: [] };
  },
  submitAnswer: async (attemptId, questionId, answerData) => {
    if (useRemoteApi) return api.post(`/interviewee/attempts/${attemptId}/questions/${questionId}/answer`, answerData);
    await delay();
    return { attemptId, questionId, ...answerData };
  },
  submitAssessment: async (attemptId) => {
    if (useRemoteApi) return api.post(`/interviewee/attempts/${attemptId}/submit`);
    await delay();
    return { attemptId, submitted: true };
  },
  getAttemptStatus: async (attemptId) => ({ attemptId, submitted: false }),
  getTrialAssessment: async () => {
    if (useRemoteApi) return api.get('/interviewee/trial-assessment');
    await delay();
    return { ...TRIAL_ASSESSMENT };
  },
  submitTrialAssessment: async (answers) => {
    if (useRemoteApi) return api.post('/interviewee/trial-assessment/submit', { answers });
    await delay();
    return { submitted: true, answers };
  },
};

export default assessmentService;
