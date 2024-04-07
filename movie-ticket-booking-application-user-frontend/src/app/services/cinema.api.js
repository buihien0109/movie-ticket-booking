import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC } from "../../data/constants";

export const cinemaApi = createApi({
    reducerPath: "cinemaApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getAllCinemas: builder.query({
            query: () => `cinemas`,
        })
    }),
});

export const {
    useGetAllCinemasQuery
} = cinemaApi;
