import React, { useState } from "react";
import { Input, Select, Row, Col, Pagination } from 'antd';
import CourtCard from "../CourtCard";
import "../../components/CourtList/CourtList1.css";
import 'bootstrap/dist/css/bootstrap.css';
import img1 from "../../assets/img1.png";

const { Option } = Select;
const { Search } = Input;

const CourtList = () => {
  const courtData = [
    {
      id: 1,
      name: "Sân Cầu Lông Thuận Bình12",
      location: "Quận Thủ Đức ",
      courts: 4,
      rating: 4,
      image: img1,
      operatingHours: { start: "10:00 AM", end: "10:00 PM" },
      availableTimes: [
        { time: "14:00 - 15:30", status: true },
        { time: "15:30 - 17:00", status: false },
        { time: "17:00 - 18:30", status: true },
        { time: "18:30 - 20:00", status: true },
        { time: "20:00 - 21:30", status: true },
      ],
    },{
      id: 1,
      name: "Sân Cầu Lông A",
      location: "Hồ Chí Minh ",
      courts: 4,
      rating: 4,
      image: img1,
      operatingHours: { start: "10:00 AM", end: "10:00 PM" },
      availableTimes: [
        { time: "14:00 - 15:30", status: true },
        { time: "15:30 - 17:00", status: false },
        { time: "17:00 - 18:30", status: true },
        { time: "18:30 - 20:00", status: true },
        { time: "20:00 - 21:30", status: true },
      ],
    },{
      id: 1,
      name: "Sân Cầu Lông B",
      location: "Hà Nội  ",
      courts: 4,
      rating: 4,
      image: img1,
      operatingHours: { start: "10:00 AM", end: "10:00 PM" },
      availableTimes: [
        { time: "14:00 - 15:30", status: true },
        { time: "15:30 - 17:00", status: false },
        { time: "17:00 - 18:30", status: true },
        { time: "18:30 - 20:00", status: true },
        { time: "20:00 - 21:30", status: true },
      ],
    },
    // Add other courts here
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedOperatingHour, setSelectedOperatingHour] = useState("");

  const courtsPerPage = 6;

  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  };

  const handleOperatingHourChange = (value) => {
    setSelectedOperatingHour(value);
  };

  const filteredCourts = courtData
    .filter(
      (court) =>
        court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        court.location.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((court) => {
      if (selectedOperatingHour === "") return true;
      return court.operatingHours.start === selectedOperatingHour;
    })
    .filter((court) => {
      if (selectedLocation === "") return true;
      return court.location.includes(selectedLocation);
    })
    .filter((court) => {
      if (selectedTime === "") return true;
      return court.availableTimes.some(
        (timeSlot) => timeSlot.time.startsWith(selectedTime) && timeSlot.status
      );
    });

  const indexOfLastCourt = currentPage * courtsPerPage;
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage;
  const currentCourts = filteredCourts.slice(indexOfFirstCourt, indexOfLastCourt);

  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage);

  return (
    <div className="contentWrapper container mx-auto mb-6">
      <h1 className="text-4xl font-bold text-center my-8">Danh sách sân</h1>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8 flex flex-col md:flex-row items-center justify-between">
        <Search
          placeholder="Tìm kiếm sân..."
          enterButton
          className="w-full md:w-1/3 mb-4 md:mb-0"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <div className="mb-4 md:mb-0">
            <label className="block mb-2">Khung giờ</label>
            <Select
              className="w-32"
              value={selectedTime}
              onChange={handleTimeChange}
            >
              <Option value="">Tất cả</Option>
              <Option value="10:00 AM">10:00 AM</Option>
              <Option value="11:00 AM">11:00 AM</Option>
              <Option value="12:00 PM">12:00 PM</Option>
              <Option value="01:00 PM">01:00 PM</Option>
              <Option value="02:00 PM">02:00 PM</Option>
              <Option value="03:00 PM">03:00 PM</Option>
              <Option value="04:00 PM">04:00 PM</Option>
              <Option value="05:00 PM">05:00 PM</Option>
              <Option value="06:00 PM">06:00 PM</Option>
              <Option value="07:00 PM">07:00 PM</Option>
              <Option value="08:00 PM">08:00 PM</Option>
              <Option value="09:00 PM">09:00 PM</Option>
              <Option value="10:00 PM">10:00 PM</Option>
            </Select>
          </div>
          <div className="mb-4 md:mb-0">
            <label className="block mb-2">Khu vực</label>
            <Select
              className="w-32"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <Option value="">Tất cả</Option>
              <Option value="Hồ Chí Minh">Hồ Chí Minh</Option>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
              <Option value="Cần Thơ">Cần Thơ</Option>
              <Option value="Nha Trang">Nha Trang</Option>
            </Select>
          </div>
          <div>
            <label className="block mb-2">Giờ mở cửa</label>
            <Select
              className="w-32"
              value={selectedOperatingHour}
              onChange={handleOperatingHourChange}
            >
              <Option value="">Tất cả</Option>
              <Option value="10:00 AM">10:00 AM</Option>
              <Option value="11:00 AM">11:00 AM</Option>
            </Select>
          </div>
        </div>
      </div>
      <Row gutter={[16, 16]} className="bg-white p-4 rounded-lg shadow-md">
        {currentCourts.map((court) => (
          <Col key={court.id} xs={24} sm={12} md={8}>
            <CourtCard court={court} />
          </Col>
        ))}
      </Row>
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredCourts.length}
          pageSize={courtsPerPage}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default CourtList;