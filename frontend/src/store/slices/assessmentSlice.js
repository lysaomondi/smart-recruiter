import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as assessmentService from "../../services/assessmentService";

/* =========================
   RECRUITER ASSESSMENTS
========================= */

export const loadAssessments = createAsyncThunk(
  "assessments/loadAll",
  async (_, { rejectWithValue }) => {
    try {
      return await assessmentService.fetchAssessments();
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const loadAssessmentById = createAsyncThunk(
  "assessments/loadOne",
  async (id, { rejectWithValue }) => {
    try {
      return await assessmentService.fetchAssessmentById(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/*
 * Alias used by the interviewee assessment pages.
 */
export const fetchAssessmentDetails = loadAssessmentById;

export const createNewAssessment = createAsyncThunk(
  "assessments/create",
  async (payload, { rejectWithValue }) => {
    try {
      return await assessmentService.createAssessment(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const saveAssessmentChanges = createAsyncThunk(
  "assessments/update",
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      return await assessmentService.updateAssessment(
        id,
        changes
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const publish = createAsyncThunk(
  "assessments/publish",
  async (id, { rejectWithValue }) => {
    try {
      return await assessmentService.publishAssessment(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const closeAssessment = createAsyncThunk(
  "assessments/close",
  async (id, { rejectWithValue }) => {
    try {
      return await assessmentService.closeAssessment(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const removeAssessment = createAsyncThunk(
  "assessments/delete",
  async (id, { rejectWithValue }) => {
    try {
      return await assessmentService.deleteAssessment(id);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   QUESTIONS
========================= */

export const addQuestionToAssessment = createAsyncThunk(
  "assessments/addQuestion",
  async ({ assessmentId, question }, { rejectWithValue }) => {
    try {
      const newQuestion =
        await assessmentService.addQuestion(
          assessmentId,
          question
        );

      return {
        assessmentId,
        newQuestion,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   INTERVIEWEE ATTEMPTS
========================= */

export const startAssessmentAttempt = createAsyncThunk(
  "assessments/startAttempt",
  async (assessmentId, { rejectWithValue }) => {
    try {
      return await assessmentService.startAssessmentAttempt(
        assessmentId
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const submitAnswer = createAsyncThunk(
  "assessments/saveAnswer",
  async (
    { attemptId, answerData },
    { rejectWithValue }
  ) => {
    try {
      return await assessmentService.saveAttemptAnswer(
        attemptId,
        answerData
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const submitAssessment = createAsyncThunk(
  "assessments/submitAttempt",
  async (attemptId, { rejectWithValue }) => {
    try {
      return await assessmentService.submitAssessmentAttempt(
        attemptId
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const fetchAttempt = createAsyncThunk(
  "assessments/fetchAttempt",
  async (attemptId, { rejectWithValue }) => {
    try {
      return await assessmentService.fetchAttempt(
        attemptId
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const fetchRemainingTime = createAsyncThunk(
  "assessments/fetchRemainingTime",
  async (attemptId, { rejectWithValue }) => {
    try {
      return await assessmentService.fetchRemainingTime(
        attemptId
      );
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

/* =========================
   STATE
========================= */

const initialState = {
  items: [],
  active: null,

  currentAssessment: null,
  currentAttempt: null,

  status: "idle",
  loading: false,
  error: null,
};

/* =========================
   SLICE
========================= */

const assessmentSlice = createSlice({
  name: "assessments",

  initialState,

  reducers: {
    clearActiveAssessment(state) {
      state.active = null;
      state.currentAssessment = null;
    },

    clearCurrentAttempt(state) {
      state.currentAttempt = null;
    },

    clearAssessmentError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* =========================
         LOAD ALL
      ========================= */

      .addCase(loadAssessments.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })

      .addCase(loadAssessments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(loadAssessments.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error =
          action.payload || action.error.message;
      })

      /* =========================
         LOAD ONE
      ========================= */

      .addCase(loadAssessmentById.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })

      .addCase(loadAssessmentById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;

        state.active = action.payload;
        state.currentAssessment = action.payload;
      })

      .addCase(loadAssessmentById.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error =
          action.payload || action.error.message;
      })

      /* =========================
         CREATE
      ========================= */

      .addCase(createNewAssessment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.active = action.payload;
      })

      /* =========================
         UPDATE
      ========================= */

      .addCase(saveAssessmentChanges.fulfilled, (state, action) => {
        state.active = action.payload;

        state.items = state.items.map((assessment) =>
          assessment.id === action.payload.id
            ? action.payload
            : assessment
        );
      })

      /* =========================
         PUBLISH
      ========================= */

      .addCase(publish.fulfilled, (state, action) => {
        state.active = action.payload;

        state.items = state.items.map((assessment) =>
          assessment.id === action.payload.id
            ? action.payload
            : assessment
        );
      })

      /* =========================
         CLOSE
      ========================= */

      .addCase(closeAssessment.fulfilled, (state, action) => {
        state.active = action.payload;

        state.items = state.items.map((assessment) =>
          assessment.id === action.payload.id
            ? action.payload
            : assessment
        );
      })

      /* =========================
         DELETE
      ========================= */

      .addCase(removeAssessment.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (assessment) =>
            assessment.id !== action.payload
        );
      })

      /* =========================
         ADD QUESTION
      ========================= */

      .addCase(
        addQuestionToAssessment.fulfilled,
        (state, action) => {
          const {
            assessmentId,
            newQuestion,
          } = action.payload;

          if (state.active?.id === assessmentId) {
            state.active.questions = [
              ...(state.active.questions || []),
              newQuestion,
            ];
          }

          if (
            state.currentAssessment?.id ===
            assessmentId
          ) {
            state.currentAssessment.questions = [
              ...(state.currentAssessment.questions || []),
              newQuestion,
            ];
          }

          const assessment = state.items.find(
            (item) => item.id === assessmentId
          );

          if (assessment) {
            assessment.questions = [
              ...(assessment.questions || []),
              newQuestion,
            ];
          }
        }
      )

      /* =========================
         START / RESUME ATTEMPT
      ========================= */

      .addCase(
        startAssessmentAttempt.pending,
        (state) => {
          state.status = "loading";
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        startAssessmentAttempt.fulfilled,
        (state, action) => {
          state.status = "succeeded";
          state.loading = false;
          state.currentAttempt = action.payload;
        }
      )

      .addCase(
        startAssessmentAttempt.rejected,
        (state, action) => {
          state.status = "failed";
          state.loading = false;
          state.error =
            action.payload || action.error.message;
        }
      )

      /* =========================
         SAVE ANSWER
      ========================= */

      .addCase(
        submitAnswer.fulfilled,
        (state, action) => {
          if (!state.currentAttempt) return;

          const savedAnswer = action.payload;

          const existingAnswers =
            state.currentAttempt.answer_records || [];

          const existingIndex =
            existingAnswers.findIndex(
              (answer) =>
                answer.id === savedAnswer.id
            );

          if (existingIndex >= 0) {
            existingAnswers[existingIndex] =
              savedAnswer;
          } else {
            existingAnswers.push(savedAnswer);
          }

          state.currentAttempt.answer_records =
            existingAnswers;
        }
      )

      .addCase(
        submitAnswer.rejected,
        (state, action) => {
          state.error =
            action.payload || action.error.message;
        }
      )

      /* =========================
         FETCH ATTEMPT
      ========================= */

      .addCase(
        fetchAttempt.fulfilled,
        (state, action) => {
          state.currentAttempt = action.payload;
        }
      )

      /* =========================
         REMAINING TIME
      ========================= */

      .addCase(
        fetchRemainingTime.fulfilled,
        (state, action) => {
          if (state.currentAttempt) {
            state.currentAttempt.remaining_seconds =
              action.payload.remaining_seconds;

            state.currentAttempt.expired =
              action.payload.expired;
          }
        }
      )

      /* =========================
         SUBMIT ASSESSMENT
      ========================= */

      .addCase(
        submitAssessment.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        submitAssessment.fulfilled,
        (state, action) => {
          state.loading = false;

          if (state.currentAttempt) {
            state.currentAttempt.status =
              "graded";
          }
        }
      )

      .addCase(
        submitAssessment.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || action.error.message;
        }
      );
  },
});

/* =========================
   ACTIONS
========================= */

export const {
  clearActiveAssessment,
  clearCurrentAttempt,
  clearAssessmentError,
} = assessmentSlice.actions;

export default assessmentSlice.reducer;