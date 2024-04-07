import { DeleteOutlined, EditOutlined, TableOutlined } from "@ant-design/icons";
import { Button, message, Modal, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useDeleteAuditoriumMutation } from "../../../app/services/auditorium.service";
import { formatDate, rangeColumn, rangeRow } from "../../../utils/functionUtils";
import ModalUpdate from "./ModalUpdate";
import SeatModal from "./SeatModal";

const parseAuditoriumType = (type) => {
    switch (type) {
        case "STANDARD":
            return <Tag color="blue">Tiêu chuẩn</Tag>;
        case "IMAX":
            return <Tag color="green">IMAX</Tag>;
        case "GOLDCLASS":
            return <Tag color="gold">GOLD CLASS</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
};

const AuditoriumTable = ({ data, cinemaId }) => {
    const [open, setOpen] = useState(false);
    const [openSeatModal, setOpenSeatModal] = useState(false);
    const [auditoriumUpdate, setAuditoriumUpdate] = useState(null);
    const [deleteAuditorium, { isLoading }] = useDeleteAuditoriumMutation();

    const columns = [
        {
            title: "Tên phòng chiếu",
            dataIndex: "name",
            key: "name",
            render: (text, record, index) => {
                return text;
            },
        },
        {
            title: "Loại phòng chiếu",
            dataIndex: "type",
            key: "type",
            render: (text, record, index) => {
                return parseAuditoriumType(text);
            },
        },
        {
            title: "Số lượng ghế (tối đa)",
            dataIndex: "totalSeats",
            key: "totalSeats",
            render: (text, record, index) => {
                return text ? text : "Chưa cập nhật";
            },
        },
        {
            title: "Số hàng",
            dataIndex: "totalRows",
            key: "totalRows",
            render: (text, record, index) => {
                const rows = rangeRow(text);
                const startRow = rows[0];
                const endRow = rows[rows.length - 1];
                return text ? `${text} (${startRow} -> ${endRow})` : "Chưa cập nhật";
            },
        },
        {
            title: "Số cột",
            dataIndex: "totalColumns",
            key: "totalColumns",
            render: (text, record, index) => {
                const columns = rangeColumn(text);
                const startColumn = columns[0];
                const endColumn = columns[columns.length - 1];
                return text ? `${text} (${startColumn} -> ${endColumn})` : "Chưa cập nhật";
            },
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text, record, index) => {
                return formatDate(text);
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
                            style={{ backgroundColor: "rgb(243, 156, 18)" }}
                            type="primary"
                            icon={<TableOutlined />}
                            onClick={() => {
                                setAuditoriumUpdate(record);
                                setOpenSeatModal(true);
                            }}
                        ></Button>
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => {
                                setAuditoriumUpdate(record);
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
            title: "Bạn có chắc chắn muốn xóa phòng chiếu này?",
            content: "Hành động này không thể hoàn tác!",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            okButtonProps: { loading: isLoading }, // Hiển thị loading trên nút OK
            onOk: () => {
                return new Promise((resolve, reject) => {
                    deleteAuditorium(id)
                        .unwrap()
                        .then(() => {
                            message.success("Xóa phòng chiếu thành công!");
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
                    auditorium={auditoriumUpdate}
                    cinemaId={cinemaId}
                />
            )}

            {openSeatModal && (
                <SeatModal
                    open={openSeatModal}
                    onCancel={() => setOpenSeatModal(false)}
                    auditorium={auditoriumUpdate}
                    cinemaId={cinemaId}
                />
            )}
        </>
    );
};
export default AuditoriumTable;
