import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, Select, message } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/counterSlice";
import api from "../../config/axios";

const { Option } = Select;

const BookingStaff = () => {
  const user = useSelector(selectUser);
  const id = user.idLocationStaff;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [flexibleBookings, setFlexibleBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    const bookingData = {
      idPromotion: promoCode,
      idLocation: id,
      bookingDetailRequests: flexibleBookings,
    };

    try {
      const response = await api.post("/booking/staff", bookingData);
      console.log(response.data);
      message.success("Đặt lịch thành công");
      form.resetFields();
    } catch (error) {
      console.error("Error booking slot:", error);
      message.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const getLableSlot = (id) => {
    return slots.filter((item) => item.id === id)[0].time;
  };

  const fetPromotion = async () => {
    try {
      const response = await api.get(`/promotion/${id}`);
      console.log(response.data);
      setPromotion(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchSlotData = async () => {
      try {
        const response = await api.get(`/location/${id}`);
        console.log(response.data);
        setSlots(response.data.slots);
      } catch (error) {
        console.error("Error fetching slot data:", error);
      }
    };

    fetchSlotData();
    fetPromotion();
  }, []);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item label="Mã giảm giá" name="idPromotion">
        <Select
          onChange={(e) => setPromoCode(e)} 
          options={promotion.map((item) => ({
            value: item.id,
            label: item.code,
          }))}
        ></Select>
      </Form.Item>

      <Form.Item
        label="Slot"
        name="idSlot"
        rules={[{ required: true, message: "Vui lòng chọn slot" }]}
      >
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
      </Form.Item>
      <Button
        type="primary"
        className="w-full"
        onClick={() => {
          if (selectedTime) {
            setFlexibleBookings([
              ...flexibleBookings,
              {
                date: moment().format("MM-DD-YYYY"),
                idSlot: selectedTime,
              },
            ]);
            setSelectedDate(null);
            setSelectedTime("");
          }
          //  else {
          //   alert(
          //     "Vui lòng chọn ngày và thời gian trước khi thêm"
          //   );
          // }
        }}
      >
        Thêm ngày
      </Button>

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
                  setSelectedTime("");
                }}
              >
                Xóa
              </Button>
            </div>
          ))}
        </div>
      )}
      <Form.Item>
        <Button style={{marginTop:"30px"}} type="primary" htmlType="submit" loading={loading}>
          Book Slot
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookingStaff;
