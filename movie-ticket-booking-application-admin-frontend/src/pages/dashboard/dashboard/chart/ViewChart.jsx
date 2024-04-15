import { Col, Row } from 'antd'
import React from 'react'
import TopViewBlogChart from './TopViewBlogChart'

function ViewChart({ topViewBlogs }) {
    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>
                <TopViewBlogChart data={topViewBlogs} />
            </Col>
            <Col span={12}>

            </Col>
        </Row>
    )
}

export default ViewChart