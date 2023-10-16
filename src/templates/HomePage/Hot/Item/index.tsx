import Link from "next/link";
import styles from "./Item.module.sass";
import AvatarGenerator from "~/components/common/Avatar-generator";

type ItemProps = {
  item: any;
  number: number;
};

const Item = ({ item, number }: ItemProps) => (
  <Link className={styles.item} href={item.url}>
    <div className={styles.number}>
      <div className={styles.inner}>{number + 1}</div>
    </div>
    <div className={styles.avatar}>
      <AvatarGenerator seed={item.address} />
    </div>
    <div className={styles.login}>@{item.login}</div>
    <div className={styles.total}>
      Total sale <span>{item.total}</span>
    </div>
  </Link>
);

export default Item;
