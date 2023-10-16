import { useState } from "react";
import cn from "classnames";
import styles from "./Artist.module.sass";
import AvatarGenerator from "~/components/common/Avatar-generator";
import Link from "next/link";

type ArtistProps = {
  item: any;
};

const Artist = ({ item }: ArtistProps) => {
  const [follow, setFollow] = useState<boolean>(false);

  return (
    <Link href={`/userProfile/${item.login}`}>
      <div className={styles.artist}>
        <div className={styles.avatar}>
          <AvatarGenerator seed={item.avatar} />
        </div>
        <div className={styles.details}>
          <div className={styles.login}>@{item.login}</div>
          <div className={styles.price}>
            Total sale <span>{item.price}</span>
          </div>
        </div>
        <div
          className={cn("button-stroke button-medium", styles.button, {
            [styles.active as string]: item.follow,
          })}
        >
          Follow<span>ing</span>
        </div>
      </div>
    </Link>
  );
};

export default Artist;
