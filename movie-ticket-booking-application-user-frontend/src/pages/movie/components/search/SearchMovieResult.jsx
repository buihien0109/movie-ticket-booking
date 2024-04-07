import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchMoviesQuery } from '../../../../app/services/movie.api';
import { setSearchValue } from '../../../../app/slices/search.slice';
import Error from '../../../../components/error/Error';
import LoadingInside from '../../../../components/loading/LoadingInside';
import MovieItem from '../MovieItem';

function SearchMovieResult() {
  const search = useSelector((state) => state.search)
  const { genre, country, releaseYear, keyword, page } = search
  const { data, isLoading, isFetching, isError, error, refetch } = useSearchMoviesQuery({ genre, country, releaseYear, keyword, page })
  const dispatch = useDispatch()

  useEffect(() => {
    refetch();
  }, [search])

  if (isError) return <Error error={error} />

  const handlePageChange = (page) => {
    dispatch(setSearchValue({ key: 'page', value: page }))
  }

  return (
    <>
      {(isLoading || isFetching) && <LoadingInside />}
      {data?.totalElements > 0 && (
        <div className="grid grid-cols-5 gap-x-3 gap-y-5 my-5">
          {data?.content.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              showStar={movie.reviews.length > 0}
              withBg={false}
            />
          ))}
        </div>
      )}
      {data?.totalElements === 0 && (
        <div className="mb-7 mt-4 w-full text-center text-gray-400 md:mb-20 md:mt-10">
          Rất tiếc, không tìm thấy phim phù hợp với lựa chọn của bạn
        </div>
      )}
      {data?.totalPages > 1 && (
        <Pagination
          current={search.page}
          total={data.totalElements}
          pageSize={data.size}
          onChange={handlePageChange}
          className='text-center mt-5'
        />
      )}
    </>
  )
}

export default SearchMovieResult