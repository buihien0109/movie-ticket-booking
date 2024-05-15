import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useGetBlogsQuery } from '../../app/services/blog.api';
import Loading from '../../components/loading/Loading';
import { formatDate } from '../../utils/functionUtils';
import ListBlogMostView from './components/ListBlogMostView';

function BlogTongHopPhim() {
    const [page, setPage] = useState(1);
    const [blogs, setBlogs] = useState([]);
    const [isShowLoadMore, setIsShowLoadMore] = useState(true);

    const {
        data: pageData,
        isLoading,
        isError,
        isFetching,
    } = useGetBlogsQuery({
        page: page,
        limit: 10,
        type: "TONG_HOP_PHIM"
    });

    useEffect(() => {
        // Tích lũy dữ liệu từ các trang
        if (pageData && pageData.content) {
            setBlogs(prevBlogs => [...prevBlogs, ...pageData.content]);
            // Kiểm tra nếu đây là trang cuối cùng
            setIsShowLoadMore(!pageData.last);
        }
    }, [pageData]);

    if (isLoading || isFetching) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return (
        <>
            <Helmet>
                <title>Blog tổng hợp phim</title>
            </Helmet>
            <div className="max-w-6xl mx-auto my-5">
                <ol className="flex flex-nowrap items-center">
                    <li className="relative shrink-0 px-3 text-sm pl-0 text-gray-800 hover:text-pink-700 cursor-pointer">
                        <Link to={"/"} className="whitespace-nowrap">
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500">&gt;</li>
                    <li className="relative shrink-0 px-3 text-sm text-gray-800 hover:text-pink-700 cursor-pointer">
                        <Link to={"/bai-viet"} className="flex items-center whitespace-nowrap md:space-x-2">
                            <span>Bài viết</span>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500">&gt;</li>
                    <li className="relative shrink-0 px-3 text-sm text-gray-800 hover:text-pink-700">
                        <span className="flex items-center whitespace-nowrap text-gray-500">
                            <span>Tổng hợp phim</span>
                        </span>
                    </li>
                </ol>
            </div>
            <div className="max-w-6xl mx-auto py-7">
                <div className="my-6 pb-8">
                    <h1 className="mb-1 text-3xl font-bold text-gray-900 md:mb-4 md:text-5xl">Tổng hợp phim</h1>
                    <h2 className="max-w-3xl text-md text-gray-500 md:text-lg">Tổng hợp phim lẻ, phim bộ, Netflix,...hấp dẫn</h2>
                </div>
                <div className="sticky top-0 z-10 -mx-5 mb-8 md:relative md:mx-0 ">
                    <div className="relative">
                        <div className="flex w-full border-b text-sm md:pl-0 md:text-base">
                            <div className="mr-5">
                                <Link to={"/bai-viet"} className="block whitespace-nowrap py-3 px-1 text-gray-700 hover:text-gray-900 md:px-2">
                                    Mới nhất
                                </Link>
                            </div>
                            <div className="mr-5">
                                <Link to={"/bai-viet/phim-chieu-rap"} className="block whitespace-nowrap py-3 px-1 text-gray-700 hover:text-gray-900 md:px-2">
                                    Phim chiếu rạp
                                </Link>
                            </div>
                            <div className="mr-5 font-bold border-pink-600 border-b-2">
                                <Link to={"/bai-viet/tong-hop-phim"} className="block whitespace-nowrap py-3 px-1 text-gray-700 hover:text-gray-900 md:px-2">
                                    Tổng hợp phim
                                </Link>
                            </div>
                            <div className="mr-5">
                                <Link to={"/bai-viet/phim-netflix"} className="block whitespace-nowrap py-3 px-1 text-gray-700 hover:text-gray-900 md:px-2">
                                    Netflix
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="mt-6 grid grid-cols-1 gap-6 md:mt-3 md:grid-cols-3 md:gap-6">
                        {blogs.length > 0 && blogs.slice(0, 3).map((blog) => (
                            <article key={blog.id}>
                                <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                    <div className="overflow-hidden  bg-gray-100 aspect-[16/9] rounded-md">
                                        <img className="w-full h-full object-cover"
                                            alt={blog.title}
                                            src={blog.thumbnail} />
                                    </div>
                                </Link>
                                <div className="mt-2">
                                    <div className=" max-w-2xl">
                                        <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                            <h3 className="font-semibold leading-tight text-gray-800 hover:underline text-xl md:text-lg md:leading-tight lg:text-xl lg:leading-tight">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                        <div className="mt-2 text-sm text-gray-600">
                                            {formatDate(blog.publishedAt)}
                                        </div>
                                        <div className="mt-2 text-sm text-gray-600 lg:text-sm line-clamp-2">{blog.description}</div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6"></div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 pr-4">
                        <h2 className="mb-0 text-lg font-semibold">Bài viết</h2>
                        <div className="grid grid-cols-1 divide-y divide-gray-300">
                            {blogs.length > 0 && blogs.slice(3).map((blog) => (
                                <article className="py-6" key={blog.id}>
                                    <div className="flex flex-nowrap ">
                                        <div className="flex-1 order-2 pl-5">
                                            <div className="max-w-2xl">
                                                <header>
                                                    <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                        <h3 className="font-semibold leading-tight text-gray-800 hover:underline text-lg line-clamp-1">
                                                            {blog.title}
                                                        </h3>
                                                    </Link>
                                                </header>
                                                <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                                                    {blog.description}
                                                </div>
                                                <div className="mt-2 text-sm text-gray-600">
                                                    {formatDate(blog.publishedAt)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-initial order-1 w-52 relative">
                                            <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                                                <div className="overflow-hidden bg-gray-100 aspect-[16/9] rounded-md">
                                                    <img className="w-full h-full object-cover"
                                                        alt={blog.title}
                                                        src={blog.thumbnail} />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
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
                        </div>
                    </div>
                    <div>
                        <div className="sticky top-20">
                            <div className="mt-8 rounded-lg bg-pink-50 px-4 py-5 lg:mt-0 lg:bg-white lg:px-0 lg:py-0">
                                <h2 className="mb-3 text-lg font-semibold">Xem nhiều nhất</h2>
                                <div className="grid grid-cols-1">
                                    <ListBlogMostView type={"TONG_HOP_PHIM"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogTongHopPhim