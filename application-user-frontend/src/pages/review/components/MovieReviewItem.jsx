import React from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../../utils/functionUtils'

function MovieReviewItem({ movie }) {
    return (
        <div key={movie.id}>
            <div className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <div className=" relative z-[1] aspect-[16/9] w-full overflow-hidden bg-gray-200 bg-cover bg-no-repeat">
                    <img alt="bg-review"
                        src={movie.poster}
                        className="absolute left-0 top-0 z-0 flex h-full w-full object-cover" loading="lazy" />
                    <div className="absolute bottom-0 left-0 right-0 flex h-3/4 flex-col-reverse bg-gradient-to-t from-black/75 via-black/20 p-3 ">
                        {movie.reviews.length > 0 && (
                            <div className="mt-1 flex items-center space-x-4">
                                <div className="flex items-center space-x-1 text-sm text-white">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    </div>
                                    <span className="font-bold">{movie.rating}</span>
                                </div>
                                <Link to={`/review-phim/${movie.id}/${movie.slug}`} className="group flex cursor-pointer items-center space-x-1 text-sm text-white">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-6 opacity-70 group-hover:opacity-100"><path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                    </div>
                                    <span className="font-bold">{movie.reviews.length}</span>
                                </Link>
                            </div>
                        )}
                        <h3 className="truncate text-sm font-bold leading-tight text-white hover:text-pink-100">{movie.name}</h3>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-4 px-4 py-5">
                    {movie.reviews.slice(0, 2).map(review => (
                        <div key={review.id} className="relative flex flex-nowrap">
                            <img
                                src={review.user.avatar}
                                alt={review.user.name} width="44" height="44" loading="lazy"
                                className="z-2 overflow-hidden rounded-full object-cover h-8 w-8" />
                            <div className="ml-2 flex-1">
                                <div className="text-xs font-bold">
                                    <span>{review.user.name} </span>
                                    <span className="inline-block text-xs font-normal text-gray-400 "> ·{formatDate(review.createdAt)}</span>
                                </div>
                                <div className="mt-1 cursor-pointer whitespace-pre-wrap break-words text-sm text-gray-700 line-clamp-3 hover:text-gray-500">{review.comment}</div>
                            </div>
                        </div>
                    ))}
                    <Link className="flex cursor-pointer items-center space-x-1 pl-10 text-xs font-bold underline hover:text-pink-500"
                        to={`/review-phim/${movie.id}/${movie.slug}`}>
                        <span>Xem thêm</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-4 w-4 opacity-60">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default MovieReviewItem