import React from 'react'
import { useSelector } from 'react-redux'
import CinemaList from './CinemaList'
import ListMovieScheduleItem from './ListMovieScheduleItem'
import ShowDate from './ShowDate'
import useModal from '../../../components/modal/hook/useModal'
import ModalAddress from '../../../components/modal/address/ModalAddress'

function MovieScheduleContainer() {
    const { open, handleOpen } = useModal();
    const { showtimes, cinemas } = useSelector(state => state)
    const { cinemaId } = showtimes
    const cinema = cinemas.find(cinema => cinema.id === cinemaId)

    return (
        <>
            <div className="rounded-lg border-gray-200 bg-white md:overflow-hidden md:border">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <CinemaList />
                    <div className="cinema-list-height -mx-5 md:col-span-2 md:mx-0 md:border-l md:border-gray-200">
                        <div className="fresnel-container fresnel-greaterThan-sm sticky top-0 z-20 shadow-sm">
                            <div className="flex h-[62px] items-center bg-gray-50 px-5 pb-2.5 pt-2.5">
                                <div className="rap-detail flex w-full flex-nowrap items-center">
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-0 text-sm font-semibold leading-tight text-gray-800">
                                            <span className="text-gray-800">
                                                Lịch chiếu phim {cinema?.name}</span>
                                        </div>
                                        <div className="flex flex-nowrap items-center text-sm text-gray-500">
                                            <div className="truncate">
                                                {cinema?.address}
                                            </div>
                                            <div className="pl-2" onClick={handleOpen}>
                                                <a className="inline-block text-blue-500 whitespace-nowrap relative z-10 hover:text-blue-700 cursor-pointer">[ Bản đồ ]</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-nav z-20 border-b border-gray-200 bg-white py-2 top-[62px] sticky">
                            <ShowDate />
                        </div>
                        <div className="booking-list-height relative">
                            <div
                                className="z-[1] bg-gray-100 bg-opacity-90 px-4 pb-2 pt-2 text-xs text-pink-600 backdrop-blur-lg sm:px-5 sm:text-sm cinema-status-sticky sticky">
                            </div>
                            <div className="normal-accordion divide-y divide-gray-200">
                                <div className="grid">
                                    <ListMovieScheduleItem />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {cinema !== null && open && (
                <ModalAddress url={cinema?.mapLocation} open={open} handleOpen={handleOpen} />
            )}
        </>
    )
}

export default MovieScheduleContainer