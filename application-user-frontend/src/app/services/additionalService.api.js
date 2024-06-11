import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

export const additionalServiceApi = createApi({
    reducerPath: "additionalServiceApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getAllAdditionalServices: builder.query({
            query: () => `additional-services`,
            transformResponse: (response) => {
                return response.map((service) => {
                    return {
                        ...service,
                        thumbnail: service.thumbnail.startsWith("/api") ? `${DOMAIN}${service.thumbnail}` : service.thumbnail,
                    };
                });
            }
        }),
    }),
});

export const {
    useGetAllAdditionalServicesQuery
} = additionalServiceApi;