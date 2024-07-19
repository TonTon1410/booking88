import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { rechargeAmount } = location.state || {};

    const handleBackHome = () => {
        navigate('/');
    };

    const handleCheckHistory = () => {
        navigate('/history');
    };

    return (
        <div className="payment-success">
            <Result
                status="success"
                title="Thanh toán thành công"
                subTitle={`Số tiền bạn đã nạp: ${rechargeAmount} VND`}
                extra={[
                    <Button type="primary" key="home" onClick={handleBackHome}>
                        Quay lại trang chủ
                    </Button>,
                    <Button key="history" onClick={handleCheckHistory}>
                        Kiểm tra lịch sử thanh toán
                    </Button>,
                ]}
            />
        </div>
    );
};

export default PaymentSuccess;
