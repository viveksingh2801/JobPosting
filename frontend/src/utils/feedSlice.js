import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },
    resetFeed: () => []
  },
});

export const { addFeed, resetFeed } = feedSlice.actions;
export default feedSlice.reducer;

 