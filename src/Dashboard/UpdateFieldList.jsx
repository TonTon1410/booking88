import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Form, TimePicker, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import api from '../config/axios';
import moment from 'moment';

const { Option } = Select;

const UpdateFieldList = () => {
  const [fields, setFields] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

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
      openTime: record.openTime ? moment(record.openTime, 'HH:mm:ss') : null,
      closeTime: record.closeTime ? moment(record.closeTime, 'HH:mm:ss') : null
    });
    setCurrentRecord(record);
    setIsModalOpen(true);
    setEditingKey(record.locationId);
  };

  const cancel = () => {
    setEditingKey('');
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const save = async (locationId) => {
    try {
      const row = await form.validateFields();
      const newData = [...fields];
      const index = newData.findIndex((item) => locationId === item.locationId);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setFields(newData);
        setEditingKey('');
        await api.put(`/updateClub/${locationId}`, {
          ...row,
          openTime: row.openTime ? row.openTime.format('HH:mm:ss') : null,
          closeTime: row.closeTime ? row.closeTime.format('HH:mm:ss') : null,
        });
        message.success('Cập nhật sân thành công');
      } else {
        newData.push(row);
        setFields(newData);
        setEditingKey('');
        await api.put(`/updateClub/${locationId}`, {
          ...row,
          openTime: row.openTime ? row.openTime.format('HH:mm:ss') : null,
          closeTime: row.closeTime ? row.closeTime.format('HH:mm:ss') : null,
        });
        message.success('Cập nhật sân thành công');
      }
      setIsModalOpen(false);
      setCurrentRecord(null);
    } catch (err) {
      console.error('Error saving field:', err);
      message.error('Lỗi khi cập nhật sân');
    }
  };

  const deleteField = async (locationId) => {
    try {
      await api.delete(`/deleta-club/${locationId}`);
      setFields(fields.filter(item => item.locationId !== locationId));
      message.success('Xóa sân thành công');
    } catch (err) {
      console.error('Error deleting field:', err);
      message.error('Lỗi khi xóa sân');
    }
  };

  const columns = [
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
    // {
    //   title: 'Giờ mở cửa',
    //   dataIndex: 'openTime',
    //   key: 'openTime',
    //   editable: true,
    //   render: (text) => text ? moment(text, 'HH:mm:ss').format('HH:mm:ss') : '',
    // },
    // {
    //   title: 'Giờ đóng cửa',
    //   dataIndex: 'closeTime',
    //   key: 'closeTime',
    //   editable: true,
    //   render: (text) => text ? moment(text, 'HH:mm:ss').format('HH:mm:ss') : '',
    // },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render: (text) => text || 'ACTIVE',
    },
    
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      editable: true,
      render: (text) => Array.isArray(text) ? text.map(img => img.image).join(', ') : '',
    },
    {
      title: 'Khuyến mãi',
      dataIndex: 'promotions',
      key: 'promotions',
      editable: true,
      render: (text) => Array.isArray(text) ? text.map(promo => `${promo.discount}%`).join(', ') : '',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      // onCell: (record) => ({
      //   record,
      //   inputType: col.dataIndex === 'openTime' || col.dataIndex === 'closeTime' ? 'time' : 'text',
      //   dataIndex: col.dataIndex,
      //   title: col.title,
      //   editing: isEditing(record),
      // }),
    };
  });

  return (
    <>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={fields}
          columns={mergedColumns}
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
          {/* <Form.Item
            name="openTime"
            label="Giờ mở cửa"
            rules={[{ required: true, message: 'Vui lòng chọn giờ mở cửa!' }]}
          >
            <TimePicker format="HH:mm:ss" />
          </Form.Item>
          <Form.Item
            name="closeTime"
            label="Giờ đóng cửa"
            rules={[{ required: true, message: 'Vui lòng chọn giờ đóng cửa!' }]}
          >
            <TimePicker format="HH:mm:ss" />
          </Form.Item> */}
          {/* <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select>
              <Option value="ACTIVE">Đang hoạt động</Option>
              <Option value="INACTIVE">Đang trống</Option>
            </Select>
          
          </Form.Item> */}
          <Form.Item
            name="images"
            label="Hình ảnh"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="promotions"
            label="Khuyến mãi"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'time' ? <TimePicker format='HH:mm:ss' /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Vui lòng nhập ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

EditableCell.propTypes = {
  editing: PropTypes.bool.isRequired,
  dataIndex: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  inputType: PropTypes.string.isRequired,
  record: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.node,
};

export default UpdateFieldList;
