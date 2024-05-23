import { LeftOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Divider,
    Flex,
    Row,
    Space,
    Spin,
    Tag,
    theme,
    Typography
} from "antd";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, Link as RouterLink, useParams } from "react-router-dom";
import {
    useGetOrderByIdQuery
} from "../../../app/services/orders.service";
import ErrorPage from "../../../components/error-page/ErrorPage";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import { formatCurrency, formatDate } from "../../../utils/functionUtils";
import ServiceTable from "../order-list/ServiceTable";
import TicketTable from "../order-list/TicketTable";

const parseOrderStatus = (status) => {
    switch (status) {
        case "PENDING":
            return <Tag color="default">Chờ xác nhận</Tag>;
        case "CONFIRMED":
            return <Tag color="success">Đã thanh toán</Tag>;
        case "CANCELLED":
            return <Tag color="error">Đã hủy</Tag>;
        default:
            return <Tag color="default">Không xác định</Tag>;
    }
}
const OrderDetail = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const { orderId } = useParams();
    const { data: order, isLoading, isError, error } =
        useGetOrderByIdQuery(Number(orderId));


    const breadcrumb = [
        { label: "Danh sách đơn hàng", href: "/admin/orders" },
        { label: `Đơn hàng ${order?.id}`, href: `/admin/orders/${order?.id}/detail` },
    ];


    if (isLoading) {
        return <Spin size="large" fullscreen />;
    }

    if (isError) {
        return <ErrorPage error={error} />;
    }

    return (
        <>
            <Helmet>
                <title>{`Đơn hàng ${order?.id}`}</title>
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
                <Flex justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
                    <Space>
                        <RouterLink to="/admin/orders">
                            <Button type="default" icon={<LeftOutlined />}>
                                Quay lại
                            </Button>
                        </RouterLink>
                    </Space>
                </Flex>

                <Row gutter={16}>
                    <Col span={6}>
                        <Typography.Title level={5}>Thông tin đơn hàng</Typography.Title>
                        <Divider />
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Mã đơn hàng:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{order?.id}</Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Phim:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Link to={`/admin/movies/${order?.showtime.movie.id}/detail`}>{order?.showtime.movie.name}</Link>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Giờ chiếu:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Tag color="volcano">{order?.showtime.startTime} - {order?.showtime.endTime}</Tag>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Ngày chiếu:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{formatDate(order?.showtime.date)}</Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Phòng chiếu:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{order?.showtime.auditorium.name}</Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Rạp chiếu:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Link to={`/admin/cinemas/${order?.showtime.auditorium.cinema.id}/detail`}>
                                        {order?.showtime.auditorium.cinema.name}
                                    </Link>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Ngày đặt:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{formatDate(order?.createdAt)}</Typography.Paragraph>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Typography.Title level={5}>Thông tin khách hàng</Typography.Title>
                        <Divider />
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Khách hàng:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Link to={`/admin/users/${order?.user.id}/detail`}>{order?.user.name}</Link>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Điện thoại:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{order?.user.phone}</Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Email:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{order?.user.email}</Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Trạng thái:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>{parseOrderStatus(order?.status)}</Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Thành tiền:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Tag color="blue">{formatCurrency(order?.tempPrice)}</Tag>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Giảm giá {order?.discount ? `(${order?.discount}%)` : ""}:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Tag color="blue">{formatCurrency(order?.discountPrice)}</Tag>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={7}>
                                <Typography.Paragraph strong>Tổng tiền:</Typography.Paragraph>
                            </Col>
                            <Col span={17}>
                                <Typography.Paragraph>
                                    <Tag color="blue">{formatCurrency(order?.totalPrice)}</Tag>
                                </Typography.Paragraph>
                            </Col>
                        </Row>
                    </Col>


                    <Col span={12}>
                        <Typography.Title level={5}>Ghế & Dịch vụ</Typography.Title>
                        <Divider />

                        <TicketTable ticketItems={order?.ticketItems} />

                        {order.serviceItems.length > 0 && (
                            <ServiceTable serviceItems={order?.serviceItems} />
                        )}
                    </Col>
                </Row>

            </div>
        </>
    );
};

export default OrderDetail;
