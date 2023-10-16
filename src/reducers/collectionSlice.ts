import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "~/application/store";
import { type InscriptionData } from "./discoverSlice";

export interface CollectionData {
  id: number;
  uuid: string;
  name: string;
  description: string;
  imgUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  inscription: InscriptionData[];
  pageCount: number;
  website?: string;
  twitter?: string;
  discord?: string;
}

export interface Linksform {
  title: string;
  icon: string;
  url: string;
}

export interface CollectionDetailFrom {
  totalCount: number;
  listedItems: number;
  floorPrice: number;
  totalSales: number;
}
export interface DiscoverCollectionData {
  name: string;
  description: string;
  images: any[];
  inscription: InscriptionData[];
  itemCount: number;
  floorPrice: number;
  url: string;
}

export interface PopularCollectionData {
  name: string;
  description: string;
  imgUrl: string;
  floorPrice: number;
  link: string;
}

export interface CollectionStatus {
  collectionData: CollectionData[];
  discoverCollectionData: DiscoverCollectionData[];
  popularCollectionData: PopularCollectionData[];
  collectionDetailData: CollectionDetailFrom;
  collectionNftCount: number;
  loadingStatus: boolean;
}

const initialState: CollectionStatus = {
  collectionData: [],
  discoverCollectionData: [],
  popularCollectionData: [],
  collectionDetailData: {
    totalCount: 0,
    listedItems: 0,
    floorPrice: 0,
    totalSales: 0,
  },
  collectionNftCount: 0,
  loadingStatus: false,
};

export const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    setLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.loadingStatus = action.payload;
    },
    setCollectionNftCount: (state, action: PayloadAction<number>) => {
      state.collectionNftCount = action.payload;
    },
    setCollectionData: (state, action: PayloadAction<CollectionData[]>) => {
      state.collectionData = action.payload;
    },
    setcollectionDetailData: (
      state,
      action: PayloadAction<CollectionDetailFrom>
    ) => {
      state.collectionDetailData = action.payload;
    },
    addCollectionData: (state, action: PayloadAction<InscriptionData[]>) => {
      state.collectionData = state.collectionData.map((item) => ({
        ...item,
        inscription: item.inscription.concat(action.payload),
      }));
    },
    setDiscoverCollectionData: (
      state,
      action: PayloadAction<DiscoverCollectionData[]>
    ) => {
      state.discoverCollectionData = action.payload;
    },
    setPopularCollectionData: (
      state,
      action: PayloadAction<PopularCollectionData[]>
    ) => {
      state.popularCollectionData = action.payload;
    },
  },
});

export const {
  setCollectionData,
  setCollectionNftCount,
  addCollectionData,
  setDiscoverCollectionData,
  setPopularCollectionData,
  setcollectionDetailData,
  setLoadingStatus,
} = collectionSlice.actions;

export const selectLoadingStatus = (state: RootState) =>
  state.collection.loadingStatus;
export const selectCollectionNftCount = (state: RootState) =>
  state.collection.collectionNftCount;
export const selectCollectionData = (state: RootState) =>
  state.collection.collectionData;

export const selectCollectionDetailData = (state: RootState) =>
  state.collection.collectionDetailData;

export const selectDiscoverCollectionData = (state: RootState) =>
  state.collection.discoverCollectionData;

export const selectPopularCollectionData = (state: RootState) =>
  state.collection.popularCollectionData;

export default collectionSlice.reducer;
