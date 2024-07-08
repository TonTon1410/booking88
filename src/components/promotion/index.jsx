import { Button, Form, Input, InputNumber, Modal, Select, Table, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

function Promotion() {
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const fetchDataPromotion = async () => {
    try {
      const response = await api.get(`/promotion/${user.idLocation}`);
      console.log(response.data);
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const onFinish = async (value) => {
    console.log(value)
    if(value.id == undefined){
      try {
        const response = await api.post(`/promotion`,value);
        console.log(response.data);
        setData([...data,response.data]);
        setShowModal(false)
      } catch (e) {
        console.log(e);
      }
    }else{
      try {
        const res = await api.put(`/promotion/${value.id}`,value)
        console.log("res: ",res.data)
        setData((oldData) =>(
          oldData.map((oldItem) => {
            if (oldItem.id == value.id) {
              return res.data;
            } else {
              return oldItem;
            }
          })
        )
       

        );
        setShowModal(false)
        console.log("data: ", data);
      } catch (error) {
        console.log(error.message)
      }
      form.resetFields()
    }
  };
  const handleDelete = async (value)=>{
    console.log("Delete: ", value)
    try {
      const res = await api.delete(`/promotion/${value.id}`)
      console.log(res.data)
      setData(data.filter(data => data.id != res.data))
    } catch (error) {
      console.log(error.message)
    }
    
  }
  const handleUpdate = async (value) => {
    form.setFieldsValue(value)
   setShowModal(true)
  };
  useEffect(() => {
    fetchDataPromotion();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "startDate",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "endDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (e) =>(
        <Tag color={e == "ACTIVE" ? "green" : "red"}>{e}</Tag>
      )
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      render: (_,value) => (
        <>
          <Button danger onClick={()=>(handleUpdate(value))     
          }>Update</Button>
          <Button
            style={{
              marginLeft: "20px",
            }}
            onClick={()=>handleDelete(value)}
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
      <Modal
      title="Mã giảm giá"
        onOk={() => form.submit()}
        onCancel={() => setShowModal(false)}
        open={showModal}
      >
        <Form
          form={form}
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
          <Form.Item name="id"></Form.Item>
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
          <Form.Item label="Status" name="status" rules={[
              {
                required: true,
                message: "Please input your Status!",
              },
            ]}>
            <Select options={[
              {
              value: "ACTIVE",
              label: "ACTIVE"
            },
              {
              value: "INACTIVE",
              label: "INACTIVE"
            },
            ]} />
          </Form.Item>
          <Form.Item
            label="Giờ mở cửa"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Please input your startDate!",
              },
            ]}
          >
            <InputNumber addonAfter="Giờ" />
          </Form.Item>
          <Form.Item
            label="Giờ đóng cửa"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Please input your endDate!",
              },
            ]}
          >
            <InputNumber addonAfter="Giờ" />
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
      <Table dataSource={data} columns={columns}></Table>
    </div>
  );
}

export default Promotion;
