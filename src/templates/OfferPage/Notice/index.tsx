import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import styles from "./Notice.module.sass";
import List from "~/components/List";
import Preview from "./Preview";

import PendingOffer from "./PendingOffer";
import {
  selectPendingItemCount,
  selectPendingPageCount,
  selectPendingSwapItemCount,
  selectPendingSwapPageCount,
  selectReceivedItemCount,
  selectReceivedPageCount,
  selectReceivedSwapItemCount,
  selectReceivedSwapPageCount,
} from "~/reducers/offerSlice";
import { getOffers, getSwapOffers } from "~/actions/offer";
import ReceivedOffer from "./ReceivedOffer";
import AcceptOffer from "./AcceptOffer";
import CancelOffer from "./CancelOffer";
import ExpireOffer from "./ExpireOffer";
import { selectIsAuthenticated } from "~/reducers/authSlice";
import ConfirmDialog from "~/components/ConfirmDialog";
import {
  selectTotalActiveItemCount,
  selectTotalActivePageCount,
  selectTotalActiveSwapItemCount,
  selectTotalActiveSwapPageCount,
  setPreviewFlag,
} from "~/reducers/notificationSlice";

const Notice = () => {
  const [sorting, setSorting] = useState<string>("received");
  const totalPendingItemCount = useSelector(selectPendingItemCount);
  const totalPendingPageCount = useSelector(selectPendingPageCount);
  const totalPendingSwapItemCount = useSelector(selectPendingSwapItemCount);
  const totalPendingSwapPageCount = useSelector(selectPendingSwapPageCount);
  const totalActivePageCount = useSelector(selectTotalActivePageCount);
  const totalActiveSwapPageCount = useSelector(selectTotalActiveSwapPageCount);
  const totalActiveItemCount = useSelector(selectTotalActiveItemCount);
  const totalActiveSwapItemCount = useSelector(selectTotalActiveSwapItemCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [showFlag, setShowFlag] = useState<string>("");
  const [typeFlag, setTypeFlag] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPreviewFlag(false));
  }, []);

  const tabsTokens = [
    {
      title: "Received",
      value: "received",
      counter: String(totalActiveItemCount + totalActiveSwapItemCount),
    },
    {
      title: "Accept",
      value: "accept",
      counter: String(0),
    },
    {
      title: "Pending",
      value: "pending",
      counter: String(totalPendingItemCount + totalPendingSwapItemCount),
    },
    {
      title: "Canceled",
      value: "canceled",
      counter: String(0),
    },
    {
      title: "Expired",
      value: "expired",
      counter: String(0),
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      void getOffers(1, "pending");
      void getSwapOffers(1, "pending");
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <List tabs={tabsTokens} tabsValue={sorting} setTabsValue={setSorting}>
          {sorting === "received" && (
            <ReceivedOffer
              totalActivePageCount={totalActivePageCount}
              totalActiveItemCount={totalActiveItemCount}
              totalActiveSwapItemCount={totalActiveSwapItemCount}
              totalActiveSwapPageCount={totalActiveSwapPageCount}
              setShowFlag={setShowFlag}
              setTypeFlag={setTypeFlag}
            />
          )}

          {sorting === "accept" && (
            <AcceptOffer
              totalActivePageCount={0}
              totalActiveItemCount={0}
              totalActiveSwapItemCount={0}
              totalActiveSwapPageCount={0}
            />
          )}

          {sorting === "pending" && (
            <PendingOffer
              totalActivePageCount={totalPendingPageCount}
              totalActiveItemCount={totalPendingItemCount}
              totalActiveSwapItemCount={totalPendingSwapItemCount}
              totalActiveSwapPageCount={totalPendingSwapPageCount}
              setShowFlag={setShowFlag}
              setTypeFlag={setTypeFlag}
            />
          )}

          {sorting === "canceled" && (
            <CancelOffer
              totalActivePageCount={0}
              totalActiveItemCount={0}
              totalActiveSwapItemCount={0}
              totalActiveSwapPageCount={0}
            />
          )}

          {sorting === "expired" && (
            <ExpireOffer
              totalActivePageCount={0}
              totalActiveItemCount={0}
              totalActiveSwapItemCount={0}
              totalActiveSwapPageCount={0}
            />
          )}
        </List>
      </div>
      <div className={styles.col}>
        <Preview />
      </div>
      {showFlag !== "" && (
        <ConfirmDialog
          transactionLink={showFlag}
          setShowFlag={setShowFlag}
          typeFlag={typeFlag}
        />
      )}
    </div>
  );
};

export default Notice;
