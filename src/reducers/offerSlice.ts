import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "~/application/store";

export interface OfferForm {
  price: number;
  userAddress: string;
  userName: string;
  psbt: string;
  isRead: boolean;
  inscriptionId: string;
  uuid: string;
  expiredAt: string;
}

export interface SwapOfferForm {
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
  receivedOffers: OfferForm[];
  acceptOffers: OfferForm[];
  pendingOffers: OfferForm[];
  cancelOffers: OfferForm[];
  expireOffers: OfferForm[];
  receivedSwapOffers: SwapOfferForm[];
  acceptSwapOffers: SwapOfferForm[];
  pendingSwapOffers: SwapOfferForm[];
  cancelSwapOffers: SwapOfferForm[];
  expireSwapOffers: SwapOfferForm[];
  pendingOffersItemCount: number;
  pendingOffersPageCount: number;
  pendingSwapOffersItemCount: number;
  pendingSwapOffersPageCount: number;
  receivedOffersItemCount: number;
  receivedOffersPageCount: number;
  receivedSwapOffersItemCount: number;
  receivedSwapOffersPageCount: number;
  loadingStatus: boolean;
}

const initialState: NotificationState = {
  receivedOffers: [],
  acceptOffers: [],
  pendingOffers: [],
  cancelOffers: [],
  expireOffers: [],
  receivedSwapOffers: [],
  acceptSwapOffers: [],
  pendingSwapOffers: [],
  cancelSwapOffers: [],
  expireSwapOffers: [],
  pendingOffersItemCount: 0,
  pendingOffersPageCount: 0,
  pendingSwapOffersItemCount: 0,
  pendingSwapOffersPageCount: 0,
  receivedOffersItemCount: 0,
  receivedOffersPageCount: 0,
  receivedSwapOffersItemCount: 0,
  receivedSwapOffersPageCount: 0,
  loadingStatus: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    //ReceivedOffers
    setReceivedOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.receivedOffers = action.payload;
    },
    addReceivedOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.receivedOffers = state.receivedOffers.concat(action.payload);
    },
    setReceivedSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.receivedSwapOffers = action.payload;
    },
    addReceivedSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.receivedSwapOffers = state.receivedSwapOffers.concat(
        action.payload
      );
    },
    setReceivedOfferItemCount: (state, action: PayloadAction<number>) => {
      state.receivedOffersItemCount = action.payload;
    },
    setReceivedOfferPageCount: (state, action: PayloadAction<number>) => {
      state.receivedOffersPageCount = action.payload;
    },
    setReceivedSwapOfferItemCount: (state, action: PayloadAction<number>) => {
      state.receivedSwapOffersItemCount = action.payload;
    },
    setReceivedSwapOfferPageCount: (state, action: PayloadAction<number>) => {
      state.receivedSwapOffersPageCount = action.payload;
    },
    removeReceivedOffers: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.receivedOffers = state.receivedOffers.filter(
        (offer) => offer.uuid !== uuidToRemove
      );
    },
    removeReceivedSwapOffers: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.receivedSwapOffers = state.receivedSwapOffers.filter(
        (offer) => offer.uuid !== uuidToRemove
      );
    },
    reduceReceivedSwapItemCount: (state) => {
      state.receivedSwapOffersItemCount = state.receivedSwapOffersItemCount - 1;
    },
    reduceReceivedItemCount: (state) => {
      state.receivedOffersItemCount = state.receivedOffersItemCount - 1;
    },
    //AcceptOffers
    setAcceptOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.acceptOffers = action.payload;
    },
    addAcceptOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.acceptOffers = state.acceptOffers.concat(action.payload);
    },
    setAcceptSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.acceptSwapOffers = action.payload;
    },
    addAcceptSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.acceptSwapOffers = state.acceptSwapOffers.concat(action.payload);
    },

    //pendingOffers
    setPendingOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.pendingOffers = action.payload;
    },
    addPendingOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.pendingOffers = state.pendingOffers.concat(action.payload);
    },
    setPendingOfferItemCount: (state, action: PayloadAction<number>) => {
      state.pendingOffersItemCount = action.payload;
    },
    setPendingOfferPageCount: (state, action: PayloadAction<number>) => {
      state.pendingOffersPageCount = action.payload;
    },
    setPendingSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.pendingSwapOffers = action.payload;
    },
    addPendingSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.pendingSwapOffers = state.pendingSwapOffers.concat(action.payload);
    },
    setPendingSwapOfferItemCount: (state, action: PayloadAction<number>) => {
      state.pendingSwapOffersItemCount = action.payload;
    },
    setPendingSwapOfferPageCount: (state, action: PayloadAction<number>) => {
      state.pendingSwapOffersPageCount = action.payload;
    },
    removePendingOffers: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.pendingOffers = state.pendingOffers.filter(
        (offer) => offer.uuid !== uuidToRemove
      );
    },
    removePendingSwapOffers: (state, action: PayloadAction<string>) => {
      const uuidToRemove = action.payload;
      state.pendingSwapOffers = state.pendingSwapOffers.filter(
        (offer) => offer.uuid !== uuidToRemove
      );
    },
    reducePendingSwapItemCount: (state) => {
      state.pendingSwapOffersItemCount = state.pendingSwapOffersItemCount - 1;
    },
    reducePendingItemCount: (state) => {
      state.pendingOffersItemCount = state.pendingOffersItemCount - 1;
    },
    //cancelOffers
    setCancelOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.cancelOffers = action.payload;
    },
    addCancelOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.cancelOffers = state.cancelOffers.concat(action.payload);
    },
    setCancelSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.cancelSwapOffers = action.payload;
    },
    addCancelSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.cancelSwapOffers = state.cancelSwapOffers.concat(action.payload);
    },

    //expireOffers
    setExpireOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.expireOffers = action.payload;
    },
    addExpireOffers: (state, action: PayloadAction<OfferForm[]>) => {
      state.expireOffers = state.expireOffers.concat(action.payload);
    },
    setExpireSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.expireSwapOffers = action.payload;
    },
    addExpireSwapOffers: (state, action: PayloadAction<SwapOfferForm[]>) => {
      state.expireSwapOffers = state.expireSwapOffers.concat(action.payload);
    },

    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const {
  setReceivedOffers,
  addReceivedOffers,
  setReceivedSwapOffers,
  addReceivedSwapOffers,
  removeReceivedOffers,
  removeReceivedSwapOffers,
  reduceReceivedSwapItemCount,
  reduceReceivedItemCount,
  setReceivedOfferItemCount,
  setReceivedOfferPageCount,
  setReceivedSwapOfferItemCount,
  setReceivedSwapOfferPageCount,
  setAcceptOffers,
  addAcceptOffers,
  setAcceptSwapOffers,
  addAcceptSwapOffers,
  setPendingOffers,
  addPendingOffers,
  setPendingSwapOffers,
  addPendingSwapOffers,
  removePendingOffers,
  removePendingSwapOffers,
  reducePendingSwapItemCount,
  reducePendingItemCount,
  setCancelOffers,
  addCancelOffers,
  setCancelSwapOffers,
  addCancelSwapOffers,
  setExpireOffers,
  addExpireOffers,
  setExpireSwapOffers,
  addExpireSwapOffers,
  setPendingOfferItemCount,
  setPendingOfferPageCount,
  setPendingSwapOfferItemCount,
  setPendingSwapOfferPageCount,
  setLoadingStatus,
} = notificationSlice.actions;

