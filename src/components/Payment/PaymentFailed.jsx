import React from 'react';
import { Result, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PaymentFailed = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate('/payment');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="payment-failed">
      <Result
        status="error"
        icon={<CloseCircleOutlined style={{ color: 'red' }} />}
        title="Thanh Toán Thất Bại"
        subTitle="Đã có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại."
        extra={[
          <Button type="primary" key="retry" onClick={handleRetry}>
            Thử Lại
          </Button>,
          <Button key="home" onClick={handleHome}>
            Trang Chủ
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentFailed;
