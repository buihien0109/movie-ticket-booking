import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Space, Spin, theme } from "antd";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink } from "react-router-dom";
import { useGetAdditionalServicesQuery } from "../../../app/services/additionalServices.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import AdditionalServiceTable from "./AdditionalServiceTable";

const breadcrumb = [
    { label: "Danh sách combo-nước", href: "/admin/additional-services" },
]
const AdditionalServiceList = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {
        data,
        isLoading: isFetchingAdditionalServices,
    } = useGetAdditionalServicesQuery();

    if (isFetchingAdditionalServices) {
        return <Spin size="large" fullscreen />
    }

    return (
        <>
            <Helmet>
                <title>Danh sách combo-nước</title>
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
                    <RouterLink to="/admin/additional-services/create">
                        <Button style={{ backgroundColor: 'rgb(60, 141, 188)' }} type="primary" icon={<PlusOutlined />}>
                            Tạo combo-nước
                        </Button>
                    </RouterLink>
                    <RouterLink to="/admin/additional-services">
                        <Button style={{ backgroundColor: 'rgb(0, 192, 239)' }} type="primary" icon={<ReloadOutlined />}>
                            Refresh
                        </Button>
                    </RouterLink>
                </Space>

                <AdditionalServiceTable data={data} />
            </div>

        </>
    );
};

export default AdditionalServiceList;
