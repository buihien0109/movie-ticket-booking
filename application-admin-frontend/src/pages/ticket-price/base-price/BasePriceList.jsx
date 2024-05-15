import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Modal, Select, Space, Spin, message, theme } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useCreateBaseTicketPriceMutation, useGetBaseTicketPricesQuery } from "../../../app/services/baseTicketPrice.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import BasePriceTable from "./BasePriceTable";

const breadcrumb = [{ label: "Danh sách giá vé cơ bản", href: "/admin/ticket-prices/base-price" }];
const BasePriceList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, isLoading: isFetchingBaseTicketPrices } = useGetBaseTicketPricesQuery();
    const [createBaseTicketPrice, { isLoading: isLoadingCreate }] =
        useCreateBaseTicketPriceMutation();

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    if (isFetchingBaseTicketPrices) {
        return <Spin size="large" fullscreen />;
    }

    const handleCreate = (values) => {
        createBaseTicketPrice(values)
            .unwrap()
            .then((data) => {
                form.resetFields();
                setOpen(false);
                message.success("Tạo giá vé thành công!");
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Danh sách giá vé</title>
            </Helmet>
            <AppBreadCrumb items={breadcrumb} />
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Space style={{ marginBottom: "1rem" }}>
                    <Button
                        style={{ backgroundColor: "rgb(60, 141, 188)" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setOpen(true)}
                    >
                        Tạo giá vé
                    </Button>
                    <RouterLink to="/admin/ticket-prices/base-price">
                        <Button
                            style={{ backgroundColor: "rgb(0, 192, 239)" }}
                            type="primary"
                            icon={<ReloadOutlined />}
                        >
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <BasePriceTable data={data} />
            </div>
            <Modal
                open={open}
                title="Tạo giá vé"
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

export default BasePriceList;
