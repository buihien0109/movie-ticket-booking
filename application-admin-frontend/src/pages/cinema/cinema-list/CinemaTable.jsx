import { Table } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useSearchTable from "../../../hooks/useSearchTable";
import { formatDate } from "../../../utils/functionUtils";

const CinemaTable = ({ data }) => {
    const { getColumnSearchProps } = useSearchTable();
    const columns = [
        {
            title: "Tên rạp chiếu",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps('name'),
            render: (text, record, index) => {
                return (
                    <RouterLink to={`/admin/cinemas/${record.id}/detail`}>
                        {text}
                    </RouterLink>
                );
            },
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            ...getColumnSearchProps('address'),
            render: (text, record, index) => {
                return text
            },
        },
        {
            title: "Ngày tạo",
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
export default CinemaTable;
