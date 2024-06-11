import React from 'react'
import { Link } from 'react-router-dom'

function BlogItemVerticalNormal({ blog }) {
    return (
        <div className="group h-full cursor-pointer ">
            <Link to={`/bai-viet/${blog.id}/${blog.slug}`}>
                <div className="flex flex-wrap border-b border-gray-200 pb-3 sm:border-none sm:pb-2 ">
                    <div className="order-2 w-28 pt-3 sm:order-1 sm:w-full sm:flex-auto sm:pt-0">
                        <div className="relative flex overflow-hidden rounded bg-gray-100 ">
                            <img alt={blog.title}
                                src={blog.thumbnail}
                                className="w-full h-full object-cover aspect-[16/9]" />
                        </div>
                    </div>
                    <div className="order-1 flex-1 pr-6 sm:order-2 sm:w-full sm:flex-auto sm:pr-0">
                        <div className="pb-2 pt-3 font-semibold leading-snug group-hover:text-pink-600">
                            {blog.title}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BlogItemVerticalNormal