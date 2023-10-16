import { toast } from "react-toastify";
import { type AxiosError } from "axios";

import api from "~/utils/api";
import { store } from "~/application/store";
import {
  setReceivedOffers,
  type OfferForm,
  type SwapOfferForm,
  setAcceptOffers,
  setPendingOffers,
  setCancelOffers,
  setExpireOffers,
  addPendingOffers,
  setPendingOfferPageCount,
  setPendingOfferItemCount,
  addPendingSwapOffers,
  setPendingSwapOfferItemCount,
  setPendingSwapOfferPageCount,
  setPendingSwapOffers,
  setLoadingStatus,
  addReceivedSwapOffers,
  setReceivedOfferPageCount,
  setReceivedOfferItemCount,
  setReceivedSwapOfferPageCount,
  setReceivedSwapOfferItemCount,
  setReceivedSwapOffers,
} from "~/reducers/offerSlice";

const { dispatch } = store;

export const getOffers = async (page: number, flag: string) => {
  try {
    const activeOffers: OfferForm[] = [];
    dispatch(setLoadingStatus(true));
    if (flag === "pending") {
      const res = await api.get("/buy-now-offer/pending-offers", {
        params: {
          take: 20,
          page,
        },
      });

      (res.data.data as any[]).forEach((offerData) => {
        const activeOffer: OfferForm = {
          inscriptionId: offerData.buyNowActivity.inscription.inscriptionId,
          isRead: offerData.isRead,
          price: offerData.price,
          userAddress: offerData.buyNowActivity.user.address,
          psbt: offerData.psbt,
          userName: offerData.buyNowActivity.user.name,
          uuid: offerData.uuid,
          expiredAt: offerData.expiredAt,
        };

        activeOffers.push(activeOffer);
      });

      if (flag === "pending") {
        dispatch(addPendingOffers(activeOffers));
        dispatch(setPendingOfferPageCount(res.data.meta.pageCount));
        dispatch(setPendingOfferItemCount(res.data.meta.itemCount));
        dispatch(setLoadingStatus(false));
      } else {
        dispatch(setReceivedOffers(activeOffers));
        dispatch(setReceivedOfferPageCount(res.data.meta.pageCount));
        dispatch(setReceivedOfferItemCount(res.data.meta.itemCount));
        dispatch(setLoadingStatus(false));
      }
    }
  } catch (error) {
    console.error(error);
    dispatch(setLoadingStatus(false));

    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const getSwapOffers = async (page: number, flag: string) => {
  try {
    const activeSwapOffers: SwapOfferForm[] = [];

    if (flag === "pending") {
      const res = await api.get("/swap-offer/pending-offers", {
        params: {
          take: 20,
          page,
        },
      });

      (res.data.data as any[]).forEach((offerData) => {
        const activeOffer: SwapOfferForm = {
          inscriptionId: offerData.buyNowActivity.inscription.inscriptionId,
          isRead: offerData.isRead,
          price: offerData.price,
          userAddress: offerData.buyNowActivity.user.address,
          walletType: offerData.user.walletType,
          psbt: offerData.psbt,
          userName: offerData.buyNowActivity.user.name,
          uuid: offerData.uuid,
          swapInscriptionId: offerData.inscription.inscriptionIds,
          expiredAt: offerData.expiredAt,
        };

        activeSwapOffers.push(activeOffer);
      });
      if (flag === "pending") {
        if (res.data.meta.itemCount > 0) {
          dispatch(addPendingSwapOffers(activeSwapOffers));
        }
        dispatch(setPendingSwapOfferPageCount(res.data.meta.pageCount));
        dispatch(setPendingSwapOfferItemCount(res.data.meta.itemCount));
      } else {
        if (res.data.meta.itemCount > 0) {
          dispatch(addReceivedSwapOffers(activeSwapOffers));
        }
        dispatch(setReceivedSwapOfferPageCount(res.data.meta.pageCount));
        dispatch(setReceivedSwapOfferItemCount(res.data.meta.itemCount));
      }
    }
  } catch (error) {
    console.error(error);
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const formatReceivedOffers = () => {
  const offers: OfferForm[] = [];
  dispatch(setReceivedOffers(offers));
};

export const formatReceivedSwapOffers = () => {
  const offers: SwapOfferForm[] = [];
  dispatch(setReceivedSwapOffers(offers));
};

export const formatAcceptOffers = () => {
  const offers: OfferForm[] = [];
  dispatch(setAcceptOffers(offers));
};

export const formatPendingOffers = () => {
  const offers: OfferForm[] = [];
  dispatch(setPendingOffers(offers));
};

export const formatPendingSwapOffers = () => {
  const offers: SwapOfferForm[] = [];
  dispatch(setPendingSwapOffers(offers));
};

export const formatCancelOffers = () => {
  const offers: OfferForm[] = [];
  dispatch(setCancelOffers(offers));
};

export const formatExpireOffers = () => {
  const offers: OfferForm[] = [];
  dispatch(setExpireOffers(offers));
};
