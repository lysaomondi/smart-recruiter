import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  results: [
    {
      id: 1,
      candidate: "Jordan Smith",
      email: "jordan@example.com",
      score: 94,
      grade: "A",
      status: "Passed",
    },
    {
      id: 2,
      candidate: "Alex Brown",
      email: "alex@example.com",
      score: 89,
      grade: "A",
      status: "Passed",
    },
    {
      id: 3,
      candidate: "Sam Wilson",
      email: "sam@example.com",
      score: 76,
      grade: "B",
      status: "Passed",
    },
    {
      id: 4,
      candidate: "John Doe",
      email: "john@example.com",
      score: 58,
      grade: "C",
      status: "Failed",
    },
  ],
  loading: false,
  error: null,
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
});

export default resultsSlice.reducer;