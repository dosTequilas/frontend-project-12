import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import { channelsApi } from "./channelSlice";
import { messagesApi } from "./messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(messagesApi.middleware)
      .concat(channelsApi.middleware),
});
