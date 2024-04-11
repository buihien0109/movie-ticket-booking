import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN, DOMAIN } from "../../data/constants";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: API_DOMAIN,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getOrders: builder.query({
            query: () => `orders`,
            transformResponse: (response) => {
                return response.map((order) => {
                    return {
                        ...order,
                        qrCodePath: `${DOMAIN}${order.qrCodePath}`,
                    }
                });
            },
        }),
        getOrderById: builder.query({
            query: (orderId) => `orders/${orderId}`,
            transformResponse: (response) => {
                return {
                    ...response,
                    qrCodePath: `${DOMAIN}${response.qrCodePath}`,
                }
            },
        }),
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: `orders`,
                method: "POST",
                body: newOrder,
            }),
        }),
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation
} = orderApi;
