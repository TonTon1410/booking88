import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Select, Input, DatePicker, Modal } from 'antd';
import "../CourtDetail/Index.css";
const { Option } = Select;

const CourtDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { court } = location.state || {};

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [bookingType, setBookingType] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [months, setMonths] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [flexibleBookings, setFlexibleBookings] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [bookedSlots] = useState([]);

  const fixedTimes = [
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
  ];

  if (!court) {
    return <div>Không tìm thấy thông tin sân</div>;
  }

  const handleBooking = () => {
    if (selectedDay && selectedSlot !== null) {
      const bookingInfo = {
        court,
        selectedDate,
        selectedTime: fixedTimes[selectedSlot],
        amount: 70000, // Fixed amount for the booking
      };
      navigate("/payment", { state: bookingInfo });
    }
  };

  const openModal = (date) => {
    setSelectedDay(date);
    setSelectedSlot(null); // Reset selected slot when a new date is selected
    setIsModalOpen(true);
  };

  const getWeekDates = (weekOffset = 0) => {
    const now = new Date();
    const startOfWeek = new Date(
      now.setDate(now.getDate() - now.getDay() + 1 + 7 * weekOffset)
    );
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  const weekDates = getWeekDates(currentWeek);

  const renderTimeslots = () => {
    return fixedTimes.map((time, index) => {
      const isPast = selectedDay && (selectedDay < new Date());
      const isBooked = bookedSlots.some(slot => slot.date.toDateString() === selectedDay.toDateString() && slot.time === time);
      return (
        <div
          key={index}
          className={`m-2 p-2 border rounded-lg shadow-lg ${
            selectedSlot === index ? "bg-blue-300" : "bg-blue-100"
          } ${isPast || isBooked ? "bg-gray-300 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => !isPast && !isBooked && setSelectedSlot(index)}
        >
          <p className="text-center">{time} - 70k</p>
          {isBooked && <p className="text-red-600 text-center">Đã đặt</p>}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto my-8">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <img
            className="w-full h-[70vh] object-cover rounded-lg"
            src={court.image}
            alt="Court"
          />
        </Col>
        <Col xs={24} md={12}>
          <h1 className="text-4xl font-bold mb-4">{court.name}</h1>
          <p className="text-gray-700 text-base mb-2">Khu vực: {court.address}</p>
          <p className="text-gray-700 text-base mb-2">Miêu Tả: {court.description}</p>
          <p className="text-gray-700 text-base mb-2">hotline: {court.hotline}</p>
          <p className="text-gray-700 text-base mb-2">Giá: {court.price} VNĐ</p>
          <div className="mb-4">
            <span className="text-lg font-semibold">Giờ hoạt động:</span>
            <p className="text-gray-700 text-base">
              {court.openTime} - {court.closeTime}
            </p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-4">Chọn loại lịch đặt sân</h2>
            <div className="mb-4">
              <label className="block mb-2">Loại lịch:</label>
              <Select
                className="w-full"
                value={bookingType}
                onChange={(value) => setBookingType(value)}
              >
                <Option value="">Chọn loại lịch</Option>
                <Option value="fixed">Lịch cố định</Option>
                <Option value="flexible">Lịch linh hoạt</Option>
              </Select>
            </div>
            {bookingType === "fixed" && (
              <>
                <div className="mb-4">
                  <label className="block mb-2">Chọn thứ</label>
                  <Select
                    className="w-full"
                    value={dayOfWeek}
                    onChange={(value) => setDayOfWeek(value)}
                    required
                  >
                    <Option value="">Chọn thứ</Option>
                    <Option value="Monday">Thứ Hai</Option>
                    <Option value="Tuesday">Thứ Ba</Option>
                    <Option value="Wednesday">Thứ Tư</Option>
                    <Option value="Thursday">Thứ Năm</Option>
                    <Option value="Friday">Thứ Sáu</Option>
                    <Option value="Saturday">Thứ Bảy</Option>
                    <Option value="Sunday">Chủ Nhật</Option>
                  </Select>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Chọn giờ chơi cố định</label>
                  <div className="flex flex-wrap">
                    {fixedTimes.map((time, index) => (
                      <Button
                        key={index}
                        type={selectedTime === time ? "primary" : "default"}
                        className="m-2"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Đăng ký bao nhiêu tháng</label>
                  <Input
                    type="number"
                    className="w-full"
                    value={months}
                    onChange={(e) => setMonths(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2">Bắt đầu từ ngày</label>
                  <DatePicker
                    className="w-full"
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                  />
                </div>
              </>
            )}
            {bookingType === "flexible" && (
              <div>
                <div className="mb-4">
                  <label className="block mb-2">Chọn ngày và giờ</label>
                  <div className="flex mb-2">
                    <DatePicker
                      className="w-1/2"
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                    />
                    <Select
                      className="w-1/2"
                      value={selectedTime}
                      onChange={(value) => setSelectedTime(value)}
                    >
                      <Option value="">Chọn giờ</Option>
                      {fixedTimes.map((time, index) => (
                        <Option key={index} value={time}>
                          {time}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <Button
                    type="primary"
                    className="w-full"
                    onClick={() => {
                      if (selectedDate && selectedTime) {
                        setFlexibleBookings([
                          ...flexibleBookings,
                          { date: selectedDate, time: selectedTime },
                        ]);
                        setSelectedDate(null);
                        setSelectedTime("");
                      } else {
                        alert("Vui lòng chọn ngày và thời gian trước khi thêm");
                      }
                    }}
                  >
                    Thêm ngày
                  </Button>
                </div>
                {flexibleBookings.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold mb-2">Lịch linh hoạt đã chọn</h4>
                    {flexibleBookings.map((booking, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <p className="mr-2">
                          {booking.date.toLocaleDateString()} - {booking.time}
                        </p>
                        <Button
                          type="danger"
                          onClick={() => {
                            const updatedBookings = flexibleBookings.filter(
                              (_, i) => i !== index
                            );
                            setFlexibleBookings(updatedBookings);
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="mb-4">
              <label className="block mb-2">Mã khuyến mãi</label>
              <Input
                type="text"
                className="w-full"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Nhập mã khuyến mãi"
              />
            </div>
          </div>

          <Button type="primary" className="w-full" onClick={handleBooking}>
            Đặt Sân
          </Button>
        </Col>
      </Row>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Đặt sân theo khung thời gian</h2>
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => setCurrentWeek((prev) => prev - 1)} type="primary">
            Tuần trước
          </Button>
          <h3 className="text-xl font-semibold">
            Từ ngày {weekDates[0].toLocaleDateString()} đến ngày{" "}
            {weekDates[6].toLocaleDateString()}
          </h3>
          <Button onClick={() => setCurrentWeek((prev) => prev + 1)} type="primary">
            Tuần sau
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          {weekDates.map((date, index) => (
            <Col key={index} xs={24} md={12} lg={8} xl={4}>
              <h4 className="font-bold cursor-pointer" onClick={() => openModal(date)}>
                {date.toLocaleDateString()}
              </h4>
            </Col>
          ))}
        </Row>
      </div>

      <Modal
        title={`Đặt sân vào ngày ${selectedDay ? selectedDay.toLocaleDateString() : ''}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleBooking}
      >
        {selectedDay && renderTimeslots()}
      </Modal>
    </div>
  );
};

export default CourtDetails;
