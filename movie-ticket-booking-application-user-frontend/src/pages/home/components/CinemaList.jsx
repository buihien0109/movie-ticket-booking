import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllCinemasQuery } from '../../../app/services/cinema.api';
import { setShowtimesValue } from '../../../app/slices/showtimes.slice';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import { formatDate } from '../../../utils/functionUtils';

function CinemaList() {
    const { data: cinemas, isLoading, isError } = useGetAllCinemasQuery();
    const [keyword, setKeyword] = useState('');
    const [filteredCinemas, setFilteredCinemas] = useState([]);
    const dispatch = useDispatch();

    const { cinemaId } = useSelector(state => state.showtimes);
    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            if (keyword) {
                const filtered = cinemas.filter(cinema =>
                    cinema.name.toLowerCase().includes(keyword.toLowerCase()));
                setFilteredCinemas(filtered);
            } else {
                setFilteredCinemas(cinemas);
            }
        }, 500); // Thời gian delay là 500ms

        return () => clearTimeout(debounceSearch);
    }, [keyword, cinemas]);

    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    const handleSearch = (e) => {
        setKeyword(e.target.value);
    };

    const choseCinema = (cinemaId) => {
        dispatch(setShowtimesValue({ key: 'cinemaId', value: cinemaId }));
    }

    return (
        <div className="cinema-list-height relative mx-0 divide-y divide-gray-100">
            <div className="relative z-20 px-3 py-2">
                <input
                    value={keyword}
                    onChange={handleSearch}
                    type="text"
                    placeholder="Tìm theo tên rạp ..."
                    className="block h-9 w-full items-center justify-center rounded border border-gray-200 bg-gray-50 py-1 pl-3 pr-10 text-sm"
                />
                <span className="absolute right-5 top-4 border-none opacity-50 outline-none"
                    aria-label="Search">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </span>
            </div>

            {filteredCinemas && filteredCinemas.map(cinema => (
                <div
                    key={cinema.id}
                    onClick={() => choseCinema(cinema.id)}
                    className={cinemaId === cinema.id ? `bg-pink-50 opacity-100` : `cursor-pointer md:hover:bg-gray-50`}
                >
                    <div className="relative block px-4 py-4">
                        <div className="rap-detail flex flex-nowrap items-center">
                            <div className="mb-0 min-w-0 flex-1 text-sm leading-tight text-gray-800">
                                <span>{cinema.name}</span>
                            </div>
                            <div className="hidden flex-none self-center pl-2 md:block md:pl-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400"
                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M9 5l7 7-7 7"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CinemaList;
