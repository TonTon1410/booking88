import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Typography, Image, Divider } from "antd";
import "../Payment/Payment.css"
const { Title, Text } = Typography;

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const court = location.state?.court;
  const selectedTime = location.state?.selectedTime;
  const selectedDate = location.state?.selectedDate;
  const name = location.state?.name;
  const email = location.state?.email;
  const bookingType = location.state?.bookingType;
  const dayOfWeek = location.state?.dayOfWeek;
  const months = location.state?.months;
  const startDate = location.state?.startDate;
  const flexibleBookings = location.state?.flexibleBookings;

  const handlePayment = (e) => {
    e.preventDefault();
    // Xử lý thanh toán tại đây
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Selected Time:", selectedTime);
    console.log("Selected Date:", selectedDate);
    console.log("Booking Type:", bookingType);
    console.log("Day of Week:", dayOfWeek);
    console.log("Months:", months);
    console.log("Start Date:", startDate);
    console.log("Flexible Bookings:", flexibleBookings);
    // Sau khi thanh toán thành công, điều hướng về trang chủ hoặc trang xác nhận
    navigate("/confirmation");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <Title level={2} className="text-center text-blue-600 mb-4">
          Thanh Toán
        </Title>
        {court && (
          <>
            <div className="mb-4">
              <Image
                src={court.image}
                alt="Court"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="mb-4">
              <Title level={3}>{court.name}</Title>
              <p>Khu vực: {court.location}</p>
              <p>Số sân: {court.courts}</p>
              <p className="text-yellow-500">
                {"★".repeat(court.rating)}
                {"☆".repeat(5 - court.rating)}
              </p>
              <p>Giá: {court.price} VND</p>
            </div>
          </>
        )}

        <Form onFinish={handlePayment}>
          <div>
            <Title level={3} className="mb-4">
              Thông tin cá nhân
            </Title>
            <Form.Item label="Tên">
              <Input value={name} readOnly />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={email} readOnly />
            </Form.Item>
            {bookingType === "fixed" && (
              <>
                <Form.Item label="Thứ">
                  <Input value={dayOfWeek} readOnly />
                </Form.Item>
                <Form.Item label="Thời gian đã chọn">
                  <Input value={selectedTime} readOnly />
                </Form.Item>
                <Form.Item label="Số tháng đăng ký">
                  <Input value={months} readOnly />
                </Form.Item>
                <Form.Item label="Ngày bắt đầu">
                  <Input value={startDate} readOnly />
                </Form.Item>
              </>
            )}
            {bookingType === "flexible" && (
              <Form.Item label="Lịch linh hoạt đã chọn">
                {flexibleBookings.map((booking, index) => (
                  <Text key={index} className="block mb-2">
                    {booking.date} - {booking.time}
                  </Text>
                ))}
              </Form.Item>
            )}
            <Divider />
            <Title level={3} className="mb-4">
              Quét mã QR để thanh toán
            </Title>
            <div className="mb-4 text-center">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/unicourse-f4020.appspot.com/o/images%2F0276bb70-990f-4092-9db3-6c5b1e175db2.jpeg?alt=media&token=a9bcfdd5-dc85-4e8d-8f49-1d009a20e73e"
                alt="QR Code"
                className="w-64 h-64 mx-auto"
              />
              <Text className="text-gray-700 mt-4">
                Vui lòng quét mã QR để thanh toán. Đợi phản hồi trong vòng 5 - 10 phút.
              </Text>
            </div>
            <div className="flex justify-between">
              <Button type="default" onClick={() => navigate(-1)}>
                Quay lại
              </Button>
              <Button type="primary" htmlType="submit">
                Thanh Toán
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default PaymentPage;
