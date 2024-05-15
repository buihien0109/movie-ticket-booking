import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetShowtimesByCinemaQuery } from '../../../app/services/showtimes.api';
import Error from '../../../components/error/Error';
import LoadingInside from '../../../components/loading/LoadingInside';
import MovieScheduleItem from './MovieScheduleItem';
import { groupShowtimes } from '../../../utils/functionUtils';

function ListMovieScheduleItem() {
    const { showtimes } = useSelector(state => state)
    const { showdate, cinemaId } = showtimes
    const { data, isLoading, isFetching, isError, error, refetch } = useGetShowtimesByCinemaQuery({
        showDate: showdate, cinemaId
    })

    useEffect(() => {
        refetch();
    }, [showtimes])

    if (isLoading || isFetching) return <LoadingInside />
    if (isError) return <Error error={error} />

    const movieSchedule = groupShowtimes(data)
    return (
        <>
            {movieSchedule.length > 0 && movieSchedule?.map((schedule, index) => (
                <MovieScheduleItem key={index} schedule={schedule} />
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
        </>
    )
}

export default ListMovieScheduleItem