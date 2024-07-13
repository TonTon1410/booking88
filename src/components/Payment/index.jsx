import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, Card, Row, Col } from "antd";
import api from "../../config/axios";
import "./Payment.css"; 

const OrderForm = () => {
  const location = useLocation();
  const { rechargeAmount } = location.state || {};
  const [amount, setAmount] = useState(rechargeAmount || 0);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await api.post(`http://157.230.43.225:8080/submitOrder?amount=${amount}`);

      setResponseData(response.data);
      console.log("Form submitted successfully:", responseData);
      window.location.href = response.data;
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <div className="container">
      <Row justify="center" className="mt-5">
        <Col xs={24} sm={18} md={12} lg={10}>
          <Card title="Xác nhận nạp tiền" className="text-center">
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Số tiền:" name="amount">
                {/* <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                /> */}
                {amount}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Xác nhận
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
