import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col } from "antd";
import api from "../../config/axios";
import "./Payment.css"; 

const OrderForm = () => {
  const location = useLocation();
  const { court, selectedDate, selectedTimes, totalAmount } = location.state || {};

  const [orderInfo, setOrderInfo] = useState(`Thanh toán đơn hàng cho sân ${court?.name}`);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await api.post(`/submitOrder?amount=${totalAmount}&orderInfo=${orderInfo}`);
      setResponseData(response.data);
      console.log("Form submitted successfully:", responseData);
      window.location.href = response.data;
      // Handle successful response
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      // Handle error
    }
  };

  return (
    <div className="container">
      <Row justify="center" className="mt-5">
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card title="Tạo Đơn Hàng" className="text-center">
            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                amount: totalAmount,
                courtName: court?.name,
                address: court?.address,
                orderInfo: orderInfo,
                date: new Date(selectedDate).toLocaleDateString(),
                timeSlots: selectedTimes.join(", "),
                slotCount: selectedTimes.length,
              }}
            >
              <Form.Item label="Số tiền:" name="amount">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="Tên sân:" name="courtName">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="Địa chỉ:" name="address">
                <Input readOnly />
              </Form.Item>
              <Form.Item
                label="Thông tin đơn hàng:"
                name="orderInfo"
                rules={[{ required: true, message: "Vui lòng nhập thông tin đơn hàng" }]}
              >
                <Input value={orderInfo} onChange={(e) => setOrderInfo(e.target.value)} />
              </Form.Item>
              <Form.Item label="Ngày đặt:" name="date">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="Khung giờ:" name="timeSlots">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="Số khung giờ đã đặt:" name="slotCount">
                <Input readOnly />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Thanh toán
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderForm;
