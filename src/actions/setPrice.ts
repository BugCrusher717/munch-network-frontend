import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import { store } from "~/application/store";
import {
  setBuyNowPrice,
  setDeleteLoadingStatus,
  setInscriptionData,
  setLoadingStatus,
} from "~/reducers/setPriceSlice";
import api from "~/utils/api";
import { getInscriptionContentType } from "~/utils/inscription";

const { dispatch } = store;

export const getPrice = async (inscriptionId: string) => {
  try {
    dispatch(setLoadingStatus(true));
    const res = await api.get(
      `/buy-now-activity/inscription-price/${inscriptionId}`
    );
    dispatch(setBuyNowPrice(res.data.price as number));
    dispatch(setLoadingStatus(false));
  } catch (error) {
    console.error(error);
    dispatch(setLoadingStatus(false));
    dispatch(setBuyNowPrice(0));
  }
};

export const getInscriptionData = async (inscriptionId: string) => {
  try {
    const network = process.env.NEXT_PUBLIC_NETWORK;

    dispatch(setInscriptionData(undefined));

    const [res, apiInscriptionNumber] = await Promise.all([
      api.get(`/inscription/inscription-info/${inscriptionId}`),
      getInscriptionContentType(inscriptionId),
    ]);

    if (res.data) {
      const data = {
        inscriptionId: res.data.inscriptionId,
        description: res.data.collection.description,
        imgUrl: res.data.collection.imgUrl,
        title: res.data.collection.name,
        price: 0,
        contentType: "image/webp",
        inscriptionNumber:
          network === "testnet"
            ? apiInscriptionNumber.inscriptionNumber
            : apiInscriptionNumber.number,
      };
      dispatch(setInscriptionData(data));
    }
  } catch (error) {
    console.error(error);
  }
};

export const setPrice = async (inscriptionId: string, price: number) => {
  try {
    dispatch(setLoadingStatus(true));
    await api.post("/buy-now-activity/create", {
      inscriptionId,
      price,
    });
    dispatch(setBuyNowPrice(price));
    dispatch(setLoadingStatus(false));
  } catch (error) {
    console.error(error);
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    dispatch(setBuyNowPrice(0));
    dispatch(setLoadingStatus(false));
  }
};

export const removeSelectedActivity = async (inscriptionId: string) => {
  try {
    dispatch(setDeleteLoadingStatus(true));
    const res = await api.post("/buy-now-activity/remove", {
      inscriptionId,
    });
    if (res.data.res === "Success") {
      dispatch(setDeleteLoadingStatus(false));
    }
  } catch (error) {
    dispatch(setDeleteLoadingStatus(false));
    console.error(error);
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};
