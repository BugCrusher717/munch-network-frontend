import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "~/application/store";
import { type WalletTypes } from "~/types/type";

export interface ActiveOffer {
  price: number;
  userAddress: string;
  walletType: WalletTypes;
  userName: string;
  psbt: string;
  isRead: boolean;
  inscriptionId: string;
  uuid: string;
  expiredAt: string;
}

export interface SwapActiveOffer {
  price: number;
  userAddress: string;
  walletType: string;
  userName: string;
  psbt: string;
  isRead: boolean;
  inscriptionId: string;
  uuid: string;
  swapInscriptionId: string[];
  expiredAt: string;
}

export interface NotificationState {
  activeOffers: ActiveOffer[];
  activeSwapOffers: SwapActiveOffer[];
  isNewData: boolean;
  totalActivePageCount: number;
  totalActiveSwapPageCount: number;
  totalActiveItemCount: number;
  totalActiveSwapItemCount: number;
  previewFlag: boolean;
  previewData?: SwapActiveOffer;
  loadingStatus: boolean;
}

const initialState: NotificationState = {
  activeOffers: [],
  activeSwapOffers: [],
  totalActivePageCount: 0,
  totalActiveSwapPageCount: 0,
  totalActiveItemCount: 0,
  totalActiveSwapItemCount: 0,
  isNewData: false,
  previewFlag: false,
  previewData: undefined,
  loadingStatus: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setPreviewData: (
      state,
      action: PayloadAction<SwapActiveOffer | undefined>
    ) => {
      state.previewData = action.payload;
    },
    setPreviewFlag: (state, action: PayloadAction<boolean>) => {
      state.previewFlag = action.payload;
    },
    setBuyNowActiveOffers: (state, action: PayloadAction<ActiveOffer[]>) => {
      state.activeOffers = action.payload;
    },
    addBuyNowActiveOffers: (state, action: PayloadAction<ActiveOffer[]>) => {
      state.activeOffers = state.activeOffers.concat(action.payload);
      const newData = action.payload.find((item) => item.isRead === false);
      if (newData) state.isNewData = true;
      else state.isNewData = false;
    },
    removeBuyNowActiveOffers: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.activeOffers = state.activeOffers.filter(
        (offer) => offer.uuid !== uuidToRemove
      );
    },
    setSwapNowActiveOffers: (
      state,
      action: PayloadAction<SwapActiveOffer[]>
    ) => {
      state.activeSwapOffers = action.payload;
    },
    removeSwapNowActiveOffers: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.activeSwapOffers = state.activeSwapOffers.filter(
        (offer) => offer.uuid !== uuidToRemove
      );
    },
    addSwapNowActiveOffers: (
      state,
      action: PayloadAction<SwapActiveOffer[]>
    ) => {
      state.activeSwapOffers = state.activeSwapOffers.concat(action.payload);
      const newData = action.payload.find((item) => item.isRead === false);
      if (newData) state.isNewData = true;
      else state.isNewData = false;
    },

    setTotalActiveSwapPageCount: (state, action: PayloadAction<number>) => {
      state.totalActiveSwapPageCount = action.payload;
    },
    setTotalActivePageCount: (state, action: PayloadAction<number>) => {
      state.totalActivePageCount = action.payload;
    },
    setTotalActiveSwapItemCount: (state, action: PayloadAction<number>) => {
      state.totalActiveSwapItemCount = action.payload;
    },
    setTotalActiveItemCount: (state, action: PayloadAction<number>) => {
      state.totalActiveItemCount = action.payload;
    },
    reduceTotalActiveSwapItemCount: (state) => {
      state.totalActiveSwapItemCount = state.totalActiveSwapItemCount - 1;
      if (
        state.totalActiveItemCount === 0 &&
        state.totalActiveSwapItemCount === 0
      )
        state.isNewData = false;
    },
    reduceTotalActiveItemCount: (state) => {
      state.totalActiveItemCount = state.totalActiveItemCount - 1;
      if (
        state.totalActiveItemCount === 0 &&
        state.totalActiveSwapItemCount === 0
      )
        state.isNewData = false;
    },
  },
});

export const {
  setLoadingStatus,
  setBuyNowActiveOffers,
  setPreviewFlag,
  addBuyNowActiveOffers,
  setSwapNowActiveOffers,
  addSwapNowActiveOffers,
  setTotalActiveSwapPageCount,
  setTotalActivePageCount,
  setTotalActiveSwapItemCount,
  setTotalActiveItemCount,
  setPreviewData,
  removeSwapNowActiveOffers,
  removeBuyNowActiveOffers,
  reduceTotalActiveSwapItemCount,
  reduceTotalActiveItemCount,
} = notificationSlice.actions;

export const selectLoadingStatus = (state: RootState) =>
  state.notification.loadingStatus;
export const selectPreviewData = (state: RootState) =>
  state.notification.previewData;
export const selectPreviewFlag = (state: RootState) =>
  state.notification.previewFlag;
export const selectActiveOffers = (state: RootState) =>
  state.notification.activeOffers;
export const selectActiveSwapOffers = (state: RootState) =>
  state.notification.activeSwapOffers;
export const selectIsNewData = (state: RootState) =>
  state.notification.isNewData;
export const selectTotalActiveSwapPageCount = (state: RootState) =>
  state.notification.totalActiveSwapPageCount;
export const selectTotalActivePageCount = (state: RootState) =>
  state.notification.totalActivePageCount;
export const selectTotalActiveSwapItemCount = (state: RootState) =>
  state.notification.totalActiveSwapItemCount;
export const selectTotalActiveItemCount = (state: RootState) =>
  state.notification.totalActiveItemCount;

export default notificationSlice.reducer;
