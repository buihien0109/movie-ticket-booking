import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const seatApi = createApi({
    reducerPath: "seatApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSeatsByAuditorium: builder.query({
            query: (auditoriumId) => `auditoriums/${auditoriumId}/seats`,
            providesTags: ['Seat'],
        }),

        updateSeat: builder.mutation({
            query: ({ id, ...updatedSeat }) => ({
                url: `seats/${id}`,
                method: 'PUT',
                body: updatedSeat,
            }),
            invalidatesTags: [{ type: 'Seat' }],
        }),
        updateRowSeat: builder.mutation({
            query: (data) => ({
                url: `seats/update-row-seats`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: [{ type: 'Seat' }],
        }),
    }),
});

export const {
    useGetSeatsByAuditoriumQuery,
    useUpdateSeatMutation,
    useUpdateRowSeatMutation,
} = seatApi;
