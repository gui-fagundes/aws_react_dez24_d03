import { CartItem } from "./CartItem";

export interface CartState {
    items: CartItem[];
    count:number,
    subTotal:number,
}