import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "auth/login",
                method: "POST",
                body: credentials,
            }),
            transformResponse: (response) => {
                return {
                    ...response,
                    user: {
                        ...response.user,
                        avatar: response.user.avatar.startsWith("/api") ? `${DOMAIN}${response.user.avatar}` : response.user.avatar,
                    }
                }
            }
        }),
        registerAccount: builder.mutation({
            query: (data) => ({
                url: "auth/register",
                method: "POST",
                body: data,
            }),
        }),
        forgotPassword: builder.mutation({
            query: ({ email }) => ({
                url: "auth/forgot-password",
                method: "POST",
                params: {
                    email,
                },
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterAccountMutation,
    useForgotPasswordMutation,
} = authApi;
