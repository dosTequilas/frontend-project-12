import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронное действие для получения сообщений
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/v1/messages", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Массив сообщений
  }
);

// Асинхронное действие для получения каналов
export const fetchChannels = createAsyncThunk(
  "chat/fetchChannels",
  async (_, { getState }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/api/v1/channels", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Массив каналов
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    channels: [],
    messages: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchChannels.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.channels = action.payload;
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default chatSlice.reducer;
