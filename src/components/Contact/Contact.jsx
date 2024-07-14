import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import CreateNewField from "../../Dashboard/CreateNewField.jsx"; // Chỉnh sửa đường dẫn nếu cần
import './Contact.scss';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice.js";

const Contact = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState([]);
  const user = useSelector(selectUser);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="contact-container">
      <h1>Liên hệ với chúng tôi</h1>
      {user.role === 'CLUB_OWNER' && (
        <Button onClick={handleOpenModal} style={{ marginBottom: "20px" }}>Đăng kí thông tin sân</Button>
      )}
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
      <Modal title="Thêm sân mới" visible={isModalOpen} onCancel={handleCloseModal} footer={null}>
        <CreateNewField setShowForm={setIsModalOpen} setFields={setFields} />
      </Modal>
    </div>
  );
};

export default Contact;
