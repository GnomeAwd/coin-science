import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CoinState {
  value: number;
  label: string;
}

const initialState: CoinState = {
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
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = coinSlice.actions;

export default coinSlice.reducer;
