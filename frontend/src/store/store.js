import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice.js'
import { channelsApi } from '../services/channelApi.js'
import { messagesApi } from '../services/messagesApi.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(messagesApi.middleware)
      .concat(channelsApi.middleware)
  },
})
