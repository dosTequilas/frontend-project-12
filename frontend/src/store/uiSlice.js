import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from './channelSlice';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedChannelId: null,
  },
  reducers: {
    setSelectedChannelId: (state, action) => {
      state.selectedChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.removeChannel.matchFulfilled,
      (state) => {
        state.selectedChannelId = '1';
      },
    );
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => {
        console.log('action: ', action);
        state.selectedChannelId = action.payload.id;
      },
    );
  },
});

export const { setSelectedChannelId } = uiSlice.actions;
export default uiSlice.reducer;
