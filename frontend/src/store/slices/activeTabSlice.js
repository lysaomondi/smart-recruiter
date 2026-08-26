import { createSlice } from "@reduxjs/toolkit";

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
const savedUserRole = currentUser?.role?.toUpperCase();

const activeTabSlice = createSlice({
  name: "activeTab",
  // Open the matching dashboard again when a saved session is restored.
  initialState:
    savedUserRole === "RECRUITER"
      ? "recruiter-dashboard"
      : savedUserRole === "INTERVIEWEE"
        ? "interviewee-dashboard"
        : "login",
  reducers: {
    setActiveTab: (_state, action) => action.payload,
  },
});

export const { setActiveTab } = activeTabSlice.actions;

export default activeTabSlice.reducer;
