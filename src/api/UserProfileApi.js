import axios from 'axios';

const API_URL = 'http://157.230.43.225:8080/swagger-ui/index.html#/admin-api/updateAccount'; // URL API của bạn

const userApi = {
  getUserInfo: async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },
  updateUserInfo: async (userId, userInfo) => {
    try {
      const response = await axios.put(`${API_URL}/update-owner/${userId}`, userInfo);
      return response.data;
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  },
  addStaff: async (staffInfo) => {
    try {
      const response = await axios.post(`${API_URL}/add-staff`, staffInfo);
      return response.data;
    } catch (error) {
      console.error('Error adding staff:', error);
      throw error;
    }
  },
  updateStaff: async (staffInfo) => {
    try {
      const response = await axios.put(`${API_URL}/Update-staff`, staffInfo);
      return response.data;
    } catch (error) {
      console.error('Error updating staff:', error);
      throw error;
    }
  },
  deleteCourt: async (courtId) => {
    try {
      const response = await axios.delete(`${API_URL}/delete-court-by-id/${courtId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting court:', error);
      throw error;
    }
  },
  addCourt: async (courtInfo) => {
    try {
      const response = await axios.post(`${API_URL}/add-court`, courtInfo);
      return response.data;
    } catch (error) {
      console.error('Error adding court:', error);
      throw error;
    }
  }
};

export default userApi;
