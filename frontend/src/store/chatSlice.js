import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
});

export default chatSlice.reducer;
