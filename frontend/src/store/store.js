import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { channelsApi } from './channelSlice';
import { messagesApi } from './messagesSlice';
import { thunk } from 'redux-thunk';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(thunk)
      .concat(messagesApi.middleware)
      .concat(channelsApi.middleware),
});
