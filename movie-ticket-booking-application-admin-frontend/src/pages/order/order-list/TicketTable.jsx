import { Table, Tag } from 'antd';
import React from 'react';
import { formatCurrency } from '../../../utils/functionUtils';

const parseSeatType = (seatType) => {
    switch (seatType) {
        case "NORMAL":
            return <Tag color="default">Ghế thường</Tag>;
        case "VIP":
            return <Tag color="gold">Ghế VIP</Tag>;
        case "COUPLE":
            return <Tag color="magenta">Ghế COUPLE</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
}

function TicketTable({ ticketItems }) {
    const columns = [
        {
            title: "Thông tin ghế",
            dataIndex: "seat",
            key: "code",
            width: "30%",
            render: (text, record, index) => {
                return text.code
            },
        },
        {
            title: "Loại ghế",
            dataIndex: "seat",
            key: "type",
            width: "40%",
            render: (text, record, index) => {
                return parseSeatType(text.type)
            },
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
            width: "30%",
            render: (text, record, index) => {
                return formatCurrency(text)
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={ticketItems}
            rowKey={(record) => record.id}
            pagination={false}
        />
    );
}

export default TicketTable