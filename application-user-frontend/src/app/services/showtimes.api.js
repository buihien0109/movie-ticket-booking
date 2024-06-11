import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

export const showtimesApi = createApi({
    reducerPath: "showtimesApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getShowtimesByCinema: builder.query({
            query: ({ showDate, cinemaId }) => {
                return {
                    url: `showtimes/cinemas`,
                    method: "GET",
                    params: {
                        showDate,
                        cinemaId
                    }
                }
            },
            transformResponse: (response) => {
                return response.map((showtime) => {
                    return {
                        ...showtime,
                        movie: {
                            ...showtime.movie,
                            poster: showtime.movie.poster.startsWith("/api") ? `${DOMAIN}${showtime.movie.poster}` : showtime.movie.poster
                        }
                    };
                })
            }
        })
    }),
});

export const {
    useGetShowtimesByCinemaQuery
} = showtimesApi;
