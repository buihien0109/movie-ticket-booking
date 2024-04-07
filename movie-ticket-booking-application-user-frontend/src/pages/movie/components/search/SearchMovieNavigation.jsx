import React from 'react'
import SearchTypeCountry from './SearchTypeCountry'
import SearchTypeGenre from './SearchTypeGenre'
import SearchTypeKeyword from './SearchTypeKeyword'
import SearchTypeYear from './SearchTypeYear'

function SearchMovieNavigation() {
    return (
        <div className="mb-5 items-center md:mb-5 lg:flex">
            <div className="flex-1 py-2">
                <h2 className="flex-1 text-center text-2xl font-bold text-gray-800 lg:text-left lg:text-2xl">Tìm phim chiếu rạp</h2>
            </div>
            <div className="-mx-5 shrink-0 py-0 md:mx-0 md:py-2">
                <div className="flex w-full flex-wrap items-center justify-center md:pl-0 ">
                    <SearchTypeGenre />
                    <SearchTypeCountry />
                    <SearchTypeYear />
                    <SearchTypeKeyword />
                </div>
            </div>
        </div>
    )
}

export default SearchMovieNavigation