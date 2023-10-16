import { type AxiosError } from "axios";
import { toast } from "react-toastify";

import api from "~/utils/api";
import { store } from "~/application/store";
import {
  type UserFrom,
  type InscriptionsForm,
  type CollectionsForm,
  setCollections,
  setInscriptions,
  setUsers,
  setTotalCount,
} from "~/reducers/searchSlice";
import { addressShortening } from "~/utils/address";
import { setLoadingStatus } from "~/reducers/searchSlice";

const { dispatch } = store;

const ordinalExplorer = process.env.NEXT_PUBLIC_INSCRIPTION_URL as string;

export const getSearchResult = async (keyword: string) => {
  try {
    dispatch(setLoadingStatus(true));
    const res = await api.get("/search", {
      params: {
        keyword: keyword,
      },
    });
    const usersData: UserFrom[] = [];
    const inscriptionsData: InscriptionsForm[] = [];
    const collectionsData: CollectionsForm[] = [];

    if (res.data) {
      if (res.data.inscriptions.length > 0) {
        res.data.inscriptions.forEach((data: any) => {
          inscriptionsData.push({
            buy: data.buyNowActivity[0]
              ? data.buyNowActivity[0].price
              : "Not Listed",
            title: addressShortening(data.inscriptionId),
            url: `/inscription/${data.inscriptionId}`,
            image: `${ordinalExplorer}${data.inscriptionId}`,
            inscriptionId: data.inscriptionId,
          });
        });
      }
      if (res.data.collections.length > 0) {
        res.data.collections.forEach((data: any) => {
          collectionsData.push({
            title: data.name,
            floorPrice: data.floorPrice,
            url: `/collection/${data.name}`,
            image: data.imgUrl,
          });
        });
      }
      if (res.data.users.length > 0) {
        res.data.users.forEach((data: any) => {
          usersData.push({
            title: data.name,
            address: data.address,
            url: `/userProfile/${data.name}`,
          });
        });
      }
    }
    dispatch(setUsers(usersData));
    dispatch(setInscriptions(inscriptionsData));
    dispatch(setCollections(collectionsData));
    dispatch(
      setTotalCount(
        usersData.length + inscriptionsData.length + collectionsData.length
      )
    );
    dispatch(setLoadingStatus(false));
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST") {
      dispatch(setLoadingStatus(false));
      ((error as AxiosError).response as any).data.message.map((msg: string) =>
        toast.warn(msg)
      );
    }
  }
};
