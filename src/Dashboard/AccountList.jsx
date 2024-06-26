import React, { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import api from '../config/axios';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await api.get('/getAll');
                setAccounts(response.data);
            } catch (error) {
                message.error('Lỗi khi lấy danh sách tài khoản');
                console.error('Error fetching accounts:', error);
            }
        };

        fetchAccounts();
    }, []);

    const columns = [
        {
            title: 'Tên tài khoản',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
    ];

    return (
        <Table
            dataSource={accounts}
            columns={columns}
            rowKey="id"
            bordered
        />
    );
};

export default AccountList;
