import React from 'react';
import { useGetMostViewBlogsQuery } from '../../../app/services/blog.api';
import ListBlogItem from './ListBlogItem';

function ListBlogMostView({ type }) {
    const {
        data: blogs
    } = useGetMostViewBlogsQuery({ type, limit: 5 });

    return (
        <ListBlogItem blogs={blogs} type={"BLOG_ITEM_SIDE_BAR"} />
    )
}

export default ListBlogMostView