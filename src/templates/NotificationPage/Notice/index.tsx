import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import styles from "./Notice.module.sass";
import List from "~/components/List";
import Notifications from "./Notifications";
import Offer from "./Offer";
import Preview from "./Preview";
import {
  selectTotalActiveItemCount,
  selectTotalActivePageCount,
  selectTotalActiveSwapItemCount,
  selectTotalActiveSwapPageCount,
  setPreviewFlag,
} from "~/reducers/notificationSlice";

import { selectAddress } from "~/reducers/authSlice";
import { getFollowCount, getFollowerMembers } from "~/actions/profile";
import {
  selectFollowStatus,
  selectFollowerCount,
  selectFollowerMembers,
  selectTotalFollowerPageCount,
} from "~/reducers/profileSlice";
import ConfirmDialog from "~/components/ConfirmDialog";

const Notice = () => {
  const [sorting, setSorting] = useState<string>("notification");
  const [followerPage, setFollowerPage] = useState<number>(1);
  const totalFollowerCount = useSelector(selectFollowerCount);
  const followStatus = useSelector(selectFollowStatus);
  const address = useSelector(selectAddress);
  const followerMembers = useSelector(selectFollowerMembers);
  const totalActivePageCount = useSelector(selectTotalActivePageCount);
  const totalActiveSwapPageCount = useSelector(selectTotalActiveSwapPageCount);
  const totalActiveItemCount = useSelector(selectTotalActiveItemCount);
  const totalActiveSwapItemCount = useSelector(selectTotalActiveSwapItemCount);
  const totalFollowerPageCount = useSelector(selectTotalFollowerPageCount);

  const dispatch = useDispatch();

  const [showFlag, setShowFlag] = useState<string>("");
  const [typeFlag, setTypeFlag] = useState<string>("");

  useEffect(() => {
    dispatch(setPreviewFlag(true));
  }, []);

  const tabsTokens = [
    {
      title: "Notification",
      value: "notification",
      counter: totalFollowerCount,
    },
    {
      title: "Offers",
      value: "offer",
      counter: String(totalActiveItemCount + totalActiveSwapItemCount),
    },
  ];

  useEffect(() => {
    if (address) {
      void getFollowerMembers(address, followerPage, 20);
      void getFollowCount(address);
    }
  }, [address, followerPage, followStatus]);

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <List tabs={tabsTokens} tabsValue={sorting} setTabsValue={setSorting}>
          {sorting === "notification" ? (
            <Notifications
              items={followerMembers}
              totalCount={totalFollowerCount}
              followerPage={followerPage}
              setFollowerPage={setFollowerPage}
              totalPageCount={totalFollowerPageCount}
            />
          ) : (
            <Offer
              totalActivePageCount={totalActivePageCount}
              totalActiveSwapPageCount={totalActiveSwapPageCount}
              totalActiveItemCount={totalActiveItemCount}
              totalActiveSwapItemCount={totalActiveSwapItemCount}
              setShowFlag={setShowFlag}
              setTypeFlag={setTypeFlag}
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
