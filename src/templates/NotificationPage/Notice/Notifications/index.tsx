import cn from "classnames";
import styles from "./Notifications.module.sass";
import Spinner from "~/components/Spinner";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Follower from "~/components/NotificationFollower";
import Image from "next/image";
import {
  selectLoadingStatus,
  setPreviewFlag,
} from "~/reducers/notificationSlice";
type NotificationProps = {
  items: any;
  totalCount: number;
  followerPage: number;
  setFollowerPage: any;
  totalPageCount: number;
};

const Notifications = ({
  items,
  totalCount,
  followerPage,
  setFollowerPage,
  totalPageCount,
}: NotificationProps) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const loadingStatus = useSelector(selectLoadingStatus);
  const dispatch = useDispatch();

  const onScroll = useCallback((_event: any) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    // Calculate the percentage of scroll progress
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 99) {
      setIsScrolling((_isScrolling) => true);
    } else {
      setIsScrolling((_isScrolling) => false);
    }
  }, []);

  useEffect(() => {
    if (isScrolling === true && followerPage < totalPageCount) {
      setFollowerPage((_showCount: number) => followerPage + 1);
    }
  }, [isScrolling]);

  useEffect(() => {
    //add eventlistener to window
    dispatch(setPreviewFlag(false));

    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={styles.notifications}>
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
          {totalCount > 0 ? (
            <>
              <div className={cn("h3", styles.title)}>Notification</div>
              <div className={styles.list}>
                {items.map((x: any, index: number) => (
                  <Follower item={x} key={index} />
                ))}
              </div>
              {items.length < totalCount && <Spinner />}
            </>
          ) : (
            <h1>No Notification</h1>
          )}
        </>
      )}
    </div>
  );
};
export default Notifications;
