// src/api/index.js
import axios from "axios";

const API_URL =
  "https://backend-crochet-e-commerce-production.up.railway.app/api";

// Fetch all products
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      EmailAddress: email,
      Password: password,
    });

    const { token, user } = response.data;

    // Save token and user info to localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Fetch user profile
export const registerUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      Name: name,
      EmailAddress: email,
      Password: password,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Registration failed:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

// Fetch all products
export const addToCart = async (productId, quantity = 1, token = null) => {
  const config = {
    headers: {},
  };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Check if the token is valid
  const res = await axios.post(
    "https://backend-crochet-e-commerce-production.up.railway.app/api/orders/add",
    { P_id: productId, Quantity: quantity },
    config
  );
  return res.data;
};
