import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assessmentService, * as recruiterService from "../../services/assessmentService";

const apiThunk = (type, call) =>
  createAsyncThunk(type, async (argument, { rejectWithValue }) => {
    try {
      return await call(argument);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  });

export const loadAssessments = apiThunk("assessments/loadAll", () => recruiterService.fetchAssessments());
export const loadAssessmentById = apiThunk("assessments/loadOne", (id) => recruiterService.fetchAssessmentById(id));
export const createNewAssessment = apiThunk("assessments/create", (payload) => recruiterService.createAssessment(payload));
export const saveAssessmentChanges = apiThunk("assessments/update", ({ id, changes }) => recruiterService.updateAssessment(id, changes));
export const publish = apiThunk("assessments/publish", (id) => recruiterService.publishAssessment(id));
export const addQuestionToAssessment = apiThunk(
  "assessments/addQuestion",
  async ({ assessmentId, question }) => ({
    assessmentId,
    newQuestion: await recruiterService.addQuestion(assessmentId, question),
  }),
);

export const fetchMyAssessments = apiThunk("assessment/fetchMyAssessments", () => assessmentService.getMyAssessments());
export const fetchAssessmentDetails = apiThunk("assessment/fetchAssessmentDetails", (id) => assessmentService.getAssessmentById(id));
export const startAssessmentAttempt = apiThunk("assessment/startAttempt", (id) => assessmentService.startAttempt(id));
export const submitAnswer = apiThunk(
  "assessment/submitAnswer",
  ({ attemptId, questionId, answerData }) => assessmentService.submitAnswer(attemptId, questionId, answerData),
);
export const submitAssessment = apiThunk("assessment/submitAssessment", (attemptId) => assessmentService.submitAssessment(attemptId));
export const fetchTrialAssessment = apiThunk("assessment/fetchTrialAssessment", () => assessmentService.getTrialAssessment());
export const submitTrialAssessment = apiThunk("assessment/submitTrialAssessment", (answers) => assessmentService.submitTrialAssessment(answers));

const initialState = {
  items: [],
  active: null,
  status: "idle",
  error: null,
  assessments: [],
  currentAssessment: null,
  currentAttempt: null,
  trialAssessment: null,
  loading: false,
};

const pending = (state) => {
  state.loading = true;
  state.error = null;
};
const rejected = (state, action) => {
  state.loading = false;
  state.status = "failed";
  state.error = action.payload || action.error.message;
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {
    clearActiveAssessment: (state) => {
      state.active = null;
    },
    clearAssessmentError: (state) => {
      state.error = null;
    },
    resetCurrentAssessment: (state) => {
      state.currentAssessment = null;
      state.currentAttempt = null;
    },
    updateTimer: (state, action) => {
      if (state.currentAttempt) state.currentAttempt.timeRemaining = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssessments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadAssessments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadAssessments.rejected, rejected)
      .addCase(loadAssessmentById.fulfilled, (state, action) => {
        state.active = action.payload;
      })
      .addCase(createNewAssessment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.active = action.payload;
      })
      .addCase(saveAssessmentChanges.fulfilled, (state, action) => {
        state.active = action.payload;
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(publish.fulfilled, (state, action) => {
        state.active = action.payload;
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
      })
      .addCase(addQuestionToAssessment.fulfilled, (state, action) => {
        const { assessmentId, newQuestion } = action.payload;
        if (state.active?.id === assessmentId) state.active.questions.push(newQuestion);
        const item = state.items.find((entry) => entry.id === assessmentId);
        if (item) item.questions.push(newQuestion);
      })
      .addCase(fetchMyAssessments.pending, pending)
      .addCase(fetchMyAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload;
      })
      .addCase(fetchMyAssessments.rejected, rejected)
      .addCase(fetchAssessmentDetails.pending, pending)
      .addCase(fetchAssessmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAssessment = action.payload;
      })
      .addCase(fetchAssessmentDetails.rejected, rejected)
      .addCase(startAssessmentAttempt.pending, pending)
      .addCase(startAssessmentAttempt.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAttempt = action.payload;
      })
      .addCase(startAssessmentAttempt.rejected, rejected)
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.currentAttempt) return;
        const answers = state.currentAttempt.answers || (state.currentAttempt.answers = []);
        const index = answers.findIndex((answer) => answer.questionId === action.payload.questionId);
        if (index >= 0) answers[index] = action.payload;
        else answers.push(action.payload);
      })
      .addCase(submitAnswer.rejected, rejected)
      .addCase(submitAssessment.fulfilled, (state) => {
        state.loading = false;
        if (state.currentAttempt) state.currentAttempt.submitted = true;
      })
      .addCase(submitAssessment.rejected, rejected)
      .addCase(fetchTrialAssessment.pending, pending)
      .addCase(fetchTrialAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.trialAssessment = action.payload;
      })
      .addCase(fetchTrialAssessment.rejected, rejected)
      .addCase(submitTrialAssessment.fulfilled, (state) => {
        state.loading = false;
        state.trialAssessment = null;
      })
      .addCase(submitTrialAssessment.rejected, rejected);
  },
});

export const { clearActiveAssessment, clearAssessmentError, resetCurrentAssessment, updateTimer } = assessmentSlice.actions;
export default assessmentSlice.reducer;
