import { useState, useEffect } from 'react';
import { FaInfoCircle, FaEnvelope, FaHistory, FaWallet } from 'react-icons/fa';
import userApi from '../../api/UserProfileApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UserProfile.scss';
import { useDispatch, useSelector } from "react-redux";
import { selectUser, login } from "../../redux/features/counterSlice";
import { Button, Typography, Input, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('Recharge');
    const user = useSelector(selectUser);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const [userInfo, setUserInfo] = useState({
        name: user?.name || '',
        phone: user?.phone || '',
        email: user?.email || ''
    });

    const [amount, setAmount] = useState(0); // State to store amount
    const [rechargeAmount, setRechargeAmount] = useState(0); // State to store recharge amount
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const { Text } = Typography;
    const [bookingHistory, setBookingHistory] = useState([]);
    const dispatch = useDispatch();
    const userId = user?.id;
    const navigate = useNavigate();

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
                    setAmount(data.wallet?.amount || 0); // Set the amount
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

        if (userId && !isDataFetched) {
            fetchUserInfo();
            fetchBookingHistory();
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
        navigate('/payment', { state: { rechargeAmount } }); // Redirect to the payment page after closing the modal
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleRechargeAmountChange = (e) => {
        setRechargeAmount(Number(e.target.value));
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
                                </tr>
                            </thead>
                            <tbody>
                                {bookingHistory.map((history, index) => (
                                    <tr key={index}>
                                        <td>{history.bookingDate}</td>
                                        <td>{history.location.name}</td>
                                        <td>{history.bookingDetails.map(detail => detail.courtSlot?.slot?.time || 'N/A').join(', ')}</td>                                        <td>{history.totalPrice}</td>
                                        <td>{history.bookingType}</td>
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
                            Số dư của bạn là: {amount.toLocaleString()} VND
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
