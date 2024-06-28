import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Form, Modal, Upload } from 'antd';
import PropTypes from 'prop-types';
import api from '../config/axios';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../Dashboard/utils.jsx';

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
    });
    setCurrentRecord(record);
    setIsModalOpen(true);
    setEditingKey(record.locationId);

    setImageFileList(
      record.images ? record.images.map((img, index) => ({
        uid: index,
        name: `image${index}`,
        status: 'done',
        url: img.startsWith("data:image/") ? img : `data:image/jpeg;base64,${img}`,
        thumbUrl: img.startsWith("data:image/") ? img : `data:image/jpeg;base64,${img}`,
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

      const imagesBase64 = await Promise.all(
        imageFileList.map((file) => {
          if (file.originFileObj) {
            return getBase64(file.originFileObj);
          } else {
            return file.url;
          }
        })
      );

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row, images: imagesBase64 });
        setFields(newData);
        setEditingKey('');

        await api.put(`/updateClub/${locationId}`, {
          ...row,
          images: imagesBase64,
        });

        message.success('Cập nhật sân thành công');
      } else {
        newData.push({ ...row, images: imagesBase64 });
        setFields(newData);
        setEditingKey('');

        await api.put(`/updateClub/${locationId}`, {
          ...row,
          images: imagesBase64,
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

  const handleImageChange = ({ fileList }) => {
    setImageFileList(fileList);
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
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      editable: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      editable: true,
      render: (status) => (status === 'ACTIVE' ? 'Đang hoạt động' : 'Trống'),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'images',
      key: 'images',
      editable: true,
      render: (images) => (
        <div>
          {images && images.map((img, index) => (
            <img key={index} src={img} alt={`field-img-${index}`} style={{ width: '50px', height: '50px', marginRight: '5px' }} />
          ))}
        </div>
      ),
    },
    {
      title: 'Khuyến mãi',
      dataIndex: 'promotions',
      key: 'promotions',
      editable: true,
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
          <Form.Item
            name="price"
            label="Giá"
            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
          >
            <Input type="number" />
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
  const inputNode = inputType === 'number' ? <Input type="number" /> : <Input />;
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
