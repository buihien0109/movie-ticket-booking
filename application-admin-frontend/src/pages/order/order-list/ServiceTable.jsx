import { Table } from 'antd';
import React from 'react';
import { formatCurrency } from '../../../utils/functionUtils';
import { Link } from 'react-router-dom';

function ServiceTable({ serviceItems }) {
    const columns = [
        {
            title: "Tên dịch vụ",
            dataIndex: "additionalService",
            key: "name",
            width: "30%",
            render: (text, record, index) => {
                return (
                    <Link to={`/admin/additional-services/${record.additionalService.id}/detail`}>
                        {text.name}
                    </Link>
                )
            },
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            width: "20%",
            render: (text, record, index) => {
                return text
            },
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
            width: "20%",
            render: (text, record, index) => {
                return formatCurrency(text)
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "",
            key: "totalPrice",
            width: "30%",
            render: (text, record, index) => {
                return formatCurrency(record.price * record.quantity)
            },
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={serviceItems}
            rowKey={(record) => record.id}
            pagination={false}
            style={{ marginTop: "2rem" }}
        />
    );
}

export default ServiceTable