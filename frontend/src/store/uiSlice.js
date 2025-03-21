import { createSlice } from "@reduxjs/toolkit";
import { channelsApi } from "./channelSlice";
import matchers from "@testing-library/jest-dom/matchers";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    selectedChannelId: 1,
  },
  reducers: {
    setSelectedChannelId: (state, action) => {
      state.selectedChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.removeChannel.matchFulfilled,
      (state, action) => {
        state.selectedChannelId = "1";
      }
    );
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => {
        // state.selectedChannelId = action.payload;
      }
    );
  },
});

export const { setSelectedChannelId } = uiSlice.actions;
export default uiSlice.reducer;
