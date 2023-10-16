import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "~/application/store";
import { type IInscription } from "./profileSlice";

export interface SetPriceStatus {
  buyNowPrice: number;
  loadingStatus: boolean;
  inscriptionId?: string;
  deleteLoadingStatus: boolean;
  inscriptionData?: IInscription;
}

const initialState: SetPriceStatus = {
  buyNowPrice: 0,
  loadingStatus: false,
  deleteLoadingStatus: false,
  inscriptionId: "",
  inscriptionData: undefined,
};

export const setPriceSlice = createSlice({
  name: "setPrice",
  initialState,
  reducers: {
    setInscriptionData: (
      state,
      action: PayloadAction<IInscription | undefined>
    ) => {
      state.inscriptionData = action.payload;
    },
    setBuyNowPrice: (state, action: PayloadAction<number>) => {
      state.buyNowPrice = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setInscriptionId: (state, action: PayloadAction<string>) => {
      state.inscriptionId = action.payload;
    },
    setDeleteLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.deleteLoadingStatus = action.payload;
    },
  },
});

export const {
  setBuyNowPrice,
  setInscriptionId,
  setLoadingStatus,
  setDeleteLoadingStatus,
  setInscriptionData,
} = setPriceSlice.actions;

export const selectInscriptionData = (state: RootState) =>
  state.setPrice.inscriptionData;
export const selectDeleteLoadingStatus = (state: RootState) =>
  state.setPrice.deleteLoadingStatus;
export const selectBuyNowPrice = (state: RootState) =>
  state.setPrice.buyNowPrice;
export const selectLoadingStatus = (state: RootState) =>
  state.setPrice.loadingStatus;
export const selectInscriptionId = (state: RootState) =>
  state.setPrice.inscriptionId;

export default setPriceSlice.reducer;
