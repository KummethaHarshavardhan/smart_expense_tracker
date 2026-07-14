import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);

    // Save token if backend returns one
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
};

// Get Saved Token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check Login Status
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};