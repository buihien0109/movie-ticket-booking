import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

const baseQuery = fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC });

export const reviewPublicApi = createApi({
    reducerPath: "reviewPublicApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        getAllReviewsOfMovies: builder.query({
            query: ({ page }) => ({
                url: `reviews`,
                method: "GET",
                params: { page },
            }),
            transformResponse: (response) => {
                return {
                    ...response,
                    content: response.content.map(movie => ({
                        ...movie,
                        poster: movie.poster.startsWith("/api") ? `${DOMAIN}${movie.poster}` : movie.poster,
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
                url: `movies/${movieId}/reviews`,
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
        })
    }),
});

// Export hooks
export const {
    useGetAllReviewsOfMoviesQuery,
    useGetAllReviewsByMovieIdQuery,
    useLazyGetAllReviewsByMovieIdQuery,
} = reviewPublicApi;
