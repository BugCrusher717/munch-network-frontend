import cn from "classnames";
import styles from "./FollowList.module.sass";
import Follower from "~/components/UserFollower";
import { useCallback, useEffect, useState } from "react";
import Spinner from "~/components/Spinner";

type FollowersType = {
  name: string;
  login: string;
  address: string;
};

type FollowListProps = {
  title: string;
  counter: number;
  items: FollowersType[];
  setPageCount: any;
  pageCount: number;
  totalPageCount: number;
};

const FollowList = ({
  title,
  counter,
  items,
  pageCount,
  setPageCount,
  totalPageCount,
}: FollowListProps) => {
  const [isScrolling, setIsScrolling] = useState(false);

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
    if (
      pageCount < totalPageCount &&
      setPageCount !== null &&
      isScrolling === true
    ) {
      setPageCount((_page: number) => pageCount + 1);
    }
  }, [isScrolling]);

  return (
    <div className={styles.followers}>
      <div className={cn("h3", styles.head)}>
        <div className={styles.title}>{title}</div>
        <div className={styles.counter}>{counter}</div>
      </div>
      <div className={styles.list}>
        {counter !== 0 &&
          items.map((item, index) => <Follower item={item} key={index} />)}
        {counter === 0 && <h1>No Members</h1>}
      </div>
      {pageCount < totalPageCount && <Spinner />}
    </div>
  );
};

export default FollowList;
