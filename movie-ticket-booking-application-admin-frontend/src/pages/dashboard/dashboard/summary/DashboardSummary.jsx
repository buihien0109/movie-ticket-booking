import { Col, Row } from 'antd'
import React from 'react'
import SummaryBox from './SummaryBox'
import { formatCurrency } from '../../../../utils/functionUtils'

function DashboardSummary({ revenueToday, countLatestUsers }) {
    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <SummaryBox
                    title="Doanh thu trong ngày"
                    content={formatCurrency(revenueToday)}
                    className="primary"
                    link="#"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title="Khách hàng mới"
                    content={countLatestUsers}
                    className="info"
                    link="/admin/users"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title="Tổng vé bán ra"
                    content={200}
                    className="warning"
                    link="#"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title="Tổng doanh thu"
                    content={formatCurrency(25000000)}
                    className="danger"
                    link="#"
                />
            </Col>
        </Row>
    )
}

export default DashboardSummary