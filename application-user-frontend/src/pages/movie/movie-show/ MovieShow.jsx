import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MovieComingSoonList from '../components/MovieComingSoonList';
import MovieShowingNowList from '../components/MovieShowingNowList';
import SearchMovie from '../components/search/SearchMovie';

function MovieShow() {
    return (
        <>
            <Helmet>
                <title>Phim chiếu</title>
            </Helmet>
            <div className="max-w-6xl mx-auto my-5">
                <ol className="flex flex-nowrap items-center">
                    <li className="relative shrink-0 px-3 text-sm pl-0 text-gray-800 hover:text-pink-700">
                        <Link to={"/"} className="whitespace-nowrap">
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500">&gt;</li>
                    <li className="relative shrink-0 px-3 text-sm text-gray-800">
                        <span className="flex items-center whitespace-nowrap text-gray-500">
                            <span>Phim chiếu</span>
                        </span>
                    </li>
                </ol>
            </div>
            <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(https://homepage.momocdn.net/img/momo-upload-api-230912110927-638301137672516955.jpeg)" }}>
                <div className="max-w-6xl mx-auto py-7">
                    <h2 className="text-center text-white mb-7 text-2xl font-bold">Phim đang chiếu</h2>
                    <MovieShowingNowList />
                </div>
            </div>
            <div className="max-w-6xl mx-auto py-7">
                <h2 className="text-center text-gray-800 mb-7 text-2xl font-bold">Phim sắp chiếu</h2>
                <MovieComingSoonList withBg={false} />
            </div>

            <div className="bg-gray-50 relative">
                <div className="max-w-6xl mx-auto py-7">
                    <SearchMovie />
                </div>
            </div>
        </>
    )
}

export default MovieShow