import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const baseTicketPriceApi = createApi({
    reducerPath: "baseTicketPriceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getBaseTicketPrices: builder.query({
            query: () => 'base-ticket-prices',
            providesTags: ['BaseTicketPrice'],
        }),
        getBaseTicketPriceById: builder.query({
            query: (id) => `base-ticket-prices/${id}`,
        }),
        createBaseTicketPrice: builder.mutation({
            query: (newBaseTicketPrice) => ({
                url: 'base-ticket-prices',
                method: 'POST',
                body: newBaseTicketPrice,
            }),
            invalidatesTags: [{ type: 'BaseTicketPrice' }],
        }),
        updateBaseTicketPrice: builder.mutation({
            query: ({ id, ...updatedBaseTicketPrice }) => ({
                url: `base-ticket-prices/${id}`,
                method: 'PUT',
                body: updatedBaseTicketPrice,
            }),
            invalidatesTags: [{ type: 'BaseTicketPrice' }],
        }),
        deleteBaseTicketPrice: builder.mutation({
            query: (id) => ({
                url: `base-ticket-prices/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'BaseTicketPrice' }],
        }),
    }),
});


export const {
    useGetBaseTicketPricesQuery,
    useGetBaseTicketPriceByIdQuery,
    useCreateBaseTicketPriceMutation,
    useUpdateBaseTicketPriceMutation,
    useDeleteBaseTicketPriceMutation,
} = baseTicketPriceApi;
