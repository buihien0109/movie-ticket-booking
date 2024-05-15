import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDeleteScheduleMutation } from "../../app/services/schedules.service";
import useSearchTable from "../../hooks/useSearchTable";
import { formatDate } from "../../utils/functionUtils";
import ModalUpdate from "./ModalUpdate";

const ScheduleTable = ({ data, movies }) => {
    const { getColumnSearchProps } = useSearchTable();
    const [open, setOpen] = useState(false);
    const [scheduleUpdate, setScheduleUpdate] = useState(null);
    const [deleteSchedule, { isLoading }] = useDeleteScheduleMutation();

    const getClassification = (record) => {
        const now = new Date();
        const startDate = new Date(record.startDate);
        const endDate = new Date(record.endDate);
        if (now < startDate) return 1;
        if (now >= startDate && now <= endDate) return 2;
        return 3;
    };

    const columns = [
        {
            title: "Phim chiếu",
            dataIndex: "movie",
            key: "movie",
            ...getColumnSearchProps("movie", ["name"]),
            render: (text, record, index) => {
                return (
                    <RouterLink to={`/admin/movies/${text.id}/detail`}>
                        {text.name}
                    </RouterLink>
                );
            },
        },
        {
            title: "Thời gian chiếu",
            dataIndex: "startDate",  // Sử dụng trực tiếp dataIndex nếu có thể
            key: "time",
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return `${formatDate(record.startDate)} - ${formatDate(record.endDate)}`;
            },
        },
        {
            title: "Phân loại",
            dataIndex: "startDate",  // Sử dụng một trong các trường ngày để xác định phân loại
            key: "type",
            sorter: (a, b) => {
                return getClassification(a) - getClassification(b);
            },
            sortDirections: ['descend', 'ascend'],
            render: (text, record) => {
                const classification = getClassification(record);  // Sử dụng hàm từ sorter
                const color = classification === 1 ? "processing" : classification === 2 ? "success" : "warning";
                const statusText = classification === 1 ? "Sắp chiếu" : classification === 2 ? "Đang chiếu" : "Đã chiếu";

                return <Tag color={color}>{statusText}</Tag>;
            },
        },
        {
            title: "",
            dataIndex: "",
            key: "action",
            render: (text, record, index) => {
                return (
                    <Space>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setScheduleUpdate(record);
                                setOpen(true);
                            }}
                        ></Button>
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => {
                                handleConfirm(record.id);
                            }}
                        ></Button>
                    </Space>
                );
            },
        },
    ];

    const handleConfirm = (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa lịch chiếu này?",
            content: "Hành động này không thể hoàn tác!",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            okButtonProps: { loading: isLoading }, // Hiển thị loading trên nút OK
            onOk: () => {
                return new Promise((resolve, reject) => {
                    deleteSchedule(id)
                        .unwrap()
                        .then(() => {
                            message.success("Xóa lịch chiếu thành công!");
                            resolve(); // Đóng modal sau khi xóa thành công
                        })
                        .catch((error) => {
                            message.error(error.data.message);
                            reject(); // Không đóng modal nếu xóa thất bại
                        });
                });
            },
            footer: (_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    <OkBtn />
                </>
            ),
        });
    };

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
            />

            {open && (
                <ModalUpdate
                    open={open}
                    onCancel={() => setOpen(false)}
                    schedule={scheduleUpdate}
                    movies={movies}
                />
            )}
        </>
    );
};
export default ScheduleTable;
