import React, { useState } from "react";
import { Button, Form, Input, message, Upload, TimePicker } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../config/axios';
import uploadFile from '../assets/hook/uploadFile';

const CreateNewField = () => {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState([]);

  const onFinish = async (values) => {
    try {
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
        ...values,
        openTime: values.openTime.format('HH:mm'),
        closeTime: values.closeTime.format('HH:mm'),
        status: "ACTIVE",
        price: values.price || "0",
        photo: imagesURLs[0],
      };

      await api.post("/createNewClub", clubRequest);

      message.success('Thêm sân thành công');
      form.resetFields();
      setImageFileList([]);
    } catch (error) {
      message.error('Lỗi khi thêm sân');
      console.error('Error creating new field:', error.response ? error.response.data : error.message);
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

  return (
    <Form
      form={form}
      name="createNewField"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
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
        label="Giờ mở cửa"
        name="openTime"
        rules={[{ required: true, message: 'Vui lòng chọn giờ mở cửa!' }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>
      <Form.Item
        label="Giờ đóng cửa"
        name="closeTime"
        rules={[{ required: true, message: 'Vui lòng chọn giờ đóng cửa!' }]}
      >
        <TimePicker format="HH:mm" />
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
