import { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../types/CartState";

export const removeFromCart = (
  state: CartState,
  action: PayloadAction<string>
) => {
  const item = state.items.find((item) => item.id === action.payload);
  state.items = state.items.filter((item) => item.id !== action.payload);
  state.count = state.count - item!.quantity;
  state.subTotal = state.subTotal - item!.price * item!.quantity;
};
