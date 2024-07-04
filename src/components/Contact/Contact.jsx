import React from 'react';
import '../Contact/Contact.scss';

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Liên hệ với chúng tôi</h1>
      <div className="contact-info">
        <div className="contact-item">
          <h2>Địa chỉ</h2>
          <p>123 Đường ABC, Quận XYZ, Thành phố Hồ Chí Minh</p>
        </div>
        <div className="contact-item">
          <h2>Số điện thoại</h2>
          <p>(+84) 123-456-789</p>
        </div>
        <div className="contact-item">
          <h2>Email</h2>
          <p>booking88@gmail.com</p>
        </div>
      </div>
      <div className="contact-form">
        <h2>Gửi tin nhắn cho chúng tôi</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Tên của bạn</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email của bạn</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Tin nhắn</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit">Gửi</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
