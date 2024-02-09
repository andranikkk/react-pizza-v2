import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cart from "./Slices/cart/slice.ts";
import pizza from "./Slices/pizza/slice.ts";
import filter from "./Slices/filter/slice.ts";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
