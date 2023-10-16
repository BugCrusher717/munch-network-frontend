import { toast } from "react-toastify";
import { type AxiosError } from "axios";

import api from "~/utils/api";
import { store } from "~/application/store";
import {
  type BuyNowInscriptionData,
  type RecentUserInterface,
  type TopPriceForm,
  setBuyNowInscriptionData,
  setBuyNowPercentage,
  setBuyLoadingStatus,
  setRecentUser,
  setTopPrice,
} from "~/reducers/buyNowSlice";
import { type WalletTypes } from "~/types/type";
import { setMsg } from "~/reducers/congratSlice";
import { getInscriptionContentType } from "~/utils/inscription";

const ordinalExplorer = process.env.NEXT_PUBLIC_INSCRIPTION_URL as string;
const network = process.env.NEXT_PUBLIC_NETWORK;

const { dispatch } = store;

export const getBuyNowPercentage = async () => {
  try {
    const res = await api.get(`/buy-now-activity/fee`);

    dispatch(setBuyNowPercentage(res.data.feePercent));
  } catch (error) {
    console.error(error);
  }
};

export const getBuyNowInscriptionData = async (
  inscriptionId: string
): Promise<boolean> => {
  try {
    dispatch(setBuyNowInscriptionData(undefined));
    dispatch(setBuyLoadingStatus(true));

    const [res, apiInscriptionNumber] = await Promise.all([
      api.get(`/buy-now-activity/inscription-info/${inscriptionId}`),
      getInscriptionContentType(inscriptionId),
    ]);

    if (res.data) {
      const inscriptionData: BuyNowInscriptionData = {
        title: res.data.inscription.inscriptionId,
        inscriptionId: res.data.inscription.inscriptionId,
        image: `${ordinalExplorer}${res.data.inscription.inscriptionId}`,
        category: res.data.inscription.collection.name,
        imageCategory: res.data.inscription.collection.imgUrl,
        avatar: res.data.user
          ? res.data.user.address
          : "000000000000000000000000",
        login: res.data.user ? res.data.user.name : "Unknown User",
        verified: true,
        bid: 0,
        price: res.data.price,
        url: `/buy-now/${res.data.inscription.inscriptionId}`,
        description: res.data.inscription.collection.description,
        inscriptionNumber:
          network === "testnet"
            ? apiInscriptionNumber.inscriptionNumber
            : apiInscriptionNumber.number,
      };
      dispatch(setBuyNowInscriptionData(inscriptionData));
      dispatch(setBuyLoadingStatus(false));
      return true;
    } else {
      const [ownedInscription, apiInscriptionNumber] = await Promise.all([
        api.get(`/inscription/inscription-info/${inscriptionId}`),
        getInscriptionContentType(inscriptionId),
      ]);

      const inscriptionData: BuyNowInscriptionData = {
        title: `${inscriptionId}`,
        inscriptionId: inscriptionId,
        image: `${ordinalExplorer}${inscriptionId}`,
        category: ownedInscription.data.collection.name,
        imageCategory: ownedInscription.data.collection.imgUrl,
        avatar: ownedInscription.data.user
          ? ownedInscription.data.user.address
          : "000000000000000000000000",
        login: ownedInscription.data.user
          ? ownedInscription.data.user.name
          : "Unknown User",
        verified: true,
        bid: 0,
        price: "0",
        url: "/",
        inscriptionNumber:
          network === "testnet"
            ? apiInscriptionNumber.inscriptionNumber
            : apiInscriptionNumber.number,
        description: ownedInscription.data.collection.description,
        userAddress: ownedInscription.data.user
          ? ownedInscription.data.user.address
          : apiInscriptionNumber.address,
        userName: ownedInscription.data.user
          ? ownedInscription.data.user.name
          : "Unknown User",
      };
      dispatch(setBuyNowInscriptionData(inscriptionData));
      dispatch(setBuyLoadingStatus(false));
      return true;
    }
  } catch (error) {
    console.error(error);
    try {
      const [ownedInscription, apiInscriptionNumber] = await Promise.all([
        api.get(`/inscription/inscription-info/${inscriptionId}`),
        getInscriptionContentType(inscriptionId),
      ]);

      const inscriptionData: BuyNowInscriptionData = {
        title: `${inscriptionId}`,
        inscriptionId: inscriptionId,
        image: `${ordinalExplorer}${inscriptionId}`,
        category: ownedInscription.data.collection.name,
        imageCategory: ownedInscription.data.collection.imgUrl,
        avatar: ownedInscription.data.user
          ? ownedInscription.data.user.address
          : apiInscriptionNumber.address,
        login: ownedInscription.data.user
          ? ownedInscription.data.user.name
          : "Unknown User",
        verified: true,
        bid: 0,
        price: "0",
        url: "/",
        inscriptionNumber:
          network === "testnet"
            ? apiInscriptionNumber.inscriptionNumber
            : apiInscriptionNumber.number,
        description: ownedInscription.data.collection.description,
        userAddress: ownedInscription.data.user
          ? ownedInscription.data.user.address
          : apiInscriptionNumber.address,
        userName: ownedInscription.data.user
          ? ownedInscription.data.user.name
          : "Unknown User",
      };
      dispatch(setBuyNowInscriptionData(inscriptionData));
      dispatch(setBuyLoadingStatus(false));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};

export const getPsbt = async ({
  inscriptionId,
  buyerPubkey,
  walletType,
  expiredIn,
}: {
  inscriptionId: string;
  buyerPubkey: string;
  walletType: WalletTypes;
  expiredIn: string;
}): Promise<{ psbt: string; inputCount: number } | undefined> => {
  try {
    const res = await api.post("/buy-now-offer/generate-psbt", {
      inscriptionId,
      buyerPubkey,
      walletType,
      expiredIn,
    });

    return {
      psbt: res.data.psbt as string,
      inputCount: res.data.inputCount as number,
    };
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const buyerSignPsbt = async ({
  psbt,
  signedPsbt,
  walletType,
}: {
  psbt: string;
  signedPsbt: string;
  walletType: WalletTypes;
}) => {
  try {
    const res = await api.post("/buy-now-offer/buyer-sign-psbt", {
      psbt,
      signedPsbt,
      walletType,
    });

    const { msg } = res.data;

    dispatch(setMsg({ msg }));
    return true;
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    return false;
  }
};

export const ownerSignPsbt = async ({
  psbt,
  signedPsbt,
  walletType,
}: {
  psbt: string;
  signedPsbt: string;
  walletType: WalletTypes;
}): Promise<boolean> => {
  try {
    const res = await api.post("/buy-now-offer/owner-sign-psbt", {
      psbt,
      signedPsbt,
      walletType,
    });

    const { msg, txId } = res.data;
    const transactionLink = `${process.env.NEXT_PUBLIC_TX_URL}${txId}`;

    dispatch(setMsg({ msg, transactionLink }));
    return true;
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    return false;
  }
};

export const cancelActiveOffers = async (uuId: string) => {
  try {
    const res = await api.post("/buy-now-offer/cancel", {
      uuid: uuId,
    });
    if (res.data) {
      toast.success(res.data.msg);
    } else {
      toast.warn("Bad Request");
    }
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const getRecentUser = async () => {
  try {
    dispatch(setRecentUser([]));
    const res = await api.get("/buy-now-activity/recent-user");
    if (res.data) {
      const recentUserData: RecentUserInterface[] = [];
      res.data.forEach((data: any) => {
        recentUserData.push({
          login: data.name,
          url: `/userProfile/${data.name}`,
          total: `${data.total_sales} BTC`,
          address: data.address,
        });
      });
      dispatch(setRecentUser(recentUserData));
    } else {
      toast.warn("Bad Request");
    }
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const getTopPrice = async () => {
  try {
    dispatch(
      setTopPrice({
        inscriptionId: "",
        collectionName: "",
        collectionDescription: "",
        collectionImageUrl: "",
        userName: "",
        userAddress: "",
        price: 0,
        inscriptionImage: "",
      })
    );

    const res = await api.get("/buy-now-activity/top-price");

    if (res.data) {
      const recentUserData: TopPriceForm = {
        inscriptionId: "",
        collectionName: "",
        collectionDescription: "",
        collectionImageUrl: "",
        userName: "",
        userAddress: "",
        price: 0,
        inscriptionImage: "",
      };

      recentUserData.inscriptionId = res.data.inscription.inscriptionId;
      recentUserData.collectionName = res.data.inscription.collection.name;
      recentUserData.collectionDescription =
        res.data.inscription.collection.description;
      recentUserData.collectionImageUrl =
        res.data.inscription.collection.imgUrl;
      recentUserData.userName = res.data.user.name;
      recentUserData.userAddress = res.data.user.address;
      recentUserData.price = res.data.price;
      recentUserData.inscriptionImage = `${ordinalExplorer}${res.data.inscription.inscriptionId}`;
      dispatch(setTopPrice(recentUserData));
    } else {
      toast.warn("Bad Request");
    }
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};
