import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { InscriptionData } from "./discoverSlice";
import type { RootState } from "~/application/store";

export interface BuyNowInscriptionData extends InscriptionData {
  description: string;
  userName?: string;
  userAddress?: string;
}

export interface TopPriceForm {
  inscriptionId: string;
  collectionName: string;
  collectionDescription: string;
  collectionImageUrl: string;
  userName: string;
  userAddress: string;
  price: number;
  inscriptionImage: string;
}
export interface RecentUserInterface {
  login: string;
  total: string;
  url: string;
  address: string;
}
export interface BuyNowState {
  inscription?: BuyNowInscriptionData;
  buyloadingStatus?: boolean;
  feePrecent?: number;
  recentUser: RecentUserInterface[];
  topPrice: TopPriceForm;
  expired: number;
}

const initialState: BuyNowState = {
  inscription: undefined,
  buyloadingStatus: false,
  expired: 0,
  feePrecent: 1,
  recentUser: [],
  topPrice: {
    inscriptionId: "",
    collectionName: "",
    collectionDescription: "",
    collectionImageUrl: "",
    userName: "",
    userAddress: "",
    price: 0,
    inscriptionImage: "",
  },
};

export const buyNowSlice = createSlice({
  name: "buyNow",
  initialState,
  reducers: {
    setExpired: (state, action: PayloadAction<number>) => {
      state.expired = action.payload;
    },
    setTopPrice: (state, action: PayloadAction<TopPriceForm>) => {
      state.topPrice = action.payload;
    },
    setBuyNowInscriptionData: (
      state,
      action: PayloadAction<BuyNowInscriptionData | undefined>
    ) => {
      state.inscription = action.payload;
    },
    setBuyLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.buyloadingStatus = action.payload;
    },
    setBuyNowPercentage: (state, action: PayloadAction<number>) => {
      state.feePrecent = action.payload;
    },
    setRecentUser: (state, action: PayloadAction<RecentUserInterface[]>) => {
      state.recentUser = action.payload;
    },
  },
});

export const {
  setBuyNowInscriptionData,
  setBuyLoadingStatus,
  setBuyNowPercentage,
  setRecentUser,
  setTopPrice,
  setExpired,
} = buyNowSlice.actions;

export const selectExpired = (state: RootState) => state.buyNow.expired;
export const selectTopPrice = (state: RootState) => state.buyNow.topPrice;

export const selectInscriptionData = (state: RootState) =>
  state.buyNow.inscription;

export const selectBuyNowPercentage = (state: RootState) =>
  state.buyNow.feePrecent;

export const selectBuyLoadingStatus = (state: RootState) =>
  state.buyNow.buyloadingStatus;

export const selectRecentUser = (state: RootState) => state.buyNow.recentUser;

export default buyNowSlice.reducer;
