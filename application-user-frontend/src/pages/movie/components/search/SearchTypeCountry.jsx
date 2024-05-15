import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCountriesQuery } from '../../../../app/services/country.api';
import { setSearchValue } from '../../../../app/slices/search.slice';

function SearchTypeCountry() {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data } = useGetAllCountriesQuery();
    const search = useSelector((state) => state.search)
    const dispatch = useDispatch()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        // Thêm event listener khi dropdown được mount
        document.addEventListener('mousedown', handleClickOutside);

        // Dọn dẹp event listener
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="relative p-1 md:p-2" ref={dropdownRef}>
            <button onClick={toggleDropdown}
                className="flex min-w-[120px] cursor-pointer items-center whitespace-nowrap rounded border border-gray-300 px-2 py-1.5 text-left text-sm leading-5 transition-colors hover:bg-gray-50 focus:outline-none active:bg-gray-100 md:px-3">
                <span className="flex-1">Quốc gia</span>
                <svg xmlns="http://www.w3.org/2000/svg"
                    className="icon ml-2 h-5 w-5 text-gray-500 transition-transform" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7">
                    </path>
                </svg>
            </button>
            {isOpen && (
                <div className="absolute z-[22] mt-1 min-w-[375px] w-[400px] overflow-auto rounded-lg bg-white p-2 text-sm focus:outline-none">
                    <div className='grid grid-cols-3 gap-x-2 gap-y-1'>
                        <div
                            onClick={() => {
                                dispatch(setSearchValue({ key: 'country', value: null }))
                                setIsOpen(false)
                            }}
                            className={`relative cursor-pointer whitespace-nowrap rounded py-1.5 pl-2 pr-8 text-gray-600 hover:bg-gray-100 ${!search.country ? 'select-none pointer-events-none bg-gray-100 text-pink-600' : 'text-gray-600'}`}>Tất cả</div>
                        {data?.map((country, index) => (
                            <div
                                key={country.id}
                                onClick={() => {
                                    dispatch(setSearchValue({ key: 'country', value: country.name }))
                                    setIsOpen(false)
                                }}
                                className={`relative cursor-pointer whitespace-nowrap rounded py-1.5 pl-2 pr-8 hover:bg-gray-100 ${search.country === country.name ? 'select-none pointer-events-none bg-gray-100 text-pink-600' : 'text-gray-600'}`}>{country.name}</div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default SearchTypeCountry