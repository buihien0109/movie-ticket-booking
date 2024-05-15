import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import ListBlogLatest from '../../blog/components/ListBlogLatest'
import MovieScheduleContainer from '../../home/components/MovieScheduleContainer'
import MovieComingSoonList from '../components/MovieComingSoonList'

function Showtimes() {
    return (
        <>
            <Helmet>
                <title>Lịch chiếu phim</title>
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
                            <span>Lịch chiếu phim</span>
                        </span>
                    </li>
                </ol>
            </div>

            <section className="scroll-margin-top bg-gray-50 py-8 md:py-10 lg:py-14">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-5 text-center md:mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Lịch chiếu phim</h2>
                    </div>
                    <MovieScheduleContainer />
                </div>
            </section>

            <div className="max-w-6xl mx-auto py-7">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">Phim sắp chiếu</h2>
                <MovieComingSoonList withBg={false} />
            </div>

            <section>
                <div className="py-8 md:py-10 lg:py-14 landing:bg-transparent bg-gray-50">
                    <div className="mx-auto w-full max-w-6xl">
                        <div className="mb-5 text-center md:mb-8">
                            <h2 className="text-2xl font-bold lg:text-3xl text-pink-600">Blog phim ảnh</h2>
                            <h3 className="mx-auto mt-2 max-w-3xl text-md text-gray-500 lg:text-lg">
                                Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày
                            </h3>
                        </div>

                        <ListBlogLatest type="all" limit={8} col={4} />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Showtimes