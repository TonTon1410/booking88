import { Button, Form, Input, DatePicker, Modal, Table, Tag, InputNumber, Popconfirm } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import moment from "moment";
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
    const startDate = value.startDate;
    const endDate = value.endDate;

    // Check if start date is after end date
    if (startDate.isAfter(endDate)) {
      form.setFields([
        {
          name: 'startDate',
          errors: ['Ngày bắt đầu phải nhỏ hơn ngày kết thúc!'],
        },
        {
          name: 'endDate',
          errors: ['Ngày kết thúc phải lớn hơn ngày bắt đầu!'],
        },
      ]);
      return;
    }

    const formattedValue = {
      ...value,
      startDate: startDate.format("DD/MM/YYYY"),
      endDate: endDate.format("DD/MM/YYYY"),
      status: "ACTIVE",
    };

    if (value.id === undefined) {
      try {
        const response = await api.post(`/promotion`, formattedValue);
        console.log(response.data);
        setData([...data, response.data]);
        setShowModal(false);
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const res = await api.put(`/promotion/${value.id}`, formattedValue);
        console.log("res: ", res.data);
        setData((oldData) =>
          oldData.map((oldItem) => {
            if (oldItem.id === value.id) {
              return res.data;
            } else {
              return oldItem;
            }
          })
        );
        setShowModal(false);
        console.log("data: ", data);
      } catch (error) {
        console.log(error.message);
      }
      form.resetFields();
    }
  };

  const handleDelete = async (value) => {
    console.log("Delete: ", value);
    try {
      const res = await api.delete(`/promotion/${value.id}`);
      console.log(res.data);
      setData(data.filter((data) => data.id !== value.id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = async (value) => {
    form.setFieldsValue({
      ...value,
      startDate: moment(value.startDate, "DD/MM/YYYY"),
      endDate: moment(value.endDate, "DD/MM/YYYY"),
    });
    setShowModal(true);
  };

  useEffect(() => {
    fetchDataPromotion();
  }, []);

  const disabledStartDate = (current) => {
    return current && current < moment().startOf('day');
  };

  const disabledEndDate = (current) => {
    const startDate = form.getFieldValue('startDate');
    if (!startDate) {
      return current && current < moment().startOf('day');
    }
    return current && (current < moment().startOf('day') || current <= moment(startDate).startOf('day'));
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Giảm giá(%)",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (e) => <Tag color={e === "ACTIVE" ? "green" : "red"}>{e}</Tag>,
    },
    {
      title: "Action",
      dataIndex: "address",
      key: "address",
      render: (_, value) => (
        <>
          <Button danger onClick={() => handleUpdate(value)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa mã giảm giá này không?"
            onConfirm={() => handleDelete(value)}
            okText="Có"
            cancelText="Không"
          >
            <Button
              style={{
                marginLeft: "20px",
                
              }}
            >
              Xóa
            </Button>
          </Popconfirm>
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
        afterClose={() => form.resetFields()}
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
          <Form.Item name="id" hidden></Form.Item>
          <Form.Item
            label="Code"
            name="code"
            rules={[
              {
                required: true,
                message: "Hãy nhập tên của mã giảm giá!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày bắt đầu"
            name="startDate"
            rules={[
              {
                required: true,
                message: "Hãy nhập ngày bắt đầu!",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" disabledDate={disabledStartDate} />
          </Form.Item>
          <Form.Item
            label="Ngày kết thúc"
            name="endDate"
            rules={[
              {
                required: true,
                message: "Hãy nhập ngày kết thúc!",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" disabledDate={disabledEndDate} />
          </Form.Item>
          <Form.Item
            label="Giảm giá(%)"
            name="discount"
            rules={[
              {
                required: true,
                message: "Hãy nhập số % giảm giá!",
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
