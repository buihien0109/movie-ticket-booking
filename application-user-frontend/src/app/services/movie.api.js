import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

export const movieApi = createApi({
    reducerPath: "movieApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        searchMovies: builder.query({
            query: ({ page, genre, country, releaseYear, keyword }) => {
                const params = {};

                if (page != null) params.page = page;
                if (genre != null) params.genre = genre;
                if (country != null) params.country = country;
                if (releaseYear != null) params.releaseYear = releaseYear;
                if (keyword != null) params.keyword = keyword;

                return {
                    url: `movies/search`,
                    method: "GET",
                    params
                }
            },
            transformResponse: (response, meta, arg) => {
                return {
                    ...response,
                    content: response.content.map((item) => {
                        return {
                            ...item,
                            poster: item.poster.startsWith("/api") ? `${DOMAIN}${item.poster}` : item.poster
                        };
                    })
                }
            },
        }),
        getMovieDetail: builder.query({
            query: ({ id, slug }) => `movies/${id}/${slug}`,
            transformResponse: (response, meta, arg) => {
                return {
                    ...response,
                    poster: response.poster.startsWith("/api") ? `${DOMAIN}${response.poster}` : response.poster,
                    actors: response.actors.map((actor) => {
                        return {
                            ...actor,
                            avatar: actor.avatar.startsWith("/api") ? `${DOMAIN}${actor.avatar}` : actor.avatar
                        }
                    }),
                    directors: response.directors.map((director) => {
                        return {
                            ...director,
                            avatar: director.avatar.startsWith("/api") ? `${DOMAIN}${director.avatar}` : director.avatar
                        }
                    }),
                    reviews: response.reviews.map((review) => {
                        return {
                            ...review,
                            user: {
                                ...review.user,
                                avatar: review.user.avatar.startsWith("/api") ? `${DOMAIN}${review.user.avatar}` : review.user.avatar,
                            }
                        }
                    })
                };
            },
        }),
        getShowingNowMovies: builder.query({
            query: () => `movies/showing-now`,
            transformResponse: (response, meta, arg) => {
                return response.map((movie) => {
                    return {
                        ...movie,
                        poster: movie.poster.startsWith("/api") ? `${DOMAIN}${movie.poster}` : movie.poster,
                        reviews: movie.reviews.map((review) => {
                            return {
                                ...review,
                                user: {
                                    ...review.user,
                                    avatar: review.user.avatar.startsWith("/api") ? `${DOMAIN}${review.user.avatar}` : review.user.avatar
                                }
                            }
                        })
                    };
                });
            },
        }),
        getComingSoonMovies: builder.query({
            query: () => `movies/coming-soon`,
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        poster: item.poster.startsWith("/api") ? `${DOMAIN}${item.poster}` : item.poster
                    };
                });
            },
        }),
        getReviewsByMovieId: builder.query({
            query: ({ movieId, page }) => {
                return {
                    url: `movies/${movieId}/reviews`,
                    method: "GET",
                    params: {
                        movieId,
                        page
                    },
                }

            },
            transformResponse: (response, meta, arg) => {
                return {
                    ...response, content: response.content.map((item) => {
                        return {
                            ...item,
                            user: {
                                ...item.user,
                                avatar: item.user.avatar.startsWith("/api") ? `${DOMAIN}${item.user.avatar}` : item.user.avatar
                            },
                        };
                    })
                }
            },
        }),
        getShowtimesByMovie: builder.query({
            query: ({ showDate, movieId }) => {
                return {
                    url: `movies/${movieId}/showtimes`,
                    method: "GET",
                    params: {
                        showDate
                    }
                }
            }
        }),
        checkMovieHasShowtimes: builder.query({
            query: ({ movieId }) => {
                return {
                    url: `movies/${movieId}/has-showtimes`,
                    method: "GET"
                }
            }
        })
    }),
});

export const {
    useGetMovieDetailQuery,
    useGetReviewsByMovieIdQuery,
    useLazyGetReviewsByMovieIdQuery,
    useGetShowingNowMoviesQuery,
    useGetComingSoonMoviesQuery,
    useSearchMoviesQuery,
    useLazySearchMoviesQuery,
    useGetShowtimesByMovieQuery,
    useCheckMovieHasShowtimesQuery
} = movieApi;
