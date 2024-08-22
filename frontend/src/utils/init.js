import { io } from "socket.io-client";
import { store } from "../store/store";
import { messagesApi } from "../store/messagesSlice";
import { channelsApi } from "../store/channelSlice";

export const initializeApp = () => {
  // слушатели событий сервера
  const socket = io();
  socket.on("newMessage", (message) => {
    store.dispatch(
      messagesApi.util.updateQueryData("getMessages", undefined, (draft) => {
        draft.push(message);
      })
    );
  });

  socket.on("newChannel", () => {
    store.dispatch(channelsApi.util.invalidateTags(["Channels"]));
  });

  socket.on("removeChannel", (data) => {
    const state = store.getState();
    const currentChannel = state.chat.currentChannel;
    store.dispatch(channelsApi.util.invalidateTags(["Channels"]));
  });

  socket.on("renameChannel", () => {
    store.dispatch(channelsApi.util.invalidateTags(["Channels"])());
  });
};
