import { configureStore } from "@reduxjs/toolkit";
import assessmentReducer from "./slices/assessmentSlice";

export const store = configureStore({
  reducer: {
    assessments: assessmentReducer,
  },
});

export default store;
