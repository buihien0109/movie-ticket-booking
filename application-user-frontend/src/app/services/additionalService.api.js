import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC } from "../../data/constants";

export const additionalServiceApi = createApi({
    reducerPath: "additionalServiceApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getAllAdditionalServices: builder.query({
            query: () => `additional-services`,
        })
    }),
});

export const {
    useGetAllAdditionalServicesQuery
} = additionalServiceApi;