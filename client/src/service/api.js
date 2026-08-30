import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

// ======================================================
// USER SIGNUP
// ======================================================

export const authenticateSignup = async (data) => {
  try {
    return await axios.post(`${URL}/signup`, data);
  } catch (error) {
    console.error("Signup API Error:", error);

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    }

    throw error;
  }
};

// ======================================================
// USER LOGIN
// ======================================================

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    return error.response;
  }
};

// ======================================================
// STRIPE CHECKOUT
// ======================================================

export const createCheckoutSession = async (amount) => {
  try {
    const response = await axios.post(
      `${URL}/create-checkout-session`,
      {
        amount,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Checkout API Error:", error);
    throw error;
  }
};

// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${URL}/orders`,
      orderData
    );

    return response.data;
  } catch (error) {
    console.error("Create Order API Error:", error);
    throw error;
  }
};

// ======================================================
// GET USER ORDERS
// ======================================================

export const getUserOrders = async (userId) => {
  try {
    const response = await axios.get(
      `${URL}/orders/${userId}`
    );

    return response.data;
  } catch (error) {
    console.error("Get User Orders API Error:", error);
    throw error;
  }
};

// ======================================================
// GET SINGLE ORDER
// ======================================================

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(
      `${URL}/order/${orderId}`
    );

    return response.data;
  } catch (error) {
    console.error("Get Order API Error:", error);
    throw error;
  }
};