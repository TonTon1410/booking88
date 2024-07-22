import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Select,
  Input,
  DatePicker,
  Modal,
  Calendar,
  message,
} from "antd";
import api from "../../config/axios";
import "../CourtDetail/Index.css";
import moment from "moment";
import MyCalendar from "../calendar";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import { toast, ToastContainer } from "react-toastify";
const { Option } = Select;
import "react-toastify/dist/ReactToastify.css";

const CourtDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [court, setCourt] = useState();
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(0);
  const [bookingType, setBookingType] = useState("");
  const [months, setMonths] = useState(1); // Khởi tạo với giá trị 1
  const [startDate, setStartDate] = useState(null);
  const [flexibleBookings, setFlexibleBookings] = useState([]);
  const [totalSlots, setTotalSlots] = useState(0);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDay, setSelectedDay] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [slotTimes, setSlotTimes] = useState([]);
  const [slotPrices, setSlotPrices] = useState([]);
  const [slotPrice, setSlotPrice] = useState([]);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [slots, setSlots] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const user = useSelector(selectUser);

  window.scrollTo(0, 0);

  const handleChange = (selectedValues) => {
    setSelectedDays(selectedValues);
  };

  const handleDeselect = (removedValue) => {
    setSelectedDays(selectedDays.filter((day) => day !== removedValue));
  };

  let bookingRequest;
  if (bookingDetails.length > 0) {
    bookingRequest = bookingDetails?.map((item) => {
      return {
        idSlot: item.idSlot,
        date: moment(item.date).format("MM-DD-YYYY"),
      };
    });

    console.log(bookingRequest);
  }
  console.log(bookingType);
  const getPrice = async () => {
    try {
      const response = await api.post("booking/price", {
        idPromotion: promoCode,
        idUser: user.id,
        idLocation: id,
        bookingDetailRequests: bookingRequest,
        bookingType: bookingType === "now" ? "SLOT" : bookingType.toUpperCase(),
      });
      console.log(response.data);
      setSlotPrices(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPrice();
  }, [showConfirm]);

  useEffect(() => {
    setSlotPrices(0);
  }, [bookingType]);

  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await api.get(`/location/${id}`);
        console.log(response.data);
        setSlots(response.data.slots);
        setCourt(response.data);
      } catch (error) {
        console.error("Error fetching slot data:", error);
      }
    };

    fetchSlotData();
    fetPromotion();
  }, [id]);

  const fetPromotion = async () => {
    try {
      const response = await api.get(`/promotion/${id}`);
      console.log(response.data);
      setPromotion(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (!court) {
    return <div>Không tìm thấy thông tin sân</div>;
  }

  const handleBookingApi = async () => {
    try {
      const response = await api.post("/booking", {
        idPromotion: promoCode,
        idUser: user.id,
        idLocation: id,
        bookingDetailRequests: bookingRequest,
        bookingType: bookingType === "now" ? "SLOT" : bookingType.toUpperCase(),
      });
      console.log(response.data);
      toast.success("Booking successfully");
      setShowConfirm(false);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data);
    }
  };

  const getBookingDetailOfFixed = (days, duration, startFrom, slot) => {
    const bookingDetail = [];
    const isInDays = (date) => {
      const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days.includes(dayNames[date.getDay()]);
    };

    for (let i = 0; i < duration; i++) {
      const currentDate = new Date(startFrom);
      currentDate.setDate(currentDate.getDate() + i);

      if (isInDays(currentDate)) {
        bookingDetail.push({
          date: `${
            currentDate.getMonth() + 1
          }/${currentDate.getDate()}/${currentDate.getFullYear()}`,
          time: getLableSlot(selectedTime),
          slot: slot,
          idSlot: selectedTime,
        });
      }
    }

    return bookingDetail;
  };

  function getDaysDuration(startDate, durationInMonths) {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setMonth(end.getMonth() + durationInMonths);
    const diffInMilliseconds = end - start;
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const diffInDays = Math.round(diffInMilliseconds / millisecondsPerDay);

    return diffInDays;
  }
  console.log(flexibleBookings);

  const handleShowConfirm = () => {
    console.log(selectedDate, selectedTime);
    if (bookingType === "now") {
      console.log(moment(selectedDate.$d).format("MM-DD-YYYY"));
      setBookingDetails([
        {
          date: moment(selectedDate.$d).format("MM-DD-YYYY"),
          time: getLableSlot(selectedTime),
          idSlot: selectedTime,
        },
      ]);
    } else if (bookingType === "flexible") {
      setBookingDetails(
        flexibleBookings.map((item) => ({
          date: moment(item.date.$d).format("MM-DD-YYYY"),
          time: getLableSlot(item.idSlot),
          idSlot: item.idSlot,
        }))
      );
    } else {
      const month = getDaysDuration(startDate, Number(months));
      setBookingDetails(
        getBookingDetailOfFixed(selectedDays, month, startDate, "test")
      );
    }

    console.table(bookingDetails);
    setShowConfirm(true);
  };

  const handleBooking = () => {
    if (selectedDay && selectedSlots.length > 0) {
      const bookingInfo = {
        court,
        selectedDate: selectedDay,
        selectedSlots,
        totalAmount: selectedSlots.length * slotPrice,
        selectedTimes: selectedSlots.map((slot) => slotTimes[slot]),
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
    setSelectedSlots([]);
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

  function disabledDate(current) {
    return current && current < moment().startOf("day");
  }

  const getLableSlot = (id) => {
    return slots.filter((item) => item.id === id)[0].time;
  };

  const weekDates = getWeekDates(currentWeek);

  const renderTimeslots = () => {
    const now = new Date();

    return slotTimes.map((time, index) => {
      const slotTime = new Date(selectedDay);
      slotTime.setHours(time);
      slotTime.setMinutes(0);
      slotTime.setSeconds(0);

      const isPast =
        selectedDay &&
        (selectedDay < new Date(now.setHours(0, 0, 0, 0)) ||
          (selectedDay.toDateString() === now.toDateString() &&
            slotTime <= now));
      const isBooked = bookedSlots.some(
        (slot) =>
          slot.date.toDateString() === selectedDay.toDateString() &&
          slot.time === time
      );
      const isSelected = selectedSlots.includes(index);

      const handleClick = () => {
        if (!isPast && !isBooked) {
          if (isSelected) {
            setSelectedSlots(selectedSlots.filter((slot) => slot !== index));
          } else {
            setSelectedSlots([...selectedSlots, index]);
          }
        }
      };

      return (
        <div
          key={index}
          className={`m-2 p-2 border rounded-lg shadow-lg ${
            isSelected ? "bg-blue-300" : "bg-blue-100"
          } ${
            isPast || isBooked
              ? "bg-gray-300 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={handleClick}
        >
          <p className="text-center">
            {time} - {slotPrices[index]} VNĐ
          </p>
          {isBooked && <p className="text-red-600 text-center">Đã đặt</p>}
        </div>
      );
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
      className="container mx-auto my-8 "
    >
      <ToastContainer />

      <Row
        style={{
          margin: "20px 0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                <Option value="now">Lịch ngày</Option>
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
                  <label className="block mb-2">Chọn slot</label>
                  <Select
                    className="w-100 d-block"
                    defaultValue={"Select slot"}
                    value={selectedTime}
                    onChange={(value) => setSelectedTime(value)}
                    options={slots.map((item) => ({
                      value: item.id,
                      label: item.time,
                      disabled: item.status === "INACTIVE",
                    }))}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Đăng ký bao nhiêu tháng</label>
                  <Input
                    type="number"
                    className="w-full"
                    value={months}
                    min={1}
                    onChange={(e) => setMonths(Math.max(1, parseInt(e.target.value, 10)))}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Bắt đầu từ ngày</label>
                  <DatePicker
                    className="w-full"
                    value={startDate ? moment(startDate) : null}
                    onChange={(date) => setStartDate(date)}
                    required
                  />
                </div>
              </>
            )}

            {(bookingType === "flexible" || bookingType === "now") && (
              <div>
                {bookingType === "flexible" && <div className="mb-4"></div>}
                <div className="mb-4">
                  <label className="block mb-2">Chọn ngày và giờ</label>
                  <div className="flex mb-2">
                    <DatePicker
                      disabledDate={disabledDate}
                      className="w-1/2"
                      value={selectedDate ? moment(selectedDate) : null}
                      onChange={(date) => setSelectedDate(date)}
                    />
                    <Select
                      className="w-1/2"
                      defaultValue={"Select slot"}
                      value={selectedTime}
                      onChange={(value) => setSelectedTime(value)}
                      options={slots.map((item) => ({
                        value: item.id,
                        label: item.time,
                        disabled: item.status === "INACTIVE",
                      }))}
                    />
                  </div>
                  {bookingType !== "now" && (
                    <Button
                      type="primary"
                      className="w-full"
                      onClick={() => {
                        if (selectedDate && selectedTime) {
                          setFlexibleBookings([
                            ...flexibleBookings,
                            {
                              date: selectedDate,
                              idSlot: selectedTime,
                            },
                          ]);
                          console.log([
                            ...bookingDetails,
                            { date: selectedDate, idSlot: selectedTime },
                          ]);
                          setSelectedDate(null);
                          setSelectedTime("");
                        } else {
                          alert(
                            "Vui lòng chọn ngày và thời gian trước khi thêm"
                          );
                        }
                      }}
                    >
                      Thêm ngày
                    </Button>
                  )}
                </div>
                {flexibleBookings.length > 0 && (
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      Lịch linh hoạt đã chọn (vui lòng chọn trên 5 slots)
                    </h4>
                    {flexibleBookings.map((booking, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <p className="me-2 mb-0">
                          {moment(booking.date.$d).format("DD/MM/YYYY")} -{" "}
                          {getLableSlot(booking.idSlot)}
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
              <Select
                onChange={(e) => setPromoCode(e)}
                options={promotion.map((item) => ({
                  value: item.id,
                  label: item.code,
                }))}
              ></Select>
            </div>
          </div>

          <Button type="primary" className="w-full" onClick={handleShowConfirm}>
            Đặt Sân
          </Button>
        </Col>
      </Row>

      <Modal
        onOk={handleBookingApi}
        open={showConfirm}
        width={1200}
        onCancel={() => setShowConfirm(false)}
      >
        {slotPrices && (
          <h1>Số tiền phải thanh toán là : {formatter.format(slotPrices)}</h1>
        )}
        <MyCalendar
          message={bookingDetails.map((booking) => ({
            date: booking.date,
            message: booking.time,
          }))}
        />
      </Modal>

      <Modal
        title={`Đặt sân vào ngày ${
          selectedDay ? selectedDay.toLocaleDateString() : ""
        }`}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        {selectedDay && renderTimeslots()}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
            Tổng tiền: {selectedSlots.length * slotPrice} VNĐ
          </h3>
        </div>
      </Modal>
    </div>
  );
};

export default CourtDetails;
