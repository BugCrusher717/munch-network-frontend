import Link from "next/link";
import cn from "classnames";
import styles from "./Details.module.sass";

interface DetailsProps {
  link: string;
  swapLink: string;
  buyNowPrice: string;
}

const Details = ({ link, swapLink, buyNowPrice }: DetailsProps) => (
  <div className={styles.details}>
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.label}>Buy now</div>
        <div className={cn("h4", styles.value)}>{buyNowPrice} BTC</div>
        {buyNowPrice !== `0` ? (
          <Link
            className={cn("button-medium button-wide", styles.button)}
            href={link}
          >
            buy now
          </Link>
        ) : (
          <button className={cn("button-medium button-wide", styles.button)}>
            buy now
          </button>
        )}
      </div>
      <div className={styles.col}>
        <div className={styles.swapValue}>Swap</div>
        {buyNowPrice !== `0` ? (
          <Link
            href={swapLink}
            className={cn("button-medium button-wide", styles.button)}
          >
            swap now
          </Link>
        ) : (
          <button className={cn("button-medium button-wide", styles.button)}>
            swap now
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Details;
