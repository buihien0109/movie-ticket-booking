import React from 'react';
import ModalBase from '../../../../components/modal-trailer/ModalBase';
import { formatCurrency, formatDate, formatMovieAge } from '../../../../utils/functionUtils';

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
    const { open, handleOpen, zIndex, schedule, showtimes, selectedSeats, totalPriceSeat, selectedServices, totalPriceService } = props
    const { cinema, movie } = schedule
    const totalPrice = totalPriceSeat + totalPriceService
    return (
        <>
            <ModalBase isOpen={open} onClose={handleOpen} size="md" zIndex={zIndex}>
                <div className="flex h-full flex-col bg-white overflow-auto rounded-md p-0">
                    <div className="modal-body h-full overflow-auto rounded bg-white p-0">
                        <div className="flex flex-col md:flex-row">
                            <div className="order-2 mx-auto basis-1/2 px-6 py-5 md:order-1">
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
                            </div>
                            <div
                                className="order-1 flex basis-1/2 items-center justify-center md:order-2"
                                style={{ background: `url('https://homepage.momocdn.net/jk/momo2020/img/intro/qrcode-pattern.png') 10px 10px no-repeat, linear-gradient(to top, rgb(193, 23, 124), rgb(225, 27, 144))` }}
                            >
                                <div className="px-8 py-9 text-center">
                                    <h4 className="mb-5 text-base text-white">Quét mã QR bằng MoMo để thanh toán</h4>

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