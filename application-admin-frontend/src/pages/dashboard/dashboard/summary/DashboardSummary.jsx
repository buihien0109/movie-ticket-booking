import { Col, Row } from 'antd';
import React from 'react';
import { formatCurrency } from '../../../../utils/functionUtils';
import SummaryBox from './SummaryBox';

function DashboardSummary({ revenueToday, countLatestUsers, totalTicketsCurrentMonth, revenueCurrentMonth }) {
    const now = new Date();
    const MMYYYY = `T${now.getMonth() + 1}/${now.getFullYear()}`;
    const DDMMYYYY = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <SummaryBox
                    title={`Doanh thu trong ngày (${DDMMYYYY})`}
                    content={formatCurrency(revenueToday)}
                    className="primary"
                    link="#"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title={`Khách hàng mới (${MMYYYY})`}
                    content={countLatestUsers}
                    className="info"
                    link="/admin/users"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title={`Tổng vé bán ra (${MMYYYY})`}
                    content={totalTicketsCurrentMonth}
                    className="warning"
                    link="#"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title={`Tổng doanh thu (${MMYYYY})`}
                    content={formatCurrency(revenueCurrentMonth)}
                    className="danger"
                    link="#"
                />
            </Col>
        </Row>
    )
}

export default DashboardSummary