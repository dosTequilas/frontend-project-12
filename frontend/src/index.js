import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { io } from "socket.io-client";
import { fetchMessages, fetchChannels } from "./store/chatSlice"; // редьюсеры чата

const socket = io();

// слушатели событий сервера
socket.on("newMessage", (message) => {
  const state = store.getState();
  const currentChannel = state.chat.currentChannel;
  if (message.channelId === currentChannel) {
    store.dispatch(fetchMessages());
  }
});

socket.on("newChannel", () => {
  store.dispatch(fetchChannels());
});

socket.on("removeChannel", (data) => {
  const state = store.getState();
  const currentChannel = state.chat.currentChannel;
  store.dispatch(fetchChannels());
});

socket.on("renameChannel", () => {
  store.dispatch(fetchChannels());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
