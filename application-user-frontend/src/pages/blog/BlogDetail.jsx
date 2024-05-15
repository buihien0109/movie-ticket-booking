import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useParams } from "react-router-dom";
import { useGetBlogDetailQuery } from "../../app/services/blog.api";
import Error from "../../components/error/Error";
import Loading from "../../components/loading/Loading";
import { formatDate } from "../../utils/functionUtils";
import ListBlogRecommend from "./components/ListBlogRecommend";
import TableOfContents from "./components/toc/TableOfContent";

function BlogDetail() {
    const location = useLocation();
    const { blogId, blogSlug } = useParams();
    const {
        data: blog,
        isLoading: isLoadingBlogDetail,
        isError: isErrorBlogDetail,
        isFetching: isFetchingBlogDetail,
        refetch: refetchBlogDetail,
    } = useGetBlogDetailQuery({ id: blogId, slug: blogSlug });

    useEffect(() => {
        refetchBlogDetail();
    }, [location.pathname]);

    if (isLoadingBlogDetail || isFetchingBlogDetail) {
        return <Loading />;
    }

    if (isErrorBlogDetail) {
        return <Error />;
    }

    return (
        <>
            <Helmet>
                <title>{blog?.title}</title>
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
                    <li className="relative shrink-0 px-3 text-sm text-gray-800">
                        <span className="flex items-center whitespace-nowrap text-gray-500">
                            <span>{blog.title}</span>
                        </span>
                    </li>
                </ol>
            </div>
            <div className="max-w-6xl mx-auto pb-7">
                <div className="pointer-events-none select-none mb-7 overflow-hidden rounded md:rounded-lg">
                    <span style={{ boxSizing: "border-box", display: "block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, position: "relative" }}>
                        <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: "31.25% 0px 0px" }}></span>
                        <img alt="Danh sách phim hay Netflix tháng 12/2023" src={blog.thumbnail} decoding="async" data-nimg="responsive" style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                    </span></div>
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 pr-4">
                        <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
                        <p className="text-gray-500 text-sm mb-4">{formatDate(blog.publishedAt)}</p>
                        <div className="overflow-hidden" id="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}>
                        </div>
                    </div>
                    <div>
                        <div className="sticky top-20">
                            <TableOfContents />
                            <div className="mt-8 rounded-lg bg-pink-50 px-4 py-5 lg:mt-0 lg:bg-white lg:px-0 lg:py-0">
                                <h2 className="mb-0 text-lg font-semibold">Bài viết liên quan</h2>
                                <div className="grid grid-cols-1">
                                    <ListBlogRecommend blogId={blogId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default BlogDetail;
