import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC } from "../../data/constants";

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
            }
        })
    }),
});

export const {
    useGetShowtimesByCinemaQuery
} = showtimesApi;
