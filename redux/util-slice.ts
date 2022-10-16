import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Item, FormValues, ActiveOrder, InitialCategory } from "../types/order";

interface utilState {
  error: string | null;
}

const initialState: utilState = {
  error: null,
};

export const utilSlice = createSlice({
  name: "utilState",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setErrorValue: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setErrorValue } = utilSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default utilSlice.reducer;
