import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/functionUtils'

function BlogItemVertical({ blog }) {
    return (
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
    )
}

export default BlogItemVertical