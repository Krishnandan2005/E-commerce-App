import axios from "axios";
import * as actionTypes from "../constants/cartConstants";

const URL = import.meta.env.VITE_API_URL;

export const addToCart = (id, quantity = 1) => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/product/${id}`);

    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        ...data,
        quantity,
      },
    });
  } catch (error) {
    dispatch({
      type: actionTypes.ADD_TO_CART_ERROR,
      payload: error.message,
    });
  }
};

export const updateCartQuantity = (id, quantity) => (dispatch) => {
  dispatch({
    type: actionTypes.UPDATE_CART_QUANTITY,
    payload: {
      id,
      quantity,
    },
  });
};

export const removeFromCart = (id) => (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
};