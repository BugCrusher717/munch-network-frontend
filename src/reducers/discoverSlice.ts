import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "~/application/store";

export interface ArtistDataForm {
  login: string;
  avatar: string;
  price: string;
  follow: boolean;
}
export interface InscriptionData {
  title: string;
  inscriptionId: string;
  image: string;
  category: string;
  imageCategory: string;
  avatar: string;
  login: string;
  verified: boolean;
  bid: number;
  price: string;
  url: string;
  inscriptionNumber?: string;
}

export interface ActionItemsType {
  login: string;
  crypto: string;
  price: string;
  image: string;
  avatar: string;
  url: string;
  collectionName: string;
  salesTime: string;
  inscriptionId: string;
}
export interface DiscoverState {
  inscriptions: InscriptionData[];
  loadingStatus: boolean;
  minPrice?: number;
  maxPrice?: number;
  searchKeyWord: string;
  totalItemCount: number;
  actionDatas: ActionItemsType[];
  artistDatas: ArtistDataForm[];
  artistCount: number;
  filterTime: number;
  sortKeyword: number;
  conditionFlag: number;
}

const initialState: DiscoverState = {
  inscriptions: [],
  loadingStatus: false,
  minPrice: undefined,
  maxPrice: undefined,
  searchKeyWord: "",
  totalItemCount: 0,
  actionDatas: [],
  artistDatas: [],
  artistCount: 0,
  filterTime: 30,
  sortKeyword: 1,
  conditionFlag: 1,
};

export const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    setConditionFlag: (state, action: PayloadAction<number>) => {
      state.conditionFlag = action.payload;
    },
    setSortKeyword: (state, action: PayloadAction<number>) => {
      state.sortKeyword = action.payload;
    },
    setFilterTime: (state, action: PayloadAction<number>) => {
      state.filterTime = action.payload;
    },
    setArtistCount: (state, action: PayloadAction<number>) => {
      state.artistCount = action.payload;
    },
    setInscriptions: (state, action: PayloadAction<InscriptionData[]>) => {
      state.inscriptions = action.payload;
    },
    removeInscription: (state, action: PayloadAction<string>) => {
      const inscriptionIdToRemove = action.payload;
      state.inscriptions = state.inscriptions.filter(
        (inscription) => inscription.inscriptionId !== inscriptionIdToRemove
      );
      state.totalItemCount = state.totalItemCount - 1;
    },
    setActionsDatas: (state, action: PayloadAction<ActionItemsType[]>) => {
      state.actionDatas = action.payload;
    },
    setArtistDatas: (state, action: PayloadAction<ArtistDataForm[]>) => {
      state.artistDatas = action.payload;
    },
    setTotalItemCount: (state, action: PayloadAction<number>) => {
      state.totalItemCount = action.payload;
    },
    addInscriptions: (state, action: PayloadAction<InscriptionData[]>) => {
      state.inscriptions = state.inscriptions.concat(action.payload);
    },
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },

    setSearchKeyWord: (state, action: PayloadAction<string>) => {
      state.searchKeyWord = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number | undefined>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number | undefined>) => {
      state.maxPrice = action.payload;
    },
  },
});

export const {
  setSortKeyword,
  setInscriptions,
  setLoadingStatus,
  setArtistCount,
  setMinPrice,
  setMaxPrice,
  setSearchKeyWord,
  addInscriptions,
  setTotalItemCount,
  setActionsDatas,
  setArtistDatas,
  setFilterTime,
  setConditionFlag,
  removeInscription,
} = discoverSlice.actions;

export const selectConditionFlag = (state: RootState) =>
  state.discover.conditionFlag;

export const selectSortKeyword = (state: RootState) =>
  state.discover.sortKeyword;

export const selectFilterTime = (state: RootState) => state.discover.filterTime;

export const selectActionsDatas = (state: RootState) =>
  state.discover.actionDatas;

export const selectArtistsCount = (state: RootState) =>
  state.discover.artistCount;

export const seletcArtistDatas = (state: RootState) =>
  state.discover.artistDatas;

export const selectTotalItemCount = (state: RootState) =>
  state.discover.totalItemCount;

export const selectInsciptions = (state: RootState) =>
  state.discover.inscriptions;

export const selectLoadingStatus = (state: RootState) =>
  state.discover.loadingStatus;

export const selectMinPrice = (state: RootState) => state.discover.minPrice;

export const selectMaxPrice = (state: RootState) => state.discover.maxPrice;

export const selectSearchKeyWord = (state: RootState) =>
  state.discover.searchKeyWord;

export default discoverSlice.reducer;
