import { Row } from 'antd';
import React from 'react';
import RowSeatAction from './RowSeatAction';
import Seat from './Seat';

function SeatMatrix({ seats, auditorium }) {
    const isLastRow = (rowIndex) => {
        return rowIndex === Math.max(...seats.map(seat => seat.rowIndex));
    }
    return (
        <div>
            { // Tạo ra các hàng
                Array.from(new Set(seats.map(seat => seat.rowIndex))).map(row => (
                    <Row key={row} gutter={[8, 8]} justify={"center"}>
                        { // Tạo ra các ghế trong từng hàng
                            seats.filter(seat => seat.rowIndex === row).map(seat => (
                                <Seat key={seat.id} seat={seat} isLastRow={isLastRow(row)} auditorium={auditorium} />
                            ))
                        }
                        <RowSeatAction rowIndex={row} isLastRow={isLastRow(row)} auditorium={auditorium} />
                    </Row>
                ))
            }
        </div >
    )
}

export default SeatMatrix