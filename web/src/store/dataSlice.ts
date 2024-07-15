import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  data: Array<any>;
}

const initialState: DataState = {
  data: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetch_data: (state, action: PayloadAction<DataState>) => {
      state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetch_data } = dataSlice.actions;

export default dataSlice.reducer;
