import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PasswordRecovery.scss';

const PasswordReset = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Lấy token từ URL params

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('* Mật khẩu không khớp.');
      return;
    }

    try {
      const response = await axios.post('http://157.230.43.225:8080/reset-password', { password, token });
      console.log('Password reset successful:', response.data);
      setError(''); // Xóa lỗi nếu đặt lại mật khẩu thành công
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu mới *</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
