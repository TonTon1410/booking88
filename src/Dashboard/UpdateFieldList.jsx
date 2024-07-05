import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Form, Modal, Upload, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../config/axios';
import uploadFile from '../assets/hook/uploadFile';
import dayjs from 'dayjs';

const UpdateFieldList = () => {
  const [fields, setFields] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [imageFileList, setImageFileList] = useState([]);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get('/getAllClub');
        setFields(response.data);
      } catch (error) {
        message.error('Lỗi khi lấy danh sách sân');
        console.error('Error fetching fields:', error);
      }
    };
    fetchFields();
  }, []);

  const isEditing = (record) => record.locationId === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
      openTime: record.openTime ? dayjs(record.openTime, 'HH:mm') : null,
      closeTime: record.closeTime ? dayjs(record.closeTime, 'HH:mm') : null,
    });
    setCurrentRecord(record);
    setIsModalOpen(true);
    setEditingKey(record.locationId);

    setImageFileList(
      record.images ? record.images.map((img, index) => ({
        uid: index,
        name: `image${index}`,
        status: 'done',
        url: img,
        thumbUrl: img,
      })) : []
    );
  };

  const cancel = () => {
    setEditingKey('');
    setIsModalOpen(false);
    setCurrentRecord(null);
    setImageFileList([]);
  };

  const save = async (locationId) => {
    try {
      const row = await form.validateFields();
      const newData = [...fields];
      const index = newData.findIndex((item) => locationId === item.locationId);

      const imagesURLs = await Promise.all(
        imageFileList.map(async (file) => {
          if (!file.url) {
            const imageUrl = await uploadFile(file.originFileObj);
            return imageUrl;
          }
          return file.url;
        })
      );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, images: imagesURLs });
        setFields(newData);
        setEditingKey('');

        await api.put(`/updateClub/${locationId}`, {
          ...row,
          images: imagesURLs,
          openTime: row.openTime ? row.openTime.format('HH:mm') : null,
          closeTime: row.closeTime ? row.closeTime.format('HH:mm') : null,
        });

        message.success('Cập nhật sân thành công');
      } else {
        newData.push({ ...row, images: imagesURLs });
        setFields(newData);
        setEditingKey('');

        await api.put(`/updateClub/${locationId}`, {
          ...row,
          images: imagesURLs,
          openTime: row.openTime ? row.openTime.format('HH:mm') : null,
          closeTime: row.closeTime ? row.closeTime.format('HH:mm') : null,
        });

        message.success('Cập nhật sân thành công');
      }

      setIsModalOpen(false);
      setCurrentRecord(null);
      setImageFileList([]);
    } catch (err) {
      console.error('Error saving field:', err);
      message.error('Lỗi khi cập nhật sân');
    }
  };

  const deleteField = async (locationId) => {
    try {
      await api.delete(`/delete-club/${locationId}`);
      setFields(fields.filter((item) => item.locationId !== locationId));
      message.success('Xóa sân thành công');
    } catch (err) {
      console.error('Error deleting field:', err);
      message.error('Lỗi khi xóa sân');
    }
  };

  const handleImageChange = async ({ fileList }) => {
    const updatedFileList = await Promise.all(
      fileList.map(async (item) => {
        if (item.originFileObj && !item.url) {
          const imageUrl = await uploadFile(item.originFileObj);
          return {
            ...item,
            url: imageUrl,
            thumbUrl: imageUrl,
            status: 'done'
          };
        }
        return item;
      })
    );
    setImageFileList(updatedFileList);
  };

  const columns = [
    {
      title: 'Tên sân',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
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
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Giờ mở cửa',
      dataIndex: 'openTime',
      key: 'openTime',
      render: (time) => time && dayjs(time, 'HH:mm').format('HH:mm'),
    },
    {
      title: 'Giờ đóng cửa',
      dataIndex: 'closeTime',
      key: 'closeTime',
      render: (time) => time && dayjs(time, 'HH:mm').format('HH:mm'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status === 'ACTIVE' ? 'Đang hoạt động' : 'Trống'),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div>
          {images && images.map((img, index) => (
            <img key={index} src={img} alt={`field-img-${index}`} style={{ width: '50px', height: '50px', marginRight: '5px' }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <Button
              style={{
                backgroundColor: '#1890ff',
                borderColor: '#1890ff',
                color: '#fff',
              }}
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Sửa
            </Button>
            <Button
              style={{
                backgroundColor: '#ff4d4f',
                borderColor: '#ff4d4f',
                color: '#fff',
              }}
              danger
              onClick={() => deleteField(record.locationId)}
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
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={fields}
          columns={columns}
          rowClassName="editable-row"
          rowKey="locationId"
          pagination={{ onChange: cancel }}
        />
      </Form>

      <Modal
        title="Sửa thông tin sân"
        visible={isModalOpen}
        onCancel={cancel}
        footer={[
          <Button key="cancel" onClick={cancel}>
            Hủy
          </Button>,
          <Button key="save" type="primary" onClick={() => save(currentRecord?.locationId)}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Tên sân"
            rules={[{ required: true, message: 'Vui lòng nhập tên sân!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="hotline"
            label="Hotline"
            rules={[{ required: true, message: 'Vui lòng nhập hotline!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="openTime"
            label="Giờ mở cửa"
            rules={[{ required: true, message: 'Vui lòng chọn giờ mở cửa!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="closeTime"
            label="Giờ đóng cửa"
            rules={[{ required: true, message: 'Vui lòng chọn giờ đóng cửa!' }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            name="images"
            label="Hình ảnh"
          >
            <Upload
              listType="picture"
              fileList={imageFileList}
              onChange={handleImageChange}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateFieldList;
