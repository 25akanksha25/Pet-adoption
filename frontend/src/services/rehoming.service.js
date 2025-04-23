import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Get auth token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  return user?.token;
};

// Get auth header
const getAuthHeader = () => {
  const token = getToken();
  if (!token) {
    console.error('No auth token found in localStorage');
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

// Handle axios errors
const handleAxiosError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Error response:', error.response.data);
    throw new Error(error.response.data.message || 'An error occurred');
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Error request:', error.request);
    throw new Error('No response received from server');
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
    throw error;
  }
};

// Initialize rehoming process
export const initializeRehoming = async (termsAgreed) => {
  console.log('Initializing rehoming with terms agreed:', termsAgreed);
  console.log('Auth headers:', getAuthHeader());
  
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/initialize`,
      { termsAgreed },
      { headers: getAuthHeader() }
    );
    // Store rehomerId in localStorage for subsequent requests
    localStorage.setItem('rehomerId', response.data.rehomerId);
    console.log('Rehoming initialization response:', response.data);
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// Update pet information for each step
export const updatePetInfo = async (petData) => {
  const rehomerId = localStorage.getItem('rehomerId');
  
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/update-pet-step`,
      {
        rehomerId,
        step: petData.step,
        petData
      },
      { headers: getAuthHeader() }
    );
    // Store petId after first update
    if (response.data.petId) {
      localStorage.setItem('petId', response.data.petId);
    }
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// Upload pet images
export const uploadPetImages = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/upload/images`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

// Finalize rehoming process
export const finalizeRehoming = async (petData) => {
  const rehomerId = localStorage.getItem('rehomerId');
  const petId = localStorage.getItem('petId'); // We need to store this after first pet update
  
  try {
    const response = await axios.post(
      `${API_URL}/rehoming/finalize`,
      { rehomerId, petId },
      { headers: getAuthHeader() }
    );
    return response.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};
