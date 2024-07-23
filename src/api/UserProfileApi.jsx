import api from '../config/axios';

const userApi = {
  getAccountById: async (userId) => {
    try {
      const response = await api.get(`/admin/account/${userId}`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },
  updateAccount: async (userId, userInfo) => {
    try {
      const response = await api.put(`/admin/account/${userId}`, {
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
  getBookingHistory: async (userId) => {
    try {
      const response = await api.get(`/booking/account/${userId}`);
      console.log('Booking History Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking history:', error);
      throw error;
    }
  },
  getTopUpHistory: async (userId) => {
    try {
      const response = await api.get(`/wallet/Transaction/${userId}`);
      console.log('Top-Up History Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching top-up history:', error);
      throw error;
    }
  },
  getWalletAmount: async (userId) => {
    try {
      const response = await api.get(`/wallet/wallet/amount/${userId}`);
      console.log('Wallet Amount Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching wallet amount:', error);
      throw error;
    }
  },
  cancelBooking: async (bookingId) => {
    try {
      const response = await api.put(`/booking/cancelbookings/${bookingId}`);
      console.log('Cancel Booking Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      throw error;
    }
  }
};

export default userApi;
