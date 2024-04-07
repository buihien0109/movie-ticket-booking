import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function UserLayout() {
    const location = useLocation();
    const pathname = location.pathname;
    const menu = [
        { key: 'profile', name: 'Thông tin tài khoản', link: '/khach-hang/thong-tin-tai-khoan' },
        { key: 'password', name: 'Đổi mật khẩu', link: '/khach-hang/doi-mat-khau' },
        { key: 'history', name: 'Lịch sử mua vé', link: '/khach-hang/lich-su-mua-ve' }
    ];
    const currentMenu = menu.find(item => item.link === pathname);

    return (
        <>
            <div className="max-w-6xl mx-auto my-5">
                <ol className="flex flex-nowrap items-center">
                    <li className="relative shrink-0 px-3 text-sm pl-0 text-gray-800 hover:text-pink-700 cursor-pointer">
                        <Link to={"/"} className="whitespace-nowrap">
                            <span>Trang chủ</span>
                        </Link>
                    </li>
                    <li className="text-sm text-gray-500">&gt;</li>
                    <li className="relative shrink-0 px-3 text-sm text-gray-800">
                        <span className="flex items-center whitespace-nowrap md:space-x-2 text-gray-500">
                            <span>{currentMenu.name}</span>
                        </span>
                    </li>
                </ol>
            </div>

            <div className="bg-gray-50">
                <div className="max-w-6xl mx-auto py-7">
                    <div className="grid grid-cols-4">
                        <div className="pe-6">
                            <Sidebar menu={menu} currentMenu={currentMenu} />
                        </div>
                        <div className="col-span-3">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLayout;