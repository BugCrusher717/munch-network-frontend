import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "~/application/store";

export interface congratSlice {
  msg?: string;
  transactionLink?: string;
}

const initialState: congratSlice = {};

export const congratSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setMsg: (state, action: PayloadAction<congratSlice>) => {
      state.msg = action.payload.msg;
      state.transactionLink = action.payload.transactionLink;
    },
  },
});

export const { setMsg } = congratSlice.actions;

export const selectMsg = (state: RootState) => state.congrat.msg;
export const selectTransactionLink = (state: RootState) =>
  state.congrat.transactionLink;

export default congratSlice.reducer;
