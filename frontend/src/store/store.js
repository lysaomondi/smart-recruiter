import { configureStore } from "@reduxjs/toolkit";

import resultsReducer from "./slices/resultSlice";
import assessmentReducer from "./slices/assessmentSlice";
import authReducer from "./slices/authSlice";
import activeTabReducer from "./slices/activeTabSlice";
import invitationReducer from "./slices/invitationSlice";

export const store = configureStore({
  reducer: {
    results: resultsReducer,
    assessments: assessmentReducer,
    assessment: assessmentReducer,
    auth: authReducer,
    activeTab: activeTabReducer,
    invitation: invitationReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
