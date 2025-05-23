import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import { channelsApi } from './channelSlice.js'
import { messagesApi } from './messagesSlice.js'
import { thunk } from 'redux-thunk'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(thunk)
      .concat(messagesApi.middleware)
      .concat(channelsApi.middleware)
  },
})
