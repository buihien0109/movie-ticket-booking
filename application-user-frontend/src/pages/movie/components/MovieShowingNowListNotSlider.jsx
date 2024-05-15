import React from 'react';
import { useGetShowingNowMoviesQuery } from '../../../app/services/movie.api';
import MovieList from './MovieList';
import Loading from '../../../components/loading/Loading';
import Error from '../../../components/error/Error';

function MovieShowingNowListNotSlider() {
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
            <MovieList movies={movies} type={"MOVIE_ITEM_HORIZONTAL"} />
        </>
    )
}

export default MovieShowingNowListNotSlider