import React from 'react';
import { Link } from 'react-router-dom';
import { formatMovieAge } from '../../../utils/functionUtils';
import ModalChoseTicket from './modal/ModalChoseTicket';
import useModal from '../../../components/modal/hook/useModal';

// Extract the movie poster into a separate component
const MoviePoster = ({ movie }) => (
    <Link className="group block" to={`/phim/${movie.id}/${movie.slug}`}>
        <div className="background-gray-100 relative overflow-hidden rounded">
            <div className="flex bg-gray-200">
                <div className="aspect-[7/10] w-full scale-100 transition-transform duration-300 group-hover:scale-105">
                    <img src={movie.poster} className="h-full w-full object-cover object-center" loading="lazy" />
                </div>
            </div>
        </div>
    </Link>
);

// Extract the movie details into a separate component
const MovieDetails = ({ movie }) => (
    <div className="col-start-2">
        <div className="mb-1 flex origin-left scale-90 flex-row flex-nowrap space-x-2">
            <div className={`inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 ${formatMovieAge(movie?.age).color}`} style={{ minWidth: "20px" }}>
                {formatMovieAge(movie?.age).text}
            </div>
        </div>
        <div className="font-semibold leading-tight text-gray-800">
            <Link to={`/phim/${movie.id}/${movie.slug}`}>
                {movie.name}
            </Link>
        </div>
        <div className="mt-1 text-sm leading-tight text-gray-400">
            {movie.genres.map(genre => genre.name).join(", ")}
        </div>
    </div>
);

// Extract the showtimes into a separate component
const Showtimes = ({ showtimesInfo, handleOpen, setShowtimesSelected }) => (
    <div className="col-span-2 col-start-1 md:col-start-2">
        {showtimesInfo.map((item, index) => (
            <div className="mb-4 mt-4" key={index}>
                <div className="mb-2 text-sm font-semibold">{item.label}</div>
                <div className="grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {item.showtimes.map((showtime, index) => (
                        <div
                            onClick={() => {
                                handleOpen();
                                setShowtimesSelected(showtime);
                            }}
                            key={index}
                            className="tracking-engage-btn-showtime group cursor-pointer whitespace-nowrap rounded-md border border-sky-400 bg-sky-100/5 px-2 py-1 text-center text-sm text-sky-600 hover:bg-white hover:text-sky-500">
                            <strong className="text-sm font-semibold">{showtime.startTime} </strong>
                            ~ {showtime.endTime}
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

// Now the main component is much cleaner
function MovieScheduleItem({ schedule }) {
    const { cinema, movie, showtimesInfo } = schedule;
    const { open, handleOpen } = useModal();
    const [showtimesSelected, setShowtimesSelected] = React.useState(null);

    return (
        <>
            <div className="block w-full px-5 py-5 text-left">
                <div className="film-show grid gap-x-4 gap-y-0 md:gap-x-4 lg:gap-x-6">
                    <div className="col-start-1 row-span-2 row-start-1">
                        <MoviePoster movie={movie} />
                    </div>
                    <MovieDetails movie={movie} />
                    <Showtimes showtimesInfo={showtimesInfo} handleOpen={handleOpen} setShowtimesSelected={setShowtimesSelected} />
                </div>
            </div>
            {showtimesSelected && open && <ModalChoseTicket schedule={schedule} showtimes={showtimesSelected} open={open} handleOpen={handleOpen} />}
        </>
    );
}

export default MovieScheduleItem