"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.getItem(key);
};

export interface DataState {
  data: Array<any>;
}

let tableFromLocalStorage;

tableFromLocalStorage = getFromLocalStorage("table");

const storedData = tableFromLocalStorage
  ? JSON.parse(tableFromLocalStorage)
  : null;

const initialState: DataState = storedData
  ? storedData
  : {
      data: [],
    };

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetch_data: (state, action: PayloadAction<DataState>) => {
      state.data = action.payload.data;
      localStorage.setItem("table", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetch_data } = dataSlice.actions;

export default dataSlice.reducer;
