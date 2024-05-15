import { Button, Form, Input, InputNumber, message, Modal, Select, Space } from "antd";
import React from "react";
import { useUpdateAuditoriumMutation } from "../../../app/services/auditorium.service";

const ModalUpdate = (props) => {
    const { auditorium, open, onCancel, cinemaId } = props;
    const [updateAuditorium, { isLoading }] = useUpdateAuditoriumMutation();

    const onFinish = (values) => {
        updateAuditorium({ id: auditorium.id, ...values, cinemaId })
            .unwrap()
            .then((data) => {
                message.success("Cập nhật phòng chiếu thành công!");
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
                title="Cập nhật phòng chiếu"
                footer={null}
                onCancel={onCancel}
                confirmLoading={isLoading}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{ ...auditorium }}
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Tên phòng chiếu không được để trống!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên phòng chiếu" />
                    </Form.Item>
                    <Form.Item
                        label="Loại phòng chiếu"
                        name="type"
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
                            placeholder="Select a type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={[
                                { value: "STANDARD", label: "Phòng chiếu tiêu chuẩn" },
                                { value: "IMAX", label: "Phòng chiếu IMAX" },
                                { value: "GOLDCLASS", label: "Phòng chiếu GOLD CLASS" },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số hàng"
                        name="totalRows"
                        rules={[
                            {
                                required: true,
                                message: "Số hàng không được để trống!",
                            },
                            {
                                validator: (_, value) => {
                                    if (value <= 0) {
                                        return Promise.reject(
                                            "Số hàng phải lớn hơn 0!"
                                        );
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber placeholder="Enter total rows" style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Số cột"
                        name="totalColumns"
                        rules={[
                            {
                                required: true,
                                message: "Số cột không được để trống!",
                            },
                            {
                                validator: (_, value) => {
                                    if (value <= 0) {
                                        return Promise.reject(
                                            "Số cột phải lớn hơn 0!"
                                        );
                                    }
                                    return Promise.resolve();
                                }
                            }
                        ]}
                    >
                        <InputNumber placeholder="Enter total columns" style={{ width: "100%" }} />
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
