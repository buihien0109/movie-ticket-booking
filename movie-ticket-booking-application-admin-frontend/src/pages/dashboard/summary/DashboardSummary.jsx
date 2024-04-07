import { Col, Row } from 'antd'
import React from 'react'
import { formatCurrency } from '../../../utils/functionUtils'
import SummaryBox from './SummaryBox'

function DashboardSummary({ countLatestBlogs, countLatestUsers, countLatestComments }) {
    return (
        <Row gutter={[16, 16]}>
            <Col span={6}>
                <SummaryBox
                    title="Doanh thu trong ngày"
                    content={formatCurrency(25000000)}
                    className="primary"
                    link="/admin/users"
                />
            </Col>
            <Col span={6}>
                <SummaryBox
                    title="Khách hàng mới"
                    content={30}
                    className="info"
                    link="/admin/blogs"
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