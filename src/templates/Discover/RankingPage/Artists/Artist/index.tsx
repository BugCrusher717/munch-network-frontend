import Link from "next/link";
import styles from "./Artist.module.sass";
import Image from "~/components/Image";
import AvatarGenerator from "~/components/common/Avatar-generator";

type ArtistProps = {
  item: any;
  index: number;
};

const Artist = ({ item, index }: ArtistProps) => {
  return (
    <Link className={styles.item} href={`/userProfile/${item.login}`}>
      <div className={styles.number}>
        <div className={styles.inner}>{index + 1}</div>
      </div>
      <div className={styles.artist}>
        <div className={styles.avatar}>
          <AvatarGenerator seed={item.avatar} />
        </div>
        <div className={styles.details}>
          <div className={styles.name}>{item.login}</div>
          <div className={styles.sale}>
            Total sale <span>{item.price}</span>
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.crypto}>{item.crypto}</div>
        <div className={styles.price}>{item.price}</div>
      </div>
    </Link>
  );
};

export default Artist;
