import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/functionUtils'

function BlogItemHorizontal({ blog }) {
    return (
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
    )
}

export default BlogItemHorizontal