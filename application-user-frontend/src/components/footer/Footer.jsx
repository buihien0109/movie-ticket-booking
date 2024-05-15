import React from 'react'

function Footer() {
    return (
        <footer className="grid grid-cols-1 flex-wrap bg-gray-900 py-7 text-white">
            <div
                className="mx-auto w-full max-w-6xl grid grid-cols-2 gap-5 sm:gap-x-20 sm:gap-y-10 lg:flex lg:flex-nowrap lg:gap-14">
                <div className="block grow md:w-44 md:shrink-0 md:border-none md:pb-0">
                    <ul className="text-sm">
                        <li>
                            <h3
                                className="block whitespace-nowrap text-sm text-white/80 font-bold uppercase text-white text-opacity-80 hover:text-inherit">
                                CHĂM SÓC KHÁCH HÀNG</h3>
                        </li>
                        <li className="mt-3"><a
                            className="whitespace-pre-wrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Địa chỉ: Tầng 12A, Viwaseen Tower, 48 Tố Hữu, Quận Nam Từ Liêm, Thành phố Hà Nội</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Hotline: 1900 1414 80 </a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Email: hotro@hcinema.vn</a></li>
                    </ul>
                </div>
                <div className="block grow md:w-44 md:shrink-0 md:border-none md:pb-0">
                    <ul className="text-sm">
                        <li>
                            <h3
                                className="block whitespace-nowrap text-sm text-white/80 font-bold uppercase text-white text-opacity-80 hover:text-inherit">
                                Mua vé xem phim</h3>
                        </li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Lịch chiếu phim</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Rạp chiếu phim</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Phim chiếu rạp</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Review phim</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Blog phim</a></li>
                    </ul>
                </div>
                <div className="block grow md:w-44 md:shrink-0 md:border-none md:pb-0">
                    <ul className="text-sm">
                        <li>
                            <h3
                                className="block whitespace-nowrap text-sm text-white/80 font-bold uppercase text-white text-opacity-80 hover:text-inherit">
                                Điều khoản</h3>
                        </li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">DMCA</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Liên hệ</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Privacy</a></li>
                        <li className="mt-3"><a
                            className="whitespace-nowrap text-sm text-white text-opacity-50 duration-300 hover:text-opacity-100"
                            href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div className="block grow md:w-44 md:shrink-0 md:border-none md:pb-0">
                    <ul className="text-sm">
                        <li>
                            <h3
                                className="block whitespace-nowrap text-sm text-white/80 font-bold uppercase text-white text-opacity-80 hover:text-inherit">
                                Kết nối với chúng tôi</h3>

                            <ul className="mt-3 flex">
                                <li><a href="#">
                                    <img alt="Facebook"
                                        src="https://homepage.momocdn.net/styles/desktop/images/social/facebook.svg"
                                        className="w-10 h-10 rounded-full object-cover" />
                                </a></li>
                                <li><a href="#">
                                    <img alt="Linkedin"
                                        src="https://homepage.momocdn.net/styles/desktop/images/social/linkedin.svg"
                                        className="w-10 h-10 rounded-full object-cover ms-3" />
                                </a></li>
                                <li><a href="#">
                                    <img alt="Youtube"
                                        src="https://homepage.momocdn.net/styles/desktop/images/social/youtube.svg"
                                        className="w-10 h-10 rounded-full object-cover ms-3" />
                                </a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer