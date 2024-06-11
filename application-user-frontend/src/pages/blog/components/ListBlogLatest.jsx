import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetBlogLatestQuery } from '../../../app/services/blog.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import ListBlogItem from './ListBlogItem';

function ListBlogLatest({ type, limit, col }) {
    const params = useParams();
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [isShowLoadMore, setIsShowLoadMore] = useState(true);

    // Gọi API lần đầu và mỗi khi trang thay đổi
    const { data: pageData, isLoading, isFetching, isError, refetch } = useGetBlogLatestQuery({
        page: page,
        limit: limit,
        type: type
    });

    useEffect(() => {
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
                        <div className="pt-6 flex justify-center">
                            <button type="button"
                                onClick={handleLoadMore}
                                className="rounded-full border border-pink-500 bg-white/10 py-1 pl-4 pr-6 font-semibold text-pink-500 transition-all hover:text-pink-600">
                                {isFetching ? (
                                    <span className="animate-spin inline-block mr-2">
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 inline-block h-4 w-4 animate-bounce opacity-80" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                    </svg>
                                )}
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
