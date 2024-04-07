import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC } from "../../data/constants";

export const genreApi = createApi({
    reducerPath: "genreApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getAllGenres: builder.query({
            query: () => `genres`,
        })
    }),
});

export const {
    useGetAllGenresQuery
} = genreApi;
