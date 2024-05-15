import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Spin, theme } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useGetCinemasQuery } from "../../../app/services/cinemas.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import CinemaTable from "./CinemaTable";

const breadcrumb = [
    { label: "Danh sách rạp phim", href: "/admin/cinemas" },
]
const CinemaList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {
        data,
        isLoading: isFetchingCinemas,
    } = useGetCinemasQuery();

    if (isFetchingCinemas) {
        return <Spin size="large" fullscreen />
    }

    return (
        <>
            <Helmet>
                <title>Danh sách rạp chiếu</title>
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
                    <RouterLink to="/admin/cinemas/create">
                        <Button style={{ backgroundColor: 'rgb(60, 141, 188)' }} type="primary" icon={<PlusOutlined />}>
                            Tạo rạp chiếu
                        </Button>
                    </RouterLink>
                    <RouterLink to="/admin/cinemas">
                        <Button style={{ backgroundColor: 'rgb(0, 192, 239)' }} type="primary" icon={<ReloadOutlined />}>
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <CinemaTable data={data} />
            </div>

        </>
    );
};

export default CinemaList;
