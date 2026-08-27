import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as resultService from "../../services/resultService";

export const loadResults = createAsyncThunk(
  "results/load",
  resultService.fetchResults,
);
export const loadMyResults = createAsyncThunk(
  "results/loadMine",
  resultService.fetchMyResults,
);
export const loadResult = createAsyncThunk(
  "results/loadOne",
  resultService.fetchResult,
);
export const loadStatistics = createAsyncThunk(
  "results/loadStatistics",
  resultService.fetchStatistics,
);
export const releaseResult = createAsyncThunk(
  "results/release",
  resultService.releaseResult,
);
export const saveFeedback = createAsyncThunk(
  "results/saveFeedback",
  ({ resultId, feedbackText }) =>
    resultService.createFeedback(resultId, feedbackText),
);

const initialState = {
  results: [],
  currentResult: null,
  statistics: null,
  loading: false,
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,

  reducers: {
    setResults(state, action) {
      state.results = action.payload;
    },

    setCurrentResult(state, action) {
      state.currentResult = action.payload;
    },

    clearCurrentResult(state) {
      state.currentResult = null;
    },

    setResultsLoading(state, action) {
      state.loading = action.payload;
    },

    setResultsError(state, action) {
      state.error = action.payload;
    },

    clearResultsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(loadResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadMyResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMyResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(loadMyResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadResult.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadResult.fulfilled, (state, action) => {
        state.loading = false;
        state.currentResult = action.payload;
      })
      .addCase(loadResult.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
      })
      .addCase(loadStatistics.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(releaseResult.fulfilled, (state, action) => {
        state.currentResult = action.payload;
      });
  },
});

export const {
  setResults,
  setCurrentResult,
  clearCurrentResult,
  setResultsLoading,
  setResultsError,
  clearResultsError,
} = resultsSlice.actions;

export default resultsSlice.reducer;
