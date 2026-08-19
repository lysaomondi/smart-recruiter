import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [],
  currentResult: null,
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