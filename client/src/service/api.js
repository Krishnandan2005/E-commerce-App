import axios from "axios";

const URL = "http://localhost:3000";

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
    return await axios.post("http://localhost:3000/login", data);
  } catch (error) {
    return error.response;
  }
};


export const createCheckoutSession = async (amount) => {
    const response = await axios.post(
        "http://localhost:3000/create-checkout-session",
        {
            amount,
        }
    );

    return response.data;
};

