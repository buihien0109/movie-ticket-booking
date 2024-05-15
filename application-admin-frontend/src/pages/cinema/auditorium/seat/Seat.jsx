import { Button, Form, Modal, Select, Space, message } from 'antd';
import React, { useState } from 'react';
import { useUpdateSeatMutation } from '../../../../app/services/seats.service';

function Seat({ seat, isLastRow, auditorium }) {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateSeat, { isLoading }] = useUpdateSeatMutation();

    const onFinish = (values) => {
        updateSeat({ id: seat.id, ...seat, ...values, auditoriumId: auditorium.id })
            .unwrap()
            .then((data) => {
                message.success("Cập nhật ghế thành công!");
                setIsModalOpen(false)
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };


    const getSeatColor = (seat) => {
        if (!seat.status) {
            return "rgb(64, 64, 64)"
        }

        switch (seat.type) {
            case 'NORMAL':
                return 'rgb(114, 46, 209)';
            case 'VIP':
                return 'rgb(245, 34, 45)';
            case 'COUPLE':
                return 'rgb(236, 47, 150)';
            default:
                return 'rgb(64, 64, 64)';
        }
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
                type="primary"
                style={{ backgroundColor: getSeatColor(seat), width: '40px', height: '40px', margin: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => setIsModalOpen(true)}
            >
                {seat.code}
            </Button>

            <Modal
                title="Cập nhật ghế"
                open={isModalOpen}
                footer={null}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={isLoading}
            >
                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ ...seat }}
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

export default Seat