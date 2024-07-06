import { Button, Form, Input, InputNumber, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";

function Promotion() {
  const [showModal, setShowModal] = useState(false);
    const [form] = useForm()
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      render: (id) => (
        <>
          <Button danger>Update</Button>
          <Button
            style={{
              marginLeft: "20px",
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button onClick={() => setShowModal(true)}>Thêm mã giảm giá mới</Button>
      <Modal onOk={() => form.submit()} onCancel={() => setShowModal(false)} open={showModal}>
        <Form
        form = {form}
        onFinish={onFinish}
          name="basic"
          labelCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your Code!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your discount!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={dataSource} columns={columns}></Table>
    </div>
  );
}

export default Promotion;
