import { EditOutlined } from '@ant-design/icons';
import { Button, Form, message, Modal, Select, Space } from 'antd';
import React, { useState } from 'react';
import { useUpdateRowSeatMutation } from '../../../../app/services/seats.service';

function RowSeatAction({ rowIndex, isLastRow, auditorium }) {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateRowSeat, { isLoading }] = useUpdateRowSeatMutation();

    const onFinish = (values) => {
        updateRowSeat({ auditoriumId: auditorium.id, rowIndex, ...values })
            .unwrap()
            .then((data) => {
                message.success("Cập nhật hàng ghế thành công!");
                setIsModalOpen(false)
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    const options = [
        { label: "Ghế thường", value: "NORMAL" },
        { label: "Ghế VIP", value: "VIP" }
    ];

    if (isLastRow) {
        options.push({ label: "Ghế đôi", value: "COUPLE" });
    }

    return (
        <>
            <Button
                style={{ backgroundColor: "rgb(82, 196, 26)", width: '40px', height: '40px', margin: '2px' }}
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                    setIsModalOpen(true);
                }}
            ></Button>

            <Modal
                title="Cập nhật hàng ghế"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={isLoading}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ status: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Loại ghế"
                        name="type"
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
                            placeholder="Select a type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Trạng thái không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a status"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { label: "Kích hoạt", value: true },
                                { label: "Khóa", value: false },
                            ]}
                        />
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
}

export default RowSeatAction