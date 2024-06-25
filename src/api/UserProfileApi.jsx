import api from '../config/axios';

const userApi = {
  getAccountById: async (userId) => {
    try {
      const response = await api.get(`/Get-account-by-id/${userId}`);
      console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },
  updateAccount: async (userId, userInfo) => {
    try {
      const response = await api.put(`/Update-account/${userId}`, {
        username: userInfo.name,
        phone: userInfo.phone,
        email: userInfo.email
      });
      console.log('Update Response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating user info:', error);
      throw error;
    }
  }
};

export default userApi;
