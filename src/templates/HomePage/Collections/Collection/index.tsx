import Link from "next/link";
import styles from "./Collection.module.sass";
import Image from "~/components/Image";

type CollectionProps = {
  item: any;
};

const Collection = ({ item }: CollectionProps) => (
  <Link className={styles.collection} href={item.url}>
    <div className={styles.images}>
      {item.images.slice(0, 3).map((image: any, index: number) => (
        <div className={styles.image} key={index}>
          {index === 0 ? (
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt="Collection item"
            />
          ) : (
            <Image
              src={image}
              inscriptionsId={item.inscription[index - 1].inscriptionId}
              layout="fill"
              objectFit="cover"
              alt="Collection item"
            />
          )}
        </div>
      ))}
      <div
        className={styles.counter}
        style={{
          backgroundColor: item.color,
        }}
      >
        {item.itemCount - 2 > 0 ? <>+{item.itemCount - 2}</> : <>0</>}
      </div>
    </div>
    <div className={styles.details}>
      <div className={styles.box}>
        <div className={styles.subtitle}>{item.name}</div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>Floor Price</div>
        {item.floorPrice ? (
          <div className={styles.price}>{item.floorPrice} BTC</div>
        ) : (
          <div className={styles.price}> -- BTC</div>
        )}
      </div>
    </div>
  </Link>
);

export default Collection;
