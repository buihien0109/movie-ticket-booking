import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC } from "../../data/constants";

export const countryApi = createApi({
    reducerPath: "countryApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getAllCountries: builder.query({
            query: () => `countries`,
        })
    }),
});

export const {
    useGetAllCountriesQuery
} = countryApi;
