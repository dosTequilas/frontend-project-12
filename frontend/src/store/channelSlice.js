import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    tagTypes: ["Channels"],
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => "/channels",
      providesTags: ["Channels"],
    }),
    addChannel: builder.mutation({
      query: (channelName) => ({
        url: "/channels",
        method: "POST",
        body: channelName,
      }),
      invalidatesTags: ["Channels"],
    }),
    removeChannel: builder.mutation({
      query: (channelId) => ({
        url: `/channels/${channelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Channels"],
    }),
    renameChannel: builder.mutation({
      query: ({ channelId, newName }) => ({
        url: `/channels/${channelId}`,
        method: "PATCH",
        body: { name: newName },
      }),
      invalidatesTags: ["Channels"], // Обновляет кэш данных каналов
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi;
