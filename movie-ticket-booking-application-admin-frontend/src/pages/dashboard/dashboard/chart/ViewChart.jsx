import { Col, Row } from 'antd'
import React from 'react'
import RevenueMonthChart from './RevenueMonthChart'
import TopViewBlogChart from './TopViewBlogChart'

function ViewChart({ topViewBlogs, revenueByMonth }) {
    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <TopViewBlogChart data={topViewBlogs} />
            </Col>
            <Col span={12}>
                <RevenueMonthChart data={revenueByMonth} />
            </Col>
        </Row>
    )
}

export default ViewChart