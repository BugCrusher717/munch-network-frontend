import styles from "./Details.module.sass";

type DetailsProps = {
  collection: string;
  price: string;
  reserve: string;
};

const Details = ({ collection, price, reserve }: DetailsProps) => (
  <div className={styles.details}>
    <div className={styles.item}>
      <div className={styles.category}>Collection</div>
      <div className={styles.value}>{collection}</div>
    </div>
    <div className={styles.item}>
      <div className={styles.category}>Buy now</div>
      <div className={styles.value}>{price} BTC</div>
    </div>
  </div>
);

export default Details;
