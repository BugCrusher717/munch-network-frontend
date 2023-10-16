import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Spotlight.module.sass";
import Tabs from "~/components/Tabs";
import Card from "./Card";
import Image from "next/image";
import { tabs } from "~/mocks/spotlight";
import { getPopularCollection } from "~/actions/collection";
import { useSelector } from "react-redux";
import {
  selectLoadingStatus,
  selectPopularCollectionData,
} from "~/reducers/collectionSlice";

const Spotlight = () => {
  const [sorting, setSorting] = useState<number>(1);
  const popularCollectionData = useSelector(selectPopularCollectionData);
  const loadingStatus = useSelector(selectLoadingStatus);

  useEffect(() => {
    void getPopularCollection(sorting);
  }, [sorting]);

  return (
    <div className={styles.spotlight}>
      <div className={styles.head}>
        <div className={styles.details}>
          <div className={cn("h1", styles.title)}>Popular Collections.</div>
          <div className={styles.info}>Projects you&apos;ll love</div>
        </div>
        <Tabs
          className={styles.tabs}
          items={tabs}
          value={sorting}
          setValue={setSorting}
          dark
        />
      </div>
      <div className={styles.list}>
        {loadingStatus === true ? (
          <div className={styles.loadingDiv}>
            <Image
              className={cn("loadingIcon", styles.loadingIcon)}
              src="/images/loading.gif"
              alt="Loading GIF"
              width={100}
              height={100}
            />
          </div>
        ) : (
          <>
            {popularCollectionData.length > 0 ? (
              popularCollectionData.map((card, index) => (
                <Card className={styles.card} item={card} key={index} />
              ))
            ) : (
              <div className={styles.noDiv}>
                <h1>No Collection Data</h1>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Spotlight;
