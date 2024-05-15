import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const cinemaApi = createApi({
    reducerPath: "cinemaApi",
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
        getCinemas: builder.query({
            query: () => "cinemas",
            providesTags: ["Cinema"],
        }),
        getCinemaById: builder.query({
            query: (cinemaId) => `cinemas/${cinemaId}`,
            providesTags: (result, error, cinemaId) => [
                { type: "Cinema", id: cinemaId },
            ],
        }),
        createCinema: builder.mutation({
            query: (newCinema) => ({
                url: "cinemas",
                method: "POST",
                body: newCinema,
            }),
            invalidatesTags: ["Cinema"],
        }),
        updateCinema: builder.mutation({
            query: ({ cinemaId, ...updatedCinema }) => ({
                url: `cinemas/${cinemaId}`,
                method: "PUT",
                body: updatedCinema,
            }),
            invalidatesTags: (result, error, { cinemaId }) => [
                { type: "Cinema", id: cinemaId },
            ],
        }),
        deleteCinema: builder.mutation({
            query: (cinemaId) => ({
                url: `cinemas/${cinemaId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Cinema"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetCinemasQuery,
    useGetCinemaByIdQuery,
    useCreateCinemaMutation,
    useUpdateCinemaMutation,
    useDeleteCinemaMutation,
} = cinemaApi;
