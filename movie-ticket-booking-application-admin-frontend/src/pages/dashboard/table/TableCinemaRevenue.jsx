import { Table } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatCurrency } from "../../../utils/functionUtils";

const columns = [
    {
        title: "Rạp chiếu",
        dataIndex: "",
        key: "cinema",
        render: (text, record, index) => {
            return (
                <RouterLink to={`/admin/cinemas/${record.cinemaId}/detail`}>
                    {record.cinemaName}
                </RouterLink>
            );
        },
    },
    {
        title: "Tổng vé bán ra",
        dataIndex: "totalTickets",
        key: "totalTickets",
        width: "20%",
        render: (text, record, index) => {
            return formatCurrency(text);
        },
    },
    {
        title: "Tổng doanh thu",
        dataIndex: "totalRevenue",
        key: "totalRevenue",
        width: "25%",
        render: (text, record, index) => {
            return formatCurrency(text);
        },
    },
];

function TableCinemaRevenue({ data }) {
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey={(record) => record.id}
            pagination={{ pageSize: 5 }}
        />
    );
}

export default TableCinemaRevenue;
