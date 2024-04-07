import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from '../../../app/services/movie.api';
import Loading from '../../../components/loading/Loading';
import ModalTrailer from '../../../components/modal-trailer/ModalTrailer';
import useModal from '../../../components/modal-trailer/useModal';
import MovieReviewOverview from '../components/MovieReviewOverview';
import ReviewList from '../components/ReviewList';

const Breadcrumb = () => (
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
);

const ReviewContent = ({ movie }) => (
  <div className="review-content lg:col-span-8">
    {
      movie.reviews.length === 0 ? (
        <div className="py-5 text-center">
          <div>
            <img src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg" alt="Not found" loading="lazy" width="120" height="120" className=" mx-auto block" />
          </div>
          <div className="mb-0 mt-3 font-semibold text-gray-500">Phim hiện tại chưa có bài đánh giá.
            <br />
            Trở lại trang <Link to={"/phim-chieu"} className="text-gray-800 underline hover:text-pink-500">Đặt Vé Xem Phim</Link> ngay!
          </div>
        </div>
      ) : (
        <ReviewList movie={movie} />
      )
    }
  </div>
);

function MovieReviewReview() {
  const { movieId, movieSlug } = useParams();
  const { open, handleOpen } = useModal();

  const {
    data: movie,
    isLoading: isLoadingGetBlogDetail,
    isFetching: isFetchingGetBlogDetail,
    isError: isErrorGetBlogDetail,
  } = useGetMovieDetailQuery({ id: movieId, slug: movieSlug });

  if (isLoadingGetBlogDetail || isFetchingGetBlogDetail) {
    return <Loading />;
  }

  if (isErrorGetBlogDetail) {
    return <Error />;
  }

  return (
    <>
      <Helmet>
        <title>Review phim</title>
      </Helmet>
      <Breadcrumb />
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-8 py-4 md:py-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-12">
          <MovieReviewOverview movie={movie} />
          <ReviewContent movie={movie} />
        </div>
      </div>
      <ModalTrailer movie={movie} open={open} handleOpen={handleOpen} />
    </>
  )
}

export default MovieReviewReview