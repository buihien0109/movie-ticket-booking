import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN_ADMIN } from "../../data/constants";

// Define a service using a base URL and expected endpoints
const ENDPOINT = API_DOMAIN_ADMIN;

export const scheduleApi = createApi({
    reducerPath: "scheduleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: ENDPOINT,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.accessToken
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }

            return headers
        },
    }),
    endpoints: (builder) => ({
        getSchedules: builder.query({
            query: () => 'schedules',
            providesTags: ['Schedule'],
        }),
        getScheduleById: builder.query({
            query: (id) => `schedules/${id}`,
        }),
        createSchedule: builder.mutation({
            query: (newSchedule) => ({
                url: 'schedules',
                method: 'POST',
                body: newSchedule,
            }),
            invalidatesTags: [{ type: 'Schedule' }],
        }),
        updateSchedule: builder.mutation({
            query: ({ id, ...updatedSchedule }) => ({
                url: `schedules/${id}`,
                method: 'PUT',
                body: updatedSchedule,
            }),
            invalidatesTags: [{ type: 'Schedule' }],
        }),
        deleteSchedule: builder.mutation({
            query: (id) => ({
                url: `schedules/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Schedule' }],
        }),
    }),
});


export const {
    useGetSchedulesQuery,
    useGetScheduleByIdQuery,
    useCreateScheduleMutation,
    useUpdateScheduleMutation,
    useDeleteScheduleMutation,
} = scheduleApi;
