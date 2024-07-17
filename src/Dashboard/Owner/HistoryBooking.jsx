import { useEffect, useState } from "react";
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
          // Sort the booking details by booking date in descending order
          const sortedData = response.data.sort((a, b) => b.id - a.id);
          setBookingDetails(sortedData);
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
    // {
    //   title: "Booking ID",
    //   dataIndex: "id",
    //   key: "id",
    // },
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
                color={status === "ACTIVE" ? "green" : "red"}
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
  ];

  return (
    <Table
      columns={columns}
      dataSource={bookingDetails}
      rowKey="id"
      pagination={{ pageSize: 7 }}
      loading={loading}
    />
  );
};

export default HistoryBooking;
