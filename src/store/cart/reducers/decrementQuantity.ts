import { PayloadAction } from "@reduxjs/toolkit";
import { CartState } from "../types/CartState";

export const decrementQuantity = (
  state: CartState,
  action: PayloadAction<string>
) => {
  const index = state.items.findIndex((item) => item.id === action.payload);
  const item = state.items[index];
  if (item!.quantity > 1) {
    item!.quantity = item!.quantity - 1;
    state.count = state.count - 1;
    state.subTotal = state.subTotal - item!.price;
    state.items[index] = item!;
  }
};
