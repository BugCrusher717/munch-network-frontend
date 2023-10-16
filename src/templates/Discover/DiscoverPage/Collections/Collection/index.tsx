import Link from "next/link";
import cn from "classnames";
import styles from "./Collection.module.sass";
import Image from "~/components/Image";

type CollectionProps = {
  className?: string;
  item: any;
};

const Collection = ({ className, item }: CollectionProps) => {
  return (
    <Link className={cn(styles.item, className)} href={item.url}>
      <div className={styles.images}>
        {item.images.slice(0, 4).map((image: any, key: number) => (
          <div className={styles.image} key={key}>
            {key === 0 ? (
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                alt="Collection item"
              />
            ) : (
              <Image
                src={image}
                layout="fill"
                objectFit="cover"
                alt="Collection item"
                inscriptionsId={item.inscription[key - 1].inscriptionId}
              />
            )}
          </div>
        ))}
      </div>
      <div className={styles.details}>
        <div className={styles.box}>
          <div className={cn("h4", styles.subtitle)}>{item.name}</div>
        </div>
        <div className={styles.box}>
          <div className={styles.text}>Floor Price</div>
          {item.floorPrice ? (
            <div className={cn("h4", styles.price)}>{item.floorPrice} BTC</div>
          ) : (
            <div className={cn("h4", styles.price)}> -- BTC</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Collection;
