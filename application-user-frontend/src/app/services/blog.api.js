import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_DOMAIN, API_DOMAIN_PUBLIC, DOMAIN } from "../../data/constants";

export const blogApi = createApi({
    reducerPath: "blogApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_DOMAIN_PUBLIC }),
    endpoints: (builder) => ({
        getBlogLatest: builder.query({
            query: ({ type, page, limit }) => {
                return {
                    url: `blogs/latest`,
                    method: "GET",
                    params: {
                        type,
                        page,
                        limit
                    },
                }
            },
            transformResponse: (response, meta, arg) => {
                return {
                    ...response, content: response.content.map((item) => {
                        return {
                            ...item,
                            thumbnail: item.thumbnail.startsWith("/api") ? `${DOMAIN}${item.thumbnail}` : item.thumbnail
                        };
                    })
                }
            },
        }),
        getBlogs: builder.query({
            query: ({ page, limit, type }) => {
                return {
                    url: `blogs`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        type
                    },
                }
            },
            transformResponse: (response, meta, arg) => {
                return {
                    ...response, content: response.content.map((item) => {
                        return {
                            ...item,
                            thumbnail: item.thumbnail.startsWith("/api") ? `${DOMAIN}${item.thumbnail}` : item.thumbnail
                        };
                    })
                }
            },
        }),
        loadMoreBlogs: builder.query({
            query: ({ page, limit, type }) => {
                return {
                    url: `blogs/load-more`,
                    method: "GET",
                    params: {
                        page,
                        limit,
                        type
                    },
                }
            },
            transformResponse: (response, meta, arg) => {
                return {
                    ...response, content: response.content.map((item) => {
                        return {
                            ...item,
                            thumbnail: item.thumbnail.startsWith("/api") ? `${DOMAIN}${item.thumbnail}` : item.thumbnail
                        };
                    })
                }
            },
        }),
        getBlogDetail: builder.query({
            query: ({ id, slug }) => `blogs/${id}/${slug}`,
            transformResponse: (response, meta, arg) => {
                return {
                    ...response,
                    thumbnail: response.thumbnail.startsWith("/api") ? `${DOMAIN}${response.thumbnail}` : response.thumbnail
                };
            },
        }),
        getMostViewBlogs: builder.query({
            query: ({ type, limit }) => {
                return {
                    url: `blogs/most-view`,
                    method: "GET",
                    params: {
                        type,
                        limit
                    },
                }
            },
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        thumbnail: item.thumbnail.startsWith("/api") ? `${DOMAIN}${item.thumbnail}` : item.thumbnail
                    };
                });
            },
        }),
        getRecommendBlogs: builder.query({
            query: ({ id, limit }) => `blogs/${id}/recommend?limit=${limit}`,
            transformResponse: (response, meta, arg) => {
                return response.map((item) => {
                    return {
                        ...item,
                        thumbnail: item.thumbnail.startsWith("/api") ? `${DOMAIN}${item.thumbnail}` : item.thumbnail
                    };
                });
            },
        }),
    }),
});

export const {
    useGetBlogLatestQuery,
    useGetBlogsQuery,
    useGetBlogDetailQuery,
    useGetMostViewBlogsQuery,
    useGetRecommendBlogsQuery,
    useLazyGetBlogsQuery,
    useLazyLoadMoreBlogsQuery
} = blogApi;
