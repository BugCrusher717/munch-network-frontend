import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import DetailsCollection from "~/components/DetailsCollection";
import List from "~/components/List";
import Tokens from "~/components/Tokens";
import Activity from "../Activity";
import Image from "~/components/Image";
import { formatCollectionData, getCollectionData } from "~/actions/collection";
import {
  type Linksform,
  selectCollectionData,
  selectCollectionDetailData,
  selectCollectionNftCount,
} from "~/reducers/collectionSlice";
import { selectAddress } from "~/reducers/authSlice";
import styles from "./Collection.module.sass";

const Profile = () => {
  const router = useRouter();
  const [sorting, setSorting] = useState<string>("nfts");
  const [theme, setTheme] = useState<boolean>(false);
  const [collectionId, setCollectionId] = useState<string>("");
  const address = useSelector(selectAddress);
  const [page, setPage] = useState<number>(1);
  const collectionDatas = useSelector(selectCollectionData);
  const nftCount = useSelector(selectCollectionNftCount);
  const [activityCount, setActivityCount] = useState<number>(0);
  const detailsListData = useSelector(selectCollectionDetailData);
  const [links, setLinks] = useState<Linksform[]>([]);

  const detailsList = [
    {
      label: "TotalCount",
      value: detailsListData.totalCount,
    },
    {
      label: "ListedItems",
      value: detailsListData.listedItems,
    },
    {
      label: "Floor Price",
      value: `${detailsListData.floorPrice} BTC`,
    },
    {
      label: "Total sales",
      value: `${detailsListData.totalSales.toFixed(5)} BTC`,
    },
  ];

  const tabs = [
    {
      title: "NFTs",
      value: "nfts",
      counter: nftCount,
    },
    {
      title: "Activity",
      value: "activity",
      counter: activityCount,
      onClick: () => setTheme(false),
    },
  ];

  useEffect(() => {
    if (router.query.collectionId) {
      setCollectionId((_collectionId) => router.query.collectionId as string);
    }
  }, [router, address]);

  useEffect(() => {
    if (collectionId !== "") {
      void formatCollectionData(collectionId);
    }
  }, [collectionId]);

  useEffect(() => {
    if (collectionId !== "") {
      void getCollectionData(collectionId, page, 20);
    }
  }, [page]);

  useEffect(() => {
    if (collectionDatas.length > 0) {
      setActivityCount(detailsListData.listedItems);
      const links = [];
      if (collectionDatas[0]) {
        if (collectionDatas[0].website) {
          links.push({
            title: "Website",
            icon: "country",
            url: collectionDatas[0].website,
          });
        }
        if (collectionDatas[0].twitter) {
          links.push({
            title: "Twitter",
            icon: "twitter",
            url: collectionDatas[0].twitter,
          });
        }
        if (collectionDatas[0].discord) {
          links.push({
            title: "Discord",
            icon: "discord",
            url: collectionDatas[0].discord,
          });
        }
      }
      setLinks(links);
    }
  }, [collectionDatas]);

  return (
    collectionDatas.length > 0 && (
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.photo}>
            <Image
              src={collectionDatas[0]?.imgUrl as string}
              inscriptionsId=""
              layout="fill"
              objectFit="cover"
              alt="Avatar"
            />
          </div>
          <DetailsCollection
            details={detailsList}
            collectionDatas={collectionDatas}
            links={links}
          />
        </div>
        <div className={styles.col}>
          <List
            tabs={tabs}
            tabsValue={sorting}
            setTabsValue={setSorting}
            light={theme}
          >
            {sorting === "nfts" && (
              <Tokens
                titleUsers="Owned by"
                items={collectionDatas[0]?.inscription || []}
                users={["/images/artists/artist-1.jpg"]}
                theme={theme}
                setTheme={setTheme}
                page={page}
                setPage={setPage}
                pageCount={collectionDatas[0]?.pageCount || 1}
              />
            )}
            {sorting === "activity" && (
              <Activity items={collectionDatas[0]?.inscription || []} />
            )}
            <div className={styles.foot}>
              <Link className={styles.link} href="/article">
                How to mint an NFT?
              </Link>
            </div>
          </List>
        </div>
      </div>
    )
  );
};

export default Profile;
