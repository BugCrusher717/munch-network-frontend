import Link from "next/link";
import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "~/components/Image";
import AvatarGenerator from "~/components/common/Avatar-generator";

type CardProps = {
  className?: string;
  item: any;
  dark?: any;
};

const Card = ({ className, item, dark }: CardProps) => (
  <Link
    className={cn(styles.card, { [styles.dark as string]: dark }, className)}
    href={item.url}
  >
    <div className={styles.preview}>
      <Image
        className={styles.photo}
        inscriptionsId={item.inscriptionId}
        src={item.image}
        layout="fill"
        objectFit="cover"
        alt="Card"
      />
      <div className={styles.category}>
        <div className={styles.image}>
          <Image
            src={item.imageCategory}
            layout="fill"
            objectFit="cover"
            alt="Photo category"
          />
        </div>
        {item.category}
      </div>
      <div className={styles.title}>{item.title}</div>
    </div>
    <div className={styles.user}>
      <div className={styles.avatar}>
        {(item.avatar as string).startsWith("http") ? (
          <Image
            src={item.avatar}
            layout="fill"
            objectFit="cover"
            alt="Avatar"
          />
        ) : (
          <AvatarGenerator seed={item.avatar} />
        )}
      </div>
      <div className={styles.login}>@{item.login}</div>
      {item.verified && (
        <div className={styles.verified}>
          <Image
            src="/images/verified.png"
            width={100}
            height={100}
            alt="Verified"
          />
        </div>
      )}
    </div>
    <div className={styles.foot}>
      <div className={styles.box}>
        <div className={styles.text}>Current bid</div>
        <div className={styles.price}>{item.bid}</div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>Buy now</div>
        <div className={styles.price}>{item.price} BTC</div>
      </div>
    </div>
  </Link>
);

export default Card;
