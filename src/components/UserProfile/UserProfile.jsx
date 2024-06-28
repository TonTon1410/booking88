import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaKey, FaHistory } from 'react-icons/fa';
import userApi from '../../api/UserProfileApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.scss';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login } from "../../redux/features/counterSlice";

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('personalDetails');
    const user = useSelector(selectUser);

    const [userInfo, setUserInfo] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || ''
    });

    const [bookingHistory, setBookingHistory] = useState([]);
    const dispatch = useDispatch();
    const userId = user?.id;

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!userId) {
                setUserInfo({
                    name: user?.name || '',
                    phone: user?.phone || '',
                    email: user?.email || ''
                });
                return;
            }

            try {
                const data = await userApi.getAccountById(userId);
                console.log('Fetched user info:', data);
                if (data && data.name && data.phone && data.email) {
                    setUserInfo({
                        name: data.name,
                        phone: data.phone,
                        email: data.email
                    });
                    dispatch(login(data));
                } else {
                    console.error('Invalid user data structure:', data);
                }
            } catch (error) {
                console.error('Failed to fetch user info:', error);
            }
        };

        const fetchBookingHistory = async () => {
            try {
                const data = await userApi.getBookingHistory(userId);
                setBookingHistory(data);
            } catch (error) {
                console.error('Failed to fetch booking history:', error);
            }
        };

        if (userId) {
            fetchUserInfo();
            fetchBookingHistory();
        }
    }, [userId, user, dispatch]);

    const handleTabChange = (tab) => setActiveTab(tab);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            toast.error('User ID is not available');
            return;
        }
        try {
            const updatedUser = await userApi.updateAccount(userId, userInfo);
            setUserInfo(updatedUser);
            dispatch(login(updatedUser));
            toast.success('Thông tin cá nhân đã được cập nhật thành công!');
        } catch (error) {
            console.error('Failed to update user info:', error);
            toast.error('Cập nhật thông tin thất bại. Vui lòng thử lại.');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (!userId) {
            toast.error('User ID is not available');
            return;
        }
        const oldPassword = e.target.oldPassword.value;
        const newPassword = e.target.newPassword.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (newPassword !== confirmPassword) {
            toast.error('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        try {
            await userApi.changePassword(userId, { oldPassword, newPassword });
            toast.success('Mật khẩu đã được thay đổi thành công!');
        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('Đổi mật khẩu thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="account-page">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            <div className="account-nav">
                <button className={`nav-link ${activeTab === 'personalDetails' ? 'active' : ''}`} onClick={() => handleTabChange('personalDetails')}>
                    <FaInfoCircle /> Thông tin tài khoản
                </button>
                <button className={`nav-link ${activeTab === 'changePassword' ? 'active' : ''}`} onClick={() => handleTabChange('changePassword')}>
                    <FaKey /> Đổi mật khẩu
                </button>
                <button className={`nav-link ${activeTab === 'bookingHistory' ? 'active' : ''}`} onClick={() => handleTabChange('bookingHistory')}>
                    <FaHistory /> Lịch sử đặt lịch
                </button>
            </div>

            <div className="account-content">
                {activeTab === 'personalDetails' && (
                    <div className="account-section active">
                        <h2>Thông tin tài khoản</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Tên tài khoản</label>
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

                {activeTab === 'bookingHistory' && (
                    <div className="account-section active">
                        <h2>Lịch sử đặt lịch</h2>
                        <table className="booking-history-table">
                            <thead>
                                <tr>
                                    <th>Ngày đặt lịch</th>
                                    <th>Sân</th>
                                    <th>Thời gian</th>
                                    <th>Số tiền</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                )}
            </div>

            <div className="account-sidebar">
                <h3>{userInfo.name}</h3>
                <ul className="account-info">
                    <li>Email: {userInfo.email}</li>
                    <li>Số điện thoại: {userInfo.phone}</li>
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;
