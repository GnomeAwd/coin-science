'use client'
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export interface CoinState {
  value: number;
  label: string;
}

let coinFromLocalStorage;

coinFromLocalStorage = getFromLocalStorage("selected_coin");

const storedData = coinFromLocalStorage
  ? JSON.parse(coinFromLocalStorage)
  : null;

const initialState: CoinState = storedData ? storedData :{
  value: 0,
  label: "Bitcoin",
};

export const coinSlice = createSlice({
  name: "coin",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<CoinState>) => {
      //   console.log(action.payload);
      state.value = action.payload.value;
      state.label = action.payload.label;
      localStorage.setItem("selected_coin", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = coinSlice.actions;

export default coinSlice.reducer;
