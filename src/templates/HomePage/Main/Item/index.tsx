import Link from "next/link";
import cn from "classnames";
import styles from "./Item.module.sass";
import Image from "~/components/Image";
import Icon from "~/components/Icon";
import Details from "../Details";
import { addressShortening } from "~/utils/address";

type MainProps = {
  item: any;
};

const Main = ({ item }: MainProps) => (
  <div className={styles.item}>
    <div className={styles.preview}>
      <Image
        src={item.image}
        className={styles.svgImage}
        layout="fill"
        objectFit="cover"
        alt="Main"
        inscriptionsId={item.id}
      />
    </div>
    <div className={styles.wrap} style={{ backgroundColor: item.color }}>
      <Details
        collection={item.title}
        price={item.price}
        reserve={item.reserve}
      />
      <div className={cn("h1", styles.subtitle)}>
        {addressShortening(item.id)}
      </div>
      <div className={styles.btns}>
        <Link
          className={cn("button-stroke", styles.button)}
          href={`/inscription/${item.id}`}
        >
          <span>View Inscription</span>
          <Icon name="arrow-right" />
        </Link>
        <Link
          className={cn("button", styles.button)}
          href={`/collection/${item.title}`}
        >
          View Collection
        </Link>
      </div>
    </div>
  </div>
);

export default Main;
