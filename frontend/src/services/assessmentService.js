import { api } from "./api";

/* =========================
   ASSESSMENTS
========================= */

export async function fetchAssessments() {
  return api.get("/assessments/");
}

export async function fetchAssessmentById(id) {
  return api.get(`/assessments/${id}/`);
}

export async function createAssessment(payload) {
  return api.post("/assessments/", payload);
}

export async function updateAssessment(id, changes) {
  return api.patch(`/assessments/${id}/`, changes);
}

export async function publishAssessment(id) {
  return api.post(`/assessments/${id}/publish/`);
}

export async function closeAssessment(id) {
  return api.post(`/assessments/${id}/close/`);
}

export async function deleteAssessment(id) {
  await api.delete(`/assessments/${id}/`);
  return id;
}

/* =========================
   QUESTIONS
========================= */

export async function addQuestion(assessmentId, question) {
  return api.post(`/assessments/${assessmentId}/questions/`, question);
}

export async function fetchChoices(assessmentId, questionId) {
  return api.get(
    `/assessments/${assessmentId}/questions/${questionId}/choices/`
  );
}

export async function addChoice(assessmentId, questionId, choice) {
  return api.post(
    `/assessments/${assessmentId}/questions/${questionId}/choices/`,
    choice
  );
}

export async function updateChoice(
  assessmentId,
  questionId,
  choiceId,
  changes
) {
  return api.patch(
    `/assessments/${assessmentId}/questions/${questionId}/choices/${choiceId}/`,
    changes
  );
}

/* =========================
   INTERVIEWEE ATTEMPTS
========================= */

/**
 * Start or resume an assessment attempt.
 *
 * Django endpoint:
 * POST /api/attempts/
 *
 * The backend currently exposes AttemptViewSet as a
 * ReadOnlyModelViewSet, so this endpoint must exist on the
 * backend before this request can succeed.
 */
export async function startAssessmentAttempt(assessmentId) {
  return api.post("/attempts/start/", {
    assessment_id: assessmentId,
  });
}

/**
 * Save one answer.
 *
 * Django endpoint:
 * PUT/PATCH /api/attempts/:id/answers/
 */
export async function saveAttemptAnswer(attemptId, answerData) {
  return api.patch(
    `/attempts/${attemptId}/answers/`,
    answerData
  );
}

/**
 * Submit an attempt.
 *
 * Django endpoint:
 * POST /api/attempts/:id/submit/
 */
export async function submitAssessmentAttempt(attemptId) {
  return api.post(`/attempts/${attemptId}/submit/`, {});
}

/**
 * Fetch one attempt.
 *
 * Django endpoint:
 * GET /api/attempts/:id/
 */
export async function fetchAttempt(attemptId) {
  return api.get(`/attempts/${attemptId}/`);
}

/**
 * Fetch remaining time for an attempt.
 *
 * Django endpoint:
 * GET /api/attempts/:id/remaining-time/
 */
export async function fetchRemainingTime(attemptId) {
  return api.get(`/attempts/${attemptId}/remaining-time/`);
}

/* =========================
   CODEWARS
========================= */

export async function fetchCodewarsKata(query) {
  return api.get(
    `/codewars/search/?q=${encodeURIComponent(query)}`
  );
}
