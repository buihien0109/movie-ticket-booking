import { Button, Form, InputNumber, message, Modal, Select, Space } from "antd";
import React from "react";
import { useUpdateBaseTicketPriceMutation } from "../../../app/services/baseTicketPrice.service";

const ModalUpdate = (props) => {
    const { baseTicketPrice, open, onCancel } = props;
    const [updateBaseTicketPrice, { isLoading }] = useUpdateBaseTicketPriceMutation();

    const onFinish = (values) => {
        updateBaseTicketPrice({ id: baseTicketPrice.id, ...values })
            .unwrap()
            .then((data) => {
                message.success("Cập nhật giá vé thành công!");
                onCancel();
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Modal
                open={open}
                title="Cập nhật giá vé"
                footer={null}
                onCancel={onCancel}
                confirmLoading={isLoading}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{ ...baseTicketPrice }}
                >
                    <Form.Item
                        label="Loại ghế"
                        name="seatType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Loại ghế không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a seat type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { label: "Ghế thường", value: "NORMAL" },
                                { label: "Ghế VIP", value: "VIP" },
                                { label: "Ghế COUPLE", value: "COUPLE" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Hình thức chiếu"
                        name="graphicsType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Hình thức chiếu không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a graphics type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { label: "2D", value: "_2D" },
                                { label: "3D", value: "_3D" }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Loại suất chiếu"
                        name="screeningTimeType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Loại suất chiếu không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a screening time type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { label: "Xuất chiếu sớm", value: "SUAT_CHIEU_SOM" },
                                { label: "Xuất chiếu theo lịch", value: "SUAT_CHIEU_THEO_LICH" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Loại ngày"
                        name="dayType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Loại ngày không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a day type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { label: "Ngày trong tuần (T2 -> T6)", value: "WEEKDAY" },
                                { label: "Cuối tuần (T7, CN)", value: "WEEKEND" }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Loại phòng chiếu"
                        name="auditoriumType"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Loại phòng chiếu không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a auditorium type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { label: "Phòng chiếu tiêu chuẩn", value: "STANDARD" },
                                { label: "Phòng chiếu IMAX", value: "IMAX" },
                                { label: "Phòng chiếu GOLD CLASS", value: "GOLDCLASS" },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: "Giá tiền không được để trống!",
                            },
                            {
                                validator: (_, value) => {
                                    if (value <= 0) {
                                        return Promise.reject(
                                            "Giá tiền phải lớn hơn 0!"
                                        );
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber placeholder="Enter price" style={{ width: "100%" }} />
                    </Form.Item>


                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Cập nhật
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};
export default ModalUpdate;
