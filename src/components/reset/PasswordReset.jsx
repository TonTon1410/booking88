import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../config/axios';
import './PasswordRecovery.scss';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Lấy token từ URL params
  const navigate = useNavigate(); // Dùng navigate để điều hướng

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setError('Token is missing.');
      return;
    }

    try {
      const response = await api.post(
        '/reset-password',
        { 
          password: password,
          token: token
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Password reset successful:', response.data);
      setError(''); // Xóa lỗi nếu đặt lại mật khẩu thành công
      navigate('/login'); // Điều hướng đến trang đăng nhập sau khi đặt lại mật khẩu thành công
    } catch (error) {
      console.error('Error resetting password:', error);
      setError('Có lỗi xảy ra khi đặt lại mật khẩu.');
    }
  };

  return (
    <div className="password-recovery-container">
      <div className="password-recovery-form">
        <h1>ĐẶT LẠI MẬT KHẨU</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="password">Mật khẩu mới *</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">Xác nhận</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordReset;
