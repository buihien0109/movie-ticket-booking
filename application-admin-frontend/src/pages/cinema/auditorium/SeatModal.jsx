import { Modal, Spin } from 'antd';
import React from 'react';
import { useGetSeatsByAuditoriumQuery } from '../../../app/services/seats.service';
import CinemaScreen from './seat/CinemaScreen';
import SeatLegend from './seat/SeatLegend';
import SeatMatrix from './seat/SeatMatrix';

function SeatModal(props) {
    const { auditorium, open, onCancel, cinemaId } = props;
    const { data: seats, isLoading: isLoadingGetSeats } = useGetSeatsByAuditoriumQuery(auditorium.id);

    if (isLoadingGetSeats) {
        return <Spin size="large" fullscreen />;
    }

    return (
        <>
            <Modal
                open={open}
                title="Cập nhật ghế phòng chiếu"
                footer={null}
                onCancel={onCancel}
                width={1000}
            >
                <CinemaScreen />
                <SeatMatrix seats={seats} auditorium={auditorium}/>
                <SeatLegend />
            </Modal>
        </>
    )
}

export default SeatModal