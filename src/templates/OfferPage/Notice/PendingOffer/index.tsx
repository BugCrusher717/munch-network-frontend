import cn from "classnames";
import styles from "./Offer.module.sass";
import Image from "next/image";
import {
  setPreviewData,
  setPreviewFlag,
  type SwapActiveOffer,
} from "~/reducers/notificationSlice";

import AvatarGenerator from "~/components/common/Avatar-generator";
import { addressShortening } from "~/utils/address";
import { useSelector } from "react-redux";

import { useCallback, useEffect, useState } from "react";

import { selectBuyNowPercentage } from "~/reducers/buyNowSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  selectLoadingStatus,
  selectPendingOffers,
  selectPendingSwapOffers,
} from "~/reducers/offerSlice";
import {
  formatPendingOffers,
  formatPendingSwapOffers,
  getOffers,
  getSwapOffers,
} from "~/actions/offer";

interface OfferProps {
  totalActivePageCount: number;
  totalActiveSwapPageCount: number;
  totalActiveItemCount: number;
  totalActiveSwapItemCount: number;
  setShowFlag: any;
  setTypeFlag: any;
}

const PendingOffer = ({
  totalActivePageCount,
  totalActiveSwapPageCount,
  totalActiveItemCount,
  totalActiveSwapItemCount,
  setShowFlag,
  setTypeFlag,
}: OfferProps) => {
  const activeOffers = useSelector(selectPendingOffers);
  const swapActiveOffers = useSelector(selectPendingSwapOffers);
  const feePercentage = useSelector(selectBuyNowPercentage);
  const loadingStatus = useSelector(selectLoadingStatus);
  const [percent, setPercent] = useState<number>(100);

  const [offerPage, setOfferPage] = useState<number>(1);
  const [swapOfferPage, setSwapOfferPage] = useState<number>(1);
  const [flag, setFlag] = useState<boolean>(false);

  const dispatch = useDispatch();

  const onBuyNowCancelBtnClicked = (uuid: string) => {
    setShowFlag(uuid);
    setTypeFlag("PendingBuyNow");
  };

  const onSwapCancelBtnClicked = (uuid: string) => {
    setTypeFlag("PendingSwap");
    setShowFlag(uuid);
  };

  const onScroll = useCallback((_event: any) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    // Calculate the percentage of scroll progress
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 99) {
      if (flag === false) {
        if (offerPage >= totalActivePageCount) {
          setFlag((_flag: boolean) => true);
          setSwapOfferPage((_swapOfferPage: number) => _swapOfferPage + 1);
        } else {
          setOfferPage((_offerPage: number) => _offerPage + 1);
        }
      } else {
        setSwapOfferPage((_swapOfferPage: number) => _swapOfferPage + 1);
      }
    }
  }, []);

  const onViewButtonClickd = (offerData: any) => {
    dispatch(setPreviewData(undefined));
    dispatch(setPreviewFlag(true));
    dispatch(setPreviewData(offerData));
  };

  useEffect(() => {
    void formatPendingOffers();
    void formatPendingSwapOffers();
  }, []);

  useEffect(() => {
    if (feePercentage) {
      setPercent((_percent) => 100 - feePercentage);
    }
  }, [feePercentage, percent]);

  useEffect(() => {
    if (totalActivePageCount === 0 && totalActiveSwapPageCount !== 0) {
      setFlag((_flag: boolean) => true);
    }
  }, [totalActivePageCount, totalActiveSwapPageCount]);

  useEffect(() => {
    if (offerPage <= totalActivePageCount) {
      void getOffers(offerPage, "pending");
    } else {
      setFlag((_flag: boolean) => true);
      setSwapOfferPage((_swapOfferPage: number) => _swapOfferPage + 1);
    }
  }, [offerPage]);

  useEffect(() => {
    if (swapOfferPage <= totalActiveSwapPageCount) {
      void getSwapOffers(swapOfferPage, "pending");
    }
  }, [swapOfferPage]);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.offer}>
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
          {activeOffers.length > 0 && (
            <>
              <div className={cn("h3", styles.title)}>
                {totalActiveItemCount} Buy Now Offer
              </div>
              <div className={styles.content}>
                {activeOffers.map((offerData, index) => (
                  <div key={index} className={styles.box} id="scrollContainer">
                    <div className={styles.user}>
                      <div className={styles.avatar}>
                        {offerData.userAddress && (
                          <AvatarGenerator seed={offerData.userAddress} />
                        )}
                      </div>
                      <div className={styles.swapdetails}>
                        <div className={styles.swapdetailsdiv}>
                          <div className={styles.line}>
                            <div className={styles.text}>Sent to</div>
                          </div>
                          <div className={styles.login}>
                            @{offerData.userName}
                          </div>
                        </div>
                        <div className={styles.imageDiv}>
                          <button
                            className={cn(
                              "button-white button-wide button-large",
                              styles.viewButton
                            )}
                            onClick={() => void onViewButtonClickd(offerData)}
                          >
                            View Offer
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.subtitle}>Offer price</div>
                    <div className={styles.list}>
                      <div className={styles.item}>
                        <div className={cn("h3", styles.price)}>
                          {offerData.price}
                        </div>
                        <div className={cn("h3", styles.price)}>BTC</div>
                      </div>
                      <div className={styles.item}>
                        <div className={styles.label}>Crypter fee</div>
                        <div className={styles.value}>{feePercentage}%</div>
                      </div>
                      <div className={styles.item}>
                        <div className={styles.label}>Total receive</div>
                        <div className={styles.percent}>{percent}%</div>
                        <div className={styles.value}>
                          {Math.floor(
                            ((offerData.price * percent) / 100) * 10 ** 8
                          ) /
                            10 ** 8}{" "}
                          BTC
                        </div>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={cn(
                          "button-white button-wide button-large",
                          styles.button
                        )}
                        onClick={() =>
                          void onBuyNowCancelBtnClicked(offerData.uuid)
                        }
                      >
                        Cancel offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {swapActiveOffers.length > 0 && flag === true && (
            <>
              <div className={cn("h3", styles.title)}>
                {totalActiveSwapItemCount} Swap Offer
              </div>
              <div className={styles.content}>
                {swapActiveOffers.map((offerData: SwapActiveOffer, index) => (
                  <div key={index} className={styles.box}>
                    <div className={styles.user}>
                      <div className={styles.avatar}>
                        {offerData?.userAddress && (
                          <AvatarGenerator seed={offerData.userAddress} />
                        )}
                      </div>
                      <div className={styles.swapdetails}>
                        <div className={styles.swapdetailsdiv}>
                          <div className={styles.line}>
                            <div className={styles.text}>Sent to</div>
                          </div>
                          <div className={styles.login}>
                            @{offerData.userName}
                          </div>
                        </div>
                        <div className={styles.imageDiv}>
                          <button
                            className={cn(
                              "button-white button-wide button-large",
                              styles.viewButton
                            )}
                            onClick={() => void onViewButtonClickd(offerData)}
                          >
                            View Offer
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className={styles.subtitle}>Offer price</div>
                    <div className={styles.list}>
                      <div className={styles.item}>
                        <div className={cn("h3", styles.price)}>
                          {offerData.price}
                        </div>
                        <div className={cn("h3", styles.price)}>BTC</div>
                      </div>
                      <div className={styles.item}>
                        <div className={styles.label}>Crypter fee</div>
                        <div className={styles.value}>{feePercentage}%</div>
                      </div>
                      <div className={styles.item}>
                        <div className={styles.label}>InscriptionId</div>
                        <div className={styles.value}>
                          {offerData.swapInscriptionId.map((address, index) => (
                            <div key={index}>
                              <Link
                                href={`inscription/${address}`}
                                target="_blank"
                              >
                                {addressShortening(address)}
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className={styles.item}>
                        <div className={styles.label}>Total receive</div>
                        <div className={styles.percent}>{percent}%</div>
                        <div className={styles.value}>
                          {Math.floor(
                            ((offerData.price * percent) / 100) * 10 ** 8
                          ) /
                            10 ** 8}{" "}
                          BTC
                        </div>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={cn(
                          "button-white button-wide button-large",
                          styles.button
                        )}
                        onClick={() =>
                          void onSwapCancelBtnClicked(offerData.uuid)
                        }
                      >
                        Cancel offer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          {totalActiveItemCount + totalActiveSwapItemCount === 0 && (
            <h1>No Pending Offers</h1>
          )}
        </>
      )}
    </div>
  );
};

export default PendingOffer;
