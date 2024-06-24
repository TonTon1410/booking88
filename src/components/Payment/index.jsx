import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import api from "../../config/axios";

const OrderForm = () => {
  const [amount, setAmount] = useState(299999);
  const [orderInfo, setOrderInfo] = useState("Thanh toan don hang 2923");
  const [responseData, setResponseData] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/payment-controller/submidOrder", {
        amount,
        orderInfo,
      });
      setResponseData(response.data);
      console.log("Form submitted successfully:", responseData);
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
              <img
                src="/vnpay-logo.png"
                alt="VNPAY Logo"
                style={{ width: "200px" }}
              />
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
                    onChange={(e) => setAmount(e.target.value)}
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
