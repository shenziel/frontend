import axios from "axios";

// Set up base URL for your API
const API_URL = "http://localhost:8080"; // Use your API URL

// Function for user login
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Example: Get fuel logs for a user
export const getFuelLogs = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/fuel-logs`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel logs:", error);
    throw error;
  }
};
