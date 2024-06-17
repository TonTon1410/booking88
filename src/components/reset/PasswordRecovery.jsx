import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PasswordRecovery.scss';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://157.230.43.225:8080/swagger-ui/index.html#/authentication-api/forgotpasswordz', { email });
      console.log('Email submitted:', response.data);
      // Navigate to the reset password page
      navigate('/reset-password');
    } catch (error) {
      console.error('Error submitting email:', error);
    }
  };

  return (
    <div className="password-recovery-container">
      <div className="password-recovery-form">
        <h1>QUÊN MẬT KHẨU</h1>
        <div className="recovery-option">
          <div className="option">
            <div className="icon">&#128231;</div>
            <div className="text">
              <h2>Khôi phục mật khẩu qua email</h2>
              <p>Mã sẽ gửi qua email bạn đăng ký để thay đổi mật khẩu</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Xác nhận</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordRecovery;
