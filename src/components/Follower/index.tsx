import Link from "next/link";
import cn from "classnames";
import styles from "./Follower.module.sass";
import Follow from "~/components/UserFollow";
import AvatarGenerator from "../common/Avatar-generator";
import { useSelector } from "react-redux";
import { selectAddress } from "~/reducers/authSlice";
import { useEffect, useState } from "react";
import Image from "next/image";

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
          <div className={styles.name}>{item.name}</div>
          <div className={styles.login}>@{item.login}</div>
        </div>
      </Link>
      {ownerAddress !== item.address ? (
        <Follow
          className={styles.follow}
          value={follwerStatus}
          setValue={setFollowerStatus}
          item={item}
          address={item.address}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Follower;
