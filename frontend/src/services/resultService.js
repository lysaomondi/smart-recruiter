import { api } from "./api";

export const fetchResults = () => api.get("/results/");
export const fetchResult = (resultId) => api.get(`/results/${resultId}/`);
export const fetchMyResults = () => api.get("/results/my/");
export const fetchRankings = () => api.get("/results/rankings/");
export const fetchStatistics = () => api.get("/statistics/results/");
export const releaseResult = (resultId) =>
  api.post(`/results/${resultId}/release/`);
export const fetchFeedback = (resultId) =>
  api.get(`/results/${resultId}/feedback/`);
export const createFeedback = (resultId, feedbackText) =>
  api.post(`/results/${resultId}/feedback/`, { feedback_text: feedbackText });
export const updateFeedback = (feedbackId, changes) =>
  api.put(`/feedback/${feedbackId}/`, changes);
export const deleteFeedback = (feedbackId) =>
  api.delete(`/feedback/${feedbackId}/`);
