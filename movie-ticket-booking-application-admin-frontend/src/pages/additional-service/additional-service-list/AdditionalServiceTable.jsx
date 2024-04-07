import { Table, Tag } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useSearchTable from "../../../hooks/useSearchTable";
import { formatCurrency, formatDate } from "../../../utils/functionUtils";

const AdditionalServiceTable = ({ data }) => {
    const { getColumnSearchProps } = useSearchTable();

    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "name",
            key: "name",
            ...getColumnSearchProps('name'),
            render: (text, record, index) => {
                return (
                    <RouterLink to={`/admin/additional-services/${record.id}/detail`}>
                        {text}
                    </RouterLink>
                );
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            render: (text, record, index) => {
                return text
            },
        },
        {
            title: "Giá tiền",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return formatCurrency(text);
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            sorter: (a, b) => a.status - b.status,
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return text ? <Tag color="success">Công khai</Tag> : <Tag color="warning">Nháp</Tag>;
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
export default AdditionalServiceTable;
