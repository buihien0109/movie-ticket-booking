import React from 'react'
import { Helmet } from 'react-helmet'
import ListBlogLatest from '../blog/components/ListBlogLatest'
import MovieComingSoonList from '../movie/components/MovieComingSoonList'
import MovieShowingNowList from '../movie/components/MovieShowingNowList'
import MovieReviewList from '../review/components/MovieReviewList'
import MovieScheduleContainer from './components/MovieScheduleContainer'

function Home() {
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
            </Helmet>
            <div className="bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(https://homepage.momocdn.net/img/momo-upload-api-230912110927-638301137672516955.jpeg)" }}>
                <div className="max-w-6xl mx-auto py-7">
                    <h2 className="text-2xl font-bold text-center text-white mb-7">Phim đang chiếu</h2>
                    <MovieShowingNowList />
                </div>
            </div>
            <div className="max-w-6xl mx-auto py-7">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">Phim sắp chiếu</h2>
                <MovieComingSoonList withBg={false} />
            </div>

            <section className="scroll-margin-top bg-gray-50 py-8 md:py-10 lg:py-14">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="mb-5 text-center md:mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Lịch chiếu phim</h2>
                    </div>
                    <MovieScheduleContainer />
                </div>

            </section>

            <section className="py-8 md:py-10 lg:py-14">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-7">Bình luận nổi bật</h2>
                    <MovieReviewList />
                </div>
            </section>

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

export default Home