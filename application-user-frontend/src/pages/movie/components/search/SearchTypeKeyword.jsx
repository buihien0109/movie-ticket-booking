import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../../../app/slices/search.slice';

function SearchTypeKeyword() {
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnKeyDown = (e) => {
        if (e.key === 'Enter') {
            dispatch(setSearchValue({ key: 'keyword', value: e.target.value === '' ? null : e.target.value }))
        }
    }

    return (
        <div className="relative p-1 md:w-[190px] md:p-2">
            <input
                type="text"
                placeholder="Tìm theo tên phim ..."
                className="block w-full items-center justify-center rounded border border-gray-300 bg-white px-2 py-1.5 text-sm md:px-3"
                value={inputValue}
                onChange={(e) => handleOnChange(e)}
                onKeyDown={(e) => handleOnKeyDown(e)}
            />
            <span
                className="absolute right-3 top-3 border-none opacity-50 outline-none md:right-4 md:top-4"
                aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 " fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </span>
        </div>
    )
}

export default SearchTypeKeyword