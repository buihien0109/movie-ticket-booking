import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useCheckMovieHasShowtimesQuery, useGetMovieDetailQuery, useGetShowtimesByMovieQuery } from '../../../app/services/movie.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import ModalAddress from '../../../components/modal/address/ModalAddress';
import useModal from '../../../components/modal/hook/useModal';
import ModalTrailer from '../../../components/modal/trailer/ModalTrailer';
import { formatDate, formatMovieAge, groupShowtimes } from '../../../utils/functionUtils';
import ListBlogLatest from '../../blog/components/ListBlogLatest';
import ModalChoseTicket from '../../home/components/modal/ModalChoseTicket';
import ShowDate from '../../home/components/ShowDate';
import ReviewList from '../../review/components/ReviewList';
import MovieShowingNowListNotSlider from '../components/MovieShowingNowListNotSlider';


function Showtimes({ index, schedule, cinemaActive, onChoseCinema, handleOpenModalAddress }) {
    const { open, handleOpen } = useModal();
    const [showtimesSelected, setShowtimesSelected] = useState(null);

    return (
        <>
            <div>
                <div
                    onClick={() => onChoseCinema(index)}
                    className="relative mx-0 block py-3 hover:bg-gray-50 md:px-4 cursor-pointer">
                    <div>
                        <div className="rap-detail flex flex-nowrap items-center">
                            <div className="min-w-0 flex-1">
                                <div className="mb-0 text-sm font-semibold leading-tight text-gray-800">
                                    <span>{schedule.cinema.name}</span>
                                </div>
                                <div className="flex flex-nowrap items-center text-sm text-gray-500">
                                    <div className="truncate">{schedule.cinema.address}</div>
                                    <div className="pl-2" onClick={handleOpenModalAddress}>
                                        <a className="inline-block text-blue-500 whitespace-nowrap relative z-10 hover:text-blue-700 cursor-pointer">[ Bản đồ ]</a>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden flex-none self-center pl-2 md:block md:pl-5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`icon h-4 w-4 text-gray-400 ${cinemaActive === index ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                {cinemaActive === index && (
                    <div>
                        {schedule.showtimesInfo.map((item, index) => (
                            <div key={index} className="px-0 pb-5 md:px-4">
                                <div className="mb-2 text-sm font-bold">{item.label}</div>
                                <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                                    {item.showtimes.map((showtime, index) => (
                                        <div
                                            onClick={() => {
                                                handleOpen();
                                                setShowtimesSelected(showtime);
                                            }}
                                            key={showtime.id}
                                            className="tracking-engage-btn-showtime group cursor-pointer whitespace-nowrap rounded-md border border-sky-400 bg-sky-100/5 px-2 py-1 text-center text-sm text-sky-600 hover:bg-white hover:text-sky-500"
                                        >
                                            <strong className="text-sm font-semibold">{showtime.startTime} </strong>~ {showtime.endTime}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {showtimesSelected && open && (
                <ModalChoseTicket
                    schedule={schedule}
                    showtimes={showtimesSelected}
                    open={open}
                    handleOpen={handleOpen}
                />
            )}
        </>
    )
}

function MovieDetail() {
    const location = useLocation();
    const showtimesRef = useRef(null);
    const { showtimes } = useSelector(state => state)
    const { movieId, movieSlug } = useParams();
    const { open, handleOpen } = useModal();
    const { open: openModalAddress, handleOpen: handleOpenModalAddress } = useModal();
    const [cinemaActive, setCinemaActive] = useState(null);

    const {
        data: movie,
        isLoading: isLoadingMovie,
        isError: isErrorMovie
    } = useGetMovieDetailQuery({ id: movieId, slug: movieSlug })

    const {
        data,
        isLoading: isLoadingShowtimes,
        isError: isErrorShowtimes
    } = useGetShowtimesByMovieQuery({ movieId: movieId, showDate: showtimes.showdate })

    const {
        data: movieHasShowtimes,
        isLoading: isLoadingCheckMovieHasShowtimes,
        isError: isErrorCheckMovieHasShowtimes
    } = useCheckMovieHasShowtimesQuery({ movieId: movieId })

    useEffect(() => {
        if (data && data.length > 0) {
            setCinemaActive(0);
        }
    }, [data])

    useEffect(() => {
        const hash = location.hash;
        if (hash === '#phimLichChieu' && showtimesRef.current) {
            showtimesRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    if (isLoadingMovie || isLoadingShowtimes || isLoadingCheckMovieHasShowtimes) return <Loading />
    if (isErrorMovie || isErrorShowtimes || isErrorCheckMovieHasShowtimes) return <Error />

    const handleChoseCinema = index => {
        if (index === cinemaActive) return;
        setCinemaActive(index);
    };

    const movieSchedule = groupShowtimes(data)
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="max-w-6xl mx-auto my-5">
                <ol className="flex flex-nowrap items-center">
                    <li className="relative shrink-0 px-3 text-sm pl-0 text-gray-800 hover:text-pink-700">
                        <Link to={"/"} className="whitespace-nowrap">
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500">&gt;</li>
                    <li className="relative shrink-0 px-3 text-sm text-gray-800 hover:text-pink-700">
                        <Link to={"/phim-chieu"} className="flex items-center whitespace-nowrap md:space-x-2">
                            <span>Phim chiếu</span>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500">&gt;</li>
                    <li className="relative shrink-0 px-3 text-sm text-gray-800">
                        <span className="flex items-center whitespace-nowrap text-gray-500">
                            <span>{movie.name}</span>
                        </span>
                    </li>
                </ol>
            </div>

            <div className="relative z-10 flex items-center justify-center bg-black py-10 text-white text-opacity-95">
                <div className="absolute top-0 z-0 h-full w-full overflow-hidden bg-cover bg-center bg-no-repeat after:content-[''] after:z-2 after:absolute after:w-full after:h-full after:top-0 after:left-0 opacity-15"
                    style={{ backgroundImage: `url(${movie.poster})` }}>
                    &quot;</div>
                <div className="mx-auto w-full max-w-6xl">
                    <div className="flex flex-wrap items-center md:flex-nowrap md:space-x-10 lg:items-start">
                        <div className="relative mb-4 w-full md:mb-0 md:w-auto">
                            <div className="w-28 md:mx-auto md:w-64">
                                <div className="flex overflow-hidden border border-white/20 md:relative ">
                                    <img
                                        alt={movie.name}
                                        src={movie.poster}
                                        className="object-cover w-full aspect-[2/3]"
                                    />
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
                        </div>
                        <div className="relative z-10 w-full md:w-auto">
                            <div className={`inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 ${formatMovieAge(movie?.age).color}`} style={{ minWidth: "20px" }}>
                                {formatMovieAge(movie?.age).text}
                            </div>
                            <h1 className=" mt-2 text-2xl font-bold text-white md:text-4xl">{movie.name}</h1>
                            <ul className=" mt-1 flex flex-wrap items-center text-sm text-white text-opacity-60 md:text-base">
                                <li>{movie.nameEn}</li>
                                <li className="mx-2 text-base font-normal">·</li>
                                <li>{movie.releaseYear}</li>
                                <li className="mx-2 text-base font-normal">·</li>
                                <li>{movie.duration} phút</li>
                            </ul>
                            {movie.reviews.length > 0 && (
                                <div
                                    className=" flex flex-nowrap items-center space-x-2 overflow-x-auto overflow-y-hidden pb-2 pt-2 text-sm sm:pt-3 md:space-x-3 md:text-base">
                                    <div className="cine__score mr-2 flex shrink-0 flex-nowrap items-center space-x-0.5 pb-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-7 w-7 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                        <div className="flex items-center space-x-1 text-xl">
                                            <div className="text-2xl font-bold">{movie.rating}</div>
                                            <div className="text-[10px] text-gray-400" style={{ lineHeight: "10px" }}>
                                                <span className=" block">{movie.reviews.length}</span><span className=" block">đánh giá</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <h3 className={`font-bold text-white text-opacity-90 sm:text-base ${movie.reviews.length === 0 ? "mt-3" : ""}`}>Nội dung</h3>
                            <div className="mt-1 text-sm leading-relaxed text-white text-opacity-70">
                                {movie.description}
                                <span className="read-or-hide cursor-pointer pl-1 hover:underline text-yellow-300">...Xem
                                    thêm</span>
                            </div>
                            <div className="mt-3 text-sm text-gray-700 ">
                                <div className="mb-2 flex flex-nowrap space-x-4 md:space-x-5">
                                    <div>
                                        <div className="whitespace-nowrap text-white text-opacity-50">Ngày chiếu</div>
                                        <div className=" mt-1 font-bold text-white text-opacity-90">{formatDate(movie.showDate)}</div>
                                    </div>
                                    <div>
                                        <div className="whitespace-nowrap text-white text-opacity-50">Thể loại</div>
                                        <div className=" mt-1 font-bold text-white text-opacity-90">
                                            {movie.genres.map(genre => genre.name).join(", ")}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="whitespace-nowrap text-white text-opacity-50">Quốc gia</div>
                                        <div className="mt-1 font-bold text-white text-opacity-90">{movie.country.name}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center space-x-4">
                                <div
                                    onClick={handleOpen}
                                    className="tracking-click-play-trailer tracking-focus flex cursor-pointer items-center space-x-1.5 py-2 text-sm hover:underline">
                                    <div className="h-6 w-6 rounded-full border-2 border-pink-600 text-white/80">
                                        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                            <g fill="none" fillRule="evenodd">
                                                <path
                                                    d="M34.667 24.335c0 .515-.529.885-.529.885l-14.84 9.133c-1.08.704-1.965.182-1.965-1.153V15.467c0-1.338.884-1.856 1.968-1.153L34.14 23.45c-.002 0 .527.37.527.885Z"
                                                    fill="currentColor" fillRule="nonzero"></path>
                                            </g>
                                        </svg>
                                    </div>
                                    <span>Xem trailer</span>
                                </div>
                                <Link
                                    className="tracking-click-view-review tracking-focus flex items-center space-x-1.5 py-2 text-sm hover:underline"
                                    to={`/review-phim/${movie.id}/${movie.slug}`}>
                                    <div
                                        className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-yellow-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            aria-hidden="true" className="text-white/85 h-4 w-4 ">
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                                            </path>
                                        </svg>
                                    </div>
                                    <span>Xem review</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8">
                <div ref={showtimesRef} id="phimLichChieu" className="-mt-16 grid grid-cols-1 pt-16 lg:grid-cols-3 lg:gap-12">
                    <div className="lg:col-span-2 lg:col-start-1">
                        {movieHasShowtimes.hasShowtimes && (
                            <section className="py-8">
                                <div className="mb-2 sm:mb-0">
                                    <h2 className="text-xl font-bold">Lịch chiếu {movie.name}</h2>

                                    <div className="relative mt-4">
                                        <div className="rounded md:border md:border-gray-200">
                                            <div className="box-nav z-20 border-b border-gray-200 bg-white py-2 top-[62px] sticky">
                                                <ShowDate />
                                            </div>
                                            <div className="booking-list-height relative">
                                                <div>
                                                    <div className="normal-accordion divide-y divide-gray-200" data-reach-accordion="">
                                                        {movieSchedule.length > 0 && movieSchedule?.map((schedule, index) => (
                                                            <Showtimes
                                                                key={index}
                                                                index={index}
                                                                schedule={schedule}
                                                                cinemaActive={cinemaActive}
                                                                onChoseCinema={handleChoseCinema}
                                                                handleOpenModalAddress={handleOpenModalAddress}
                                                            />
                                                        ))}
                                                        {movieSchedule.length === 0 && (
                                                            <div className="cinema-warning-notfound py-5 text-center">
                                                                <div>
                                                                    <img src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg" alt="Not found" className="mx-auto block" loading="lazy" width="120" height="120" />
                                                                </div>
                                                                <div className="mt-3 mb-0 text-lg font-semibold">
                                                                    Úi, Suất chiếu không tìm thấy.
                                                                </div>
                                                                <div className="text-sm text-gray-500">Bạn hãy thử tìm ngày khác nhé</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="border-t border-gray-200 pb-8 pt-4 md:py-8">
                            <ReviewList movie={movie} />
                        </section>

                        <section id="phimStaff" className="border-t border-gray-200 py-8">
                            <h3 className="text-xl font-bold">Diễn viên & Đoàn làm phim</h3>
                            <div className="mt-4">
                                <div className="relative">
                                    <div className="flex w-full overflow-auto flex-nowrap">
                                        {movie.directors.map(director => (
                                            <div key={director.id} className="actor-col mx-3">
                                                <div className="text-center">
                                                    <div className="mx-auto h-20 w-20">
                                                        <div className="w-full h-full overflow-hidden rounded-full bg-gray-200">
                                                            <img src={director.avatar}
                                                                alt={director.name} className="w-full h-full object-cover"
                                                                loading="lazy" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-1 mb-1 text-sm leading-tight ">{director.name}</div>
                                                    <div className="text-xs text-gray-500">Đạo diễn</div>
                                                </div>
                                            </div>
                                        ))}
                                        {movie.actors.map(actor => (
                                            <div key={actor.id} className="actor-col mx-3">
                                                <div className="text-center">
                                                    <div className="mx-auto h-20 w-20">
                                                        <div className="w-full h-full overflow-hidden rounded-full bg-gray-200">
                                                            <img src={actor.avatar}
                                                                alt={actor.name} className="w-full h-full object-cover"
                                                                loading="lazy" />
                                                        </div>
                                                    </div>
                                                    <div className="mt-1 mb-1 text-sm leading-tight ">{actor.name}</div>
                                                    <div className="text-xs text-gray-500">Diễn viên</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="phimBlog" className="border-t border-gray-200 py-8">
                            <h3 className="mb-4 text-xl font-bold">Blog phim</h3>
                            <ListBlogLatest type="all" limit={6} col={3} />
                        </section>
                    </div>
                    <div className="lg:grid-start-3">
                        <div className="mb-6 mt-7 sticky top-20">
                            <h3 className="mb-2 flex-1 text-xl font-bold">Phim đang chiếu</h3>
                            <div className="relative divide-y divide-gray-200">
                                <MovieShowingNowListNotSlider />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {open && (
                <ModalTrailer
                    movie={movie}
                    open={open}
                    handleOpen={handleOpen}
                    hasShowtimes={movieHasShowtimes.hasShowtimes}
                />
            )}

            {cinemaActive !== null && openModalAddress && (
                <ModalAddress url={movieSchedule[cinemaActive].cinema.mapLocation} open={openModalAddress} handleOpen={handleOpenModalAddress} />
            )}
        </>
    )
}

export default MovieDetail