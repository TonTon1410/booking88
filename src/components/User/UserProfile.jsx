import React, { useState, useEffect } from "react";
import { FaInfoCircle, FaKey, FaChartBar, FaWallet } from "react-icons/fa";
import userApi from "../../api/UserProfileApi.jsx"; // Đảm bảo đường dẫn đúng
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UserProfile.scss";
import { Value } from "sass";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("personalDetails");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
    balance: 0,
    transactions: [],
    bookings: [],
  });

  useEffect(() => {
    // const fetchUserInfo = async () => {
    //   try {
    //     const data = await userApi.getUserInfo();
    //     setUserInfo(data);
    //   } catch (error) {
    //     console.error('Failed to fetch user info:', error);
    //   }
    // };
    handleSubmit();
  }, []);

  const handleTabChange = (tab) => setActiveTab(tab);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setUserInfo({ ...userInfo, avatar: reader.result });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userApi.updateUserInfo(e.id, userInfo);
      setUserInfo(updatedUser);
      toast.success("Thông tin cá nhân đã được cập nhật thành công!");
    } catch (error) {
      console.error("Failed to update user info:", error);
      toast.error("Cập nhật thông tin thất bại. Vui lòng thử lại.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.oldPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      await userApi.changePassword(e.id, { oldPassword, newPassword });
      toast.success("Mật khẩu đã được thay đổi thành công!");
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error("Đổi mật khẩu thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div className="account-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="account-nav">
        <button
          className={`nav-link ${
            activeTab === "personalDetails" ? "active" : ""
          }`}
          onClick={() => handleTabChange("personalDetails")}
        >
          <FaInfoCircle /> Thông tin tài khoản
        </button>
        <button
          className={`nav-link ${
            activeTab === "changePassword" ? "active" : ""
          }`}
          onClick={() => handleTabChange("changePassword")}
        >
          <FaKey /> Đổi mật khẩu
        </button>
        <button
          className={`nav-link ${activeTab === "statistics" ? "active" : ""}`}
          onClick={() => handleTabChange("statistics")}
        >
          <FaChartBar /> Thống kê
        </button>
        <button
          className={`nav-link ${activeTab === "wallet" ? "active" : ""}`}
          onClick={() => handleTabChange("wallet")}
        >
          <FaWallet /> Ví
        </button>
      </div>

      <div className="account-content" >
        {activeTab === "personalDetails" && (
          <div className="account-section active">
            <h2>Thông tin tài khoản</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Tên hiển thị</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Số điện thoại</label>
                <input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleChange}
                />
              </div>
              {/* <div className="form-group">
                <label>Avatar</label>
                <input type="file" onChange={handleFileChange} />
                {userInfo.avatar && <img src={userInfo.avatar} alt="Avatar" className="avatar-preview" />}
              </div> */}
              <button type="submit" onClick={() => handleChange(Value)}>
                Cập nhật
              </button>
            </form>
          </div>
        )}

        {activeTab === "changePassword" && (
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

        {activeTab === "statistics" && (
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

        {activeTab === "wallet" && (
          <div className="account-section active">
            <h2>Ví</h2>
            <p>
              Số dư:{" "}
              {userInfo.balance.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
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
                    <td>
                      {transaction.amount.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="account-sidebar">
        <div className="avatar">
          <img
            src={userInfo.avatar || "https://via.placeholder.com/100"}
            alt="Avatar"
          />
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
