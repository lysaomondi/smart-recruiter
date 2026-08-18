import { configureStore } from "@reduxjs/toolkit";
import resultsReducer from "./slices/resultSlice";

export const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});