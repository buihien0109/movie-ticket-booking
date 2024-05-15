import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN } from "../../data/constants";

export const couponApi = createApi({
    reducerPath: "couponApi",
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
        checkCouponValid: builder.query({
            query: (code) => `coupons/${code}/check`
        }),
    }),
});

export const {
    useLazyCheckCouponValidQuery
} = couponApi;
