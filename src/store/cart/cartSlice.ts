import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "./types/CartState";
import { addItemToCart } from "./reducers/addItemToCart";
import { removeFromCart } from "./reducers/removeFromCart";
import { incrementQuantity } from "./reducers/incrementQuantity";
import { decrementQuantity } from "./reducers/decrementQuantity";

const initialState: CartState = {
  count: 0,
  subTotal: 0,
  items: [],
};

export const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart: (state) => {
      state.items = []
    }
  },
});


export const cartActions = CartSlice.actions;
