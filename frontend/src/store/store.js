import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./slices/resultSlice";
import assessmentReducer from "./slices/assessmentSlice";
import authReducer from "./slices/authSlice";
import activeTabReducer from "./slices/activeTabSlice";

export const store = configureStore({
  reducer: {
    results: resultsReducer,
    assessments: assessmentReducer,
    auth: authReducer,
    activeTab: activeTabReducer,
  },
});

export default store;
