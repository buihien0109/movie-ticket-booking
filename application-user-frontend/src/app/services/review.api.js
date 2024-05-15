import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN, API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

// Base query cho các API sử dụng API_DOMAIN
const baseQuery = fetchBaseQuery({
    baseUrl: API_DOMAIN,
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

export const reviewApi = createApi({
    reducerPath: "reviewApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (newReview) => ({
                url: `reviews`,
                method: "POST",
                body: newReview,
            }),
            invalidatesTags: ["Review"],
        }),
        updateReview: builder.mutation({
            query: ({ id, formData }) => ({
                url: `reviews/${id}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ["Review"],
        }),
        deleteReview: builder.mutation({
            query: ({ reviewId }) => ({
                url: `reviews/${reviewId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Review"],
        }),
    }),
});

// Export hooks
export const {
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
