import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "~/application/store";
import type { WalletTypes } from "~/types/type";

export interface RecentActivityForm {
  id: string;
  title: string;
  description: string;
  image: string;
  imgUrl: string;
  price: string;
}

export interface AuthState {
  paymentAddress?: string;
  address?: string;
  pubkey?: string;
  isAuthenticated: boolean;
  name?: string;
  email?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  facebook?: string;
  walletType?: WalletTypes;
  isRegistered: boolean;
  loading: boolean;
  btcPrice: number;
  recentActivity: RecentActivityForm[];
  signMessage: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isRegistered: false,
  loading: false,
  btcPrice: 0,
  recentActivity: [],
  signMessage: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.isRegistered = false;
      state.loading = false;
      state.address = undefined;
      state.pubkey = undefined;
      state.walletType = undefined;
    },
    walletConnect: (
      state,
      action: PayloadAction<{
        address: string;
        walletType: WalletTypes;
        pubkey: string;
        paymentAddress: string;
      }>
    ) => {
      state.address = action.payload.address;
      state.pubkey = action.payload.pubkey;
      state.walletType = action.payload.walletType;
      state.paymentAddress = action.payload.paymentAddress;
    },
    login: (state, action: PayloadAction<Partial<AuthState>>) => {
      state.address = action.payload.address;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.bio = action.payload.bio;
      state.website = action.payload.website;
      state.twitter = action.payload.twitter;
      state.facebook = action.payload.facebook;
      state.walletType = action.payload.walletType;
      state.isRegistered = action.payload.isRegistered as boolean;
      state.isAuthenticated = true;
      state.loading = false;
      state.paymentAddress = action.payload.paymentAddress
        ? action.payload.paymentAddress
        : state.paymentAddress;
      state.pubkey = action.payload.pubkey;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setBtcPrice: (state, action: PayloadAction<number>) => {
      state.btcPrice = action.payload;
    },
    setRecentActivity: (state, action: PayloadAction<RecentActivityForm[]>) => {
      state.recentActivity = action.payload;
    },
    setSignMessage: (state, action: PayloadAction<string>) => {
      state.signMessage = action.payload;
    },
  },
});

export const {
  logout,
  walletConnect,
  login,
  setAuthLoading,
  setBtcPrice,
  setRecentActivity,
  setSignMessage,
} = authSlice.actions;

export const selectSignMessage = (state: RootState) => state.auth.signMessage;

export const selectBtcPrice = (state: RootState) => state.auth.btcPrice;
export const selectAddress = (state: RootState) => state.auth.address;

export const selectPubkey = (state: RootState) => state.auth.pubkey;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectWalletType = (state: RootState) => state.auth.walletType;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectIsRegistered = (state: RootState) => state.auth.isRegistered;
export const selectUser = (state: RootState) => {
  return {
    email: state.auth.email,
    name: state.auth.name,
    bio: state.auth.bio,
    website: state.auth.website,
    twitter: state.auth.twitter,
    facebook: state.auth.facebook,
    pubkey: state.auth.pubkey,
  };
};
export const selectPaymentAddress = (state: RootState) =>
  state.auth.paymentAddress;

export const selectRecentActivities = (state: RootState) =>
  state.auth.recentActivity;

export default authSlice.reducer;
