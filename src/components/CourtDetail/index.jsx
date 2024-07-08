import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Button, Select, Input, DatePicker, Modal, Calendar, message } from 'antd';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../config/firebase";
import api from '../../config/axios';
import "../CourtDetail/Index.css";
import moment from "moment";
import MyCalendar from "../calendar";
const { Option } = Select;

const CourtDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams()
  const [court, setCourt] = useState()

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [bookingType, setBookingType] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [months, setMonths] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [flexibleBookings, setFlexibleBookings] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotTimes, setSlotTimes] = useState([]);
  const [slotPrices, setSlotPrices] = useState([]);
  const [slotPrice, setSlotPrice] = useState([]); // Default price if not fetched
  const [imageSrc, setImageSrc] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([])
  const [selectedDays, setSelectedDays] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false)
  const [slots, setSlots] = useState([])

  const handleChange = (selectedValues) => {
    setSelectedDays(selectedValues);
  };

  const handleDeselect = (removedValue) => {
    setSelectedDays(selectedDays.filter(day => day !== removedValue));
  };

  useEffect(() => {
    // Fetch slot times and prices from API
    const fetchSlotData = async () => {
      try {
        const response = await api.get(`/court/${id}`); // Replace with your API endpoint
        setSlots(response.data.location.slots)
        setCourt(response.data)
      } catch (error) {
        console.error('Error fetching slot data:', error);
      }
    };

    // const fetchImage = async () => {
    //   try {
    //     const imageRef = ref(storage, court.photo); // court.image là tên file trên Firebase Storage
    //     const imageUrl = await getDownloadURL(imageRef);
    //     setImageSrc(imageUrl);
    //   } catch (error) {
    //     console.error("Error fetching image from Firebase Storage:", error);
    //   }
    // };

    fetchSlotData();
  }, [id]);

  if (!court) {
    return <div>Không tìm thấy thông tin sân</div>;
  }

  const getBookingDetailOfFixed = (days, duration, startFrom, slot) => {
    // days = ['Monday', 'Tuesday'];

    // duration = 60; // days

    // startFrom = new Date('10/10/2024');

    // slot = 'Test';

    const bookingDetail = [];

    // Function to check if a day is in the given days array
    const isInDays = (date) => {
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days.includes(dayNames[date.getDay()]);
    }

    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startFrom);
      currentDate.setDate(currentDate.getDate() + i);

      if (isInDays(currentDate)) {
        bookingDetail.push({
          date: `${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()}`,
          time: getLableSlot(selectedTime),
          slot: slot
        });
      }
    }

    return bookingDetail;
  }

  function getDaysDuration(startDate, durationInMonths) {
    // Parse the start date
    const start = new Date(startDate);

    // Create a new date object for the end date
    const end = new Date(start);

    // Add the specified number of months to the end date
    end.setMonth(end.getMonth() + durationInMonths);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = end - start;

    // Convert milliseconds to days
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.round(diffInMilliseconds / millisecondsPerDay);

    return diffInDays;
  }

  const handleShowConfirm = () => {
    console.log(selectedDate, selectedTime)

    if (bookingType === 'now') {
      console.log(moment(selectedDate.$d).format('MM/DD/YYYY'))
      setBookingDetails([{
        date: moment(selectedDate.$d).format('MM/DD/YYYY'),
        time: getLableSlot(selectedTime)
      }])
    } else if (bookingType === 'flexible') {
      setBookingDetails(flexibleBookings.map(item => ({
        date: moment(item.date.$d).format('MM/DD/YYYY'),
        time: getLableSlot(item.time)
      })))
    } else {
      const month = getDaysDuration(startDate, Number(months))
      setBookingDetails(getBookingDetailOfFixed(selectedDays, month, startDate, 'test'))
    }

    console.table(bookingDetails)

    setShowConfirm(true);
  }

  const handleBooking = () => {
    if (selectedDay && selectedSlots.length > 0) {
      const bookingInfo = {
        court,
        selectedDate: selectedDay,
        selectedSlots,
        totalAmount: selectedSlots.length * slotPrice,
        selectedTimes: selectedSlots.map(slot => slotTimes[slot]),
      };
      if (bookingType === "flexible" && totalSlots < 20) {
        message.error("Bạn phải đăng ký ít nhất 20 giờ chơi.");
        return;
      }
      navigate("/payment", { state: bookingInfo });
    }
  };

  const openModal = (date) => {
    setSelectedDay(date);
    setSelectedSlots([]); // Reset selected slots when a new date is selected
    setIsModalOpen(true);
  };

  const getWeekDates = (weekOffset = 0) => {
    const now = new Date();
    window.scrollTo(0, 0);
    const startOfWeek = new Date(
      now.setDate(now.getDate() - now.getDay() + 1 + 7 * weekOffset)
    );
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return date;
    });
  };

  function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().startOf('day');
  }

  const getLableSlot = (id) => {
    return slots.filter(item => item.id === id)[0].time
  }

  const weekDates = getWeekDates(currentWeek);

  const renderTimeslots = () => {
    const now = new Date();

    return slotTimes.map((time, index) => {
      const slotTime = new Date(selectedDay);
      slotTime.setHours(time);
      slotTime.setMinutes(0);
      slotTime.setSeconds(0);

      const isPast = selectedDay && (selectedDay < new Date(now.setHours(0, 0, 0, 0)) || (selectedDay.toDateString() === now.toDateString() && slotTime <= now));
      const isBooked = bookedSlots.some(slot => slot.date.toDateString() === selectedDay.toDateString() && slot.time === time);
      const isSelected = selectedSlots.includes(index);

      const handleClick = () => {
        if (!isPast && !isBooked) {
          if (isSelected) {
            setSelectedSlots(selectedSlots.filter(slot => slot !== index));
          } else {
            setSelectedSlots([...selectedSlots, index]);
          }
        }
      };

      return (
        <div
          key={index}
          className={`m-2 p-2 border rounded-lg shadow-lg ${isSelected ? "bg-blue-300" : "bg-blue-100"
            } ${isPast || isBooked ? "bg-gray-300 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={handleClick}
        >
          <p className="text-center">{time} - {slotPrices[index]} VNĐ</p>
          {isBooked && <p className="text-red-600 text-center">Đã đặt</p>}
        </div>
      );
    });
  };

  return (
    <div className="container mx-auto my-8">
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <div className="court-card">
            {imageSrc ? (
              <img src={imageSrc} alt={court.name} />
            ) : (
              <p>No image available</p>
            )}
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <h1 className="text-4xl font-bold mb-4">{court.name}</h1>
          <p className="text-gray-700 text-base mb-2">Khu vực: {court.address}</p>
          <p className="text-gray-700 text-base mb-2">Miêu tả: {court.description}</p>
          <p className="text-gray-700 text-base mb-2">Hotline: {court.hotline}</p>
          <p className="text-gray-700 text-base mb-2">Giá: {court.price} VNĐ</p>
          <div className="mb-4">
            <span className="text-lg font-semibold">Giờ hoạt động:</span>
            <p className="text-gray-700 text-base">
              {court.openTime} - {court.closeTime}
            </p>
          </div>
        </Col>
        <Col xs={24} md={12}>
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
                <Option value="now">Lịch ngay</Option>
              </Select>
            </div>

            {bookingType === "fixed" && (
              <>
                <div className="mb-4">
                  <label className="block mb-2">Chọn thứ</label>
                  <Select
                    className="w-full"
                    mode="multiple"
                    value={selectedDays}
                    onChange={handleChange}
                    onDeselect={handleDeselect}
                    placeholder="Chọn thứ"
                    required
                  >
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
                  <label className="block mb-2">Chon slot</label>
                  <Select
                    className="w-100 d-block "
                    defaultValue={"Select slot"}
                    value={selectedTime}
                    onChange={(value) => setSelectedTime(value)}
                    options={slots.map(item => ({
                      value: item.id,
                      label: item.time,
                      disabled: item.status === 'INACTIVE'
                    }))}
                  />
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

            {(bookingType === "flexible" || bookingType === 'now') && (
              <div>
                {
                  bookingType === 'flexible' && <div className="mb-4">
                    <label className="block mb-2">Số giờ đăng ký trong 1 tháng (ít nhất 20 giờ)</label>

                    <Input
                      type="number"
                      className="w-full"
                      value={totalSlots}
                      onChange={(e) => setTotalSlots(e.target.value)}
                      required
                    />
                  </div>
                }
                <div className="mb-4">
                  <label className="block mb-2">Chọn ngày và giờ</label>
                  <div className="flex mb-2">
                    <DatePicker
                      disabledDate={disabledDate}
                      className="w-1/2"
                      value={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                    />
                    <Select
                      className="w-1/2"
                      defaultValue={"Select slot"}
                      value={selectedTime}
                      onChange={(value) => setSelectedTime(value)}
                      options={slots.map(item => ({
                        value: item.id,
                        label: item.time,
                        disabled: item.status === 'INACTIVE'
                      }))}
                    />
                  </div>
                  {bookingType !== 'now' && <Button
                    type="primary"
                    className="w-full"
                    onClick={() => {
                      if (selectedDate && selectedTime) {
                        setFlexibleBookings([
                          ...flexibleBookings,
                          { date: selectedDate, time: selectedTime },
                        ]);
                        console.log([
                          ...bookingDetails,
                          { date: selectedDate, time: selectedTime },
                        ])
                        setSelectedDate(null);
                        setSelectedTime("");
                      } else {
                        alert("Vui lòng chọn ngày và thời gian trước khi thêm");
                      }
                    }}
                  >
                    Thêm ngày
                  </Button>}
                </div>
                {flexibleBookings.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold mb-2">Lịch linh hoạt đã chọn</h4>
                    {flexibleBookings.map((booking, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <p className="me-2 mb-0">
                          {moment(booking.date.$d).format('DD/MM/YYYY')} - {getLableSlot(booking.time)}
                        </p>
                        <Button
                          danger
                          type="primary"
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

          <Button type="primary" className="w-full" onClick={handleShowConfirm}>
            Đặt Sân
          </Button>
        </Col>
      </Row>

      <Modal open={showConfirm} width={1200} onCancel={() => setShowConfirm(false)}>
        <MyCalendar
          message={bookingDetails.map(booking => ({
            date: booking.date,
            message: booking.time,
          }))}
        />
      </Modal>

      <Modal
        title={`Đặt sân vào ngày ${selectedDay ? selectedDay.toLocaleDateString() : ''}`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleBooking}
      >
        {selectedDay && renderTimeslots()}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Tổng tiền: {selectedSlots.length * slotPrice} VNĐ</h3>
        </div>
      </Modal>
    </div>
  );
};

export default CourtDetails;
