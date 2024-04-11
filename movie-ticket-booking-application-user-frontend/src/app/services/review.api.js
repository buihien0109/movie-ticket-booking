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
        getAllReviewsByMovieId: builder.query({
            query: ({ movieId, page }) => ({
                url: `${API_DOMAIN_PUBLIC}movies/${movieId}/reviews`,
                method: "GET",
                params: { page },
            }),
            providesTags: ["Review"],
            transformResponse: (response) => {
                return {
                    ...response,
                    content: response.content.map(review => ({
                        ...review,
                        images: review.images ? review.images.map(image => image.startsWith("/api") ? `${DOMAIN}${image}` : image) : [],
                        user: {
                            ...review.user,
                            avatar: review.user.avatar.startsWith("/api") ? `${DOMAIN}${review.user.avatar}` : review.user.avatar
                        }
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
    useGetAllReviewsOfMoviesQuery,
    useGetAllReviewsByMovieIdQuery,
    useLazyGetAllReviewsByMovieIdQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewApi;
