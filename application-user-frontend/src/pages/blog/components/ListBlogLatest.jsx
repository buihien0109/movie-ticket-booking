import React, { useEffect, useState } from 'react';
import { useGetBlogLatestQuery } from '../../../app/services/blog.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import ListBlogItem from './ListBlogItem';

function ListBlogLatest({ type, limit, col }) {
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [isShowLoadMore, setIsShowLoadMore] = useState(true);

    // Gọi API lần đầu và mỗi khi trang thay đổi
    const { data: pageData, isLoading, isError } = useGetBlogLatestQuery({
        page: page,
        limit: limit,
        type: type
    });

    useEffect(() => {
        // Khi component được mount, reset lại state
        setPage(1);
        setBlogs([]);
        setIsShowLoadMore(true);
    }, []);

    useEffect(() => {
        // Khi có dữ liệu mới, cập nhật vào state
        if (pageData && pageData.content) {
            setBlogs(prevBlogs => [...prevBlogs, ...pageData.content]);
            setIsShowLoadMore(!pageData.last);
        }
    }, [pageData]);

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <Error />
    }

    const handleLoadMore = () => {
        setPage(page + 1);
    }

    return (
        <>
            {blogs.length > 0 && (
                <>
                    <div className={`grid grid-cols-${col} gap-6`}>
                        <ListBlogItem blogs={blogs} type={"BLOG_ITEM_VERTICAL_NORMAL"} />
                    </div>
                    {isShowLoadMore && (
                        <div className="pt-6 text-center">
                            <button type="button"
                                onClick={handleLoadMore}
                                className="rounded-full border border-pink-500 bg-white/10 py-1 pl-4 pr-6 font-semibold text-pink-500 transition-all hover:text-pink-600">
                                <span><i className="fa-solid fa-arrow-down"></i></span>
                                Xem thêm!
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default ListBlogLatest;
