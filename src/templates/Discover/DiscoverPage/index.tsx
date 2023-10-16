import { useEffect, useRef, useState } from "react";
import Layout from "~/components/Layout";
import Main from "./Main";
import Catalog from "~/components/Catalog";
import Auctions from "~/components/Auctions";
import Collections from "./Collections";
import Artists from "./Artists";

import { tabsTime, statuses } from "~/mocks/nfts";
import {
  formatDiscoverInscriptions,
  formatFilterOptions,
  getActionsDatas,
  getDiscoverInscriptions,
  getTopSellers,
} from "~/actions/discover";
import { useSelector } from "react-redux";
import {
  selectActionsDatas,
  selectArtistsCount,
  selectConditionFlag,
  selectFilterTime,
  selectInsciptions,
  selectLoadingStatus,
  selectMaxPrice,
  selectMinPrice,
  selectSearchKeyWord,
  selectSortKeyword,
  selectTotalItemCount,
  seletcArtistDatas,
} from "~/reducers/discoverSlice";
import { selectBtcPrice, selectRecentActivities } from "~/reducers/authSlice";
import { getDiscoverCollectionData } from "~/actions/collection";
import { selectDiscoverCollectionData } from "~/reducers/collectionSlice";
import { getRecentActivities } from "~/actions/auth";

const HomePage = () => {
  const scrollToAll = useRef<any>(null);
  const scrollToNFTs = useRef<any>(null);
  const scrollToCollections = useRef<any>(null);
  const scrollToArtist = useRef<any>(null);

  const recentActivityData = useSelector(selectRecentActivities);

  const inscriptionDatas = useSelector(selectInsciptions);
  const activityCollections = useSelector(selectDiscoverCollectionData);
  const loadingStatus = useSelector(selectLoadingStatus);
  const minPrice = useSelector(selectMinPrice);
  const maxPrice = useSelector(selectMaxPrice);
  const searchKeyWord = useSelector(selectSearchKeyWord);
  const filterTime = useSelector(selectFilterTime);

  const auctions = useSelector(selectActionsDatas);
  const [takeCount, setTakeCount] = useState<number>(1);
  const totalItemCount = useSelector(selectTotalItemCount);
  const artistDatas = useSelector(seletcArtistDatas);
  const btcPrice = useSelector(selectBtcPrice);
  const artistCount = useSelector(selectArtistsCount);

  const conditionFlag = useSelector(selectConditionFlag);
  const sortingKeyword = useSelector(selectSortKeyword);

  useEffect(() => {
    void formatDiscoverInscriptions();
    void formatFilterOptions();
    void getDiscoverCollectionData();
  }, []);

  useEffect(() => {
    if (btcPrice) void getActionsDatas(btcPrice);
    void getTopSellers(30, "");
  }, [btcPrice]);

  useEffect(() => {
    void formatDiscoverInscriptions();
  }, [
    minPrice,
    maxPrice,
    searchKeyWord,
    filterTime,
    sortingKeyword,
    conditionFlag,
  ]);

  useEffect(() => {
    void getDiscoverInscriptions(
      minPrice,
      takeCount,
      maxPrice,
      searchKeyWord,
      filterTime,
      sortingKeyword,
      conditionFlag
    );
  }, [
    takeCount,
    minPrice,
    maxPrice,
    searchKeyWord,
    filterTime,
    sortingKeyword,
    conditionFlag,
  ]);

  useEffect(() => {
    void getRecentActivities();
  }, []);

  const tabsSorting = [
    {
      title: "All",
      value: "all",
      anchor: scrollToAll,
    },
    {
      title: "NFTs",
      value: "nfts",
      counter: `${totalItemCount}`,
      anchor: scrollToNFTs,
    },
    {
      title: "Collections",
      value: "collections",
      counter: `${activityCollections.length}`,
      anchor: scrollToCollections,
    },
    {
      title: "Artist",
      value: "artist",
      counter: `${artistCount}`,
      anchor: scrollToArtist,
    },
  ];

  return (
    <Layout layoutNoOverflow noRegistration>
      <Main scrollToRef={scrollToAll} recentActivityData={recentActivityData} />
      <Catalog
        title="NFTs"
        tabsSorting={tabsSorting}
        tabsTime={tabsTime}
        filters={statuses}
        items={inscriptionDatas}
        scrollToRef={scrollToNFTs}
        loadingStatus={loadingStatus}
        totalItemCount={totalItemCount}
        setTakeCount={setTakeCount}
      />
      <Auctions
        color="#DBFF73"
        items={auctions}
        totalItemCount={totalItemCount}
      />
      <Collections scrollToRef={scrollToCollections} />
      <Artists scrollToRef={scrollToArtist} artistDatas={artistDatas} />
    </Layout>
  );
};

export default HomePage;
