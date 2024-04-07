import React from 'react';
import BlogItemHorizontal from './BlogItemHorizontal';
import BlogItemSideBar from './BlogItemSideBar';
import BlogItemVertical from './BlogItemVertical';
import BlogItemVerticalNormal from './BlogItemVerticalNormal';

function ListBlogItem({ blogs, showRank, type }) {
    // Định nghĩa một object để mapping giữa type và component tương ứng
    const blogItemComponents = {
        BLOG_ITEM_SIDE_BAR: BlogItemSideBar,
        BLOG_ITEM_HORIZONTAL: BlogItemHorizontal,
        BLOG_ITEM_VERTICAL: BlogItemVertical,
        BLOG_ITEM_VERTICAL_NORMAL: BlogItemVerticalNormal,
    };

    // Chọn component dựa trên type
    const SelectedBlogItem = blogItemComponents[type];

    return (
        <>
            {blogs && SelectedBlogItem && blogs.map((blog, index) => (
                <SelectedBlogItem blog={blog} key={blog.id} index={index} showRank={showRank} />
            ))}
        </>
    );
}

export default ListBlogItem;