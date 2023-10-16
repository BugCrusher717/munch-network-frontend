import Link from "next/link";
import cn from "classnames";
import styles from "./Collection.module.sass";
import Image from "~/components/Image";
import Users from "~/components/Users";
import Balance from "~/components/Balance";

type CollectionProps = {
  className?: string;
  item: any;
  dark?: boolean;
};

const Collection = ({ className, item, dark }: CollectionProps) => (
  <Link
    className={cn(
      styles.collection,
      { [styles.dark as string]: dark },
      className
    )}
    href={item.url}
  >
    <div className={styles.preview}>
      <Image
        className={styles.picture}
        src={item.image}
        inscriptionsId=""
        layout="fill"
        objectFit="cover"
        alt="Collection"
      />
      <div className={styles.category}>
        <div className={styles.image}>
          <Image
            src={item.categoryImage}
            inscriptionsId=""
            layout="fill"
            objectFit="cover"
            alt="Collection"
          />
        </div>
        {item.category}
      </div>
    </div>
    <div className={styles.details}>
      <div className={styles.title}>{item.title}</div>
      <Balance className={styles.balance} value={item.balance} dark={dark} />
      <div className={styles.floor}>
        Floor: <span>{item.floor}</span>
      </div>
      <Users className={styles.users} items={item.users} />
    </div>
  </Link>
);

export default Collection;
