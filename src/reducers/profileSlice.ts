import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type RootState } from "~/application/store";

export interface UserProfileForm {
  name: string;
  bio: string;
  email: string;
  website: string;
  twitter: string;
  facebook: string;
  isRegistered: boolean;
  address: string;
  walletType: string;
  paymentAddress: string;
  pubkey: string;
}

export interface UserFollowingForm {
  name: string;
  address: string;
  login: string;
  url: string;
  follow: boolean;
}

export interface UserFollowerForm {
  name: string;
  address: string;
  login: string;
  url: string;
  follow: boolean;
  date: string;
}
export interface IInscription {
  inscriptionId: string;
  title: string;
  description: string;
  imgUrl: string;
  price?: number;
  contentType: string;
  inscriptionNumber?: string;
}

export interface ProfileState {
  inscriptionDatas: IInscription[];
  userInscriptionDatas: IInscription[];
  userFollowingMembers: UserFollowingForm[];
  userFollowerMembers: UserFollowerForm[];
  userProfileData: UserProfileForm;
  profileLoadingStatus: boolean;
  followStatus: boolean;
  followerCount: number;
  followingCount: number;
  totalSales: number;
  followLoadingStatus: boolean;
  totalInscriptionPageCount: number;
  totalInscriptionCount: number;
  totalFollowerPageCount: number;
  totalFollowingPageCount: number;
}

const initialState: ProfileState = {
  inscriptionDatas: [],
  userInscriptionDatas: [],
  userFollowingMembers: [],
  userFollowerMembers: [],
  userProfileData: {
    name: "",
    bio: "",
    email: "",
    website: "",
    twitter: "",
    facebook: "",
    isRegistered: true,
    address: "",
    walletType: "",
    paymentAddress: "",
    pubkey: "",
  },
  profileLoadingStatus: false,
  followStatus: false,
  followerCount: 0,
  followingCount: 0,
  totalSales: 0,
  followLoadingStatus: false,
  totalInscriptionPageCount: 0,
  totalInscriptionCount: 0,
  totalFollowerPageCount: 0,
  totalFollowingPageCount: 0,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setTotalFollowerPageCount: (state, action: PayloadAction<number>) => {
      state.totalFollowerPageCount = action.payload;
    },
    setUserFollowerStatus: (
      state,
      action: PayloadAction<{ form: UserFollowerForm; address: string }>
    ) => {
      const { form, address } = action.payload;
      const index = state.userFollowerMembers.findIndex(
        (member) => member.address === address
      );
      if (index !== -1) {
        const updatedMembers = [...state.userFollowerMembers]; // Create a new array
        updatedMembers[index] = { ...updatedMembers[index], ...form }; // Update the specific index with the new form object
        state.userFollowerMembers = updatedMembers; // Assign the new array to the state
      }
    },
    setUserFollowingStatus: (
      state,
      action: PayloadAction<{ form: UserFollowerForm; address: string }>
    ) => {
      const { form, address } = action.payload;
      const index = state.userFollowingMembers.findIndex(
        (member) => member.address === address
      );
      if (index !== -1) {
        const updatedMembers = [...state.userFollowingMembers]; // Create a new array
        updatedMembers[index] = { ...updatedMembers[index], ...form }; // Update the specific index with the new form object
        state.userFollowingMembers = updatedMembers; // Assign the new array to the state
      }
    },
    addUserFollowingStatus: (
      state,
      action: PayloadAction<{ form: UserFollowerForm }>
    ) => {
      const { form } = action.payload;

      state.userFollowingMembers = state.userFollowingMembers.concat(form); // Assign the new array to the state
    },
    setTotalFollowingPageCount: (state, action: PayloadAction<number>) => {
      state.totalFollowingPageCount = action.payload;
    },
    setUserFollowerMembers: (
      state,
      action: PayloadAction<UserFollowerForm[]>
    ) => {
      state.userFollowerMembers = action.payload;
    },
    setTotalInscriptionPageCount: (state, action: PayloadAction<number>) => {
      state.totalInscriptionPageCount = action.payload;
    },
    setTotalInscriptionCount: (state, action: PayloadAction<number>) => {
      state.totalInscriptionCount = action.payload;
    },
    setFollowLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.followLoadingStatus = action.payload;
    },
    addUserFollowerMembers: (
      state,
      action: PayloadAction<UserFollowerForm[]>
    ) => {
      state.userFollowerMembers = state.userFollowerMembers.concat(
        action.payload
      );
    },
    setUserFollowingMembers: (
      state,
      action: PayloadAction<UserFollowingForm[]>
    ) => {
      state.userFollowingMembers = action.payload;
    },
    addUserFollowingMembers: (
      state,
      action: PayloadAction<UserFollowingForm[]>
    ) => {
      state.userFollowingMembers = state.userFollowingMembers.concat(
        action.payload
      );
    },
    setInscriptionDatas: (state, action: PayloadAction<IInscription[]>) => {
      state.inscriptionDatas = action.payload;
    },
    addInscriptionDatas: (state, action: PayloadAction<IInscription[]>) => {
      state.inscriptionDatas = state.inscriptionDatas.concat(action.payload);
    },
    setUserInscriptionDatas: (state, action: PayloadAction<IInscription[]>) => {
      state.userInscriptionDatas = action.payload;
    },
    addUserInscriptionDatas: (state, action: PayloadAction<IInscription[]>) => {
      state.userInscriptionDatas = state.userInscriptionDatas.concat(
        action.payload
      );
    },
    setProfileLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.profileLoadingStatus = action.payload;
    },
    setUserProfileData: (state, actions: PayloadAction<UserProfileForm>) => {
      state.userProfileData = actions.payload;
    },
    setFollowStatus: (state, actions: PayloadAction<boolean>) => {
      state.followStatus = actions.payload;
    },
    setFollowingCount: (state, actions: PayloadAction<number>) => {
      state.followingCount = actions.payload;
    },
    setFollowerCount: (state, actions: PayloadAction<number>) => {
      state.followerCount = actions.payload;
    },
    setTotalSales: (state, actions: PayloadAction<number>) => {
      state.totalSales = actions.payload;
    },
  },
});

export const {
  setUserFollowerStatus,
  setUserFollowingStatus,
  setTotalFollowerPageCount,
  setTotalFollowingPageCount,
  addUserFollowingStatus,
  setInscriptionDatas,
  addInscriptionDatas,
  setTotalInscriptionCount,
  setTotalInscriptionPageCount,
  setUserInscriptionDatas,
  addUserInscriptionDatas,
  setProfileLoadingStatus,
  setUserProfileData,
  setFollowStatus,
  setFollowingCount,
  setFollowerCount,
  setTotalSales,
  setUserFollowerMembers,
  setUserFollowingMembers,
  addUserFollowerMembers,
  setFollowLoadingStatus,
  addUserFollowingMembers,
} = profileSlice.actions;

export const selectTotalFollowerPageCount = (state: RootState) =>
  state.profile.totalFollowerPageCount;
export const selectTotalFollowingPageCount = (state: RootState) =>
  state.profile.totalFollowingPageCount;
export const selectTotalInscriptionPageCount = (state: RootState) =>
  state.profile.totalInscriptionPageCount;
export const selectTotalInscriptionCount = (state: RootState) =>
  state.profile.totalInscriptionCount;
export const selectFollowerMembers = (state: RootState) =>
  state.profile.userFollowerMembers;
export const selectFollowLoadingStatus = (state: RootState) =>
  state.profile.followLoadingStatus;
export const selectFollowingMebmers = (state: RootState) =>
  state.profile.userFollowingMembers;
export const selectInscriptionDatas = (state: RootState) =>
  state.profile.inscriptionDatas;
export const selectUserInscriptionDatas = (state: RootState) =>
  state.profile.userInscriptionDatas;
export const selectProfileLoadingStatus = (state: RootState) =>
  state.profile.profileLoadingStatus;
export const selectUserProfileDatas = (state: RootState) =>
  state.profile.userProfileData;
export const selectFollowStatus = (state: RootState) =>
  state.profile.followStatus;
export const selectFollowerCount = (state: RootState) =>
  state.profile.followerCount;
export const selectFollowingCount = (state: RootState) =>
  state.profile.followingCount;

export const selectUserAddress = (state: RootState) =>
  state.profile.userProfileData.address;
export const selectTotalSales = (state: RootState) => state.profile.totalSales;

export default profileSlice.reducer;
