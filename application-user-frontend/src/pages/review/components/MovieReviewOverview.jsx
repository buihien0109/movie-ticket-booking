import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatMovieAge } from '../../../utils/functionUtils';
import useModal from '../../../components/modal/hook/useModal';
import ModalTrailer from '../../../components/modal/trailer/ModalTrailer';

function MoviePoster({ movie, handleOpen }) {
    return (
        <div className="z-1 relative md:mx-auto">
            <div
                className="overlay pointer-events-none absolute inset-0 z-20 select-none bg-transparent  px-2 py-2">
                <div className="flex flex-row flex-nowrap space-x-2">
                    <div className={`inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 ${formatMovieAge(movie?.age).color}`} style={{ minWidth: "20px" }}>
                        {formatMovieAge(movie?.age).text}
                    </div>
                </div>
            </div>
            <div className="after:z-1 flex overflow-hidden border border-white/20 md:relative">
                <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, position: "relative", maxWidth: "100%" }}>
                    <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%" }}>
                        <img alt="" aria-hidden="true"
                            src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27300%27%20height=%27450%27/%3e"
                            style={{ display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0 }} />
                    </span>
                    <img alt={movie.name}
                        src={movie.poster}
                        decoding="async" data-nimg="intrinsic" className=""
                        style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                </span>
                <div onClick={handleOpen}
                    className="z-12 absolute top-1/2 left-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110 md:h-16 md:w-16">
                    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fillRule="evenodd">
                            <circle stroke="#FFF" strokeWidth="2" fillOpacity=".24" fill="#000" cx="24"
                                cy="24" r="23"></circle>
                            <path
                                d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                                fill="#FFF" fillRule="nonzero"></path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}

function MovieReviewOverview({ movie }) {
    const { open, handleOpen } = useModal();
    return (
        <>
            <div className="lg:col-span-3">
                <div className=" flex items-center sm:sticky sm:top-24 lg:flex-col">
                    <MoviePoster movie={movie} handleOpen={handleOpen} />
                    <div className="flex-1">
                        <Link to={`/phim/${movie.id}/${movie.slug}`}>
                            <h2 className="mt-2  font-bold hover:text-pink-600 lg:text-center ">
                                {movie.name}
                            </h2>
                        </Link>
                        <ul className="mt-1 grid grid-cols-1 gap-y-1 text-sm text-gray-700 sm:mt-3">
                            <li>Thể loại : {movie.genres.map(genre => genre.name).join(", ")}</li>
                            <li>Ngày chiếu : {formatDate(movie.showDate)}</li>
                            <li>Quốc gia : {movie.country.name}</li>
                        </ul>
                    </div>
                </div>
                <hr className="-mx-5 mt-3 h-1 bg-gray-200 md:hidden" />
            </div>
            <ModalTrailer movie={movie} open={open} handleOpen={handleOpen} />
        </>
    )
}

export default MovieReviewOverview