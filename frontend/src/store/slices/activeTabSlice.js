import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const activeTabSlice = createSlice({
  name: "activeTab",
  // Open the matching dashboard again when a saved session is restored.
  initialState:
    currentUser?.role === "recruiter"
      ? "recruiter-dashboard"
      : currentUser?.role === "interviewee"
        ? "interviewee-dashboard"
        : "login",
  reducers: {
    setActiveTab: (_state, action) => action.payload,
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
