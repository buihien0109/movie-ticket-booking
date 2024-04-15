import { Table, Tag } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useSearchTable from "../../../hooks/useSearchTable";
import { formatCurrency, formatDate } from "../../../utils/functionUtils";

const parseOrderStatus = (status) => {
    switch (status) {
        case "PENDING":
            return <Tag color="warning">Chờ thanh toán</Tag>;
        case "CONFIRMED":
            return <Tag color="success">Đã thanh toán</Tag>;
        case "CANCELLED":
            return <Tag color="red">Đã hủy</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
}

const MovieTable = ({ data }) => {
    const { getColumnSearchProps } = useSearchTable();
    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            key: "id",
            ...getColumnSearchProps('id'),
            render: (text, record, index) => {
                return (
                    <RouterLink to={`/admin/orders/${record.id}/detail`}>
                        {text}
                    </RouterLink>
                );
            },
        },
        {
            title: "Tên phim",
            dataIndex: "showtime",
            key: "movie",
            ...getColumnSearchProps('id'),
            render: (text, record, index) => {
                return (
                    <RouterLink to={`/admin/orders/${text.movie.id}/detail`}>
                        {text.movie.name}
                    </RouterLink>
                );
            },
        },
        {
            title: "Suất chiếu",
            dataIndex: "showtime",
            key: "time",
            render: (text, record, index) => {
                return (
                    <>
                        <Tag color="volcano">{text.startTime} - {text.endTime}</Tag>
                        <Tag color="green">{formatDate(text.date)}</Tag>
                    </>
                );
            },
        },
        {
            title: "Phòng chiếu",
            dataIndex: "showtime",
            key: "auditorium",
            render: (text, record, index) => {
                return `${text.auditorium.name} - ${text.auditorium.cinema.name}`;
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status.localeCompare(b.status, 'vi'),
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return parseOrderStatus(text);
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (text, record, index) => {
                return formatCurrency(text);
            },
        },
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return formatDate(text);
            },
        },
    ];

    return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />;
}
export default MovieTable;
