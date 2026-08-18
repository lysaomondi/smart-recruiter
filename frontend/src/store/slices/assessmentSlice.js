import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as assessmentService from "../../services/assessmentService";

export const loadAssessments = createAsyncThunk(
  "assessments/loadAll",
  async () => await assessmentService.fetchAssessments()
);

const initialState = {
  items: [],
  active: null,
  status: "idle",
  error: null,
};

const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAssessments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadAssessments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadAssessments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default assessmentSlice.reducer;
