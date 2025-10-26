import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    // Append new users to existing feed
    addFeed: (state, action) => {
      return [...state, ...action.payload];
    },
    // Remove a user from feed (first one or any)
    removeUserFromFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
    // Reset feed (optional)
    resetFeed: () => {
      return [];
    },
  },
});

export const { addFeed, removeUserFromFeed, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;
