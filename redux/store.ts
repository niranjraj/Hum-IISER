import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import OrderReducer from "./order-slice";
// ...
const store = () =>
  configureStore({
    reducer: {
      order: OrderReducer,
    },
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store);
