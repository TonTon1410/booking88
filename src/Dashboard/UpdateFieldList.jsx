import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Form, Modal, Upload, Image, InputNumber } from 'antd';
import PropTypes from 'prop-types';
import api from '../config/axios';

import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../Dashboard/utils.jsx';
import uploadFile from '../assets/hook/uploadFile.js';
import CreateNewField from './CreateNewField.jsx';


const UpdateFieldList = () => {
  const [fields, setFields] = useState([]);
  const [field, setField] = useState({});
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [imageFileList, setImageFileList] = useState("");
  const [showForm, setShowForm] = useState(false);
  //  const [imageUpload,setImageUpload] = useState([])
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await api.get('/admin/location');
        console.log(response.data)
        setFields(response.data);
      } catch (error) {
        // message.error('Lỗi khi lấy danh sách sân');
        console.error('Error fetching fields:', error);
      }
    };

    fetchFields();
  }, []);






  const isEditing = (record) => record.locationId === editingKey;
  const edit = (record) => {
    setField(record)

    console.log(record.photo)
    // setImageFileList(record.photo)
    form.setFieldsValue({
      ...record,
    });
    // setCurrentRecord(record);
    setIsModalOpen(true);
    // setEditingKey(record.locationId);
    // setImageFileList(
    //   record.photo ? record.photo.map((img, index) => ({
    //     uid: index,
    //     name: `image${index}`,
    //     status: 'done',
    //     url: img.startsWith("data:image/") ? img : `data:image/jpeg;base64,${img}`,
    //     thumbUrl: img.startsWith("data:image/") ? img : `data:image/jpeg;base64,${img}`,
    //   })) : []
    // );

  };

  const cancel = () => {
    setEditingKey('');
    setIsModalOpen(false);
    setCurrentRecord(null);
    setImageFileList([]);
  };

  const save = async (location) => {
    // form.submit()  
    try {
      const res = await api.put(`/location/${location.id}`, {
        name: location.name,
        description: location.description,
        address: location.address,
        hotline: location.hotline,
        // openingTime: 0,
        // closingTime: 0,
        photo: imageFileList,
      })

      setFields((oldItems) => {
        return oldItems.map(oldItem => {
          if (oldItem.id == res.data.id) {
            return res.data
          }
          else {
            return oldItem;
          }


        })

      })

      console.log("res: x", res.data)
    } catch (error) {
      console.log(error)
    }


    //     try {
    //       console.log("hi")
    //       // const row = await form.validateFields();
    //       const newData = [...fields];
    //       console.log(newData)
    //       const index = newData.findIndex((item) => locationId === item.locationId);
    // console.log(index)
    //       const imagesBase64 = await Promise.all(
    //         imageFileList.map((file) => {
    //           if (file.originFileObj) {
    //             return getBase64(file.originFileObj);
    //           } else {
    //             return file.url;
    //           }
    //         })
    //       );

    //       if (index > -1) {
    //         const item = newData[index];
    //         newData.splice(index, 1, { ...item, ...row, images: imagesBase64 });

    //         setFields(newData);
    //         setEditingKey('');

    //         await api.put(`/updateClub/${locationId}`, {
    //           ...row,
    //           images: imagesBase64,
    //         });

    //         message.success('Cập nhật sân thành công');
    //       } else {
    //         newData.push({ ...row, images: imagesBase64 });
    //         setFields(newData);
    //         setEditingKey('');

    //         await api.put(`/updateClub/${locationId}`, {
    //           ...row,
    //           images: imagesBase64,
    //         });

    //         message.success('Cập nhật sân thành công');
    //       }

    //       setIsModalOpen(false);
    //       setCurrentRecord(null);
    //       console.log("hi")
    //       setImageFileList([]);
    //       console.log("hi")
    //     } catch (err) {
    //       console.error('Error saving field:', err);
    //       // message.error('Lỗi khi cập nhật sân');
    //     }
    setIsModalOpen(false)
  };

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

  const handleImageChange = async ({ file, fileList }) => {
    const image = await uploadFile(file)
    setImageFileList(image)

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
      title: 'Hình ảnh',
      dataIndex: 'photo',
      key: 'photo',
      editable: true,
      render: (images) => (
        <Image src={images} />
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
              onClick={() => {
                setImageFileList(record.photo)
                edit(record)
              }
              }
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
              onClick={() => deleteField(record.id)}

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

      <Button onClick={() => setShowForm(true)} style={{
        width: "fit-content",
        marginBottom: "20px"

      }}>Tạo sân mới</Button>


      <Modal title="Tạo sân mới" onCancel={() => setShowForm(false)} footer={false} open={showForm}>
        <CreateNewField setFields={setFields} setShowForm={setShowForm} />
      </Modal>

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
          <Button key="save" onClick={() => form.submit()} >
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical"
          onFinish={save}
        >
          <Form.Item
            name="id"
            hidden
          />
          <Form.Item
            name="name"
            label="Tên sân"
            rules={[{ required: true, message: 'Vui lòng nhập tên sân!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Giờ mở cửa"
            name="openTime"
          >
            <InputNumber addonAfter="Giờ" />
          </Form.Item>
          <Form.Item
            label="Giờ đóng cửa"
            name="closeTime"
          >
            <InputNumber addonAfter="Giờ" />
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

            name="photo"
            label="Hình ảnh"
          >
            <Upload
              listType="picture"
              onChange={handleImageChange}
              beforeUpload={() => false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
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
