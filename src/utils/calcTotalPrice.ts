import { CartItem } from "../redux/Slices/cart/types.ts";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
