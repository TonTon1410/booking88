import React, { useState } from 'react';
import { FaInfoCircle, FaKey, FaChartBar, FaWallet } from 'react-icons/fa';
import './UserProfile.scss';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personalDetails');
  const [userInfo, setUserInfo] = useState({
    name: 'Tên người dùng',
    email: 'user@example.com',
    phone: '0123456789',
    avatar: '',
    balance: 1000000,
    transactions: [
      { date: '2024-06-15', description: 'Nạp tiền', amount: 500000 },
      { date: '2024-06-10', description: 'Rút tiền', amount: -200000 },
    ],
    bookings: [
      { date: '2024-06-15', court: 'Sân A', time: '08:00 - 10:00' },
      { date: '2024-06-16', court: 'Sân B', time: '14:00 - 16:00' },
    ]
  });
  const [notification, setNotification] = useState('');

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({ ...userInfo, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('User info updated:', userInfo);
    setNotification('Thông tin cá nhân đã được cập nhật thành công!');
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Handle password change
    console.log('Password changed');
    setNotification('Mật khẩu đã được thay đổi thành công!');
  };

  return (
    <div className="account-page">
      <div className="account-nav">
        <button className={`nav-link ${activeTab === 'personalDetails' ? 'active' : ''}`} onClick={() => handleTabChange('personalDetails')}>
          <FaInfoCircle /> Thông tin tài khoản
        </button>
        <button className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`} onClick={() => handleTabChange('changePassword')}>
          <FaKey /> Đổi mật khẩu
        </button>
        <button className={`nav-link ${activeTab === 'statistics' ? 'active' : ''}`} onClick={() => handleTabChange('statistics')}>
          <FaChartBar /> Thống kê
        </button>
        <button className={`nav-link ${activeTab === 'wallet' ? 'active' : ''}`} onClick={() => handleTabChange('wallet')}>
          <FaWallet /> Ví
        </button>
      </div>

      <div className="account-content">
        {activeTab === 'personalDetails' && (
          <div className="account-section active">
            <h2>Thông tin tài khoản</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên hiển thị</label>
                <input type="text" name="name" value={userInfo.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input type="text" name="phone" value={userInfo.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Avatar</label>
                <input type="file" onChange={handleFileChange} />
                {userInfo.avatar && <img src={userInfo.avatar} alt="Avatar" className="avatar-preview" />}
              </div>
              <button type="submit">Cập nhật</button>
            </form>
          </div>
        )}

        {activeTab === 'changePassword' && (
          <div className="account-section active">
            <h2>Đổi mật khẩu</h2>
            <form onSubmit={handlePasswordChange}>
              <div className="form-group">
                <label>Mật khẩu cũ</label>
                <input type="password" name="oldPassword" />
              </div>
              <div className="form-group">
                <label>Mật khẩu mới</label>
                <input type="password" name="newPassword" />
              </div>
              <div className="form-group">
                <label>Xác nhận mật khẩu mới</label>
                <input type="password" name="confirmPassword" />
              </div>
              <button type="submit">Đổi mật khẩu</button>
            </form>
          </div>
        )}

        {activeTab === 'statistics' && (
          <div className="account-section active">
            <h2>Thống kê đặt sân</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Sân</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.date}</td>
                    <td>{booking.court}</td>
                    <td>{booking.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'wallet' && (
          <div className="account-section active">
            <h2>Ví</h2>
            <p>Số dư: {userInfo.balance.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            <h3>Lịch sử giao dịch</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Ngày</th>
                  <th>Mô tả</th>
                  <th>Số tiền</th>
                </tr>
              </thead>
              <tbody>
                {userInfo.transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {notification && <div className="notification">{notification}</div>}

      <div className="account-sidebar">
        <div className="avatar">
          <img src={userInfo.avatar || 'https://via.placeholder.com/100'} alt="Avatar" />
        </div>
        <h3>{userInfo.name}</h3>
        <p>Khách hàng</p>
        <ul className="account-info">
          <li>Email: {userInfo.email}</li>
          <li>Số điện thoại: {userInfo.phone}</li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
