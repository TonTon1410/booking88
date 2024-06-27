import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Select, Row, Col, Pagination } from "antd";
import CourtCard from "../CourtCard";
import "../../components/CourtList/CourtList1.css";
import "bootstrap/dist/css/bootstrap.css";
import api from "../../config/axios";

const { Option } = Select;
const { Search } = Input;

const CourtList = () => {
  const [courtData, setCourtData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedOperatingHour, setSelectedOperatingHour] = useState("");

  const [times, setTimes] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const courtsPerPage = 6;

  const fetchData = async (time = "", address = "", operatingHour = "") => {
    try {
      const response = await api.get("/getAllClub", {
        params: {
          time,
          address,
          operatingHour,
        },
      });
      if (Array.isArray(response.data)) {
        setCourtData(response.data);
        // Extract unique addresses
        const uniqueAddresses = [
          ...new Set(response.data.map((court) => court.address)),
        ];
        setAddresses(uniqueAddresses);
        console.log(response.data);
      } else {
        console.error("API response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error fetching court data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedTime, selectedAddress, selectedOperatingHour);
  }, [selectedTime, selectedAddress, selectedOperatingHour]);

  const handleTimeChange = (value) => {
    setSelectedTime(value);
  };

  const handleAddressChange = (value) => {
    setSelectedAddress(value);
  };

  const filteredCourts = Array.isArray(courtData)
    ? courtData.filter(
        (court) =>
          (court?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           court?.address?.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (selectedAddress ? court?.address === selectedAddress : true)
      )
    : [];

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
          </div>
          <div className="mb-4 md:mb-0">
            <label className="block mb-2">Khu vực</label>
            <Select
              className="w-32"
              value={selectedAddress}
              onChange={handleAddressChange}
            >
              <Option value="">Tất cả</Option>
              {addresses.map((address) => (
                <Option key={address} value={address}>
                  {address}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <Row gutter={[16, 16]} className="bg-white p-4 rounded-lg shadow-md">
        {currentCourts.map((court) => (
          <Col key={court.locationId} xs={24} sm={12} md={8}>
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
