import Link from "next/link";
import cn from "classnames";
import styles from "./Slide.module.sass";
import Image from "~/components/Image";
import Icon from "~/components/Icon";

type SlideProps = {
  item: any;
};

const Slide = ({ item }: SlideProps) => (
  <div className={styles.slide}>
    <Image
      src={item.image}
      layout="fill"
      objectFit="cover"
      alt="Slide"
      inscriptionsId={item.id}
    />
    <div className={styles.row}>
      <div className={styles.details}>
        <div className={styles.head}>
          <div className={cn("h1", styles.title)}>{item.title}</div>
          <div className={styles.author}>
            <div className={styles.avatar}>
              <Image
                src={item.imgUrl}
                layout="fill"
                objectFit="cover"
                alt="Avatar"
              />
            </div>
            @{item.title}
          </div>
        </div>
        <div className={styles.btns}>
          <Link
            className={cn("button-stroke-white", styles.button)}
            href={`/inscription/${item.id}`}
          >
            <span>View Inscription</span>
            <Icon name="arrow-right" />
          </Link>
          <Link
            className={cn("button-white", styles.button)}
            href={`/collection/${item.title}`}
          >
            View Collection
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default Slide;
