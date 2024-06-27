import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation } from "react-router-dom";
import api from "../../config/axios";

const OrderForm = () => {
  const location = useLocation();
  const { court, selectedDate, selectedTime, amount } = location.state || {};

  const [orderInfo, setOrderInfo] = useState(`Thanh toán đơn hàng cho sân ${court?.name} vào ngày ${selectedDate?.toLocaleDateString()} khung giờ ${selectedTime}`);
  const [responseData, setResponseData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post(`/submitOrder?amount=${amount}&orderInfo=${orderInfo}`);
      setResponseData(response.data);
      console.log("Form submitted successfully:", responseData);
      window.location.href = response.data;
      // Handle successful response
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      // Handle error
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">Tạo Đơn Hàng</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="amount">Số tiền:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="amount"
                    name="amount"
                    required
                    value={amount}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="courtName">Tên sân:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="courtName"
                    name="courtName"
                    required
                    value={court?.name}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Địa chỉ:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    required
                    value={court?.address}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="orderInfo">Thông tin đơn hàng:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderInfo"
                    name="orderInfo"
                    required
                    value={orderInfo}
                    onChange={(e) => setOrderInfo(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="timeSlot">Khung giờ:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="timeSlot"
                    name="timeSlot"
                    required
                    value={selectedTime}
                    readOnly
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Thanh toán
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
