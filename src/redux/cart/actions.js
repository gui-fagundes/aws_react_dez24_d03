import CartActionTypes from "./actionTypes";

export const addProductToCart = (payload) => ({
  type: CartActionTypes.ADD_PRODUCT,
  payload,
});
