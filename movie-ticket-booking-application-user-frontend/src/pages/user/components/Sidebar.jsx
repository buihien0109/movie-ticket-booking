import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ menu, currentMenu }) {
    const isSelected = (menuItem, currentMenu) => {
        return menuItem.link === currentMenu.link;
    }
    return (
        <div className="relative mx-0 divide-y divide-gray-100">
            {menu.map((item, index) => (
                <div
                    key={index}
                    className={`text-gray-800 font-medium cursor-pointer hover:bg-pink-100 hover:bg-opacity-50 hover:text-pink-700 ${isSelected(item, currentMenu) ? 'bg-pink-100 bg-opacity-50 text-pink-700' : ''}`}
                >
                    <Link to={item.link} className="relative block px-4 py-4">
                        <div className="rap-detail flex flex-nowrap items-center">
                            <div className="mb-0 min-w-0 flex-1 text-base leading-tight">
                                <span>{item.name}</span>
                            </div>
                            <div className="hidden flex-none self-center pl-2 md:block md:pl-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Sidebar