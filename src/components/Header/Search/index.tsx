import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { disablePageScroll, enablePageScroll } from "scroll-lock";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import cn from "classnames";
import styles from "./Search.module.sass";
import Icon from "~/components/Icon";
import Item from "./Item";
import { getSearchResult } from "~/actions/search";
import Image from "next/image";
import {
  selectCollections,
  selectInscriptions,
  selectLoadingStatus,
  selectTotalCount,
  selectUsers,
  selectVisibleStatus,
  setVisibleStatus,
} from "~/reducers/searchSlice";

type ItemsType = {
  title: string;
  buy?: string;
  reserve?: string;
  login?: string;
  image?: string;
  url: string;
};

type ResultType = {
  title: string;
  items: ItemsType[];
};

type SearchProps = {
  className?: string;
  light?: boolean;
  result?: ResultType[];
};

const Search = ({ className, light }: SearchProps) => {
  const [visible, setVisible] = useState<boolean>(false);
  const resultVisible = useSelector(selectVisibleStatus);
  const [search, setSearch] = useState<string>("");

  const usersData = useSelector(selectUsers);
  const inscriptionsData = useSelector(selectInscriptions);
  const collectionsData = useSelector(selectCollections);

  const totalCount = useSelector(selectTotalCount);
  const loadingStatus = useSelector(selectLoadingStatus);

  const dispatch = useDispatch();

  const onChange = (e: any) => {
    setSearch(e.target.value as string);
  };

  const onHandleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      void getSearchResult(e.target.value as string);
      dispatch(setVisibleStatus(true));
    }
  };

  const handleToggle = () => {
    setVisible(!visible);
    setSearch("");
    dispatch(setVisibleStatus(false));
  };

  const handleClear = () => {
    setSearch("");
    dispatch(setVisibleStatus(false));
  };

  const initialRender = useRef(true);

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      isDesktop && (resultVisible ? disablePageScroll() : enablePageScroll());
    }
  }, [resultVisible, isDesktop]);

  return (
    <div
      className={cn(
        styles.search,
        {
          [styles.active as string]: visible,
          [styles.visible as string]: resultVisible,
          [styles.light as string]: light,
        },
        className
      )}
    >
      <div className={styles.head}>
        <div className={styles.field}>
          <input
            className={styles.input}
            type="text"
            value={search}
            onChange={onChange}
            onKeyDown={onHandleKeyDown}
            placeholder="Search ..."
          />
        </div>
        <button className={styles.clear} onClick={handleClear}>
          clear
        </button>
        <button className={styles.toggle} onClick={handleToggle}>
          <Icon name="search" />
          <Icon name="close" />
        </button>
      </div>
      <div
        className={cn(styles.result, {
          [styles.visible as string]: resultVisible,
        })}
      >
        {loadingStatus === false ? (
          <>
            {totalCount > 0 ? (
              <>
                {inscriptionsData.length > 0 && (
                  <div className={styles.group}>
                    <div className={styles.category}>Inscriptions</div>
                    <div className={styles.list}>
                      {inscriptionsData.map((item, index) => (
                        <Item item={item} key={index} />
                      ))}
                    </div>
                  </div>
                )}
                {collectionsData.length > 0 && (
                  <div className={styles.group}>
                    <div className={styles.category}>Collections</div>
                    <div className={styles.list}>
                      {collectionsData.map((item, index) => (
                        <Item item={item} key={index} />
                      ))}
                    </div>
                  </div>
                )}
                {usersData.length > 0 && (
                  <div className={styles.group}>
                    <div className={styles.category}>Users</div>
                    <div className={styles.list}>
                      {usersData.map((item, index) => (
                        <Item item={item} key={index} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={cn("h3", styles.label)}>No Results</div>
            )}
          </>
        ) : (
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
      </div>
    </div>
  );
};

export default Search;
