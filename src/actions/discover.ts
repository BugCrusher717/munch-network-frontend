import {
  type InscriptionData,
  type ArtistDataForm,
  type ActionItemsType,
  setInscriptions,
  setLoadingStatus,
  addInscriptions,
  setTotalItemCount,
  setActionsDatas,
  setArtistDatas,
  setArtistCount,
  setFilterTime,
  setConditionFlag,
  setSortKeyword,
  setMinPrice,
  setMaxPrice,
} from "~/reducers/discoverSlice";
import api from "~/utils/api";
import { store } from "~/application/store";
import { getInscriptionContentType } from "~/utils/inscription";

const ordinalExplorer = process.env.NEXT_PUBLIC_INSCRIPTION_URL as string;
const network = process.env.NEXT_PUBLIC_NETWORK;

const { dispatch } = store;

export const getDiscoverInscriptions = async (
  minPrice: number | undefined,
  page: number,
  maxPrice: number | undefined,
  searchKeyword: string,
  filterTime: number,
  sortingKeyword: number,
  conditionFlag: number
) => {
  try {
    dispatch(setLoadingStatus(true));

    const res = await api.get(`/buy-now-activity/discover`, {
      params: {
        minPrice: minPrice,
        maxPrice: maxPrice,
        take: 20,
        page,
        search: searchKeyword.length === 0 ? undefined : searchKeyword,
        time: filterTime !== 0 ? filterTime : undefined,
        orderBy:
          conditionFlag === 1
            ? "time"
            : conditionFlag === 2
            ? "price"
            : conditionFlag === 3
            ? "collection"
            : conditionFlag === 4
            ? "user"
            : undefined,
        order: sortingKeyword === 1 ? "ASC" : "DESC",
      },
    });

    dispatch(setTotalItemCount(res.data.meta.itemCount));

    const inscriptionDatas: InscriptionData[] = [];
    const ownerAddresses = await Promise.all(
      res.data.data.map(async (data: any) => {
        const ownerAddress = await getInscriptionContentType(
          data.inscription.inscriptionId
        );
        return ownerAddress.address;
      })
    );

    res.data.data.forEach((data: any, i: number) => {
      const url = `/inscription/${data.inscription.inscriptionId}`;

      if (ownerAddresses[i] === data.user.address)
        inscriptionDatas.push({
          title: data.inscription.inscriptionId,
          inscriptionId: data.inscription.inscriptionId,
          image: `${ordinalExplorer}${data.inscription.inscriptionId}`,
          category: data.inscription.collection.name,
          imageCategory: data.inscription.collection.imgUrl,
          avatar: data.user.address,
          login: data.user.name,
          verified: true,
          bid: 0,
          price: data.price,
          url: url,
        });
    });

    dispatch(addInscriptions(inscriptionDatas));
    dispatch(setLoadingStatus(false));
  } catch (error) {
    console.error(error);
    dispatch(setInscriptions([]));
    dispatch(setLoadingStatus(false));
  }
};

export const formatFilterOptions = () => {
  dispatch(setFilterTime(30));
  dispatch(setConditionFlag(1));
  dispatch(setSortKeyword(1));
  dispatch(setMinPrice(undefined));
  dispatch(setMaxPrice(undefined));
};

export const formatDiscoverInscriptions = () => {
  dispatch(setInscriptions([]));
};

export const getActionsDatas = async (btcPrice: number) => {
  try {
    dispatch(setActionsDatas([]));

    const actionsdatas = await api.get("/buy-now-offer/recent-sales");

    if (actionsdatas.data) {
      const datas: ActionItemsType[] = [];
      actionsdatas.data.forEach((data: any) => {
        const cyrpto = Math.floor(data.price * btcPrice * 10 ** 8) / 10 ** 8;
        datas.push({
          login: data.user.name,
          crypto: `${data.price} BTC`,
          price: `$ ${cyrpto} `,
          image: `${ordinalExplorer}${data.inscriptionId}`,
          avatar: data.user.address,
          url: `/inscription/${data.inscriptionId}`,
          inscriptionId: data.inscriptionId,
          collectionName: data.collection.name,
          salesTime: data.time,
        });
      });
      dispatch(setActionsDatas(datas));
    }
  } catch (error) {
    console.error(error);
  }
};

export const getTopSellers = async (time: number, keyword: string) => {
  try {
    dispatch(setArtistDatas([]));
    dispatch(setArtistCount(0));

    dispatch(setLoadingStatus(true));
    const searchParam = keyword ? `&keyword=${keyword}` : "";

    const topSellersData = await api.get(
      `/user/sellers?take=15&time=${time}${searchParam}`
    );
    const datas: ArtistDataForm[] = [];

    if (topSellersData.data) {
      topSellersData.data.data.forEach((data: any) => {
        datas.push({
          login: data.name,
          avatar: data.address,
          price: `${data.totalSales} BTC`,
          follow: false,
        });
      });
      dispatch(setArtistDatas(datas));
      dispatch(setArtistCount(topSellersData.data.meta.itemCount));
      dispatch(setLoadingStatus(false));
    }
  } catch (error) {
    console.error(error);
    dispatch(setLoadingStatus(false));
  }
};
