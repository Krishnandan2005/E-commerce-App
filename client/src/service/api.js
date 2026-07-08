import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

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

export const authenticateLogin = async (data) => {
  try {
    return await axios.post(`${URL}/login`, data);
  } catch (error) {
    return error.response;
  }
};


export const createCheckoutSession = async (amount) => {
    const response = await axios.post(
        `${URL}/create-checkout-session`,
        {
            amount,
        }
    );

    return response.data;
};

