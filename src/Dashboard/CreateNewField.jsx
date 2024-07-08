import React, { useState } from "react";
import { Button, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../config/axios';
import uploadFile from '../assets/hook/uploadFile.js';

const CreateNewField = () => {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      // Upload image files and get their URLs
      const imagesURLs = await Promise.all(
        imageFileList.map(async (file) => {
          if (!file.url) {
            const imageUrl = await uploadFile(file.originFileObj);
            return imageUrl;
          }
          return file.url;
        })
      );

      const clubRequest = {
        name: values.name,
        description: values.description,
        address: values.address,
        hotline: values.hotline,
        status: "ACTIVE",
        price: values.price || "0", // Assuming price is required and defaulting to "0"
        photo: imagesURLs[0],
      };

      console.log('Sending request:', clubRequest); // Log request for debugging

      await api.post("/createNewClub", clubRequest);

      message.success('Thêm sân thành công');
      form.resetFields();
      setImageFileList([]);
    } catch (error) {
      message.error('Lỗi khi thêm sân');
      console.error('Error creating new field:', error.response ? error.response.data : error.message);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

  return (
    <Form
      form={form}
      name="createNewField"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tên sân"
        name="name"
        rules={[{ required: true, message: 'Vui lòng nhập tên sân!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Mô tả"
        name="description"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Địa chỉ"
        name="address"
        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hotline"
        name="hotline"
        rules={[{ required: true, message: 'Vui lòng nhập hotline!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Giá"
        name="price"
        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Hình ảnh"
        name="images"
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Tạo Sân
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewField;
