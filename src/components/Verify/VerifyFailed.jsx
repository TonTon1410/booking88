import React from 'react';
import { Result, Button } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const VerifyFailed = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/Login');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="verify-failed">
      <Result
        status="error"
        icon={<CloseCircleOutlined style={{ color: 'red' }} />}
        title="Xác Minh Thất Bại"
        extra={[
          <Button type="primary" key="retry" onClick={handleLogin}>
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

export default VerifyFailed;