export const selectReceivedOffers = (state: RootState) =>
  state.offer.receivedOffers;
export const selectReceivedSwapOffers = (state: RootState) =>
  state.offer.receivedSwapOffers;
export const selectAcceptOffers = (state: RootState) =>
  state.offer.acceptOffers;
export const selectAcceptSwapOffers = (state: RootState) =>
  state.offer.acceptSwapOffers;
export const selectPendingOffers = (state: RootState) =>
  state.offer.pendingOffers;
export const selectPendingSwapOffers = (state: RootState) =>
  state.offer.pendingSwapOffers;
export const selectCancelOffers = (state: RootState) =>
  state.offer.cancelOffers;
export const selectCancelSwapOffers = (state: RootState) =>
  state.offer.cancelSwapOffers;
export const selectExpireOffers = (state: RootState) =>
  state.offer.expireOffers;
export const selectExpireSwapOffers = (state: RootState) =>
  state.offer.expireSwapOffers;
export const selectPendingItemCount = (state: RootState) =>
  state.offer.pendingOffersItemCount;
export const selectPendingPageCount = (state: RootState) =>
  state.offer.pendingOffersPageCount;
export const selectPendingSwapItemCount = (state: RootState) =>
  state.offer.pendingSwapOffersItemCount;
export const selectPendingSwapPageCount = (state: RootState) =>
  state.offer.pendingSwapOffersPageCount;
export const selectReceivedItemCount = (state: RootState) =>
  state.offer.receivedOffersItemCount;
export const selectReceivedPageCount = (state: RootState) =>
  state.offer.receivedOffersPageCount;
export const selectReceivedSwapItemCount = (state: RootState) =>
  state.offer.receivedSwapOffersItemCount;
export const selectReceivedSwapPageCount = (state: RootState) =>
  state.offer.receivedSwapOffersPageCount;
export const selectLoadingStatus = (state: RootState) =>
  state.offer.loadingStatus;

export default notificationSlice.reducer;
