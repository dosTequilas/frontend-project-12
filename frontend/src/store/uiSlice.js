import { createSlice } from '@reduxjs/toolkit'
import { channelsApi } from './channelSlice.js'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    selectedChannelId: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.removeChannel.matchFulfilled,
      (state) => {
        state.selectedChannelId = '1'
      },
    )
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => {
        console.log('action: ', action)
        state.selectedChannelId = action.payload.id
      },
    )
  },
})

export default uiSlice.reducer
