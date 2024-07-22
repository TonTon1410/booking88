import { Button, Input, Modal, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { CheckCircleOutlined, ClockCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { QRScanner } from "../qr";
import axios from "axios";

function CheckIn() {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [inputs, setInputs] = useState({});
  const user = useSelector(selectUser);
  console.log(user);

  const fetch = async () => {
    try {
      const response = await api.get(`/courtSlot/location/${user.idLocationStaff}`);
      setData(response.data);
      setInputs(response.data.reduce((acc, item) => ({ ...acc, [item.id]: '' }), {}));
      console.log(response.data);
    } catch (e) {
      console.error("Error fetching data:", e);
    }
  };

  const handleInputChange = (id, value) => {
    setInputs((prevInputs) => ({ ...prevInputs, [id]: value }));
  };

  const handleSend = async (id) => {
    try {
      const response = await axios.put(`http://157.230.43.225:8080/api/booking/Checking/${id}`, null, {
        params: { code: inputs[id] },
      });
      console.log(`Response from API for id: ${id}`, response.data);
      message.success('Check-in successful');
      fetch(); // Refresh the data after successful check-in
    } catch (e) {
      console.error("Error checking in:", e);
      message.error('Check-in failed');
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
      render: (e) => e?.name,
    },
    {
      title: "Slot",
      dataIndex: "slot",
      key: "slot",
      render: (e) => e?.time,
    },
    {
      title: "Name customer",
      dataIndex: "account",
      key: "account",
      render: (e) => e?.name,
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
      key: "code",
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
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default CheckIn;
