import React from 'react';
import { useGetShowingNowMoviesQuery } from '../../../app/services/movie.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import MovieListSlider from './MovieListSlider';

function MovieShowingNowList() {
    const {
        data: movies,
        isLoading: isLoadingShowingNowMovies,
        isError: isErrorShowingNowMovies
    } = useGetShowingNowMoviesQuery();

    if (isLoadingShowingNowMovies) {
        return <Loading />
    }

    if (isErrorShowingNowMovies) {
        return <Error />
    }
    return (
        <>
            <MovieListSlider movies={movies} showStar={true} withBg={true} />
        </>
    )
}

export default MovieShowingNowList