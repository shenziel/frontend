import axios from "axios";

const API_URL = "http://localhost:8080";

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

export const getFuelLogs = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/fuel`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching fuel logs:", error);
    throw error;
  }
};

export const getVehicleDetails = async (token, licensePlate) => {
  try {
    const response = await axios.get(`${API_URL}/api/vehicle/plate/${licensePlate}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vehicle details:", error);
    throw error;
  }
};

export const getAllVehicles = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/vehicle`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all vehicles:", error);
    throw error;
  }
};

export const getAllVehiclesExpenses = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/vehicle/expenses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all vehicles:", error);
    throw error;
  }
};

export const addFuelExpense = async (token, newRow) => {
  try {
    const response = await axios.post(`${API_URL}/api/fuel`,
      newRow,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};