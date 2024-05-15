import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import logo from "../../../public/logo.png";
import { logout } from "../../app/slices/auth.slice";
import { setActiveModal } from "../../app/slices/authModal.slice";
import LoginModal from "../modal/auth/LoginModal";
import ForgotPasswordModal from "../modal/auth/ForgotPasswordModal";
import RegisterModal from "../modal/auth/RegisterModal";

function Header() {
    const { auth } = useSelector((state) => state);
    const { activeModal } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleOpenModal = (modalName) => {
        dispatch(setActiveModal(modalName));
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.success("Đăng xuất thành công");
    };

    return (
        <>
            <header
                className="sticky top-0 z-40 hidden border-b border-gray-200   bg-white/95 shadow-sm  backdrop-blur transition-transform lg:block">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center">
                        <div className="w-36 h-16 flex items-center">
                            <Link to="/">
                                <img src={logo} alt="logo" className="w-full object-cover" />
                            </Link>
                        </div>
                        <div className="relative flex-1 px-3">
                            <nav className="flex flex-row flex-nowrap items-center justify-end">
                                <div className="group menu relative">
                                    <NavLink to={"/lich-chieu"} className="block cursor-pointer whitespace-nowrap px-2.5 py-5 font-semibold  transition-all text-gray-600 hover:text-gray-900" >Lịch chiếu
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            className="icon relative ml-0.5 inline h-4 w-4  text-gray-500 group-hover:rotate-180">
                                            <path fillRule="evenodd"
                                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                clipRule="evenodd"></path>
                                        </svg>
                                    </NavLink>

                                    <div className="submenu fadeInUp absolute hidden group-hover:block" style={{ width: "340px" }}>
                                        <div className="grid grid-cols-1 gap-2 rounded border border-gray-200 bg-white p-3 shadow-xl">
                                            <NavLink to={"/phim-dang-chieu"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700">
                                                <div className="flex-1 ">
                                                    <div className="whitespace-nowrap font-semibold ">Phim đang chiếu</div>
                                                    <div className="text-xs opacity-50 ">
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink to={"/phim-sap-chieu"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                                <div className="flex-1 ">
                                                    <div className="whitespace-nowrap font-semibold ">Phim sắp chiếu</div>
                                                    <div className="text-xs opacity-50 "></div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                                <div className="menu relative">
                                    <NavLink to={"/phim-chieu"}
                                        className="block cursor-pointer whitespace-nowrap px-2.5 py-5 font-semibold  transition-all  text-gray-600 hover:text-gray-900">Phim chiếu</NavLink>
                                </div>
                                <div className="menu relative">
                                    <NavLink to={"/review-phim"}
                                        className="block cursor-pointer whitespace-nowrap px-2.5 py-5 font-semibold  transition-all  text-gray-600 hover:text-gray-900">Review phim</NavLink>
                                </div>
                                <div className="group menu relative">
                                    <NavLink to={"/bai-viet"} className="block cursor-pointer whitespace-nowrap px-2.5 py-5 font-semibold transition-all text-gray-600">
                                        Blog phim
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon relative ml-0.5 inline h-4 w-4  text-gray-500 group-hover:rotate-180"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                        </svg>
                                    </NavLink>

                                    <div className="submenu fadeInUp absolute hidden group-hover:block" style={{ width: "340px" }}>
                                        <div className="grid grid-cols-1 gap-2 rounded border border-gray-200 bg-white p-3 shadow-xl">
                                            <NavLink to={"/bai-viet/phim-chieu-rap"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700">
                                                <div className="flex-1 ">
                                                    <div className="whitespace-nowrap font-semibold ">Phim chiếu rạp</div>
                                                    <div className="text-xs opacity-50 ">
                                                    </div>
                                                </div>
                                            </NavLink>
                                            <NavLink to={"/bai-viet/tong-hop-phim"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                                <div className="flex-1 ">
                                                    <div className="whitespace-nowrap font-semibold ">Tổng hợp phim</div>
                                                    <div className="text-xs opacity-50 "></div>
                                                </div>
                                            </NavLink>
                                            <NavLink to={"/bai-viet/phim-netflix"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2 hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                                <div className="flex-1 ">
                                                    <div className="whitespace-nowrap font-semibold ">Phim Netflix</div>
                                                    <div className="text-xs opacity-50 "></div>
                                                </div>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>

                        {!auth.isAuthenticated && (
                            <div className="ml-auto hidden xl:flex items-center gap-3">
                                <button onClick={() => handleOpenModal('REGISTER')} className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-8 py-2 transition duration-300 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white">Đăng ký</button>

                                <button onClick={() => handleOpenModal('LOGIN')} className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none bg-pink-600 text-white text-destructive-foreground hover:bg-pink-800 h-10 px-8 py-2 transition duration-300">Đăng nhập</button>
                            </div>
                        )}

                        {auth.isAuthenticated && (
                            <div className="group menu relative">
                                <div className="flex items-center">
                                    <button>
                                        <div className="flex gap-1 items-center">
                                            <img
                                                alt="avatar"
                                                loading="lazy"
                                                width="33"
                                                height="33"
                                                decoding="async"
                                                className="rounded-full object-cover"
                                                src="https://chieuphimquocgia.com.vn/_next/image?url=%2Fimages%2Favatar.png&w=48&q=75"
                                            />
                                            <span className="text-gray-800 font-semibold">{auth.auth?.name}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="icon relative ml-0.5 inline h-4 w-4  text-gray-500 group-hover:rotate-180">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                                <div className="submenu fadeInUp absolute hidden group-hover:block" style={{ width: "340px" }}>
                                    <div className="grid grid-cols-1 gap-2 rounded border border-gray-200 bg-white p-3 shadow-xl">
                                        {auth.auth?.role === "ADMIN" && (
                                            <a href="/admin/dashboard" className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700">
                                                <div className="whitespace-nowrap font-semibold ">Trang quản trị</div>
                                            </a>
                                        )}
                                        <NavLink to={"/khach-hang/thong-tin-tai-khoan"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                            <div className="whitespace-nowrap font-semibold ">Thông tin tài khoản</div>
                                        </NavLink>
                                        <NavLink to={"/khach-hang/doi-mat-khau"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                            <div className="whitespace-nowrap font-semibold ">Đổi mật khẩu</div>
                                        </NavLink>
                                        <NavLink to={"/khach-hang/lich-su-mua-ve"} className="group flex flex-row flex-nowrap items-center rounded-md px-2 py-2  hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                            <div className="whitespace-nowrap font-semibold ">Lịch sử mua vé</div>
                                        </NavLink>
                                        <button onClick={handleLogout} className="group flex flex-row flex-nowrap rounded-md px-2 py-2 hover:bg-pink-100 hover:bg-opacity-50  text-gray-600 hover:text-pink-700 ">
                                            <div className="whitespace-nowrap font-semibold ">Đăng xuất</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {activeModal === 'LOGIN' && (
                <LoginModal
                    open={activeModal === 'LOGIN'}
                    handleClose={() => dispatch(setActiveModal(null))}
                    handleForgotPassword={() => handleOpenModal('FORGOT_PASSWORD')}
                    handleRegister={() => handleOpenModal('REGISTER')}
                />
            )}
            {activeModal === 'REGISTER' && (
                <RegisterModal
                    open={activeModal === 'REGISTER'}
                    handleClose={() => dispatch(setActiveModal(null))}
                    handleLogin={() => handleOpenModal('LOGIN')}
                />
            )}
            {activeModal === 'FORGOT_PASSWORD' && (
                <ForgotPasswordModal
                    open={activeModal === 'FORGOT_PASSWORD'}
                    handleClose={() => dispatch(setActiveModal(null))}
                />
            )}
        </>
    );
}

export default Header;
