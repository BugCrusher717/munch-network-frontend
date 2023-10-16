import { useEffect, useState } from "react";
import Link from "next/link";
import cn from "classnames";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./Follower.module.sass";
import Follow from "~/components/UserFollow";
import { selectAddress } from "~/reducers/authSlice";
import AvatarGenerator from "../common/Avatar-generator";

type FollowerProps = {
  item: any;
};

const Follower = ({ item }: FollowerProps) => {
  const ownerAddress = useSelector(selectAddress);
  const [follwerStatus, setFollowerStatus] = useState<boolean>(false);

  useEffect(() => {
    setFollowerStatus((_followStatus) => item.follow);
  }, [item.follow]);

  return (
    <div className={styles.follower}>
      <Link className={styles.user} href={item.url}>
        <div
          className={cn(styles.avatar, {
            [styles.history as string]: item.history,
          })}
        >
          {item.address ? (
            <AvatarGenerator seed={item.address} />
          ) : (
            <Image
              src={item.avatar}
              layout="fill"
              objectFit="cover"
              alt="Background"
            />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.name}>@{item.name} followed you</div>
          <div className={styles.login}>{item.date}</div>
        </div>
      </Link>
      {ownerAddress !== item.address ? (
        <Follow
          className={styles.follow}
          value={follwerStatus}
          setValue={setFollowerStatus}
          address={item.address}
          item={item}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Follower;
