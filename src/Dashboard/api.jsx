import axios from 'axios';

// Base URL for the API
const BASE_URL = 'http://157.230.43.225:8080';

// Function to get the Authorization token
const getAuthToken = () => {
  // Replace with your logic to get the auth token
  return 'YOUR_ACCESS_TOKEN';
};

// API call to get all courts
export const fetchAllCourts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/get-all-court`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching courts:', error);
    throw error;
  }
};

// API call to update a slot
export const updateSlot = async (slotId, slotData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-slot/${slotId}`, slotData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating slot:', error);
    throw error;
  }
};

// API call to update an owner
export const updateOwner = async (ownerId, ownerData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-owner/${ownerId}`, ownerData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating owner:', error);
    throw error;
  }
};

// API call to update a court
export const updateCourt = async (courtId, courtData) => {
  try {
    const response = await axios.put(`${BASE_URL}/update-court/${courtId}`, courtData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating court:', error);
    throw error;
  }
};

// API call to update a staff member
export const updateStaff = async (staffData) => {
  try {
    const response = await axios.put(`${BASE_URL}/Update-staff`, staffData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating staff:', error);
    throw error;
  }
};

// API call to add a new staff member
export const addStaff = async (staffData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-staff`, staffData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding staff:', error);
    throw error;
  }
};

// API call to add a new owner
export const addOwner = async (ownerData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-owner`, ownerData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding owner:', error);
    throw error;
  }
};

// API call to add a new slot
export const addNewSlot = async (slotData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-new-slot`, slotData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding slot:', error);
    throw error;
  }
};

// API call to add a new court
export const addCourt = async (courtData) => {
  try {
    const response = await axios.post(`${BASE_URL}/add-court`, courtData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding court:', error);
    throw error;
  }
};

// API call to delete a slot
export const deleteSlot = async (slotId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-slot/${slotId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting slot:', error);
    throw error;
  }
};

// API call to delete a court
export const deleteCourt = async (courtId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/delete-court-by-id/${courtId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting court:', error);
    throw error;
  }
};

// API call to get admin-only data
export const getAdminOnlyData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Admin_only`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching admin only data:', error);
    throw error;
  }
};
