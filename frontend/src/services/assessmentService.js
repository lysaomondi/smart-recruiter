import api from './api';

const assessmentService = {
    // Get all assessments for interviewee
    getMyAssessments: () => {
        return api.get('/interviewee/assessments');
    },

    // Get assessment details by ID
    getAssessmentById: (assessmentId) => {
        return api.get(`/interviewee/assessments/${assessmentId}`);
    },

    // Start an assessment attempt
    startAttempt: (assessmentId) => {
        return api.post(`/interviewee/assessments/${assessmentId}/start`);
    },

    // Submit answer for a question
    submitAnswer: (attemptId, questionId, answerData) => {
        return api.post(`/interviewee/attempts/${attemptId}/questions/${questionId}/answer`, answerData);
    },

    // Submit entire assessment
    submitAssessment: (attemptId) => {
        return api.post(`/interviewee/attempts/${attemptId}/submit`);
    },

    // Get attempt status
    getAttemptStatus: (attemptId) => {
        return api.get(`/interviewee/attempts/${attemptId}/status`);
    },

    // Get trial assessment
    getTrialAssessment: () => {
        return api.get('/interviewee/trial-assessment');
    },

    // Submit trial assessment
    submitTrialAssessment: (answers) => {
        return api.post('/interviewee/trial-assessment/submit', { answers });
    },
};

export default assessmentService;