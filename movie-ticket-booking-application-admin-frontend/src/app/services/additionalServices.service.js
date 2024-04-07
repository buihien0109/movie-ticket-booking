import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const additionalServiceApi = createApi({
    reducerPath: "additionalServiceApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getAdditionalServices: builder.query({
            query: () => "additional-services",
            providesTags: ["AdditionalService"],
        }),
        getAdditionalServiceById: builder.query({
            query: (additionalServiceId) => `additional-services/${additionalServiceId}`,
            providesTags: (result, error, additionalServiceId) => [
                { type: "AdditionalService", id: additionalServiceId },
            ],
        }),
        createAdditionalService: builder.mutation({
            query: (newAdditionalService) => ({
                url: "additional-services",
                method: "POST",
                body: newAdditionalService,
            }),
            invalidatesTags: ["AdditionalService"],
        }),
        updateAdditionalService: builder.mutation({
            query: ({ additionalServiceId, ...updatedAdditionalService }) => ({
                url: `additional-services/${additionalServiceId}`,
                method: "PUT",
                body: updatedAdditionalService,
            }),
            invalidatesTags: (result, error, { additionalServiceId }) => [
                { type: "AdditionalService", id: additionalServiceId },
            ],
        }),
        deleteAdditionalService: builder.mutation({
            query: (additionalServiceId) => ({
                url: `additional-services/${additionalServiceId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["AdditionalService"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useGetAdditionalServicesQuery,
    useGetAdditionalServiceByIdQuery,
    useCreateAdditionalServiceMutation,
    useUpdateAdditionalServiceMutation,
    useDeleteAdditionalServiceMutation,
} = additionalServiceApi;
