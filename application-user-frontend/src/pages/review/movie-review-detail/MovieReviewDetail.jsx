import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useCheckMovieHasShowtimesQuery, useGetMovieDetailQuery, useGetShowtimesByMovieQuery } from '../../../app/services/movie.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import ModalAddress from '../../../components/modal/address/ModalAddress';
import useModal from '../../../components/modal/hook/useModal';
import { groupShowtimes } from '../../../utils/functionUtils';
import ModalChoseTicket from '../../home/components/modal/ModalChoseTicket';
import ShowDate from '../../home/components/ShowDate';
import MovieReviewOverview from '../components/MovieReviewOverview';
import ReviewList from '../components/ReviewList';

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

function MovieReviewDetail() {
  const location = useLocation();
  const showtimesRef = useRef(null);
  const { showtimes } = useSelector(state => state)
  const { movieId, movieSlug } = useParams();
  const { open: openModalAddress, handleOpen: handleOpenModalAddress } = useModal();
  const [cinemaActive, setCinemaActive] = useState(null);

  const {
    data: movie,
    isLoading: isLoadingGetMovieDetail,
    isError: isErrorGetMovieDetail,
  } = useGetMovieDetailQuery({ id: movieId, slug: movieSlug });

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
    const hash = location.hash;
    if (hash === '#phimLichChieu' && showtimesRef.current) {
      showtimesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location]);

  if (isLoadingGetMovieDetail || isLoadingShowtimes || isLoadingCheckMovieHasShowtimes) {
    return <Loading />;
  }

  if (isErrorGetMovieDetail || isErrorShowtimes || isErrorCheckMovieHasShowtimes) {
    return <Error />;
  }

  const handleChoseCinema = index => {
    if (index === cinemaActive) return;
    setCinemaActive(index);
  };

  const movieSchedule = groupShowtimes(data)

  return (
    <>
      <Helmet>
        <title>Review phim</title>
      </Helmet>
      <div className="max-w-6xl mx-auto my-5">
        <ol className="flex flex-nowrap items-center">
          <li className="relative shrink-0 px-3 text-sm pl-0 text-gray-800 hover:text-pink-700 cursor-pointer">
            <Link to={"/"} className="whitespace-nowrap">
              <span>Trang chủ</span>
            </Link>
          </li>
          <li className="text-sm text-gray-500">&gt;</li>
          <li className="relative shrink-0 px-3 text-sm text-gray-800 hover:text-pink-700 cursor-pointer">
            <Link to={"/review-phim"} className="flex items-center whitespace-nowrap md:space-x-2">
              <span>Review</span>
            </Link>
          </li>
          <li className="text-sm text-gray-500">&gt;</li>
          <li className="relative shrink-0 px-3 text-sm text-gray-800">
            <span className="flex items-center whitespace-nowrap text-gray-500">
              <span>Phim chiếu rạp</span>
            </span>
          </li>
        </ol>
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-12">
          <MovieReviewOverview movie={movie} hasShowtimes={movieHasShowtimes?.hasShowtimes} />
          <div className="review-content lg:col-span-8" >
            <ReviewList movie={movie} />

            {movieHasShowtimes.hasShowtimes && (
              <section className="py-8 border-gray-200 border-t" id="phimLichChieu" ref={showtimesRef}>
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
          </div >
        </div>
      </div>

      {cinemaActive !== null && openModalAddress && (
        <ModalAddress
          url={movieSchedule[cinemaActive].cinema.mapLocation}
          open={openModalAddress}
          handleOpen={handleOpenModalAddress}
        />
      )}
    </>
  )
}

export default MovieReviewDetail