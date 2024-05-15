import React, { useEffect, useState } from 'react';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import MovieReviewItem from './MovieReviewItem';
import { useGetAllReviewsOfMoviesQuery } from '../../../app/services/reviewPublic.api';

const useFetchMovieReviews = () => {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [isShowLoadMore, setIsShowLoadMore] = useState(true);

    const { data: pageData, isLoading, isError } = useGetAllReviewsOfMoviesQuery({
        page: page
    });

    useEffect(() => {
        if (pageData && pageData.content) {
            setMovies(prevMovies => [...prevMovies, ...pageData.content]);
            setIsShowLoadMore(!pageData.last);
        }
    }, [pageData]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    return { movies, isShowLoadMore, handleLoadMore, isLoading, isError };
};

function MovieReviewList() {
    const { movies, isShowLoadMore, handleLoadMore, isLoading, isError } = useFetchMovieReviews();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return <Error />;
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-x-5 gap-y-6">
                {movies && movies.map(movie => (
                    <MovieReviewItem key={movie.id} movie={movie} />
                ))}
            </div>
            {isShowLoadMore && (
                <div className="pt-6 text-center">
                    <button type="button"
                        onClick={handleLoadMore}
                        className="rounded-full border border-pink-500 bg-white/10 py-1 pl-4 pr-6 font-semibold text-pink-500 transition-all hover:text-pink-600">
                        <span><i className="fa-solid fa-arrow-down"></i></span>
                        Xem thêm!
                    </button>
                </div>
            )}
        </>
    )
}

export default MovieReviewList