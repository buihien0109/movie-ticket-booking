import React from 'react'
import { Link } from 'react-router-dom'

function MovieItem({ movie, showStar, withBg }) {
    return (
        <Link to={`/phim/${movie.id}/${movie.slug}`}>
            <div className="group rounded overflow-hidden relative w-full h-72 cursor-pointer">
                <img src={movie.poster} alt={movie.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110" />
            </div>
            <div className="group">
                <p className={`truncate text-sm ${withBg ? 'text-white' : 'text-gray-800'} leading-tight font-semibold mt-2 transition-all duration-300 group-hover:text-pink-700`}>{movie.name}</p>
                <p className="truncate text-xs text-gray-400 leading-tight my-1 transition-all duration-300 group-hover:text-pink-700">
                    {movie.genres.map(genre => genre.name).join(", ")}
                </p>
                {showStar && (
                    <p className="text-xs leading-tight flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <span className={`${withBg ? "text-white" : "text-gray-600"}`}>{movie.rating}</span>
                    </p>
                )}
            </div>
        </Link>
    )
}

export default MovieItem