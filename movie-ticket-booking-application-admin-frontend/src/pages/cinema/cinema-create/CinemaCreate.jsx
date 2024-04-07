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
import { useCreateCinemaMutation } from "../../../app/services/cinemas.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";

const breadcrumb = [
    { label: "Danh sách rạp chiếu", href: "/admin/cinemas" },
    { label: "Tạo rạp chiếu", href: "/admin/cinemas/create" },
];
const CinemaCreate = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
    const [createCinema, { isLoading }] = useCreateCinemaMutation();
    const navigate = useNavigate();

    const handleCreate = () => {
        form.validateFields()
            .then((values) => {
                return createCinema(values).unwrap();
            })
            .then((data) => {
                message.success("Tạo rạp chiếu thành công!");
                setTimeout(() => {
                    navigate(`/admin/cinemas/${data.id}/detail`);
                }, 1500);
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Tạo rạp chiếu</title>
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
                    <RouterLink to="/admin/cinemas">
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
                        Tạo rạp chiếu
                    </Button>
                </Space>

                <Form
                    form={form}
                    layout="vertical"
                    autoComplete="off"
                    initialValues={{ status: false }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên rạp chiếu"
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
                                label="Địa chỉ"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: "Địa chỉ không được để trống!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={4}
                                    placeholder="Enter address"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Địa chỉ map"
                                name="mapLocation"
                                rules={[
                                    {
                                        required: true,
                                        message: "Địa chỉ map không được để trống!",
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    rows={6}
                                    placeholder="Enter map location"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export default CinemaCreate;
