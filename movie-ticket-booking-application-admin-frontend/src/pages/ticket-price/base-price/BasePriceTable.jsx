import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, message, Modal, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { useDeleteBaseTicketPriceMutation } from "../../../app/services/baseTicketPrice.service";
import { formatCurrency } from "../../../utils/functionUtils";
import ModalUpdate from "./ModalUpdate";

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

const parseGraphicsType = (graphicsType) => {
    switch (graphicsType) {
        case "_2D":
            return <Tag color="cyan">2D</Tag>;
        case "_3D":
            return <Tag color="green">3D</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
}

const parseScreeningTimeType = (screeningTimeType) => {
    switch (screeningTimeType) {
        case "SUAT_CHIEU_SOM":
            return <Tag color="blue">Suất chiếu sớm</Tag>;
        case "SUAT_CHIEU_THEO_LICH":
            return <Tag color="orange">Suất chiếu theo lịch</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
}

const parseDayType = (dayType) => {
    switch (dayType) {
        case "WEEKDAY":
            return <Tag color="geekblue">Ngày thường</Tag>;
        case "WEEKEND":
            return <Tag color="volcano">Ngày cuối tuần</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
}

const parseAuditoriumType = (auditoriumType) => {
    switch (auditoriumType) {
        case "STANDARD":
            return <Tag color="blue">Tiêu chuẩn</Tag>;
        case "IMAX":
            return <Tag color="green">IMAX</Tag>;
        case "GOLDCLASS":
            return <Tag color="gold">GOLD CLASS</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }

}

const BasePriceTable = ({ data }) => {
    const [open, setOpen] = useState(false);
    const [baseTicketPriceUpdate, setBaseTicketPriceUpdate] = useState(null);
    const [deleteBaseTicketPrice, { isLoading }] = useDeleteBaseTicketPriceMutation();

    const columns = [
        {
            title: "Loại ghế",
            dataIndex: "seatType",
            key: "seatType",
            sorter: (a, b) => a.seatType.localeCompare(b.seatType, 'vi'),
            sortDirections: ['descend', 'ascend'],
            filters: [
                {
                    text: "Ghế thường",
                    value: "NORMAL",
                },
                {
                    text: "Ghế VIP",
                    value: "VIP",
                },
                {
                    text: "Ghế COUPLE",
                    value: "COUPLE",
                },
            ],
            onFilter: (value, record) => record.seatType.indexOf(value) === 0,
            render: (text, record, index) => {
                return parseSeatType(text);
            },
        },
        {
            title: "Hình thức chiếu",
            dataIndex: "graphicsType",
            key: "graphicsType",
            sorter: (a, b) => a.graphicsType.localeCompare(b.graphicsType, 'vi'),
            sortDirections: ['descend', 'ascend'],
            filters: [
                {
                    text: "2D",
                    value: "_2D",
                },
                {
                    text: "3D",
                    value: "_3D",
                },
            ],
            onFilter: (value, record) => record.graphicsType.indexOf(value) === 0,
            render: (text, record, index) => {
                return parseGraphicsType(text);
            },
        },
        {
            title: "Loại suất chiếu",
            dataIndex: "screeningTimeType",
            key: "screeningTimeType",
            sorter: (a, b) => a.screeningTimeType.localeCompare(b.screeningTimeType, 'vi'),
            sortDirections: ['descend', 'ascend'],
            filters: [
                {
                    text: "Suất chiếu sớm",
                    value: "SUAT_CHIEU_SOM",
                },
                {
                    text: "Suất chiếu theo lịch",
                    value: "SUAT_CHIEU_THEO_LICH",
                },
            ],
            onFilter: (value, record) => record.screeningTimeType.indexOf(value) === 0,
            render: (text, record, index) => {
                return parseScreeningTimeType(text);
            },
        },
        {
            title: "Loại ngày áp dụng",
            dataIndex: "dayType",
            key: "dayType",
            sorter: (a, b) => a.dayType.localeCompare(b.dayType, 'vi'),
            sortDirections: ['descend', 'ascend'],
            filters: [
                {
                    text: "Ngày thường",
                    value: "WEEKDAY",
                },
                {
                    text: "Ngày cuối tuần",
                    value: "WEEKEND",
                },
            ],
            onFilter: (value, record) => record.dayType.indexOf(value) === 0,
            render: (text, record, index) => {
                return parseDayType(text);
            },
        },
        {
            title: "Loại phòng chiếu",
            dataIndex: "auditoriumType",
            key: "auditoriumType",
            sorter: (a, b) => a.auditoriumType.localeCompare(b.auditoriumType, 'vi'),
            sortDirections: ['descend', 'ascend'],
            filters: [
                {
                    text: "Tiêu chuẩn",
                    value: "STANDARD",
                },
                {
                    text: "IMAX",
                    value: "IMAX",
                },
                {
                    text: "GOLD CLASS",
                    value: "GOLDCLASS",
                },
            
            ],
            onFilter: (value, record) => record.auditoriumType.indexOf(value) === 0,
            render: (text, record, index) => {
                return parseAuditoriumType(text);
            },
        },
        {
            title: "Giá vé",
            dataIndex: "price",
            key: "price",
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return formatCurrency(text);
            },
        },
        {
            title: "",
            dataIndex: "",
            key: "action",
            render: (text, record, index) => {
                return (
                    <Flex justify={"end"}>
                        <Space>
                            <Button
                                type="primary"
                                icon={<EditOutlined />}
                                onClick={() => {
                                    setBaseTicketPriceUpdate(record);
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
                    </Flex>
                );
            },
        },
    ];

    const handleConfirm = (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa giá vé này?",
            content: "Hành động này không thể hoàn tác!",
            okText: "Xóa",
            okType: "danger",
            cancelText: "Hủy",
            okButtonProps: { loading: isLoading }, // Hiển thị loading trên nút OK
            onOk: () => {
                return new Promise((resolve, reject) => {
                    deleteBaseTicketPrice(id)
                        .unwrap()
                        .then(() => {
                            message.success("Xóa giá vé thành công!");
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
                    baseTicketPrice={baseTicketPriceUpdate}
                />
            )}
        </>
    );
};
export default BasePriceTable;
