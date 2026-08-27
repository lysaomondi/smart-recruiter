// assessmentService.js
// -----------------------------------------------------------------------------
// Now calling the real Django backend instead of mock data. Function names
// and return shapes are unchanged from the mock version — the Redux slice
// and all pages/components need zero changes as a result.
// -----------------------------------------------------------------------------

import { api } from "./api";

/** GET /api/assessments/ */
export async function fetchAssessments() {
  return api.get("/assessments/");
}

/** GET /api/assessments/:id/ */
export async function fetchAssessmentById(id) {
  return api.get(`/assessments/${id}/`);
}

/** POST /api/assessments/ */
export async function createAssessment(payload) {
  return api.post("/assessments/", payload);
}

/** PATCH /api/assessments/:id/ */
export async function updateAssessment(id, changes) {
  return api.patch(`/assessments/${id}/`, changes);
}

/** POST /api/assessments/:id/publish/ */
export async function publishAssessment(id) {
  return api.post(`/assessments/${id}/publish/`);
}

/** POST /api/assessments/:id/close/ */
export async function closeAssessment(id) {
  return api.post(`/assessments/${id}/close/`);
}

/** DELETE /api/assessments/:id/ */
export async function deleteAssessment(id) {
  await api.delete(`/assessments/${id}/`);
  return id;
}

/** POST /api/assessments/:id/questions/ */
export async function addQuestion(assessmentId, question) {
  return api.post(`/assessments/${assessmentId}/questions/`, question);
}

/** GET /api/codewars/... — NOT YET WIRED UP.
 *  Member 4's integrations app owns the real Codewars endpoint; its exact
 *  URL isn't confirmed yet. Keeping this as a stub so the "Fetch from
 *  Codewars" button in QuestionBuilder doesn't crash — swap the body for
 *  a real api.get(...) call once that endpoint is confirmed. */
export async function fetchCodewarsKata(query) {
  return api.get(`/codewars/search/?q=${encodeURIComponent(query)}`);
}

export async function fetchChoices(assessmentId, questionId) {
  return api.get(
    `/assessments/${assessmentId}/questions/${questionId}/choices/`,
  );
}

export async function addChoice(assessmentId, questionId, choice) {
  return api.post(
    `/assessments/${assessmentId}/questions/${questionId}/choices/`,
    choice,
  );
}

export async function updateChoice(
  assessmentId,
  questionId,
  choiceId,
  changes,
) {
  return api.patch(
    `/assessments/${assessmentId}/questions/${questionId}/choices/${choiceId}/`,
    changes,
  );
}
