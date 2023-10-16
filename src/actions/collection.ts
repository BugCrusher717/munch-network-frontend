import { toast } from "react-toastify";
import { type AxiosError } from "axios";

import { type InscriptionData } from "~/reducers/discoverSlice";
import api from "~/utils/api";
import {
  type CollectionData,
  type PopularCollectionData,
  type DiscoverCollectionData,
  addCollectionData,
  setCollectionData,
  setDiscoverCollectionData,
  setPopularCollectionData,
  setcollectionDetailData,
  setCollectionNftCount,
  setLoadingStatus,
} from "~/reducers/collectionSlice";
import { store } from "~/application/store";
import { addressShortening } from "~/utils/address";
import { getInscriptions } from "~/utils/inscription";

const { dispatch } = store;
const ordinalExplorer = process.env.NEXT_PUBLIC_INSCRIPTION_URL as string;

export const getCollectionData = async (
  collectionId: string,
  page: number,
  count: number
) => {
  try {
    const [res, detailsRes] = await Promise.all([
      api.get(`/collection/inscriptions/${collectionId}`, {
        params: {
          page,
          take: count,
        },
      }),
      api.get(`/collection/info/${collectionId}`),
    ]);
    const inscriptionData: InscriptionData[] = [];
    dispatch(setcollectionDetailData(detailsRes.data));

    res.data.inscriptions.data.forEach((data: any) => {
      const title = addressShortening(data.inscriptionId);

      inscriptionData.push({
        title: title,
        inscriptionId: data.inscriptionId,
        image: `${ordinalExplorer}${data.inscriptionId}`,
        category: "",
        imageCategory: "",
        avatar: data.userAddress as string,
        login: "",
        verified: true,
        bid: 0,
        price: `${data.price} BTC`,
        url: `/inscription/${data.inscriptionId}`,
      });
    });

    dispatch(setCollectionNftCount(res.data.inscriptions.meta.itemCount));

    dispatch(addCollectionData(inscriptionData));
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    return false;
  }
};

export const formatCollectionData = async (collectionId: string) => {
  try {
    dispatch(
      setcollectionDetailData({
        totalCount: 0,
        listedItems: 0,
        floorPrice: 0,
        totalSales: 0,
      })
    );
    dispatch(setCollectionNftCount(0));
    dispatch(setCollectionData([]));

    const [res, detailsRes] = await Promise.all([
      api.get(`/collection/inscriptions/${collectionId}`, {
        params: {
          page: 1,
          take: 20,
        },
      }),
      api.get(`/collection/info/${collectionId}`),
    ]);
    const collectionDatas: CollectionData[] = [];
    const inscriptionData: InscriptionData[] = [];
    dispatch(setcollectionDetailData(detailsRes.data));

    res.data.inscriptions.data.forEach((data: any) => {
      const title = addressShortening(data.inscriptionId);

      inscriptionData.push({
        title: title,
        inscriptionId: data.inscriptionId,
        image: `${ordinalExplorer}${data.inscriptionId}`,
        category: "",
        imageCategory: "",
        avatar: data.userAddress as string,
        login: "",
        verified: true,
        bid: 0,
        price: `${data.price} BTC`,
        url: `/inscription/${data.inscriptionId}`,
      });
    });

    collectionDatas.push({
      id: res?.data.id,
      uuid: res.data.uuid,
      name: res.data.name,
      description: res.data.description,
      imgUrl: res.data.imgUrl,
      createdAt: res.data.createdAt,
      updatedAt: res.data.updatedAt,
      deletedAt: res.data.deletedAt,
      inscription: inscriptionData,
      pageCount: res.data.inscriptions.meta.pageCount,
      website: res.data.website,
      twitter: res.data.twitter,
      discord: res.data.discord,
    });
    dispatch(setCollectionNftCount(res.data.inscriptions.meta.itemCount));

    dispatch(setCollectionData(collectionDatas));
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    return false;
  }
};
export const getDiscoverCollectionData = async () => {
  try {
    dispatch(setDiscoverCollectionData([]));

    const res = await api.get(`/collection/discover`);

    const collectionDatas: DiscoverCollectionData[] = [];

    res.data.map((data: any) => {
      const images: any[] = [];
      images.push(data.imgUrl);
      const inscriptionData: InscriptionData[] = [];

      data.inscriptions.data.forEach((data: any) => {
        const title = addressShortening(data.inscriptionId);

        const url = `/inscription/${data.inscriptionId}`;
        images.push(`${ordinalExplorer}${data.inscriptionId}`);

        inscriptionData.push({
          title: title,
          inscriptionId: data.inscriptionId,
          image: `${ordinalExplorer}${data.inscriptionId}`,
          category: "",
          imageCategory: "",
          avatar: "",
          login: "",
          verified: true,
          bid: 0,
          price: "0",
          url: url,
        });
      });

      collectionDatas.push({
        name: data.name,
        description: data.description,
        images: images,
        inscription: inscriptionData,
        itemCount: data.inscriptions.itemCount,
        floorPrice: data.inscriptions.floorPrice,
        url: `/collection/${data.name}`,
      });
    });

    dispatch(setDiscoverCollectionData(collectionDatas));
  } catch (error) {
    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
    return false;
  }
};

export const getPopularCollection = async (time: number) => {
  try {
    dispatch(setPopularCollectionData([]));
    dispatch(setLoadingStatus(true));
    const res = await api.get("/collection/popular", {
      params: {
        time,
      },
    });
    const collectionDatas: PopularCollectionData[] = [];
    res.data.forEach((data: any) => {
      collectionDatas.push({
        name: data.name,
        description: data.description,
        imgUrl: data.imgUrl,
        floorPrice: data.floorPrice,
        link: `/collection/${data.name}`,
      });
    });
    dispatch(setPopularCollectionData(collectionDatas));
    dispatch(setLoadingStatus(false));
  } catch (error) {
    dispatch(setLoadingStatus(false));

    if ((error as AxiosError).code === "ERR_BAD_REQUEST")
      toast.warn(
        ((error as AxiosError).response as any).data.message as string
      );
  }
};
