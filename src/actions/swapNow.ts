import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { type WalletTypes } from "~/types/type";
import { store } from "~/application/store";
import api from "~/utils/api";
import { setMsg } from "~/reducers/congratSlice";
import { getActiveSwapOffers } from "./notifiction";
import { type IInscription } from "~/reducers/swapNowSlice";
import {
  addSwapNowInscriptionData,
  setSwapLoadingStatus,
  setSwapNowInscriptionData,
  setTotalPageCount,
} from "~/reducers/swapNowSlice";

const { dispatch } = store;

export const getPsbt = async ({
  buyerInscriptionIds,
  sellerInscriptionId,
  buyerPubkey,
  walletType,
  price,
  expiredIn,
}: {
  buyerInscriptionIds: string[];
  sellerInscriptionId: string;
  buyerPubkey: string;
  walletType: WalletTypes;
  price: number;
  expiredIn: string;
}): Promise<{ psbt: string; inputCount: number } | undefined> => {
  try {
    const res = await api.post("/swap-offer/generate-psbt", {
      buyerInscriptionIds,
      sellerInscriptionId,
      buyerPubkey,
      walletType,
      price,
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
    else return;
  }
};

export const buyerSignPsbt = async ({
  psbt,
  signedPsbt,
  signedPsbt1,
  walletType,
}: {
  psbt: string;
  signedPsbt: string;
  signedPsbt1?: string;
  walletType: WalletTypes;
}) => {
  try {
    const res = await api.post("/swap-offer/buyer-sign-psbt", {
      psbt,
      signedPsbt,
      signedPsbt1,
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
    const res = await api.post("/swap-offer/owner-sign-psbt", {
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
    const res = await api.post("/swap-offer/cancel", {
      uuid: uuId,
    });
    if (res.data) {
      toast.success(res.data.msg);
      void getActiveSwapOffers(0);
    } else {
      toast.warn("Bad Request");
    }
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    else return;
  }
};

export const getSwapNowInscriptionDatas = async (
  page: number,
  take: number
) => {
  try {
    dispatch(setSwapLoadingStatus(true));
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
        checked: false,
      });
    });
    dispatch(setSwapLoadingStatus(false));

    dispatch(addSwapNowInscriptionData(inscriptionDatas));
    dispatch(setTotalPageCount(res.data.meta.pageCount));
  } catch (error) {
    dispatch(setSwapLoadingStatus(false));
    console.error(error);
  }
};

export const formatSwapNowInscriptionDatas = () => {
  const inscriptionDatas: IInscription[] = [];
  dispatch(setSwapNowInscriptionData(inscriptionDatas));
};
