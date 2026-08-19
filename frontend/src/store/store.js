import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import activeTabReducer from "./slices/activeTabSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activeTab: activeTabReducer,
  },
});
