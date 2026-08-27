import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as assessmentService from "../../services/assessmentService";

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

export const closeAssessment = createAsyncThunk(
  "assessments/close",
  async (id) => await assessmentService.closeAssessment(id)
);

export const removeAssessment = createAsyncThunk(
  "assessments/delete",
  async (id) => await assessmentService.deleteAssessment(id)
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
};

const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {
    clearActiveAssessment(state) {
      state.active = null;
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
      .addCase(closeAssessment.fulfilled, (state, action) => {
        state.active = action.payload;
        state.items = state.items.map((a) =>
          a.id === action.payload.id ? action.payload : a
        );
      })
      .addCase(removeAssessment.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      })
      .addCase(addQuestionToAssessment.fulfilled, (state, action) => {
        const { assessmentId, newQuestion } = action.payload;
        if (state.active?.id === assessmentId) {
          state.active.questions.push(newQuestion);
        }
        const inList = state.items.find((a) => a.id === assessmentId);
        if (inList) inList.questions.push(newQuestion);
      });
  },
});

export const { clearActiveAssessment } = assessmentSlice.actions;
export default assessmentSlice.reducer;
