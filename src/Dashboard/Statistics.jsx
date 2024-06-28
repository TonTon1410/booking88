import React, { useEffect, useState } from 'react';
import { Table, Card, message } from 'antd';
import api from '../config/axios';

const Statistics = () => {
    const [bookingData, setBookingData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [userBookingData, setUserBookingData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Giả sử các API để lấy dữ liệu thống kê là
                // /get-booking-statistics, /get-revenue-statistics, /get-user-booking-statistics
                const bookingResponse = await api.get('/get-booking-statistics');
                const revenueResponse = await api.get('/get-revenue-statistics');
                const userBookingResponse = await api.get('/get-user-booking-statistics');

                setBookingData(bookingResponse.data);
                setRevenueData(revenueResponse.data);
                setUserBookingData(userBookingResponse.data);
            } catch (error) {
                console.error('Error fetching statistics data:', error);
                message.error('Lỗi khi lấy dữ liệu thống kê');
            }
        };

        fetchData();
    }, []);

    const bookingColumns = [
        { title: 'Sân', dataIndex: 'field', key: 'field' },
        { title: 'Lượt đặt', dataIndex: 'bookings', key: 'bookings' },
    ];

    const revenueColumns = [
        { title: 'Sân', dataIndex: 'field', key: 'field' },
        { title: 'Doanh thu', dataIndex: 'revenue', key: 'revenue' },
    ];

    const userBookingColumns = [
        { title: 'User', dataIndex: 'user', key: 'user' },
        { title: 'Lượt đặt', dataIndex: 'bookings', key: 'bookings' },
    ];

    return (
        <div>
            <Card title="Thống kê lượt đặt sân">
                <Table columns={bookingColumns} dataSource={bookingData} rowKey="field" />
            </Card>
            <Card title="Thống kê doanh thu" style={{ marginTop: 20 }}>
                <Table columns={revenueColumns} dataSource={revenueData} rowKey="field" />
            </Card>
            <Card title="Thống kê lượt đặt sân của user" style={{ marginTop: 20 }}>
                <Table columns={userBookingColumns} dataSource={userBookingData} rowKey="user" />
            </Card>
        </div>
    );
};

export default Statistics;
