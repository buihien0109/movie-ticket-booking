import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Space,
    message,
    theme,
} from "antd";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCreateAdditionalServiceMutation } from "../../../app/services/additionalServices.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";

const breadcrumb = [
    { label: "Danh sách combo-nước", href: "/admin/additional-services" },
    { label: "Tạo combo-nước", href: "/admin/additional-services/create" },
];
const AdditionalServiceCreate = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
    const [createAdditionalService, { isLoading }] = useCreateAdditionalServiceMutation();
    const navigate = useNavigate();

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                return createAdditionalService(values).unwrap();
            })
            .then((data) => {
                message.success("Tạo combo-nước thành công!");
                setTimeout(() => {
                    navigate(`/admin/additional-services/${data.id}/detail`);
                }, 1500);
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Tạo combo-nước</title>
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
                    <RouterLink to="/admin/additional-services">
                        <Button type="default" icon={<LeftOutlined />}>
                            Quay lại
                        </Button>
                    </RouterLink>
                    <Button
                        style={{ backgroundColor: "rgb(60, 141, 188)" }}
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleCreate}
                        loading={isLoading}
                    >
                        Tạo combo-nước
                    </Button>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ status: false }}
                >
                    <Row gutter={16}>
                        <Col span={16}>
                            <Form.Item
                                label="Tên combo-nước"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Tên không được để trống!",
                                    },
                                ]}
                            >
                                <Input placeholder="Enter name" />
                            </Form.Item>

                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: "Mô tả không được để trống!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={6}
                                    placeholder="Enter description"
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
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
                                        { label: "Nháp", value: false },
                                        { label: "Công khai", value: true },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default AdditionalServiceCreate;
