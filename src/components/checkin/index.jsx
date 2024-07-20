import { Button, message, Modal, Table, Tag, Input, Space } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { QRScanner } from "../qr";

function CheckIn() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false); // State to handle QRScanner modal
  const [inputValues, setInputValues] = useState({}); // State to manage input values for each row
  const user = useSelector(selectUser);

  const fetchBookingDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://157.230.43.225:8080/api/booking/${user.idLocationStaff}`
      );
      console.log(response.data);

      if (Array.isArray(response.data)) {
        setBookingDetails(response.data); // Sửa lại setData thành setBookingDetails
      } else if (response.data && typeof response.data === "object") {
        setBookingDetails([response.data]); // Đảm bảo dữ liệu được xử lý dưới dạng mảng
      } else {
        console.error("Unexpected API response format:", response.data);
        message.error("Lỗi khi lấy thông tin đặt lịch");
        setBookingDetails([]); // Sửa lại setData thành setBookingDetails
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
      message.error("Lỗi khi lấy thông tin đặt lịch");
      setBookingDetails([]); // Sửa lại setData thành setBookingDetails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.idLocationStaff) {
      fetchBookingDetails();
    }
  }, [user.idLocationStaff]);

  const handleInputChange = (e, record) => {
    const { value } = e.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [record.id]: value,
    }));
  };

  const handleCheckIn = (record) => {
    const inputValue = inputValues[record.id];
    console.log(`Check-in code for booking ID ${record.id}: ${inputValue}`);
    // Bạn có thể thêm logic xử lý mã check-in ở đây
  };

  const columns = [
    {
      title: "Customer Name",
      dataIndex: ["customer", "name"],
      key: "customerName",
      render: (name) => name || "N/A", // Hiển thị "N/A" nếu name là null
    },
    {
      title: "Customer Email",
      dataIndex: ["customer", "email"],
      key: "customerEmail",
    },
    {
      title: "Location",
      dataIndex: ["location", "name"],
      key: "locationName",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Booking Date",
      dataIndex: "bookingDate",
      key: "bookingDate",
    },
    {
      title: "Thanh toán",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "SUCCESS" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "bookingDetails",
      key: "courtSlotStatus",
      render: (bookingDetails) => (
        <div style={{ flexDirection: "column" }}>
          {bookingDetails.map((detail) => {
            const status = detail.courtSlot?.status;
            return (
              <Tag
                key={detail.id}
                color={
                  status === "ACTIVE"
                    ? "green"
                    : status === "PENDING"
                    ? "blue"
                    : "red"
                }
              >
                {status}
              </Tag>
            );
          })}
        </div>
      ),
    },
    {
      title: "Booking Details",
      dataIndex: "bookingDetails",
      key: "bookingDetails",
      render: (bookingDetails) => (
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {bookingDetails.map((detail) => (
            <div key={detail.id}>
              {detail.courtSlot?.date} - {detail.courtSlot?.court?.name} -{" "}
              {detail.courtSlot?.slot?.time}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Input Code Check-in",
      key: "inputCodeCheckin",
      render: (_, record) => (
        <Space>
          <Input
            placeholder="Enter code"
            value={inputValues[record.id] || ""}
            onChange={(e) => handleInputChange(e, record)}
          />
          <Button size="small" onClick={() => handleCheckIn(record)}>
            Check-in
          </Button>
        </Space>
      ),
    },
  ];

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
      <Table
        columns={columns}
        dataSource={bookingDetails}
        rowKey="id"
        pagination={{ pageSize: 7 }}
        loading={loading}
      />
    </div>
  );
}

export default CheckIn;
