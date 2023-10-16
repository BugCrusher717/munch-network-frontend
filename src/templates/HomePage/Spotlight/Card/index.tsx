import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "~/components/Image";
import { type PopularCollectionData } from "~/reducers/collectionSlice";

type CardProps = {
  className?: string;
  item: PopularCollectionData;
};

const Card = ({ className, item }: CardProps) => (
  <Link
    className={cn(styles.card, className)}
    href={item.link ? item.link : "/"}
  >
    <div className={styles.preview}>
      <Image
        src={item.imgUrl}
        layout="fill"
        objectFit="cover"
        alt={item.name}
      />
    </div>
    <div className={styles.line}>
      <div className={styles.details}>
        <div className={styles.title}>{item.name}</div>
        <div className={styles.price}>
          {item.floorPrice ? (
            <>
              <span>Floor Price</span> {item.floorPrice} BTC{" "}
            </>
          ) : (
            <>
              <span>Floor Price</span> -- BTC{" "}
            </>
          )}
        </div>
      </div>
    </div>
  </Link>
);

export default Card;
