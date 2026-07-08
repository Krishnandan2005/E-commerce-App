import { configureStore } from "@reduxjs/toolkit";
import {getProductDetailsReducer, getProductsReducer} from "./reducers/productReducer.js";
import {cartReducer} from './reducers/cartReducer.js'
const store = configureStore({
  reducer: {
    getProducts: getProductsReducer,
    getProductDetails:getProductDetailsReducer,
    cart:cartReducer,
  },
});

export default store;