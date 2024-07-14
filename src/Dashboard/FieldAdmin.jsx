import React, { useEffect, useState } from 'react';
import { Table, Button, message, Form, Modal } from 'antd';
import api from '../config/axios';
import CreateNewField from './CreateNewField.jsx';

const FieldAdmin = () => {
  const [fields, setFields] = useState([]);
  const [form] = Form.useForm();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get('/admin/location');
        console.log(response.data)
        setFields(response.data);
      } catch (error) {
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, []);

  const deleteField = async (locationId) => {
    try {
      await api.delete(`/location/${locationId}`);
      setFields(fields.filter((item) => item.id !== locationId));
      message.success('Xóa sân thành công');
    } catch (err) {
      console.error('Error deleting field:', err);
      message.error('Lỗi khi xóa sân');
    }
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      editable: true,
    },
    {
      title: 'Tên sân',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      editable: true,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: 'Hotline',
      dataIndex: 'hotline',
      key: 'hotline',
      editable: true,
    },
    {
      title: 'Giờ mở cửa',
      dataIndex: 'openTime',
      key: 'openTime',
      editable: true,
    },
    {
      title: 'Giờ đóng cửa',
      dataIndex: 'closeTime',
      key: 'closeTime',
      editable: true,
    },
    {
      title: 'Giá mỗi slot',
      dataIndex: 'priceSlot',
      key: 'priceSlot',
      editable: true,
    },
    {
        title: 'Tên chủ sân',
        dataIndex: ['owner', 'name'],
        key: 'ownerName',
        editable: true,
      },
    {
      title: 'Hình ảnh',
      dataIndex: 'photo',
      key: 'photo',
      editable: true,
      render: (images) => (
        <img src={images} alt="Field" style={{ width: '100px' }} />
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render: (status) => (status === 'ACTIVE' ? 'Đang hoạt động' : 'Trống'),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              style={{
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
                color: '#fff',
              }}
              danger
              onClick={() => deleteField(record.id)}
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Button
        onClick={() => setShowForm(true)}
        style={{
          width: 'fit-content',
          marginBottom: '20px'
        }}
      >
        Tạo sân mới
      </Button>

      <Modal
        title="Tạo sân mới"
        onCancel={() => setShowForm(false)}
        footer={false}
        open={showForm}
      >
        <CreateNewField setFields={setFields} setShowForm={setShowForm} />
      </Modal>

      <Table
        bordered
        dataSource={fields}
        columns={columns}
        rowKey="id"
      />
    </>
  );
};

export default FieldAdmin;
