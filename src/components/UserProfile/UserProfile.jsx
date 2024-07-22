import React, { useState, useEffect } from 'react';
import { FaInfoCircle, FaEnvelope, FaHistory, FaWallet } from 'react-icons/fa';
import moment from 'moment';
import userApi from '../../api/UserProfileApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, login } from '../../redux/features/counterSlice';
import { Button, Typography, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code';
import axios from 'axios';

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
    const [isRechargeModalVisible, setIsRechargeModalVisible] = useState(false);
    const [isQRCodeModalVisible, setIsQRCodeModalVisible] = useState(false);
    const [selectedQRCode, setSelectedQRCode] = useState(null);

    const [bookingHistory, setBookingHistory] = useState([]);
    const [topUpHistory, setTopUpHistory] = useState([]);
    const dispatch = useDispatch();
    const userId = user?.id;
    const navigate = useNavigate();

    const BALANCE_THRESHOLD = 100000; // Define your balance threshold here

    useEffect(() => {
        if (userId) {
            const fetchBookingHistory = async () => {
                try {
                    const data = await userApi.getBookingHistory(userId);
                    setBookingHistory(data);
                } catch (error) {
                    console.error('Failed to fetch booking history:', error);
                    toast.error('Lấy lịch sử đặt lịch thất bại. Vui lòng thử lại.');
                }
            };

            const getAmount = async () => {
                try {
                    const data = await userApi.getWalletAmount(userId);
                    setAmount(data.amount || 0);
                } catch (error) {
                    console.error('Failed to fetch wallet amount:', error);
                    toast.error('Lấy số dư thất bại. Vui lòng thử lại.');
                }
            };

            fetchBookingHistory();
            getAmount();
        }
    }, [userId]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (!userId) return;

            try {
                const data = await userApi.getAccountById(userId);
                if (data) {
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
    }, [userId, dispatch, isDataFetched]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);

        if (tab === 'Recharge' && amount < BALANCE_THRESHOLD) {
            toast.warning(`Số dư của bạn dưới ${BALANCE_THRESHOLD.toLocaleString()} VND. Vui lòng nạp thêm tiền.`);
        }
    };

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

    const showRechargeModal = () => {
        setIsRechargeModalVisible(true);
    };

    const handleRechargeOk = () => {
        setIsRechargeModalVisible(false);
        navigate('/payment', { state: { rechargeAmount } });
    };

    const handleRechargeCancel = () => {
        setIsRechargeModalVisible(false);
    };

    const handleRechargeAmountChange = (e) => {
        setRechargeAmount(Number(e.target.value));
    };

    const handleCancelBooking = async (bookingId) => {
try {
            await userApi.cancelBooking(bookingId);
            toast.success('Đã hủy đặt lịch thành công!');
            setBookingHistory(prev =>
                prev.map(history =>
                    history.id === bookingId ? { ...history, status: 'CANCEL' } : history
                )
            );
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            toast.error('Hủy đặt lịch thất bại. Vui lòng thử lại.');
        }
    };

    const handleQRCodeClick = (qrData) => {
        setSelectedQRCode(qrData);
        setIsQRCodeModalVisible(true);
    };

    const handleQRCodeModalCancel = () => {
        setIsQRCodeModalVisible(false);
    };

    const calculateTotalRecharged = () => {
        return topUpHistory.reduce((total, history) => total + history.amount, 0);
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
                                <label>Email</label>
                                <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
                            </div>
                            <button type="submit">Gửi yêu cầu</button>
                        </form>
                    </div>
                )}

{activeTab === 'Recharge' && (
                    <>
                        <Button style={{ display: "block", marginBottom: "20px" }} onClick={showRechargeModal}>
                            Nạp tiền thêm
                        </Button>
                        <Text style={{ fontSize: "20px" }}>
                            Số dư của bạn là: {amount.toLocaleString()} VND
                        </Text>
                        <Modal title="Nạp tiền" visible={isRechargeModalVisible} onOk={handleRechargeOk} onCancel={handleRechargeCancel}>
                            <Input
                                type="number"
                                value={rechargeAmount}
                                onChange={handleRechargeAmountChange}
                                placeholder="Nhập số tiền cần nạp"
                            />
                            <p>Số tiền cần nạp: {rechargeAmount.toLocaleString()} VND</p>
                        </Modal>
                    </>
                )}


{activeTab === "bookingHistory" && (
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
                  <th>Mã check in</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((history) => (
                  <tr key={history.id}>
                    <td>{history.bookingDate}</td>
                    <td>{history.location.name}</td>
                    <td>
                      {history.bookingDetails
                        .map((detail) => detail.courtSlot?.slot?.time || "N/A")
                        .join(", ")}
                    </td>{" "}
                    <td>{history.totalPrice}</td>
                    <td>{history.bookingType}</td>
                    <td>{history.status}</td>
                    <td>
                      {history.status === "CANCEL" ? (
                        <Text>Đã hủy</Text>
                      ) : (
                        <Button
                          type="danger"
                          onClick={() =>
                            handleConfirmCancelBooking(
                              history.id,
                              history.bookingDetails[0]?.courtSlot?.id
                            )
                          }
                        >
                          Hủy
                        </Button>
                      )}
                    </td>
                    <td>
                      <div
                        onClick={() =>
                          handleQRCodeClick(
                            history.bookingDetails[0]?.courtSlot?.id
                          )
                        }
                      >
                        <QRCode
                          value={history.bookingDetails[0]?.courtSlot?.id || ""}
                          size={64}
                        />
                      </div>
                    </td>
                    <td>
                      {history.bookingDetails
                        .map((detail) => detail.courtSlot?.codebooking || "N/A")
                        .join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

                {activeTab === 'topUpHistory' && (
                    <div className="account-section active">
                        <h2>Lịch sử nạp tiền</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã giao dịch</th>
                                    <th>Ngày nạp</th>
                                    <th>Số tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topUpHistory.map((topUp) => (
                                    <tr key={topUp.id}>
                                        <td>{topUp.transactionCode}</td>
                                        <td>{moment(topUp.topUpDate).format('DD/MM/YYYY')}</td>
                                        <td>{topUp.amount.toLocaleString()} VND</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div>
                            <strong>Tổng số tiền đã nạp: {calculateTotalRecharged().toLocaleString()} VND</strong>
                        </div>
                    </div>
                )}
            </div>

            <Modal
                title="QR Codes"
                visible={isQRCodeModalVisible}
                onOk={handleQRCodeModalCancel}
                onCancel={handleQRCodeModalCancel}
                footer={null}
            >
                {selectedQRCode && (
                    <div>
                        <QRCode value={selectedQRCode} size={128} />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserProfile;
