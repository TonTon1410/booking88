// userapi.jsx
import axios from 'axios';

const API_URL = 'http://157.230.43.225:8080'; // Thay bằng URL API thực sự của bạn

const CustomerControler = {
  Login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password }); // Đảm bảo endpoint này là đúng
      return response.data;
    } catch (error) { 
      console.error("Login error:", error);
      return null;
    }
  }, loginGoogle : async (token) => {
    try {
      const response = await axios.post(`${API_URL}/login-google`, { token }); // Ensure this endpoint is correct
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response ? error.response.data : error.message);
      return null;
    }
  }};
  

export default CustomerControler;
