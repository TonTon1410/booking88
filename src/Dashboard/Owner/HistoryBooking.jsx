import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, message } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";

const HistoryBooking = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector(selectUser);
  console.log(user);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://157.230.43.225:8080/api/booking/owner/${user.id}`
        );
        console.log("API Response:", response); // Debug: log the full API response

        if (Array.isArray(response.data)) {
          setBookingDetails(response.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          message.error("Lỗi khi lấy thông tin đặt lịch");
        }
      } catch (error) {
        console.error("Error fetching booking details:", error);
        message.error("Lỗi khi lấy thông tin đặt lịch");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [user.id]);

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: ["customer", "name"],
      key: "customerName",
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "SUCCESS" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Booking Details",
      dataIndex: "bookingDetails",
      key: "bookingDetails",
      render: (bookingDetails) => (
        <ul>
          {bookingDetails.map((detail) => (
            <li key={detail.id}>
              {detail.courtSlot?.court?.name} - {detail.courtSlot?.slot?.time}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={bookingDetails}
      rowKey="id"
      pagination={{ pageSize: 5 }}
      loading={loading}
    />
  );
};

export default HistoryBooking;
