import { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../types/CartState";
import { CartItem } from "../types/CartItem";

export const addItemToCart = (
  state: CartState,
  action: PayloadAction<CartItem>
) => {
  const index = state.items.findIndex(
    (item) =>
      item.productId === action.payload.productId &&
      item.color === action.payload.color &&
      item.size === action.payload.size
  );

  const item = state.items[index];
  if(item) {
    state.items[index].quantity = item.quantity + action.payload.quantity;
    state.count = state.count + action.payload.quantity;
    state.subTotal = state.subTotal + action.payload.price * action.payload.quantity;
    return;
  };
  state.items.push(action.payload);
  state.count = state.count + action.payload.quantity;
  state.subTotal = state.subTotal + action.payload.price * action.payload.quantity;
};
