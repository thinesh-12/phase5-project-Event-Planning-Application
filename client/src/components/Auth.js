import axios from 'axios';

const API_BASE_URL = 'http://localhost:5555'; 

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to log in a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to log out a user and clear session data
export const logoutUser = () => {
   localStorage.removeItem('authToken');
};
