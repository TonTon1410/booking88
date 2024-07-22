import { Button, Input, Modal, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { QRScanner } from "../qr";

function CheckIn() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({}); // State to manage input values
  const user = useSelector(selectUser);
console.log(user);
  const fetch = async () => {
    try {
      const response = await api.get(
        `/courtSlot/location/${user.idLocationStaff}`
      );
      setData(response.data);
      setInputs(response.data.reduce((acc, item) => ({ ...acc, [item.id]: '' }), {})); 
      console.log(data)
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const handleSend = async (id) => {
    try {
      const response = await api.put(`/booking/checking/${id}`, null, {
        params: { code: inputs[id] }, 
      });
      console.log(`Response from API for id: ${id}`, response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Court",
      dataIndex: "court",
      key: "court",
      render: (e) => e.name,
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (e) => e.time,
    },
    {
      title: "Name customer",
      dataIndex: "account",
      key: "account",
      render: (e) => e.name,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (e) => (
        <Tag
          icon={
            e === "PENDING" ? (
              <ClockCircleOutlined />
            ) : e === "ACTIVE" ? (
              <SyncOutlined spin />
            ) : (
              <CheckCircleOutlined />
            )
          }
          color={
            e === "INACTIVE"
              ? "rgb(255, 153, 0)"
              : e === "ACTIVE"
              ? "#87d068"
              : "#108ee9"
          }
        >
          {e === "INACTIVE" ? "Done" : e === "ACTIVE" ? "PLAYING" : e}
        </Tag>
      ),
    },
    {
      title: "Code",
      key: "Code",
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input
            style={{ marginRight: '8px', width: '120px' }}
            value={inputs[record.id]}
            onChange={(e) => handleInputChange(record.id, e.target.value)}
            placeholder="Enter value"
          />
          <Button
            type="primary"
            onClick={() => handleSend(record.id)}
          >
            Gửi
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <Button
        style={{
          marginBottom: "20px",
        }}
        onClick={() => setShow(true)}
      >
        Check in
      </Button>
      <Modal
        footer={[
          <Button onClick={() => setShow(false)} key="OK" type="primary">
            OK
          </Button>,
        ]}
        open={show}
      >
        <QRScanner />
      </Modal>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default CheckIn;
