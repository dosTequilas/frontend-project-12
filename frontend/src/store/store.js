import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";
import { channelsApi } from "./channelSlice";
import { messagesApi } from "./messagesSlice";
import { thunk } from "redux-thunk";
import channelReducer, { setSelectedChannel } from "./channelSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    channels: channelReducer, // Добавляем новый редуктор для хранения selectedChannelId
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(thunk)
      .concat(messagesApi.middleware)
      .concat(channelsApi.middleware),
});
