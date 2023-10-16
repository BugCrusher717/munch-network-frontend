import Link from "next/link";
import styles from "./Item.module.sass";
import Image from "~/components/Image";
import AvatarGenerator from "~/components/common/Avatar-generator";
import { addressShortening } from "~/utils/address";

type ItemProps = {
  item: any;
};

const Item = ({ item }: ItemProps) => {
  return (
    <Link className={styles.item} href={item.url}>
      <div className={styles.preview}>
        {item.image && (
          <Image
            src={item.image}
            inscriptionsId={item.inscriptionId}
            layout="fill"
            objectFit="cover"
            alt="Result"
          />
        )}
        {item.address && <AvatarGenerator seed={item.address} />}
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{item.title}</div>
        {item.buy && (
          <>
            {item.buy === "Not Listed" ? (
              <div className={styles.content}>
                <span>Not Listed</span>
              </div>
            ) : (
              <div className={styles.content}>
                <span>Buy now</span> {item.buy} BTC
              </div>
            )}
          </>
        )}
        {item.reserve && (
          <div className={styles.content}>
            <span>Buy now</span> {item.reserve}
          </div>
        )}
        {item.floorPrice && (
          <div className={styles.content}>
            <span>Floor Price</span> {item.floorPrice} BTC
          </div>
        )}
        {item.address && (
          <div className={styles.content}>
            <span>Address</span> {addressShortening(item.address)}
          </div>
        )}
        {item.login && (
          <div className={styles.content}>
            <span>@</span> {item.login}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Item;
