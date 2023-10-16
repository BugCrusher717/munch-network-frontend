import { toast } from "react-toastify";
import { type AxiosError } from "axios";

import api from "~/utils/api";
import { store } from "~/application/store";
import {
  type ActiveOffer,
  type SwapActiveOffer,
  setBuyNowActiveOffers,
  setSwapNowActiveOffers,
  addBuyNowActiveOffers,
  addSwapNowActiveOffers,
  setTotalActivePageCount,
  setTotalActiveItemCount,
  setTotalActiveSwapPageCount,
  setTotalActiveSwapItemCount,
  setLoadingStatus,
} from "~/reducers/notificationSlice";

const { dispatch } = store;

export const getActiveOffers = async (page: number) => {
  try {
    dispatch(setLoadingStatus(true));
    const res = await api.get("/buy-now-offer/active-offers", {
      params: {
        take: 20,
        page,
      },
    });
    const activeOffers: ActiveOffer[] = [];

    (res.data.data as any[]).forEach((offerData) => {
      const activeOffer: ActiveOffer = {
        inscriptionId: offerData.buyNowActivity.inscription.inscriptionId,
        isRead: offerData.isRead,
        price: offerData.price,
        userAddress: offerData.user.address,
        walletType: offerData.wallet_type,
        psbt: offerData.psbt,
        userName: offerData.user.name,
        uuid: offerData.uuid,
        expiredAt: offerData.expiredAt,
      };

      activeOffers.push(activeOffer);
    });

    dispatch(addBuyNowActiveOffers(activeOffers));
    dispatch(setTotalActivePageCount(res.data.meta.pageCount));
    dispatch(setTotalActiveItemCount(res.data.meta.itemCount));
    dispatch(setLoadingStatus(false));
  } catch (error) {
    dispatch(setLoadingStatus(true));

    console.error(error);
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const getActiveSwapOffers = async (page: number) => {
  try {
    const res = await api.get("/swap-offer/active-offers", {
      params: {
        take: 20,
        page,
      },
    });
    const activeSwapOffers: SwapActiveOffer[] = [];

    (res.data.data as any[]).forEach((offerData) => {
      const activeOffer: SwapActiveOffer = {
        inscriptionId: offerData.buyNowActivity.inscription.inscriptionId,
        isRead: offerData.isRead,
        price: offerData.price,
        userAddress: offerData.user.address,
        walletType: offerData.user.walletType,
        psbt: offerData.psbt,
        userName: offerData.user.name,
        uuid: offerData.uuid,
        swapInscriptionId: offerData.inscription.inscriptionIds,
        expiredAt: offerData.expiredAt,
      };

      activeSwapOffers.push(activeOffer);
    });
    if (res.data.meta.itemCount > 0) {
      dispatch(addSwapNowActiveOffers(activeSwapOffers));
    }
    dispatch(setTotalActiveSwapPageCount(res.data.meta.pageCount));
    dispatch(setTotalActiveSwapItemCount(res.data.meta.itemCount));
  } catch (error) {
    console.error(error);
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};

export const formatActiveOffers = () => {
  const activeOffers: ActiveOffer[] = [];
  dispatch(setBuyNowActiveOffers(activeOffers));
};

export const formatSwapActiveOffers = () => {
  const activeSwapOffers: SwapActiveOffer[] = [];
  dispatch(setSwapNowActiveOffers(activeSwapOffers));
};
