import { FileExcelOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, message, Space, Spin, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLazyGetRevenueByCinemaQuery } from "../../../app/services/dashboard.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import RevenueByCinemaTable from "./RevenueByCinemaTable";

const breadcrumb = [
    { label: "Doanh thu theo rạp", href: "/admin/revenue/cinema" },
]
const RevenueByCinema = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const [form] = Form.useForm();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [getRevenueByCinema, { data, isLoading, isFetching }] = useLazyGetRevenueByCinemaQuery();

    useEffect(() => {
        getRevenueByCinema({ startDate, endDate });
    }, [])

    if (isLoading || isFetching) {
        return <Spin size="large" fullscreen />
    }

    const handleExportExcel = () => {
        message.warning("Chức năng đang phát triển");
    };

    const onFinish = (values) => {
        const start = values.time[0] ? values.time[0].format("DD-MM-YYYY") : null;
        const end = values.time[1] ? values.time[1].format("DD-MM-YYYY") : null;
        setStartDate(start);
        setEndDate(end);

        getRevenueByCinema({ startDate: start, endDate: end });
    };

    return (
        <>
            <Helmet>
                <title>Doanh thu theo rạp</title>
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
                <Space style={{ marginBottom: '1rem' }}>
                    <Form
                        form={form}
                        layout="inline"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="time"
                        >
                            <DatePicker.RangePicker />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                htmlType="submit"
                                style={{ backgroundColor: 'rgb(0, 192, 239)' }}
                                type="primary"
                                icon={<ReloadOutlined />}
                            >
                                Load dữ liệu
                            </Button>
                        </Form.Item>
                    </Form>

                    <Button
                        style={{ backgroundColor: '#52c41a' }}
                        type="primary"
                        icon={<FileExcelOutlined />}
                        onClick={handleExportExcel}
                    >
                        Xuất báo cáo
                    </Button>
                </Space>

                <RevenueByCinemaTable data={data} />
            </div>

        </>
    );
};

export default RevenueByCinema;
