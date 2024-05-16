import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useGetSeatsByAuditoriumQuery } from '../../../../app/services/auditorium.api';
import { useBookReservationMutation, useCancelReservationMutation } from '../../../../app/services/reservation.api';
import Error from '../../../../components/error/Error';
import LoadingInside from '../../../../components/loading/LoadingInside';
import { useWebSocket } from '../../../../contexts/WebSocketProvider';
import { createLabel, formatCurrency, formatDateToDDMM, formatMovieAge, getDayOfWeek } from '../../../../utils/functionUtils';
import Seat from '../seat/Seat';
import ModalChoseAdditionalService from './ModalChoseAdditionalService';
import useModal from '../../../../components/modal/hook/useModal';
import ModalBase from '../../../../components/modal/base/ModalBase';

function ModalChoseTicket({ schedule, showtimes, open, handleOpen }) {
    const { stompClient, isConnected } = useWebSocket();
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [localSeats, setLocalSeats] = useState([]);
    const { movie } = schedule
    const { auditorium } = showtimes
    const { open: openModalAdditionalService, handleOpen: handleOpenModalAdditionalService } = useModal()
    const { data: seats, isLoading, isFetching, isError, error } = useGetSeatsByAuditoriumQuery({
        auditoriumId: auditorium.id,
        showtimeId: showtimes.id
    }, {
        refetchOnMountOrArgChange: true
    })
    const [bookReservation, { isLoading: isLoadingBookReservation }] = useBookReservationMutation();
    const [cancelReservation, { isLoading: isLoadingCancelReservation }] = useCancelReservationMutation();

    // Cập nhật localSeats khi seats từ RTK Query thay đổi
    useEffect(() => {
        setLocalSeats(seats ?? []);
    }, [seats]);

    useEffect(() => {
        if (isConnected && stompClient) {
            const topic = `/topic/seatUpdate`;
            const subscription = stompClient.subscribe(topic, (message) => {
                // Thông tin cập nhật ghế từ server
                const seatUpdateInfo = JSON.parse(message.body); // { seatId: 1, showtimeId: 1, status: HELD, BOOKED, CANCELLED }

                // Cập nhật trạng thái ghế trong localSeats
                setLocalSeats(currentSeats => {
                    const updatedSeats = currentSeats.map(seat => {
                        if (seat.id === seatUpdateInfo.seatId) {
                            return {
                                ...seat,
                                reservationStatus: seatUpdateInfo.status
                            };
                        }
                        return seat;
                    });
                    return updatedSeats;
                });

                // Cập nhật trạng thái ghế trong selectedSeats. Nếu ghế đã chọn bị hủy, thì xóa khỏi selectedSeats
                setSelectedSeats(currentSelectedSeats => {
                    const existingIndex = currentSelectedSeats.findIndex(seat => seat.id === seatUpdateInfo.seatId);
                    if (existingIndex !== -1 && !seatUpdateInfo.status) {
                        // Tìm mã ghế để hiển thị trong thông báo
                        const seatToBeRemoved = currentSelectedSeats[existingIndex];
                        toast.info(`Ghế ${seatToBeRemoved.code} đã bị hủy do hết thời gian giữ ghế.`);

                        return currentSelectedSeats.filter((_, index) => index !== existingIndex);
                    }
                    return currentSelectedSeats;
                });
            });

            return () => {
                subscription.unsubscribe();
            };
        }
    }, [isConnected, stompClient]);

    if (isLoading || isFetching) return <LoadingInside />
    if (isError) return <Error error={error} />

    const rows = localSeats.reduce((acc, seat) => {
        acc[seat.rowIndex] = acc[seat.rowIndex] || [];
        acc[seat.rowIndex].push(seat);
        return acc;
    }, {});

    const handleChooseSeat = (chosenSeat) => {
        const existingIndex = selectedSeats.findIndex(seat => seat.id === chosenSeat.id);

        if (selectedSeats.length >= 8 && existingIndex === -1) {
            toast.warning('Không thể chọn quá 8 ghế trong một lần đặt vé!');
            return;
        }

        if (existingIndex !== -1) {
            if (chosenSeat.type === 'COUPLE') {
                const adjacentSeat = findAdjacentCoupleSeat(chosenSeat, localSeats);
                if (adjacentSeat) {
                    cancelReservation({ seatId: chosenSeat.id, showtimeId: showtimes.id });
                    cancelReservation({ seatId: adjacentSeat.id, showtimeId: showtimes.id });
                    toast.info(`Bạn đã hủy chọn ghế ${chosenSeat.code}, ${adjacentSeat.code}`);
                    setSelectedSeats(selectedSeats.filter(seat => seat.id !== chosenSeat.id && seat.id !== adjacentSeat.id));
                } else {
                    cancelReservation({ seatId: chosenSeat.id, showtimeId: showtimes.id });
                    toast.info(`Bạn đã hủy chọn ghế ${chosenSeat.code}`);
                    setSelectedSeats(selectedSeats.filter((_, index) => index !== existingIndex));
                }
            } else {
                cancelReservation({ seatId: chosenSeat.id, showtimeId: showtimes.id });
                toast.info(`Bạn đã hủy chọn ghế ${chosenSeat.code}`);
                setSelectedSeats(selectedSeats.filter((_, index) => index !== existingIndex));
            }
        } else {
            if (selectedSeats.length > 0 && selectedSeats[0].type !== chosenSeat.type) {
                toast.warning('Không thể chọn hai loại vé khác nhau!');
                return;
            }

            if (chosenSeat.type === 'COUPLE') {
                const adjacentSeat = findAdjacentCoupleSeat(chosenSeat, localSeats);
                if (adjacentSeat) {
                    bookReservation({ seatId: chosenSeat.id, showtimeId: showtimes.id });
                    bookReservation({ seatId: adjacentSeat.id, showtimeId: showtimes.id });
                    toast.success(`Bạn đã chọn ghế ${chosenSeat.code}, ${adjacentSeat.code}`);
                    setSelectedSeats([...selectedSeats, chosenSeat, adjacentSeat]);
                } else {
                    toast.error('Không tìm thấy ghế đôi phù hợp!');
                }
            } else {
                bookReservation({ seatId: chosenSeat.id, showtimeId: showtimes.id });
                toast.success(`Bạn đã chọn ghế ${chosenSeat.code}`);
                setSelectedSeats([...selectedSeats, chosenSeat]);
            }
        }
    };

    const findAdjacentCoupleSeat = (chosenSeat, allSeats) => {
        // Kiểm tra xem ghế đã chọn là ghế bên trái hay bên phải của cặp ghế
        const isRightCoupleSeat = chosenSeat.colIndex % 2 === 1;

        // Tiếp theo, tìm colIndex cặp ghế bên cạnh
        const adjacentSeatColIndex = isRightCoupleSeat ? chosenSeat.colIndex + 1 : chosenSeat.colIndex - 1;

        // Tìm thông tin ghế bên cạnh
        const adjacentSeat = allSeats.find(seat => seat.rowIndex === chosenSeat.rowIndex && seat.colIndex === adjacentSeatColIndex);

        return adjacentSeat;
    }

    const goToAdditionalService = () => {
        if (selectedSeats.length === 0) {
            toast.warning('Vui lòng chọn ghế trước khi tiếp tục');
            return;
        }

        handleOpenModalAdditionalService();
    }

    const handleCancelAllSeats = () => {
        selectedSeats.forEach(seat => {
            cancelReservation({ seatId: seat.id, showtimeId: showtimes.id });
        });
        toast.info('Đã hủy tất cả ghế bạn đã chọn');
        setSelectedSeats([]);
    }

    const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
    return (
        <>
            <ModalBase isOpen={open} onClose={handleOpen} size="md" style={{ width: "1000px" }}>
                <div className="flex h-full flex-col bg-black overflow-auto rounded-md p-0">
                    <div className="relative flex shrink-0 items-center bg-pink-600 px-4 py-3">
                        <svg onClick={handleOpen} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="absolute left-3 h-6 shrink-0 cursor-pointer text-white transition-all hover:opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                        <b className="grow text-center text-white">Mua vé xem phim</b>
                    </div>

                    <div className='flex-1 overflow-hidden'>
                        <div className='flex h-full flex-col overflow-hidden bg-gray-800 pb-3'>
                            <div className="flex h-full overflow-hidden bg-gray-800 text-sm text-white">
                                <div className='flex flex-wrap w-full'>
                                    <div className="mb-3 w-full basis-full px-20 pt-3 text-center text-white lg:mb-6 lg:px-40">
                                        <div className="mx-auto mb-1 h-1 w-64 rounded-lg bg-white"></div><span
                                            className="text-xs lg:text-sm">MÀN HÌNH</span>
                                    </div>

                                    <div className='cinema-seat-chart mx-auto'>
                                        {Object.keys(rows).map((rowIndex) => (
                                            <div key={rowIndex} className="cinema-seat-row flex">
                                                {rows[rowIndex].map((seat) => (
                                                    <Seat
                                                        key={seat.id}
                                                        seat={seat}
                                                        onChooseSeat={handleChooseSeat}
                                                        isSelected={selectedSeats.some(selectedSeat => selectedSeat.id === seat.id)}
                                                    />
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 w-full px-4 text-xs text-white">
                                <div className="mx-auto grid w-fit grid-cols-2 gap-x-2 gap-y-2">
                                    <div className="flex items-center space-x-1.5">
                                        <div className="h-4 w-4 shrink-0 rounded-sm bg-gray-700 "></div>
                                        <span>Đã đặt</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <div className="h-4 w-4 shrink-0 rounded-sm border border-white bg-pink-600"></div>
                                        <span>Ghế bạn chọn</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <div className="h-4 w-4 shrink-0 rounded-sm" style={{ backgroundColor: "rgb(114, 46, 209)" }}></div>
                                        <span className="break-all">Ghế thường</span>
                                    </div>
                                    <div className="flex items-center space-x-1.5">
                                        <div className="h-4 w-4 shrink-0 rounded-sm" style={{ backgroundColor: "rgb(245, 34, 45)" }}></div>
                                        <span className="break-all">Ghế VIP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0">
                        <div className="rounded-t-xl bg-white px-4 py-4 sm:rounded-t-none ">
                            <div className="grid grid-cols-1 divide-y divide-gray-200 text-sm">
                                <div className="pb-2">
                                    <div className="flex space-x-2 pb-1 ">
                                        <div className="h-fit shrink-0 scale-90">
                                            <div className={`inline-flex h-5  items-center justify-center rounded-sm bg-opacity-80 px-1  text-xs font-semibold text-white text-opacity-95 ${formatMovieAge(movie?.age).color}`} style={{ minWidth: "20px" }}>
                                                {formatMovieAge(movie?.age).text}
                                            </div>
                                        </div>
                                        <div><b className="text-base line-clamp-1 md:line-clamp-none ">{movie.name}</b></div>
                                    </div>
                                    <div>
                                        <span className="block text-tiny text-orange-500 lg:text-sm">
                                            {showtimes?.startTime} ~ {showtimes?.endTime} · {getDayOfWeek(showtimes?.date)}, {formatDateToDDMM(showtimes?.date)} · Phòng chiếu {auditorium.name} · {createLabel(showtimes)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between space-x-3 py-1.5">
                                    <span className="shrink-0 text-gray-500">
                                        Chỗ ngồi
                                    </span>
                                    {selectedSeats.length > 0 && (
                                        <div className={`flex items-center space-x-2 rounded-lg border border-gray-200 px-3 py-1 ${selectedSeats.length === 0 ? "invisible opacity-0" : ""}`}>
                                            <span>
                                                {selectedSeats.map(seat => seat.code).join(", ")}
                                            </span>
                                            <svg
                                                onClick={() => handleCancelAllSeats()}
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="rgb(239 68 68)"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2" stroke="currentColor"
                                                aria-hidden="true"
                                                className="h-6 shrink-0 cursor-pointer text-white transition-all hover:opacity-70"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center border-t border-gray-200 pt-3">
                                <div className="flex-1">
                                    <span className="block text-sm text-gray-500 ">Tạm tính</span><b className="text-lg d">{formatCurrency(totalPrice)}đ</b>
                                </div>
                                <div className="shrink-0">
                                    <button
                                        onClick={goToAdditionalService}
                                        type="button" className="relative mx-auto !flex items-center justify-center btn-primary tracking-engage-btn-cineseat h-12 w-full !px-8 !text-md hover:bg-pink-500 bg-pink-600 text-white rounded-lg font-bold">
                                        <div className="pointer-events-none">Mua vé</div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBase>

            <ModalChoseAdditionalService
                open={openModalAdditionalService}
                handleOpen={handleOpenModalAdditionalService}
                zIndex={60}
                schedule={schedule}
                showtimes={showtimes}
                selectedSeats={selectedSeats}
                totalPriceSeat={totalPrice}
            />
        </>
    );
}

export default ModalChoseTicket