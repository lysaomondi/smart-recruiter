import { createSlice } from "@reduxjs/toolkit";

const defaultUsers = [
  {
    id: 1,
    name: "Smart Recruiter Recruiter",
    email: "recruiter@smartrecruiter.com",
    password: "password123",
    role: "recruiter",
  },
  {
    id: 2,
    name: "Smart Recruiter Interviewee",
    email: "interviewee@smartrecruiter.com",
    password: "password123",
    role: "interviewee",
  },
];

const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");

// Create demo accounts once, so the local-only app can be used immediately.
if (!Array.isArray(storedUsers) || storedUsers.length === 0) {
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

const savedUser = localStorage.getItem("currentUser");

const initialState = {
  // Restore the saved session when the browser page refreshes.
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: Boolean(savedUser),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Start a login or registration attempt and clear any old error.
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },

    // Store the signed-in user in Redux. The component saves the browser session.
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },

    // Reset authentication state when credentials are not valid.
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    // Remove the saved browser session and reset the Redux authentication state.
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;

      localStorage.removeItem("currentUser");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;

export default authSlice.reducer;
