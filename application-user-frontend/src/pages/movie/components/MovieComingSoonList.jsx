import React from 'react';
import { useGetComingSoonMoviesQuery } from '../../../app/services/movie.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import MovieListSlider from './MovieListSlider';

function MovieComingSoonList({ withBg }) {
    const {
        data: movies,
        isLoading: isLoadingComingSoonMovies,
        isError: isErrorComingSoonMovies
    } = useGetComingSoonMoviesQuery();

    if (isLoadingComingSoonMovies) {
        return <Loading />
    }

    if (isErrorComingSoonMovies) {
        return <Error />
    }
    return (
        <>
            <MovieListSlider movies={movies} showStar={false} withBg={withBg} />
        </>
    )
}

export default MovieComingSoonList