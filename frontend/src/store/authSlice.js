import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    username: null,
  },
  reducers: {
    setAuthData: (state, action) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
    },
    clearAuthData: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setAuthData, clearAuthData } = authSlice.actions;
export default authSlice.reducer;
