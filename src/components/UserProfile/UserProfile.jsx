
import React, { useState, useEffect, useRef } from 'react';

import { FaInfoCircle, FaEnvelope, FaHistory, FaWallet } from 'react-icons/fa';
import userApi from '../../api/UserProfileApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login } from '../../redux/features/counterSlice';
import { Button, Typography, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QRCode } from 'react-qr-code';

const { confirm } = Modal;
const { Text } = Typography;

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('Recharge');
    const user = useSelector(selectUser);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || ''
    });

    const [amount, setAmount] = useState(0);
    const [rechargeAmount, setRechargeAmount] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [bookingHistory, setBookingHistory] = useState([]);
    const [topUpHistory, setTopUpHistory] = useState([]);
    const [selectedQRCode, setSelectedQRCode] = useState(null); // State to store selected QR code
    const dispatch = useDispatch();
    const userId = user?.id;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookingHistory = async () => {
            try {
                if (userId) {
                    const data = await userApi.getBookingHistory(userId);
                    setBookingHistory(data);
                }
            } catch (error) {
                console.error('Failed to fetch booking history:', error);
                toast.error('Lấy lịch sử đặt lịch thất bại. Vui lòng thử lại.');
            }
        };
        const getAmount = async () => {
            try {
                const data = await userApi.getWalletAmount(userId);
                setAmount(data);
            } catch (error) {
                console.error('Failed to fetch wallet amount:', error);
                toast.error('Lấy số dư thất bại. Vui lòng thử lại.');
            }
        }

        fetchBookingHistory();
        getAmount();
    }, [userId]);

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

        const fetchTopUpHistory = async () => {
            try {
                const data = await userApi.getTopUpHistory(userId);
                setTopUpHistory(data);
            } catch (error) {
                console.error('Failed to fetch top-up history:', error);
            }
        };

        if (userId && !isDataFetched) {
            fetchUserInfo();
            fetchTopUpHistory();
            setIsDataFetched(true);
        }
    }, [userId, user, dispatch, isDataFetched]);

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
            toast.error('Cập nhật thông tin thất bại. Vui lòng thử nhập Email hoặc Số điện thoại khác.');
        }
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        if (!userInfo.email) {
            toast.error('Email is not available');
            return;
        }
        try {
            await userApi.forgotPassword(userInfo.email);
            toast.success('Yêu cầu đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra email của bạn.');
        } catch (error) {
            console.error('Failed to request password reset:', error);
            toast.error('Yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại.');
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        navigate('/payment', { state: { rechargeAmount } });
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleRechargeAmountChange = (e) => {
        setRechargeAmount(Number(e.target.value));
    };

    const handleCancelBooking = async (bookingId, bookingSlotId) => {
        try {
            await userApi.cancelBooking(bookingId, bookingSlotId);
            toast.success('Đã hủy đặt lịch thành công!');
            setBookingHistory(prevHistory =>
                prevHistory.map(history =>
                    history.id === bookingId
                        ? { ...history, status: 'CANCEL' }
                        : history
                )
            );
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            toast.error('Hủy đặt lịch thất bại. Vui lòng thử lại.');
        }
    };

    const handleConfirmCancelBooking = (bookingId, bookingSlotId) => {
        confirm({
            title: 'Bạn có chắc chắn muốn hủy đặt lịch?',
            content: 'Hành động này không thể hoàn tác.',
            onOk: () => handleCancelBooking(bookingId, bookingSlotId),
            onCancel: () => {
                console.log('Cancel booking cancelled');
            }
        });
    };

    const handleQRCodeClick = (qrData) => {
        setSelectedQRCode(qrData);
        setIsModalVisible(true);
    };

    return (
        <div className="account-page">
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            <div className="account-nav">
                <button className={`nav-link ${activeTab === 'Recharge' ? 'active' : ''}`} onClick={() => handleTabChange('Recharge')}>
                    <FaWallet /> Nạp tiền 
                </button>
                <button className={`nav-link ${activeTab === 'personalDetails' ? 'active' : ''}`} onClick={() => handleTabChange('personalDetails')}>
                    <FaInfoCircle /> Thông tin tài khoản
                </button>
                <button className={`nav-link ${activeTab === 'forgotPassword' ? 'active' : ''}`} onClick={() => handleTabChange('forgotPassword')}>
                    <FaEnvelope /> Đặt lại mật khẩu
                </button>
                <button className={`nav-link ${activeTab === 'bookingHistory' ? 'active' : ''}`} onClick={() => handleTabChange('bookingHistory')}>
                    <FaHistory /> Lịch sử đặt lịch

                </button>
                <button className={`nav-link ${activeTab === 'topUpHistory' ? 'active' : ''}`} onClick={() => handleTabChange('topUpHistory')}>
                    <FaHistory /> Lịch sử nạp tiền
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

                {activeTab === 'forgotPassword' && (
                    <div className="account-section active">
                        <h2>Đặt lại mật khẩu</h2>
                        <form onSubmit={handleForgotPasswordSubmit}>
                            <div className="form-group">
                                <label>Email của bạn</label>
                                <input
                                    type="email"
                                    value={userInfo.email}
                                    disabled
                                />
                            </div>
                            <button type="submit">Gửi yêu cầu</button>
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
                                    <th>Loại đặt sân</th>
                                    <th>Trạng thái</th>
                                    <th>Hủy đặt lịch</th>
                                    <th>Check-In</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingHistory.map((history) => (
                                    <tr key={history.id}>
                                        <td>{history.bookingDate}</td>
                                        <td>{history.location.name}</td>
                                        <td>{history.bookingDetails.map(detail => detail.courtSlot?.slot?.time || 'N/A').join(', ')}</td>                                        <td>{history.totalPrice}</td>
                                        <td>{history.bookingType}</td>
                                        <td>{history.status}</td>
                                        <td>
                                            {history.status === "CANCEL" ? (
                                                <Text>Đã hủy</Text>
                                            ) : (
                                                <Button type="danger" onClick={() => handleConfirmCancelBooking(history.id, history.bookingDetails[0]?.courtSlot?.id)}>
                                                    Hủy
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <div onClick={() => handleQRCodeClick(history.bookingDetails[0]?.courtSlot?.id)}>
                                                <QRCode value={history.bookingDetails[0]?.courtSlot?.id || ''} size={64} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'Recharge' && (
                    <>
                        <Button style={{ display: "block", marginBottom: "20px" }} onClick={showModal}>
                            Nạp tiền thêm
                        </Button>
                        <Text style={{ fontSize: "20px" }}>
                            Số dư của bạn là: {amount !== null && amount !== undefined ? amount.toLocaleString() : '0'} VND
                        </Text>
                        <Modal title="Nạp tiền" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                            <Input
                                type="number"
                                value={rechargeAmount}
                                onChange={handleRechargeAmountChange}
                                placeholder="Nhập số tiền cần nạp"
                            />
                        </Modal>
                    </>
                )}

                {activeTab === 'topUpHistory' && (
                    <div className="account-section active">
                        <h2>Lịch sử nạp tiền</h2>
                        <table className="topup-history-table">
                            <thead>
                                <tr>
                                    <th>Số tiền</th>
                                    <th>Loại giao dịch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topUpHistory.map((history, index) => (
                                    <tr key={index}>
                                        <td>{history.amount.toLocaleString()} VND</td>
                                        <td>{history.transactionType}</td>
                                    </tr>
                                ))}
                            </tbody>
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

            <Modal
                title="QR Code"
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                {selectedQRCode && <QRCode value={selectedQRCode} size={256} />}
            </Modal>
        </div>
    );
};

export default UserProfile;
