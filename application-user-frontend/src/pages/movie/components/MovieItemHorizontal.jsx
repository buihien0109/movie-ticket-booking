import React from 'react'
import { Link } from 'react-router-dom'
import { formatMovieAge } from '../../../utils/functionUtils'

function MovieItemHorizontal({ movie, index }) {
    return (
        <div className="py-3 overflow-hidden">
            <div className="flex flex-nowrap">
                <div className="w-16 h-24 flex-none overflow-hidden rounded">
                    <Link className="group block h-full" to={`/phim/${movie.id}/${movie.slug}`}>
                        <div className="background-gray-100 wrap-next-img relative z-10 h-full">
                            <img src={movie.poster} alt={movie.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className=" absolute bottom-1 left-1 z-10 text-xl font-bold text-white text-opacity-95 md:text-2xl">
                                {index + 1}
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="flex-1 pl-4">
                    <div className="mb-1 flex origin-left scale-90 flex-row flex-nowrap space-x-2">
                        <div className={`inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 ${formatMovieAge(movie?.age).color}`} style={{ minWidth: "20px" }}>
                            {formatMovieAge(movie?.age).text}
                        </div>
                    </div>
                    <Link
                        to={`/phim/${movie.id}/${movie.slug}`}
                        className="line-clamp-1 text-sm font-semibold leading-tight text-gray-800 hover:text-pink-500"
                    >{movie.name}</Link>
                    <div className="line-clamp-1 mt-1 text-xs leading-tight text-gray-500">
                        {movie.genres.map(genre => genre.name).join(", ")}
                    </div>
                    {movie.reviews && movie.reviews.length > 0 && (
                        <div className="mt-1 flex items-center text-xs text-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            <span> {movie.rating}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieItemHorizontal