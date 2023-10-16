import { store } from "~/application/store";
import { setLoadingStatus } from "~/reducers/notificationSlice";
import {
  type IInscription,
  type UserProfileForm,
  type UserFollowingForm,
  type UserFollowerForm,
  setProfileLoadingStatus,
  setInscriptionDatas,
  setUserProfileData,
  setUserInscriptionDatas,
  setFollowStatus,
  setFollowerCount,
  setFollowingCount,
  setTotalSales,
  setUserFollowingMembers,
  setUserFollowerMembers,
  addUserFollowerMembers,
  addUserFollowingMembers,
  setFollowLoadingStatus,
  addInscriptionDatas,
  setTotalInscriptionPageCount,
  addUserInscriptionDatas,
  setTotalInscriptionCount,
  setTotalFollowingPageCount,
  setTotalFollowerPageCount,
} from "~/reducers/profileSlice";
import api from "~/utils/api";

const { dispatch } = store;

export const getProfileInscriptionDatas = async (
  page: number,
  take: number
) => {
  try {
    const res = await api.get("/inscription/inscriptions", {
      params: {
        page,
        take,
      },
    });
    const inscriptionDatas: IInscription[] = [];
    res.data.data.forEach((inscriptionData: any) => {
      inscriptionDatas.push({
        inscriptionId: inscriptionData.inscriptionId,
        description: inscriptionData.collection.description,
        imgUrl: inscriptionData.collection.imgUrl,
        title: inscriptionData.collection.name,
        price: inscriptionData.buyNowActivity[0]
          ? inscriptionData.buyNowActivity[0].price
          : null,
        contentType: inscriptionData.contentType,
      });
    });

    dispatch(addInscriptionDatas(inscriptionDatas));
    dispatch(setTotalInscriptionPageCount(res.data.meta.pageCount));
    dispatch(setTotalInscriptionCount(res.data.meta.itemCount));
  } catch (error) {
    console.error(error);
    dispatch(setProfileLoadingStatus(false));
  }
};

export const formatProfileInscriptionDatas = () => {
  const inscriptionDatas: IInscription[] = [];
  dispatch(setInscriptionDatas(inscriptionDatas));
};

export const getUserProfileInscriptionDatas = async (
  userID: string,
  page: number,
  take: number
) => {
  try {
    dispatch(setProfileLoadingStatus(true));

    const res = await api.get(`/inscription/inscriptions/${userID}`, {
      params: {
        page,
        take,
      },
    });
    const inscriptionDatas: IInscription[] = [];
    res.data.data.forEach((inscriptionData: any) => {
      inscriptionDatas.push({
        inscriptionId: inscriptionData.inscriptionId,
        description: inscriptionData.collection.description,
        imgUrl: inscriptionData.collection.imgUrl,
        title: inscriptionData.collection.name,
        price: inscriptionData.buyNowActivity[0]
          ? inscriptionData.buyNowActivity[0].price
          : null,
        contentType: inscriptionData.contentType,
      });
    });

    dispatch(addUserInscriptionDatas(inscriptionDatas));
    dispatch(setTotalInscriptionPageCount(res.data.meta.pageCount));
    dispatch(setTotalInscriptionCount(res.data.meta.itemCount));

    dispatch(setProfileLoadingStatus(false));
  } catch (error) {
    console.error(error);
    dispatch(setProfileLoadingStatus(false));
  }
};

export const formatUserProfileInscriptionDatas = () => {
  const inscriptionDatas: IInscription[] = [];
  dispatch(setUserInscriptionDatas(inscriptionDatas));
};

export const getUserProfile = async (userId: string) => {
  try {
    dispatch(setProfileLoadingStatus(true));
    const res = await api.get(`/auth/profile/${userId}`);
    const profileData: UserProfileForm = {
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
    };

    if (res.data) {
      profileData.name = res.data.name;
      profileData.bio = res.data.bio;
      profileData.website = res.data.website;
      profileData.twitter = res.data.twitter;
      profileData.facebook = res.data.facebook;
      profileData.isRegistered = res.data.isRegistered;
      profileData.address = res.data.address;
      profileData.walletType = res.data.walletType;
      profileData.paymentAddress = res.data.paymentAddress;
      profileData.pubkey = res.data.pubkey;
    }

    dispatch(setUserProfileData(profileData));
    dispatch(setProfileLoadingStatus(false));
  } catch (error) {
    dispatch(setProfileLoadingStatus(false));
    console.error(error);
  }
};

export const followUser = async (address: string) => {
  try {
    dispatch(setFollowLoadingStatus(true));

    const data = {
      followingAddress: address,
    };
    const res = await api.post("/follow/follow-user", data);

    if (res.data.msg === "You successfully followed") {
      dispatch(setFollowStatus(true));
      dispatch(setFollowLoadingStatus(false));
    }
  } catch (error) {
    dispatch(setFollowStatus(false));
    console.error(error);
  }
};

export const userFollow = async (address: string, ownerAddress: string) => {
  try {
    const data = {
      followingAddress: address,
    };

    await api.post("/follow/follow-user", data);
    void getFollowCount(ownerAddress);
  } catch (error) {
    console.error(error);
    dispatch(setFollowLoadingStatus(false));
  }
};

export const unFollowUser = async (address: string) => {
  try {
    dispatch(setFollowLoadingStatus(true));

    const data = {
      followingAddress: address,
    };
    const res = await api.post("/follow/unfollow-user", data);

    if (res.data.msg === "You successfully unfollowed") {
      dispatch(setFollowStatus(false));
      dispatch(setFollowLoadingStatus(false));
    }
  } catch (error) {
    dispatch(setFollowStatus(false));
    dispatch(setFollowLoadingStatus(false));

    console.error(error);
  }
};

export const userUnfollow = async (address: string, ownerAddress: string) => {
  try {
    const data = {
      followingAddress: address,
    };

    await api.post("/follow/unfollow-user", data);

    void getFollowCount(ownerAddress);
  } catch (error) {
    console.error(error);
  }
};

export const getFollowStatus = async (address: string) => {
  try {
    const res = await api.get("/follow/check", {
      params: {
        followingAddress: address,
      },
    });

    if (res.data.res === true) {
      dispatch(setFollowStatus(true));
    } else {
      dispatch(setFollowStatus(false));
    }
  } catch (error) {
    dispatch(setFollowStatus(false));
    console.error(error);
  }
};

export const getFollowCount = async (address: string) => {
  try {
    dispatch(setLoadingStatus(true));
    const res = await api.get(`/follow/count/${address}`);

    if (res.data) {
      dispatch(setFollowerCount(res.data.follower));
      dispatch(setFollowingCount(res.data.following));
    }
    dispatch(setLoadingStatus(false));
  } catch (error) {
    dispatch(setLoadingStatus(false));
    console.error(error);
  }
};

export const getTotalSales = async (address: string) => {
  try {
    const res = await api.get(`/user/total-sales/${address}`);

    if (res.data) {
      dispatch(setTotalSales(res.data.totalSales));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFollowingMembers = async (
  address: string,
  page: number,
  take: number
) => {
  try {
    const res = await api.get(`/follow/following/${address}?`, {
      params: {
        page,
        take,
      },
    });
    const userFollowingDatas: UserFollowingForm[] = [];

    if (res.data) {
      res.data.data.forEach((data: any) => {
        userFollowingDatas.push({
          name: data.following.name,
          address: data.following.address,
          login: data.following.name,
          url: `/userProfile/${data.following.name}`,
          follow: data.isFollow,
        });
      });
      if (page === 1) {
        dispatch(setUserFollowingMembers(userFollowingDatas));
      } else {
        dispatch(addUserFollowingMembers(userFollowingDatas));
      }
      dispatch(setTotalFollowingPageCount(res.data.meta.pageCount));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTotalFollowingPageCount = async (address: string) => {
  try {
    const res = await api.get(`/follow/following/${address}`, {
      params: {
        page: 1,
        take: 1,
      },
    });

    if (res.data) {
      dispatch(setTotalFollowingPageCount(res.data.meta.pageCount));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTotalFollowerPageCount = async (address: string) => {
  try {
    const res = await api.get(`/follow/follower/${address}`, {
      params: {
        page: 1,
        take: 1,
      },
    });

    if (res.data) {
      dispatch(setTotalFollowerPageCount(res.data.meta.pageCount));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFollowerMembers = async (
  address: string,
  page: number,
  take: number
) => {
  try {
    const res = await api.get(`/follow/follower/${address}`, {
      params: {
        page,
        take,
      },
    });
    const userFollowerDatas: UserFollowerForm[] = [];

    if (res.data) {
      res.data.data.forEach((data: any) => {
        const dateString = data.date;
        const date = new Date(dateString);

        const month = date.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
        const day = date.getDate();

        const monthArray = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];

        const formattedDate: string =
          String(monthArray[month - 1]) + " " + String(day);

        userFollowerDatas.push({
          name: data.follower.name,
          address: data.follower.address,
          login: data.follower.name,
          url: `/userProfile/${data.follower.name}`,
          follow: data.isFollow,
          date: formattedDate,
        });
      });
      if (page === 1) {
        dispatch(setUserFollowerMembers(userFollowerDatas));
      } else {
        dispatch(addUserFollowerMembers(userFollowerDatas));
      }
      dispatch(setTotalFollowerPageCount(res.data.meta.pageCount));
    }
  } catch (error) {
    console.error(error);
  }
};
