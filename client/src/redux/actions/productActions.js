import axios from "axios";
import * as actionTypes from "../constants/productConstants";

const URL = import.meta.env.VITE_API_URL;

export const getProducts = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`${URL}/products`);
    dispatch({ type: actionTypes.GET_PRODUCTS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error while calling getProducts api");
    dispatch({ type: actionTypes.GET_PRODUCTS_FAIL, payload: error.message });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`${URL}/product/${id}`);
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    console.log("error while calling getProductDetails api");
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};