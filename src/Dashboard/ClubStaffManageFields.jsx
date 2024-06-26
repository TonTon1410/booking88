import React, { useEffect, useState } from 'react';
import { Table, Switch, message, Card } from 'antd';
import api from '../config/axios';

const ClubStaffManageFields = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/getAllClub');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = async (fieldId, currentStatus) => {
        try {
            await api.put(`/updateClub/${fieldId}`, {
                status: currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
            });
            setData(prevData =>
                prevData.map(field =>
                    field.locationId === fieldId
                        ? { ...field, status: currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
                        : field
                )
            );
            message.success('Trạng thái sân đã được cập nhật');
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Lỗi khi cập nhật trạng thái sân');
        }
    };

    const columns = [
        {
            title: 'Tên sân',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Hotline',
            dataIndex: 'hotline',
            key: 'hotline',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Switch
                    checked={status === 'ACTIVE'}
                    onChange={() => handleStatusChange(record.locationId, status)}
                />
            ),
        },
    ];

    return (
        <Card title="Quản lý sân">
            <Table columns={columns} dataSource={data} rowKey="locationId" />
        </Card>
    );
};

export default ClubStaffManageFields;
