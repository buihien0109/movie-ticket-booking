import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/functionUtils'

function BlogItemSideBar({ blog, index, showRank }) {
    return (
        <div className="py-2 md:py-3" key={blog.id}>
            <div className="flex flex-nowrap">
                <div className="relative flex-initial order-1 w-36">
                    <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                        <div className="overflow-hidden bg-gray-100 aspect-[16/9] rounded-md">
                            <img className="w-full h-full object-cover"
                                alt={blog.title}
                                src={blog.thumbnail} />
                            {showRank && (
                                <div
                                    className="grad-over-popular absolute left-0 top-0 z-10 flex h-full w-full items-end  overflow-hidden p-3 text-3xl font-semibold text-white">
                                    {index + 1}
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
                <div className="flex-1 pl-4 md:order-2 md:pl-5">
                    <div className="max-w-2xl">
                        <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                            <h3
                                className="font-semibold leading-tight text-gray-800 hover:underline text-sm md:text-lg lg:text-sm line-clamp-2">
                                {blog.title}
                            </h3>
                            <div className="mt-1 text-sm text-gray-600">
                                {formatDate(blog.publishedAt)}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogItemSideBar