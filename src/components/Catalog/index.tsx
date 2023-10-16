import { useState } from "react";
import {} from "react-redux";
import cn from "classnames";
import styles from "./Catalog.module.sass";
import Icon from "~/components/Icon";
import Tabs from "~/components/Tabs";
import Filters from "~/components/Filters";
import Sorting from "./Sorting";
import Card from "./Card";
import Image from "next/image";

type TabsType = {
  title: string;
  value: string;
  counter?: string;
};

type CatalogProps = {
  title: string;
  tabsSorting?: TabsType[];
  tabsTime: TabsType[];
  dark?: boolean;
  filters: any;
  items: any;
  scrollToRef?: any;
  loadingStatus: boolean;
  setTakeCount: any;
  totalItemCount: number;
};

const Catalog = ({
  title,
  tabsSorting,
  tabsTime,
  filters,
  items,
  dark,
  scrollToRef,
  loadingStatus,
  setTakeCount,
  totalItemCount,
}: CatalogProps) => {
  const [sorting, setSorting] = useState<string>("all");
  const [time, setTime] = useState<string>("30-days");
  const [theme, setTheme] = useState<boolean>(false);
  const [filter, setFilter] = useState<boolean>(false);

  return (
    <div
      className={cn(styles.catalog, { [styles.dark as string]: dark || theme })}
    >
      {tabsSorting && (
        <Sorting
          tabs={tabsSorting}
          sorting={sorting}
          setSorting={setSorting}
          theme={theme}
          setTheme={setTheme}
          dark={theme}
        />
      )}
      <div className={styles.wrapper} ref={scrollToRef}>
        <div className={styles.top}>
          <div className={cn("h1", styles.title)}>{title}</div>
          <Tabs
            className={styles.tabs}
            items={tabsTime}
            value={time}
            setValue={setTime}
            dark={dark || theme}
          />
          <button
            className={cn(styles.toggle, {
              [styles.active as string]: filter,
            })}
            onClick={() => setFilter(!filter)}
          >
            <Icon className={styles.filter} name="filter-1" />
            <Icon className={styles.close} name="close" />
          </button>
        </div>
        {filter && <Filters statuses={filters} dark={dark || theme} />}
        <div className={styles.list}>
          <>
            {totalItemCount !== 0 ? (
              <>
                {items.map((card: any, index: number) => (
                  <Card
                    className={styles.card}
                    item={card}
                    dark={dark || theme}
                    key={index}
                  />
                ))}
              </>
            ) : (
              <>
                {loadingStatus === false && (
                  <div className={styles.noItemDiv}>
                    <h1>No NFTS</h1>
                  </div>
                )}
              </>
            )}
          </>
        </div>
        <div className={styles.btns}>
          {loadingStatus === true && (
            <div className={styles.loadingDiv}>
              <Image
                className={cn("loadingIcon", styles.loadingIcon)}
                src="/images/loading.gif"
                alt="Loading GIF"
                width={100}
                height={100}
              />
            </div>
          )}
          {loadingStatus === false && items.length < totalItemCount && (
            <button
              className={cn(
                {
                  "button-stroke button-medium": !dark || !theme,
                  "button-stroke-white button-medium": dark || theme,
                },
                styles.button
              )}
              onClick={() => {
                setTakeCount((_count: number) => _count + 1);
              }}
            >
              load more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
