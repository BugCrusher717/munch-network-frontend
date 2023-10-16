import cn from "classnames";
import styles from "./Card.module.sass";
import Image from "~/components/Image";
import Icon from "~/components/Icon";

type CardProps = {
  className?: string;
  item: any;
  dark?: any;
  onClick?: (() => void) | undefined;
};

const Card = ({ className, item, dark, onClick }: CardProps) => (
  <button
    className={cn(
      styles.card,
      { [styles.dark as string]: dark },
      { [styles.hover as string]: item.checked },
      className
    )}
    onClick={onClick}
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
      <div className={styles.categorySection}>
        <div className={styles.category}>
          <div className={styles.image}>
            <Image
              src={item.imgUrl}
              layout="fill"
              objectFit="cover"
              alt="Photo category"
            />
          </div>
          {item.category}
        </div>
        <Icon className={styles.svgStyle} name="check" />
      </div>

      <div className={styles.title}>{item.title}</div>
    </div>
    <div className={styles.foot}>
      <div className={styles.box}>
        <div className={styles.text}>Current bid</div>
        <div className={styles.price}>{item.bid}</div>
      </div>
      <div className={styles.box}>
        <div className={styles.text}>Swap now</div>
        <div className={styles.price}>{item.price}</div>
      </div>
    </div>
  </button>
);

export default Card;
