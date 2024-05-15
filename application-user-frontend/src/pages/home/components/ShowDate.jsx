import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { setShowtimesValue } from '../../../app/slices/showtimes.slice';
import { formatDate } from '../../../utils/functionUtils';

function ShowDate() {
    const dispatch = useDispatch();
    const { showdate } = useSelector(state => state.showtimes);

    const today = new Date();
    const dayLabels = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
    let dates = [];

    for (let i = 0; i < 20; i++) {
        let nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        const label = i === 0 ? "Hôm nay" : dayLabels[nextDate.getDay()];
        dates.push({ date: nextDate, label });
    }

    const choseShowDate = (date) => {
        const formattedDate = formatDate(date);
        dispatch(setShowtimesValue({ key: 'showdate', value: formattedDate }));
    }

    return (
        <Swiper slidesPerView={10} spaceBetween={7} className='px-5'>
            {dates.map((item, index) => (
                <SwiperSlide key={index}>
                    <div
                        onClick={() => choseShowDate(item.date)}
                        className={`w-16 cursor-pointer overflow-hidden rounded border bg-white py-0 text-center transition-all ${formatDate(item.date) === showdate ? 'border-pink-700' : 'border-gray-300 hover:border-gray-400'}`}>
                        <div className={`mx-auto justify-center py-1 text-lg font-semibold ${formatDate(item.date) === showdate ? 'bg-pink-600 text-white' : 'bg-gray-100'}`}>
                            {item.date.getDate()}
                        </div>
                        <div className={`text-nowrap flex h-6 items-center justify-center text-xs ${formatDate(item.date) === showdate ? 'text-pink-600' : 'text-gray-400'}`}>
                            {item.label}
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ShowDate;
