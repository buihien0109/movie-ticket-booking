import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MovieShowingNowList from '../../movie/components/MovieShowingNowList';
import MovieReviewList from '../components/MovieReviewList';

function MovieReview() {
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
                    <li className="relative shrink-0 px-3 text-sm text-gray-800">
                        <span className="flex items-center whitespace-nowrap text-gray-500">
                            <span>Review</span>
                        </span>
                    </li>
                </ol>
            </div>

            <div className='bg-gray-50'>
                <div className="max-w-6xl mx-auto py-7">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">Bình luận nổi bật</h2>
                    <MovieReviewList />
                </div>
            </div>

            <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(https://homepage.momocdn.net/img/momo-upload-api-230912110927-638301137672516955.jpeg)" }}>
                <div className="max-w-6xl mx-auto py-7">
                    <h2 className="text-2xl font-bold text-center text-white mb-7">Phim đang chiếu</h2>
                    <MovieShowingNowList />
                </div>
            </div>
        </>
    )
}

export default MovieReview