import * as actionTypes from "../constants/cartConstants";

const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART: {
      const item = action.payload;

      const exist = state.cartItems.find(
        (product) => product.id === item.id
      );

      if (exist) {
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product.id === item.id
              ? {
                  ...product,
                  quantity:
                    (product.quantity || 1) +
                    (item.quantity || 1),
                }
              : product
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...item,
            quantity: item.quantity || 1,
          },
        ],
      };
    }

    case actionTypes.UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item
        ),
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case actionTypes.RESET_CART:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};