import { PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, InputNumber, message, Modal, Select, Space, Spin, theme, Typography } from "antd";
import React, { useState } from "react";
import {
    useCreateAuditoriumMutation,
    useGetAuditoriumsByCinemaQuery
} from "../../../app/services/auditorium.service";
import AuditoriumTable from "./AuditoriumTable";

const AuditoriumList = ({ cinemaId }) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, isLoading: isFetchingAuditoriums } = useGetAuditoriumsByCinemaQuery(cinemaId);
    const [createAuditorium, { isLoading: isLoadingCreate }] =
        useCreateAuditoriumMutation();

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    if (isFetchingAuditoriums) {
        return <Spin size="large" fullscreen />;
    }

    const handleCreate = (values) => {
        createAuditorium({ ...values, cinemaId })
            .unwrap()
            .then((data) => {
                form.resetFields();
                setOpen(false);
                message.success("Tạo phòng chiếu thành công!");
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <div
                style={{
                    marginTop: 24,
                    marginBottom: 24,
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Flex justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
                    <Typography.Title level={4}>Danh sách phòng chiếu</Typography.Title>
                    <Button
                        style={{ backgroundColor: "rgb(60, 141, 188)" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => { setOpen(true) }}
                        loading={isLoadingCreate}
                    >
                        Tạo phòng chiếu
                    </Button>
                </Flex>

                <AuditoriumTable data={data} cinemaId={cinemaId} />
            </div>
            <Modal
                open={open}
                title="Tạo phòng chiếu"
                footer={null}
                onCancel={() => setOpen(false)}
                confirmLoading={isLoadingCreate}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleCreate}
                    autoComplete="off"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Tên phòng chiếu không được để trống!",
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
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoadingCreate}
                            >
                                Lưu
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AuditoriumList;
