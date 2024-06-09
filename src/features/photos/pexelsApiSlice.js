import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  PEXELS_API_BASE_URL,
  QUERY,
  PEXELS_API_KEY,
} from "../../config/pexels";

export const pexelsApiSlice = createApi({
  reducerPath: "pexelsApi",
  tagTypes: ["Photos"],
  baseQuery: fetchBaseQuery({
    baseUrl: PEXELS_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", PEXELS_API_KEY);
      // headers.set("mode", "no-cors");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPhotos: builder.query({
      query: (page = 1, query = QUERY) => {
        return `?page=${page}&query=${query}`;
      },
      providesTags: ["Photos"],
    }),
  }),
});

export const { useGetPhotosQuery } = pexelsApiSlice;
