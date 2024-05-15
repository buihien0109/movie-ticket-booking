import React, { useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieItem from './MovieItem';

function MovieListSlider({ movies, showStar, withBg }) {
    const navigationNextRef = useRef(null);
    const navigationPrevRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    return (
        <div className='relative'>
            <Swiper
                slidesPerView={5}
                slidesPerGroup={1}
                spaceBetween={15}
                navigation={{
                    prevEl: isBeginning ? null : navigationPrevRef.current,
                    nextEl: isEnd ? null : navigationNextRef.current,
                }}
                modules={[Navigation]}
                onInit={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                className="my-5">
                {movies && movies.map(movie => (
                    <SwiperSlide key={movie.id}>
                        <MovieItem movie={movie} showStar={showStar} withBg={withBg} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {!isEnd && (
                <div ref={navigationNextRef} className="button-next button-swiper absolute -right-6 top-40 z-20 flex  h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow transition-all hover:opacity-90">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </div>
            )}
            {!isBeginning && (
                <div ref={navigationPrevRef} className="button-prev button-swiper absolute -left-6 top-40 z-20 flex  h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow transition-all hover:opacity-90">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </div>
            )}
        </div>
    )
}

export default MovieListSlider