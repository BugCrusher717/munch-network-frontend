import Link from "next/link";
import cn from "classnames";
import styles from "./Auctions.module.sass";
import Image from "~/components/Image";
import AvatarGenerator from "../common/Avatar-generator";

type ItemsType = {
  login: string;
  crypto: string;
  price: string;
  image: string;
  avatar: string;
  url: string;
  inscriptionId: string;
};

type AuctionsProps = {
  color?: string;
  items: ItemsType[];
  totalItemCount: number;
};

const Auctions = ({ color, items, totalItemCount }: AuctionsProps) => (
  <div className={styles.row}>
    <div className={styles.col} style={{ backgroundColor: color }}>
      <div className={styles.wrap}>
        <div className={cn("h1", styles.title)}>Latest Sales</div>
        <Link
          className={cn("button-white button-counter", styles.button)}
          href="/discover"
        >
          explorer more
          <span>{totalItemCount}</span>
        </Link>
      </div>
    </div>
    <div className={styles.col}>
      <div className={styles.list}>
        {items.map((item, index) => (
          <Link className={styles.item} href={item.url} key={index}>
            <Image
              inscriptionsId={item.inscriptionId}
              className={styles.image}
              src={item.image}
              layout="fill"
              objectFit="cover"
              alt="Auction"
            />
            <div className={styles.details}>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  <AvatarGenerator seed={item.avatar} />
                </div>
                @{item.login}
              </div>
              <div className={styles.line}>
                <div className={styles.box}>
                  <div className={styles.category}>Price</div>
                  <div className={cn("h3", styles.crypto)}>{item?.crypto}</div>
                  <div className={styles.price}>{item.price}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default Auctions;
