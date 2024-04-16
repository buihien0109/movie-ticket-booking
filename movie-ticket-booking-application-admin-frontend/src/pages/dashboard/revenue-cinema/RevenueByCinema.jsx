import { FileExcelOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, message, Row, Space, Spin, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLazyExportRevenueByCinemaQuery, useLazyGetRevenueByCinemaQuery } from "../../../app/services/dashboard.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import RevenueByCinemaTable from "./RevenueByCinemaTable";
import RevenueChart from "./RevenueChart";
import TicketChart from "./TicketChart";

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
    const [exportRevenueByCinema] = useLazyExportRevenueByCinemaQuery();

    useEffect(() => {
        getRevenueByCinema({ startDate, endDate });
    }, [])

    if (isLoading || isFetching) {
        return <Spin size="large" fullscreen />
    }

    const handleExportExcel = () => {
        exportRevenueByCinema({ startDate, endDate })
            .unwrap()
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "reports.xlsx");
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log(error);
                message.error("Xuất báo cáo thất bại");
            });
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

                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <TicketChart data={data} />
                    </Col>
                    <Col span={12}>
                        <RevenueChart data={data} />
                    </Col>
                </Row>

                <RevenueByCinemaTable data={data} />
            </div>

        </>
    );
};

export default RevenueByCinema;
