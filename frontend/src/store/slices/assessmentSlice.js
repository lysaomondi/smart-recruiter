import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as assessmentService from "../../services/assessmentService";
import intervieweeAssessmentService from "../../services/assessmentService";

const intervieweeThunk = (type, request) =>
  createAsyncThunk(type, async (payload, { rejectWithValue }) => {
    try {
      return await request(payload);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  });

export const fetchMyAssessments = intervieweeThunk("assessment/fetchMyAssessments", () => intervieweeAssessmentService.getMyAssessments());
export const fetchAssessmentDetails = intervieweeThunk("assessment/fetchAssessmentDetails", (id) => intervieweeAssessmentService.getAssessmentById(id));
export const startAssessmentAttempt = intervieweeThunk("assessment/startAttempt", (id) => intervieweeAssessmentService.startAttempt(id));
export const submitAnswer = intervieweeThunk("assessment/submitAnswer", ({ attemptId, questionId, answerData }) => intervieweeAssessmentService.submitAnswer(attemptId, questionId, answerData));
export const submitAssessment = intervieweeThunk("assessment/submitAssessment", (id) => intervieweeAssessmentService.submitAssessment(id));
export const fetchTrialAssessment = intervieweeThunk("assessment/fetchTrialAssessment", () => intervieweeAssessmentService.getTrialAssessment());
export const submitTrialAssessment = intervieweeThunk("assessment/submitTrialAssessment", (answers) => intervieweeAssessmentService.submitTrialAssessment(answers));

export const loadAssessments = createAsyncThunk(
  "assessments/loadAll",
  async () => await assessmentService.fetchAssessments()
);

export const loadAssessmentById = createAsyncThunk(
  "assessments/loadOne",
  async (id) => await assessmentService.fetchAssessmentById(id)
);

export const createNewAssessment = createAsyncThunk(
  "assessments/create",
  async (payload) => await assessmentService.createAssessment(payload)
);

export const saveAssessmentChanges = createAsyncThunk(
  "assessments/update",
  async ({ id, changes }) => await assessmentService.updateAssessment(id, changes)
);

export const publish = createAsyncThunk(
  "assessments/publish",
  async (id) => await assessmentService.publishAssessment(id)
);

export const addQuestionToAssessment = createAsyncThunk(
  "assessments/addQuestion",
  async ({ assessmentId, question }) => {
    const newQuestion = await assessmentService.addQuestion(assessmentId, question);
    return { assessmentId, newQuestion };
  }
);

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

const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    clearActiveAssessment(state) {
      state.active = null;
    },
    clearAssessmentError(state) {
      state.error = null;
    },
    resetCurrentAssessment(state) {
      state.currentAssessment = null;
      state.currentAttempt = null;
    },
    updateTimer(state, action) {
      if (state.currentAttempt) state.currentAttempt.timeRemaining = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAssessments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAssessments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadAssessments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(loadAssessmentById.fulfilled, (state, action) => {
        state.active = action.payload;
      })
      .addCase(createNewAssessment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.active = action.payload;
      })
      .addCase(saveAssessmentChanges.fulfilled, (state, action) => {
        state.active = action.payload;
        state.items = state.items.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(publish.fulfilled, (state, action) => {
        state.active = action.payload;
        state.items = state.items.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(addQuestionToAssessment.fulfilled, (state, action) => {
        const { assessmentId, newQuestion } = action.payload;
        if (state.active?.id === assessmentId) {
          state.active.questions.push(newQuestion);
        }
        const inList = state.items.find((a) => a.id === assessmentId);
        if (inList) inList.questions.push(newQuestion);
      })
      .addCase(fetchMyAssessments.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyAssessments.fulfilled, (state, action) => { state.loading = false; state.assessments = action.payload; })
      .addCase(fetchMyAssessments.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchAssessmentDetails.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchAssessmentDetails.fulfilled, (state, action) => { state.loading = false; state.currentAssessment = action.payload; })
      .addCase(fetchAssessmentDetails.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(startAssessmentAttempt.fulfilled, (state, action) => { state.loading = false; state.currentAttempt = action.payload; })
      .addCase(startAssessmentAttempt.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(startAssessmentAttempt.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.loading = false;
        if (!state.currentAttempt) return;
        const answers = state.currentAttempt.answers || (state.currentAttempt.answers = []);
        const index = answers.findIndex((answer) => answer.questionId === action.payload.questionId);
        if (index >= 0) answers[index] = action.payload; else answers.push(action.payload);
      })
      .addCase(submitAssessment.fulfilled, (state) => { state.loading = false; if (state.currentAttempt) state.currentAttempt.submitted = true; })
      .addCase(fetchTrialAssessment.fulfilled, (state, action) => { state.loading = false; state.trialAssessment = action.payload; })
      .addCase(fetchTrialAssessment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchTrialAssessment.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(submitTrialAssessment.fulfilled, (state) => { state.loading = false; state.trialAssessment = null; });
  },
});

export const { clearActiveAssessment, clearAssessmentError, resetCurrentAssessment, updateTimer } = assessmentSlice.actions;
export default assessmentSlice.reducer;
