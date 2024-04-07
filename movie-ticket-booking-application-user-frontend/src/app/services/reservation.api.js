import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN } from "../../data/constants";

export const reservationApi = createApi({
    reducerPath: "reservationApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_DOMAIN,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        bookReservation: builder.mutation({
            query: (data) => {
                return {
                    url: "seat-reservations/book",
                    method: "POST",
                    body: data
                }
            }
        }),
        cancelReservation: builder.mutation({
            query: (data) => {
                return {
                    url: `seat-reservations/cancel`,
                    method: "POST",
                    body: data
                }
            }
        }),
    }),
});

export const {
    useBookReservationMutation,
    useCancelReservationMutation
} = reservationApi;
