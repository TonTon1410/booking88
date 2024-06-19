import axios from 'axios';

const API_URL = 'http://157.230.43.225:8080/'; // URL API của bạn

const userApi = {
  getUserInfo: async (userId) => {
    try {
      const response = await axios.put(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },
  updateUserInfo: async (userId, userInfo) => {
    try {
      const response = await axios.put(`${API_URL}/admin-api/updateAccount/${userId}`, userInfo);
      return response.data;
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  }
};

export default userApi;
