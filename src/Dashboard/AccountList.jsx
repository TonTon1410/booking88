import React, { useEffect, useState } from 'react';
import { Table, message, Button, Popconfirm } from 'antd';
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

    const handleDelete = async (id) => {
        try {
            await api.delete(`/delete-account/${id}`);
            setAccounts(accounts.filter(account => account.id !== id));
            message.success('Xóa tài khoản thành công');
        } catch (error) {
            message.error('Lỗi khi xóa tài khoản');
            console.error('Error deleting account:', error);
        }
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Tên tài khoản',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Popconfirm
                    title="Bạn có chắc chắn muốn xóa tài khoản này không?"
                    onConfirm={() => handleDelete(record.id)}
                    okText="Có"
                    cancelText="Không"
                >
                    <Button type="primary" danger>
                        Xóa
                    </Button>
                </Popconfirm>
            ),
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
