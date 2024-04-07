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
        getAllReviewsOfMovies: builder.query({
            query: ({ page }) => ({
                url: `${API_DOMAIN_PUBLIC}reviews`,
                method: "GET",
                params: { page },
            }),
            providesTags: ["Review"],
            transformResponse: (response) => {
                return {
                    ...response,
                    content: response.content.map(movie => ({
                        ...movie,
                        poster: movie.poster.startsWith("/api") ? `${API_DOMAIN_PUBLIC}${movie.poster}` : movie.poster,
                        reviews: movie.reviews.map(review => ({
                            ...review,
                            user: {
                                ...review.user,
                                avatar: review.user.avatar.startsWith("/api") ? `${DOMAIN}${review.user.avatar}` : review.user.avatar
                            }
                        }))
                    })),
                };
            },
        }),
        createReview: builder.mutation({
            query: (newReview) => ({
                url: `reviews`,
                method: "POST",
                body: newReview,
            }),
            invalidatesTags: ["Review"],
        }),
        updateReview: builder.mutation({
            query: ({ reviewId, ...updatedReview }) => ({
                url: `reviews/${reviewId}`,
                method: "PUT",
                body: updatedReview
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
    useGetAllReviewsOfMoviesQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
