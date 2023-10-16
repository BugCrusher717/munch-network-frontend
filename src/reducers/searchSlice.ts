import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "~/application/store";

export interface UserFrom {
  title: string;
  address: string;
  url: string;
}

export interface CollectionsForm {
  title: string;
  floorPrice: number;
  url: string;
  image: string;
}

export interface InscriptionsForm {
  buy: number;
  title: string;
  url: string;
  image: string;
  inscriptionId: string;
}

export interface searchState {
  users: UserFrom[];
  collections: CollectionsForm[];
  inscriptions: InscriptionsForm[];
  totalCount: number;
  loadingStatus: boolean;
  visibleStatus: boolean;
}

const initialState: searchState = {
  users: [],
  collections: [],
  inscriptions: [],
  totalCount: 0,
  loadingStatus: false,
  visibleStatus: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setVisibleStatus: (state, action: PayloadAction<boolean>) => {
      state.visibleStatus = action.payload;
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
    setUsers: (state, action: PayloadAction<UserFrom[]>) => {
      state.users = action.payload;
    },
    setInscriptions: (state, action: PayloadAction<InscriptionsForm[]>) => {
      state.inscriptions = action.payload;
    },
    setCollections: (state, action: PayloadAction<CollectionsForm[]>) => {
      state.collections = action.payload;
    },
  },
});

export const {
  setUsers,
  setVisibleStatus,
  setInscriptions,
  setCollections,
  setTotalCount,
  setLoadingStatus,
} = searchSlice.actions;

export const selectVisibleStatus = (state: RootState) =>
  state.search.visibleStatus;
export const selectLoadingStatus = (state: RootState) =>
  state.search.loadingStatus;
export const selectTotalCount = (state: RootState) => state.search.totalCount;
export const selectUsers = (state: RootState) => state.search.users;
export const selectInscriptions = (state: RootState) =>
  state.search.inscriptions;
export const selectCollections = (state: RootState) => state.search.collections;

export default searchSlice.reducer;
