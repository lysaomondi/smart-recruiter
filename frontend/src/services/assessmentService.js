import api from './api';

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));
let mockAssessments = [
  { id: 'a1', title: 'Backend Engineer — Katas Round', status: 'open', timeLimitMinutes: 90, invitedCount: 42, submittedCount: 31, closesAt: '2026-08-20T18:00:00Z', tags: ['Flask', 'SQL'], questions: [] },
  { id: 'a2', title: 'Frontend Engineer — React Whiteboard', status: 'open', timeLimitMinutes: 75, invitedCount: 18, submittedCount: 9, closesAt: '2026-08-23T18:00:00Z', tags: ['React', 'Redux'], questions: [] },
  { id: 'a3', title: 'Junior Dev — Screening MCQ', status: 'draft', timeLimitMinutes: 30, invitedCount: 0, submittedCount: 0, closesAt: null, tags: [], questions: [] },
];

export async function fetchAssessments() { await delay(); return [...mockAssessments]; }
export async function fetchAssessmentById(id) { await delay(); const assessment = mockAssessments.find((item) => item.id === id); if (!assessment) throw new Error('Assessment not found'); return assessment; }
export async function createAssessment(payload) { await delay(); const assessment = { id: `a${mockAssessments.length + 1}`, status: 'draft', invitedCount: 0, submittedCount: 0, closesAt: null, questions: [], ...payload }; mockAssessments = [assessment, ...mockAssessments]; return assessment; }
export async function updateAssessment(id, changes) { await delay(); mockAssessments = mockAssessments.map((item) => item.id === id ? { ...item, ...changes } : item); return fetchAssessmentById(id); }
export async function publishAssessment(id) { return updateAssessment(id, { status: 'open' }); }
export async function addQuestion(assessmentId, question) { await delay(); const assessment = await fetchAssessmentById(assessmentId); const newQuestion = { id: `q${Date.now()}`, ...question }; assessment.questions.push(newQuestion); return newQuestion; }

const assessmentService = {
  getMyAssessments: () => api.get('/interviewee/assessments'),
  getAssessmentById: (assessmentId) => api.get(`/interviewee/assessments/${assessmentId}`),
  startAttempt: (assessmentId) => api.post(`/interviewee/assessments/${assessmentId}/start`),
  submitAnswer: (attemptId, questionId, answerData) => api.post(`/interviewee/attempts/${attemptId}/questions/${questionId}/answer`, answerData),
  submitAssessment: (attemptId) => api.post(`/interviewee/attempts/${attemptId}/submit`),
  getTrialAssessment: () => api.get('/interviewee/trial-assessment'),
  submitTrialAssessment: (answers) => api.post('/interviewee/trial-assessment/submit', { answers }),
};

export default assessmentService;
