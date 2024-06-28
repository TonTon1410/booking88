import React from "react";
import { Button, Form, Input, message } from 'antd';
import api from '../config/axios';

const CreateNewField = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await api.post("/createNewClub", {
        name: values.name,
        description: values.description,
        address: values.address,
        hotline: values.hotline
      });
      message.success('Thêm sân thành công');
      form.resetFields();
    } catch (error) {
      message.error('Lỗi khi thêm sân');
      console.error('Error creating new field:', error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Tạo Sân
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CreateNewField;
