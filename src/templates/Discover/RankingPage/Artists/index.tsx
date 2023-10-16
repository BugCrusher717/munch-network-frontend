import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Artists.module.sass";
import Tabs from "~/components/Tabs";
import Form from "~/components/Form";
import Artist from "./Artist";

import Image from "next/image";
import { getTopSellers } from "~/actions/discover";
import { useSelector } from "react-redux";
import {
  selectLoadingStatus,
  seletcArtistDatas,
} from "~/reducers/discoverSlice";

const Artists = () => {
  const [email, setEmail] = useState<string>("");
  const [type, setType] = useState<string>("user");
  const [time, setTime] = useState<string>("7-days");
  const artistsWeek = useSelector(seletcArtistDatas);
  const loadingStatus = useSelector(selectLoadingStatus);

  useEffect(() => {
    if (time === "24-hours") void getTopSellers(1, "");
    if (time === "7-days") void getTopSellers(7, "");
    if (time === "30-days") void getTopSellers(30, "");
  }, [time]);

  const typeArtists = [
    {
      title: "Users",
      value: "user",
    },
  ];

  const timeSorting = [
    {
      title: "24 hours",
      value: "24-hours",
    },
    {
      title: "7 days",
      value: "7-days",
    },
    {
      title: "30 days",
      value: "30-days",
    },
  ];

  const searchHandle = () => {
    if (time === "24-hours") void getTopSellers(1, email);
    if (time === "7-days") void getTopSellers(7, email);
    if (time === "30-days") void getTopSellers(30, email);
  };

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.wrap}>
          <div className={cn("hero", styles.title)}>
            <span>Users</span> <br></br>of the <span>week</span>
          </div>
          <Form
            className={styles.form}
            placeholder="Search"
            value={email}
            setValue={setEmail}
            onSubmit={(event: any) => {
              event.preventDefault(); // Prevent the default form submission
              void searchHandle();
            }}
            buttonRight
          />
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.sorting}>
          <Tabs
            className={cn(styles.tabs, styles.tabsArtists)}
            items={typeArtists}
            value={type}
            setValue={setType}
          />
          <Tabs
            className={cn(styles.tabs, styles.tabsSorting)}
            items={timeSorting}
            value={time}
            setValue={setTime}
          />
        </div>
        <div className={styles.head}>
          <div className={styles.caption}>#</div>
          <div className={styles.caption}>User</div>
          <div className={styles.caption}>Total Sale</div>
        </div>
        <div className={styles.artists}>
          {loadingStatus == false ? (
            <>
              {artistsWeek.map((artist, index) => (
                <Artist item={artist} key={index} index={index} />
              ))}
              {artistsWeek.length === 0 && (
                <div className={styles.noDataHead}>
                  <h1> No Datas</h1>
                </div>
              )}
            </>
          ) : (
            <button
              className={cn("button-medium button-wide", styles.loadingDiv)}
            >
              <Image
                className={cn("loadingIcon", styles.loadingIcon)}
                src="/images/loading.gif"
                alt="Loading GIF"
                width={100}
                height={100}
              />
            </button>
          )}
        </div>
        <svg width="0" height="0" style={{ display: "block" }}>
          <clipPath id="polygonNumber" clipPathUnits="objectBoundingBox">
            <path d="M.396.076C.46.041.54.041.604.076l.242.129A.19.19 0 0 1 .95.371v.258a.19.19 0 0 1-.104.166L.604.924C.54.959.46.959.396.924L.154.795A.19.19 0 0 1 .05.629V.371A.19.19 0 0 1 .154.205L.396.076z" />
          </clipPath>
        </svg>
      </div>
    </div>
  );
};

export default Artists;
