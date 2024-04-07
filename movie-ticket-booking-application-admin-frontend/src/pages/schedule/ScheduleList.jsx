import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Modal, Select, Space, Spin, message, theme } from "antd";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useGetMoviesQuery } from "../../app/services/movies.service";
import { useCreateScheduleMutation, useGetSchedulesQuery } from "../../app/services/schedules.service";
import AppBreadCrumb from "../../components/layout/AppBreadCrumb";
import ScheduleTable from "./ScheduleTable";

const breadcrumb = [{ label: "Danh sách lịch chiếu", href: "/admin/schedules" }];
const ScheduleList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { data, isLoading: isFetchingSchedules } = useGetSchedulesQuery();
    const { data: movies, isLoading: isFetchingMovies } = useGetMoviesQuery(true);
    const [createSchedule, { isLoading: isLoadingCreate }] =
        useCreateScheduleMutation();

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    if (isFetchingSchedules || isFetchingMovies) {
        return <Spin size="large" fullscreen />;
    }

    const handleCreate = (values) => {
        createSchedule(values)
            .unwrap()
            .then((data) => {
                form.resetFields();
                setOpen(false);
                message.success("Tạo lịch chiếu thành công!");
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Helmet>
                <title>Danh sách lịch chiếu</title>
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
                        Tạo lịch chiếu
                    </Button>
                    <RouterLink to="/admin/Schedules">
                        <Button
                            style={{ backgroundColor: "rgb(0, 192, 239)" }}
                            type="primary"
                            icon={<ReloadOutlined />}
                        >
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <ScheduleTable data={data} movies={movies} />
            </div>
            <Modal
                open={open}
                title="Tạo lịch chiếu"
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
                        label="Phim chiếu"
                        name="movieId"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Phim chiếu không được để trống!",
                            },
                        ]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch
                            placeholder="Select a movie"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={movies.map((movie) => ({
                                label: movie.name,
                                value: movie.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày bắt đầu"
                        name="startDate"
                        rules={[
                            {
                                required: true,
                                message: "Ngày bắt đầu không được để trống!",
                            }
                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                    </Form.Item>

                    <Form.Item
                        label="Ngày kết thúc"
                        name="endDate"
                        rules={[
                            {
                                required: true,
                                message: "Ngày kết thúc không được để trống!",
                            }
                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
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

export default ScheduleList;
