import React from 'react';
import { Result, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const VerifySuccess = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="verify-success">
      <Result
        status="success"
        icon={<CheckCircleOutlined style={{ color: 'green' }} />}
        title="Xác Minh Thành Công"
        extra={[
          <Button type="primary" key="home" onClick={handleLogin}>
            Đồng Ý
          </Button>,
          <Button key="history" onClick={handleHome}>
            Hủy
          </Button>,
        ]}
      />
    </div>
  );
};

export default VerifySuccess;
