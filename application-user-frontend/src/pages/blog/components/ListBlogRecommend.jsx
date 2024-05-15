import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGetRecommendBlogsQuery } from '../../../app/services/blog.api';
import ListBlogItem from './ListBlogItem';

function ListBlogRecommend({ blogId }) {
    const location = useLocation();
    const {
        data: blogs,
        refetch
    } = useGetRecommendBlogsQuery({ id: blogId, limit: 5 });

    useEffect(() => {
        refetch();
    }, [location.pathname]);

    return (
        <ListBlogItem blogs={blogs} showRank={false} type={"BLOG_ITEM_SIDE_BAR"} />
    )
}

export default ListBlogRecommend