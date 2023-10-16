import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "~/application/store";

export interface IInscription {
  inscriptionId: string;
  title: string;
  description: string;
  imgUrl: string;
  price?: number;
  contentType: string;
  checked: boolean;
}

export interface SwapNowStatus {
  swapNowUrl: string;
  swapNowInscriptionId: string[];
  swapPrice: number;
  swapLoadingStatus: boolean;
  inscriptionDatas?: IInscription[];
  totalPageCount: number;
}

const initialState: SwapNowStatus = {
  swapNowUrl: "",
  swapNowInscriptionId: [],
  swapPrice: 0.0,
  swapLoadingStatus: false,
  inscriptionDatas: [],
  totalPageCount: 0,
};

export const swapNowSlice = createSlice({
  name: "swapNow",
  initialState,
  reducers: {
    setTotalPageCount: (state, action: PayloadAction<number>) => {
      state.totalPageCount = action.payload;
    },
    setSwapNowInscriptionData: (
      state,
      action: PayloadAction<IInscription[]>
    ) => {
      state.inscriptionDatas = action.payload;
    },
    setCheckStatus: (
      state,
      action: PayloadAction<{ inscriptionId: string; checked: boolean }>
    ) => {
      const { inscriptionId, checked } = action.payload;
      if (state.inscriptionDatas) {
        const inscriptionIndex = state.inscriptionDatas.findIndex(
          (inscription) => inscription.inscriptionId === inscriptionId
        );

        if (inscriptionIndex !== undefined && inscriptionIndex !== -1) {
          const inscription = state.inscriptionDatas[inscriptionIndex];
          if (inscription) inscription.checked = !checked;
        }
      }
    },
    addSwapNowInscriptionData: (
      state,
      action: PayloadAction<IInscription[]>
    ) => {
      state.inscriptionDatas = state.inscriptionDatas?.concat(action.payload);
    },
    formatSwapNowInscriptionId: (state, action: PayloadAction<[]>) => {
      state.swapNowInscriptionId = action.payload;
    },
    setSwapNowInscriptionId: (state, action: PayloadAction<string>) => {
      if (action.payload !== "")
        state.swapNowInscriptionId.push(action.payload);
      else state.swapNowInscriptionId = [];
    },
    setSwapNowUrl: (state, action: PayloadAction<string>) => {
      state.swapNowUrl = action.payload;
    },
    setSwapPrice: (state, action: PayloadAction<number>) => {
      state.swapPrice = action.payload;
    },
    setSwapLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.swapLoadingStatus = action.payload;
    },
  },
});

export const {
  formatSwapNowInscriptionId,
  setSwapNowInscriptionId,
  setSwapNowUrl,
  setSwapPrice,
  setSwapLoadingStatus,
  setSwapNowInscriptionData,
  setCheckStatus,
  addSwapNowInscriptionData,
  setTotalPageCount,
} = swapNowSlice.actions;

export const selectTotalPageCount = (state: RootState) =>
  state.swapNow.totalPageCount;

export const selectSwapNowInscriptionDatas = (state: RootState) =>
  state.swapNow.inscriptionDatas;

export const selectSwapNowInscriptionId = (state: RootState) =>
  state.swapNow.swapNowInscriptionId;

export const selectSwapNowLoadingStatus = (state: RootState) =>
  state.swapNow.swapLoadingStatus;

export const selectSwapNowUrl = (state: RootState) => state.swapNow.swapNowUrl;

export const selectSwapPrice = (state: RootState) => state.swapNow.swapPrice;

export default swapNowSlice.reducer;
