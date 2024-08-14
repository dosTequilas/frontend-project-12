import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "/messages",
    }),
    sendMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/messages",
        method: "POST",
        body: newMessage,
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const { useGetMessagesQuery, useSendMessageMutation } = messagesApi;
