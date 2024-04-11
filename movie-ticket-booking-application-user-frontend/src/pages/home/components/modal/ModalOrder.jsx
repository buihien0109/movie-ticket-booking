import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../../../../app/services/order.api';
import { formatCurrency, formatDate, formatMovieAge } from '../../../../utils/functionUtils';
import ModalBase from '../../../../components/modal/base/ModalBase';

const parseGraphicsType = (type) => {
    switch (type) {
        case "_2D":
            return "2D";
        case "_3D":
            return "3D";
        default:
            return "";
    }
}

const parseTranslationType = (type) => {
    switch (type) {
        case "SUBTITLING":
            return "Phụ đề";
        case "DUBBING":
            return "Lồng tiếng";
        default:
            return "";
    }
}

function ModalOrder(props) {
    const navigate = useNavigate()
    const { open, handleOpen, zIndex, schedule, showtimes, selectedSeats, totalPriceSeat, selectedServices, totalPriceService } = props
    const { cinema, movie } = schedule
    const [createOrder, { isLoading }] = useCreateOrderMutation()

    const handlePayment = () => {
        const order = {
            showtimeId: showtimes.id,
            ticketItems: selectedSeats.map(seat => ({
                seatId: seat.id,
                price: seat.price
            })),
            serviceItems: selectedServices.map(service => ({
                additionalServiceId: service.id,
                quantity: service.count,
                price: service.price
            }))
        }
        createOrder(order).unwrap()
            .then((res) => {
                window.location.href = res.url
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const totalPrice = totalPriceSeat + totalPriceService
    return (
        <>
            <ModalBase isOpen={open} onClose={handleOpen} size="sm" zIndex={zIndex} style={{ width: "600px" }}>
                <div className="flex h-full flex-col bg-white overflow-auto rounded-md p-0">
                    <div className="modal-body h-full overflow-auto rounded bg-white p-0">
                        <div className="flex flex-col md:flex-row">
                            <div className="order-2 mx-auto grow px-6 py-5 md:order-1">
                                <div>
                                    <ul className="flex items-center space-x-2">
                                        <li className="origin-left scale-90">
                                            <div
                                                className={`inline-flex h-6 items-center justify-center rounded-sm bg-opacity-80 px-1 text-xs font-semibold text-white text-opacity-95 w-10 ${formatMovieAge(movie?.age).color}`}
                                                style={{ minWidth: "20px" }}
                                            >
                                                {formatMovieAge(movie?.age).text}
                                            </div>
                                        </li>
                                        <li className="md:text-lg"><b>{movie?.name}</b></li>
                                    </ul>
                                    <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4 border-t border-dashed border-gray-200 pt-4">
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>THỜI GIAN</span>
                                                <div className="text-gray-800"><b>{showtimes?.startTime} ~ {showtimes?.endTime}</b></div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>NGÀY CHIẾU</span>
                                                <div className="text-gray-800"><b>{formatDate(showtimes?.date)}</b></div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10 col-span-2">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>RẠP</span>
                                                <div className="text-gray-800"><b>{cinema?.name}</b></div>
                                                <div className="text-sm text-gray-500">{cinema?.address}</div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>PHÒNG CHIẾU</span>
                                                <div className="text-gray-800"><b>{showtimes.auditorium.name}</b></div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>ĐỊNH DẠNG</span>
                                                <div className="text-gray-800"><b>{parseGraphicsType(showtimes?.graphicsType)} {parseTranslationType(showtimes?.translationType)}</b></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="mt-4 border-t border-dashed border-gray-200 pt-4">
                                        <li className="flex items-end justify-between space-x-10 col-span-2">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>GHẾ</span>
                                                <div className="text-gray-800"><b>{selectedSeats.map(seat => seat.code).join(", ")}</b></div>
                                            </div>
                                            <div className="text-gray-800"><b>{formatCurrency(totalPriceSeat)}đ</b></div>
                                        </li>
                                        {selectedServices.length > 0 && (
                                            <div className="mt-5">
                                                <li className="flex items-end justify-start space-x-10 col-span-2">
                                                    <div>
                                                        <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>BẮP - NƯỚC</span>
                                                    </div>
                                                </li>
                                                {selectedServices.map(service => (
                                                    <li key={service.id} className="flex items-end justify-between space-x-10 col-span-2">
                                                        <div>
                                                            <div className="text-gray-800"><b>{service.count} x {service.name}</b></div>
                                                        </div>
                                                        <div className="text-gray-800"><b>{formatCurrency(service.count * service.price)}đ</b></div>
                                                    </li>
                                                ))}
                                            </div>
                                        )}
                                    </ul>
                                </div>
                                <ul className="mt-4 border-t border-dashed border-gray-200 pt-4">
                                    <li className="flex items-end justify-between space-x-10">
                                        <div>
                                            <div className="text-gray-800"><b>Tạm tính</b></div>
                                        </div>
                                        <div className="text-gray-800"><b>{formatCurrency(totalPrice)}đ</b></div>
                                    </li>
                                </ul>
                                <div className="mt-2 text-xs italic leading-normal text-gray-500">Ưu đãi (nếu có) sẽ được áp dụng ở bước thanh toán.</div>

                                <div className="mt-4">
                                    <button
                                        onClick={handlePayment}
                                        type="button"
                                        className="relative mx-auto !flex items-center justify-center btn-primary h-12 w-full !px-8 !text-md hover:bg-pink-500 bg-pink-600 text-white rounded-lg font-bold"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="animate-spin inline-block mr-2">
                                                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                        ) : null}
                                        Tiến hành thanh toán
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </ModalBase>
        </>
    )
}

export default ModalOrder