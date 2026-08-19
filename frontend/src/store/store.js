import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./slices/resultSlice";
import assessmentReducer from "./slices/assessmentSlice";

export const store = configureStore({
  reducer: {
    results: resultsReducer,
    assessments: assessmentReducer,
  },
});

export default store;
