import api from '../config/axios';

const userApi = {
  getAccountById: async (userId) => {
    try {
      const response = await api.get(`/get-account-by-id/${userId}`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },
  updateAccount: async (userId, userInfo) => {
    try {
      const response = await api.put(`/update-account/${userId}`, {
        name: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email
      });
      console.log('Update Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await api.post(`/forgot-password`, { email });
      console.log('Forgot Password Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error requesting password reset:', error);
      throw error;
    }
  },
  // getBookingHistory: async (userId) => {
  //   try {
  //     const response = await api.get(`/get-booking-history/${userId}`);
  //     console.log('Booking History Response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching booking history:', error);
  //     throw error;
  //   }
  // }
};

export default userApi;
