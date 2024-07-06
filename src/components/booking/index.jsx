import { Col, Row } from 'antd'
import React, { useEffect } from 'react'
import api from '../../config/axios'

function Booking() {

    const fetchLocationDetail = async () => {
        const response = api.get(`/api/location/${}`)
    }

    useEffect(() => fetchLocationDetail(), [])

    return (
        <Row>
            <Col span={12}>
                <Image />
            </Col>
            <Col span={12}></Col>
        </Row>
    )
}

export default Booking