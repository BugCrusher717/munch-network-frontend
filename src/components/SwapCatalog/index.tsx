import cn from "classnames";
import styles from "./SwapCatalog.module.sass";
import Card from "./Card";
import { useRouter } from "next/router";
import {
  formatSwapNowInscriptionId,
  selectSwapNowUrl,
  setCheckStatus,
  setSwapNowInscriptionId,
} from "~/reducers/swapNowSlice";
import { useDispatch, useSelector } from "react-redux";
import Icon from "~/components/Icon";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type TabsType = {
  title: string;
  value: string;
  counter?: string;
};

type CatalogProps = {
  title: string;
  tabsTime: TabsType[];
  dark?: boolean;
  filters: any;
  items: any;
  scrollToRef?: any;
  loadingStatus: boolean;
  onClose?: any;
  totalPageCount: number;
  page: number;
  setPage: any;
};

const SwapCatalog = ({
  title,
  items,
  dark,
  scrollToRef,
  loadingStatus,
  onClose,
  totalPageCount,
  page,
  setPage,
}: CatalogProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const swapUrl = useSelector(selectSwapNowUrl);

  const [isScrolling, setIsScrolling] = useState(false);

  const onScroll = useCallback((_event: any) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 99) {
      setIsScrolling((_isScrolling) => true);
    } else {
      setIsScrolling((_isScrolling) => false);
    }
  }, []);

  useEffect(() => {
    if (
      page < totalPageCount &&
      isScrolling === true &&
      loadingStatus === false
    ) {
      setPage((_page: number) => page + 1);
    }
  }, [isScrolling]);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onNftClicked = (inscriptionId: string, checked: boolean) => {
    dispatch(setCheckStatus({ inscriptionId, checked }));
  };

  const onConfirmBtnClicked = (url: string) => {
    dispatch(formatSwapNowInscriptionId([]));
    items.forEach((item: any) => {
      if (item.checked === true)
        dispatch(setSwapNowInscriptionId(item.inscriptionId));
    });
    void router.push(url);
    void onClose();
  };

  return (
    <div
      className={cn(styles.catalog, { [styles.dark as string]: dark })}
      id="scrollContainer"
    >
      <div className={styles.wrapper} ref={scrollToRef}>
        <div className={styles.top}>
          <div className={cn("h1", styles.title)}>{title}</div>
          <button
            className={cn("button-circle button-medium", styles.close)}
            onClick={onClose}
          >
            <Icon name="close-fat" />
          </button>
        </div>
        <div className={styles.btnDiv}>
          {items.length > 0 && (
            <div className={styles.confirmBtn}>
              <button
                className={cn("button-large button-wide", styles.button)}
                onClick={() => onConfirmBtnClicked(swapUrl)}
              >
                Confirm
              </button>
            </div>
          )}
        </div>

        <div className={styles.list}>
          {items.length > 0 && (
            <>
              {items.map((card: any, index: number) => (
                <Card
                  className={styles.card}
                  item={card}
                  dark={dark}
                  key={index}
                  onClick={() => {
                    void onNftClicked(card.inscriptionId, card.checked);
                  }}
                />
              ))}
            </>
          )}
        </div>

        <div className={styles.btnDiv}>
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
              {items.length === 0 && (
                <div className={styles.noShowingDiv}>No Inscriptions</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapCatalog;
