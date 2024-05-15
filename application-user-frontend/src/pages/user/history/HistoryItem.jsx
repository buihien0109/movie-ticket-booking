import React from 'react';
import { Link } from 'react-router-dom';
import ModalBase from '../../../components/modal/base/ModalBase';
import useModal from '../../../components/modal/hook/useModal';
import { formatCurrency, formatDate, formatMovieAge } from '../../../utils/functionUtils';

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

function HistoryItem({ order }) {
    const { open, handleOpen } = useModal();

    return (
        <>
            <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/phim/${order.showtime.movie.id}/${order.showtime.movie.slug}`} className="text-sm text-gray-900 hover:underline">{order.showtime.movie.name}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(order.totalPrice)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                        onClick={handleOpen}
                        className="text-gray-900 hover:underline"
                    >Xem chi tiết</button>
                </td>
            </tr>

            <ModalBase isOpen={open} onClose={handleOpen} size="md" style={{ width: "1000px" }}>
                <div className="flex h-full flex-col bg-white overflow-auto rounded-md p-0">
                    <div className="modal-body h-full overflow-auto rounded bg-white p-0">
                        <div className="flex flex-col md:flex-row">
                            <div className="order-2 mx-auto basis-1/2 px-6 py-5 md:order-1">
                                <div>
                                    <ul className="flex items-center space-x-2">
                                        <li className="origin-left scale-90">
                                            <div
                                                className={`inline-flex h-6 items-center justify-center rounded-sm bg-opacity-80 px-1 text-xs font-semibold text-white text-opacity-95 w-10 ${formatMovieAge(order.showtime.movie?.age).color}`}
                                                style={{ minWidth: "20px" }}
                                            >
                                                {formatMovieAge(order.showtime.movie?.age).text}
                                            </div>
                                        </li>
                                        <li className="md:text-lg"><b>{order.showtime.movie?.name}</b></li>
                                    </ul>
                                    <ul className="mt-4 grid grid-cols-2 gap-x-10 gap-y-4 border-t border-dashed border-gray-200 pt-4">
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>THỜI GIAN</span>
                                                <div className="text-gray-800"><b>{order.showtime?.startTime} ~ {order.showtime?.endTime}</b></div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>NGÀY CHIẾU</span>
                                                <div className="text-gray-800"><b>{formatDate(order.showtime?.date)}</b></div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10 col-span-2">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>RẠP</span>
                                                <div className="text-gray-800"><b>{order.showtime.auditorium.cinema?.name}</b></div>
                                                <div className="text-sm text-gray-500">{order.showtime.auditorium.cinema?.address}</div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>PHÒNG CHIẾU</span>
                                                <div className="text-gray-800"><b>{order.showtime.auditorium.name}</b></div>
                                            </div>
                                        </li>
                                        <li className="flex items-end justify-between space-x-10">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>ĐỊNH DẠNG</span>
                                                <div className="text-gray-800"><b>{parseGraphicsType(order.showtime?.graphicsType)} {parseTranslationType(order.showtime?.translationType)}</b></div>
                                            </div>
                                        </li>
                                    </ul>
                                    <ul className="mt-4 border-t border-dashed border-gray-200 pt-4">
                                        <li className="flex items-end justify-between space-x-10 col-span-2">
                                            <div>
                                                <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>GHẾ</span>
                                                <div className="text-gray-800"><b>{order.ticketItems.map(ticket => ticket.seat.code).join(", ")}</b></div>
                                            </div>
                                            <div className="text-gray-800"><b>{formatCurrency(order.ticketItems.reduce((total, ticket) => total + ticket.price, 0))}đ</b></div>
                                        </li>
                                        {order.serviceItems.length > 0 && (
                                            <div className="mt-5">
                                                <li className="flex items-end justify-start space-x-10 col-span-2">
                                                    <div>
                                                        <span className="block font-semibold text-gray-500" style={{ fontSize: "11px" }}>BẮP - NƯỚC</span>
                                                    </div>
                                                </li>
                                                {order.serviceItems.map(service => (
                                                    <li key={service.id} className="flex items-end justify-between space-x-10 col-span-2">
                                                        <div>
                                                            <div className="text-gray-800"><b>{service.quantity} x {service.additionalService.name}</b></div>
                                                        </div>
                                                        <div className="text-gray-800"><b>{formatCurrency(service.quantity * service.additionalService.price)}đ</b></div>
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
                                        <div className="text-gray-800"><b>{formatCurrency(order.tempPrice)}đ</b></div>
                                    </li>
                                    <li className="flex items-end justify-between space-x-10">
                                        <div>
                                            <div className="text-gray-800"><b>Giảm giá {order.discount ? `(${order.discount}%)` : ""}</b></div>
                                        </div>
                                        <div className="text-gray-800"><b>{formatCurrency(order.discountPrice)}đ</b></div>
                                    </li>
                                    <li className="flex items-end justify-between space-x-10">
                                        <div>
                                            <div className="text-gray-800"><b>Thành tiền</b></div>
                                        </div>
                                        <div className="text-gray-800"><b>{formatCurrency(order.totalPrice)}đ</b></div>
                                    </li>
                                </ul>
                            </div>

                            <div
                                className="order-1 flex basis-1/2 items-center justify-center md:order-2"
                                style={{ background: `url('https://homepage.momocdn.net/jk/momo2020/img/intro/qrcode-pattern.png') 10px 10px no-repeat, linear-gradient(to top, rgb(193, 23, 124), rgb(225, 27, 144))` }}
                            >
                                <div className="flex justify-center flex-col">
                                    <div className="flex justify-center">
                                        <img src={order.qrCodePath} alt="QR Code" />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h4 className="mb-4 text-sm text-white">Mã QR được sử dụng khi quét vé tại rạp</h4>

                                        <a href={`${order.qrCodePath}/download`} download={true} className="!flex items-center justify-center btn-primary !px-8 py-3 !text-md bg-white text-gray-800 rounded-full text-sm hover:bg-gray-100">Tải xuống QRCode</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </ModalBase>
        </>
    )
}

export default HistoryItem