import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assessmentService from '../../services/assessmentService';

// Async thunks
export const fetchMyAssessments = createAsyncThunk(
    'assessment/fetchMyAssessments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await assessmentService.getMyAssessments();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchAssessmentDetails = createAsyncThunk(
    'assessment/fetchAssessmentDetails',
    async (assessmentId, { rejectWithValue }) => {
        try {
            const response = await assessmentService.getAssessmentById(assessmentId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const startAssessmentAttempt = createAsyncThunk(
    'assessment/startAttempt',
    async (assessmentId, { rejectWithValue }) => {
        try {
            const response = await assessmentService.startAttempt(assessmentId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const submitAnswer = createAsyncThunk(
    'assessment/submitAnswer',
    async ({ attemptId, questionId, answerData }, { rejectWithValue }) => {
        try {
            const response = await assessmentService.submitAnswer(attemptId, questionId, answerData);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const submitAssessment = createAsyncThunk(
    'assessment/submitAssessment',
    async (attemptId, { rejectWithValue }) => {
        try {
            const response = await assessmentService.submitAssessment(attemptId);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchTrialAssessment = createAsyncThunk(
    'assessment/fetchTrialAssessment',
    async (_, { rejectWithValue }) => {
        try {
            const response = await assessmentService.getTrialAssessment();
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const submitTrialAssessment = createAsyncThunk(
    'assessment/submitTrialAssessment',
    async (answers, { rejectWithValue }) => {
        try {
            const response = await assessmentService.submitTrialAssessment(answers);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    assessments: [],
    currentAssessment: null,
    currentAttempt: null,
    trialAssessment: null,
    loading: false,
    error: null,
};

const assessmentSlice = createSlice({
    name: 'assessment',
    initialState,
    reducers: {
        clearAssessmentError: (state) => {
            state.error = null;
        },
        resetCurrentAssessment: (state) => {
            state.currentAssessment = null;
            state.currentAttempt = null;
        },
        updateTimer: (state, action) => {
            if (state.currentAttempt) {
                state.currentAttempt.timeRemaining = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch My Assessments
            .addCase(fetchMyAssessments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyAssessments.fulfilled, (state, action) => {
                state.loading = false;
                state.assessments = action.payload;
            })
            .addCase(fetchMyAssessments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Assessment Details
            .addCase(fetchAssessmentDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAssessmentDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAssessment = action.payload;
            })
            .addCase(fetchAssessmentDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Start Attempt
            .addCase(startAssessmentAttempt.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(startAssessmentAttempt.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAttempt = action.payload;
            })
            .addCase(startAssessmentAttempt.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Submit Answer
            .addCase(submitAnswer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitAnswer.fulfilled, (state, action) => {
                state.loading = false;
                if (state.currentAttempt) {
                    const index = state.currentAttempt.answers?.findIndex(
                        (a) => a.questionId === action.payload.questionId
                    );
                    if (index !== -1) {
                        state.currentAttempt.answers[index] = action.payload;
                    } else {
                        if (!state.currentAttempt.answers) {
                            state.currentAttempt.answers = [];
                        }
                        state.currentAttempt.answers.push(action.payload);
                    }
                }
            })
            .addCase(submitAnswer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Submit Assessment
            .addCase(submitAssessment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitAssessment.fulfilled, (state, action) => {
                state.loading = false;
                state.currentAttempt = { ...state.currentAttempt, submitted: true };
            })
            .addCase(submitAssessment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Fetch Trial Assessment
            .addCase(fetchTrialAssessment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTrialAssessment.fulfilled, (state, action) => {
                state.loading = false;
                state.trialAssessment = action.payload;
            })
            .addCase(fetchTrialAssessment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Submit Trial Assessment
            .addCase(submitTrialAssessment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(submitTrialAssessment.fulfilled, (state) => {
                state.loading = false;
                state.trialAssessment = null;
            })
            .addCase(submitTrialAssessment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearAssessmentError, resetCurrentAssessment, updateTimer } = assessmentSlice.actions;
export default assessmentSlice.reducer;