import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC } from "../../data/constants";

export const auditoriumApi = createApi({
    reducerPath: "auditoriumApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getSeatsByAuditorium: builder.query({
            query: ({ auditoriumId, showtimeId }) => `auditoriums/${auditoriumId}/showtimes/${showtimeId}/seats`,
        })
    }),
});

export const {
    useGetSeatsByAuditoriumQuery
} = auditoriumApi;