import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setActiveModal } from '../../../../app/slices/authModal.slice';

function Seat({ seat, onChooseSeat, isSelected }) {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const choseSeat = () => {
        if (!auth.isAuthenticated) {
            toast.warning('Vui lòng đăng nhập để chọn ghế');
            dispatch(setActiveModal('LOGIN'));
            return;
        }
        if (!seat.reservationStatus || isSelected) {
            // Chỉ cho phép chọn nếu ghế không có trạng thái đặt chỗ hoặc đã được chọn
            onChooseSeat(seat);
        }
    };

    const parseSeatType = (type) => {
        const seatTypeToColor = {
            'NORMAL': 'rgb(114, 46, 209)',
            'VIP': 'rgb(245, 34, 45)',
            'COUPLE': 'rgb(236, 47, 150)',
            'UNAVAILABLE': 'rgb(128, 128, 128)' // Màu cho ghế không khả dụng
        };

        return seatTypeToColor[type] || 'rgb(64, 64, 64)';
    };

    const getBackgroundColor = () => {
        if (seat.reservationStatus === 'BOOKED' || (seat.reservationStatus === 'HELD' && !isSelected)) {
            return 'rgb(55, 65, 81)'; // Màu cho ghế đã đặt hoặc giữ chỗ không được chọn
        }
        return isSelected ? 'rgb(236, 47, 150)' : parseSeatType(seat.type);
    };

    // Disable nút nếu ghế đã được đặt hoặc ghế được giữ mà không được chọn
    const isDisabled = seat.reservationStatus === 'BOOKED' || (seat.reservationStatus === 'HELD' && !isSelected);

    return (
        <button
            onClick={choseSeat}
            disabled={isDisabled}
            className={`cinema-seat-item ${isSelected ? '!border-2 !border-white' : ''}`}
            style={{ backgroundColor: getBackgroundColor() }}>
            {seat?.code}
        </button>
    );
}

export default Seat;