import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from '../../../app/services/movie.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import useModal from '../../../components/modal/hook/useModal';
import ModalTrailer from '../../../components/modal/trailer/ModalTrailer';
import MovieReviewOverview from '../components/MovieReviewOverview';
import ReviewList from '../components/ReviewList';

function MovieReviewDetail() {
  const { movieId, movieSlug } = useParams();
  const { open, handleOpen } = useModal();

  const {
    data: movie,
    isLoading: isLoadingGetMovieDetail,
    isFetching: isFetchingGetMovieDetail,
    isError: isErrorGetMovieDetail,
  } = useGetMovieDetailQuery({ id: movieId, slug: movieSlug });

  if (isLoadingGetMovieDetail || isFetchingGetMovieDetail) {
    return <Loading />;
  }

  if (isErrorGetMovieDetail) {
    return <Error />;
  }

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
          <MovieReviewOverview movie={movie} />
          <div className="review-content lg:col-span-8" >
            <ReviewList movie={movie} />
          </div >
        </div>
      </div>
      <ModalTrailer movie={movie} open={open} handleOpen={handleOpen} />
    </>
  )
}

export default MovieReviewDetail