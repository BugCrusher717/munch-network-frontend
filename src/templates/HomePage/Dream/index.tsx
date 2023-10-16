import Link from "next/link";
import cn from "classnames";
import styles from "./Dream.module.sass";
import Image from "~/components/Image";
import { type TopPriceForm } from "~/reducers/buyNowSlice";
import AvatarGenerator from "~/components/common/Avatar-generator";
import { useSelector } from "react-redux";
import { selectBtcPrice } from "~/reducers/authSlice";

type DreamProps = {
  topPrice: TopPriceForm;
};
const Dream = ({ topPrice }: DreamProps) => {
  const btcPrice = useSelector(selectBtcPrice);

  return (
    <div className={styles.dream}>
      <div className={styles.wrap}>
        <div className={styles.details}>
          <div className={styles.item}>
            <div className={styles.avatar}>
              <AvatarGenerator seed={topPrice.userAddress} />
            </div>
            @{topPrice.userName}
          </div>
          <div className={styles.item}>
            <div className={styles.image}>
              {topPrice.collectionImageUrl && (
                <Image
                  src={topPrice.collectionImageUrl}
                  layout="fill"
                  objectFit="cover"
                  alt="Avatar"
                />
              )}
            </div>
            {topPrice.collectionName}
          </div>
        </div>
        <div className={cn("h1", styles.title)}>Beyond the Dream.</div>
        <div className={styles.line}>
          <div className={styles.box}>
            <div className={styles.text}>Buy now price</div>
            <div className={cn("h3", styles.crypto)}>{topPrice.price} BTC</div>

            <div className={styles.price}>
              $
              {(
                Math.floor(topPrice.price * btcPrice * 10 ** 8) /
                10 ** 8
              ).toFixed(2)}
            </div>
          </div>
          <Link
            className={cn("button-white", styles.button)}
            href={`/inscription/${topPrice.inscriptionId}`}
          >
            MAKE OFFER
          </Link>
        </div>
      </div>
      <div className={styles.previewSVG}>
        {topPrice.inscriptionImage && (
          <Image
            src={topPrice.inscriptionImage}
            inscriptionsId={topPrice.inscriptionId}
            width="100"
            height="100"
            layout="responsive"
            objectFit="contain"
            alt="Avatar"
          />
        )}
      </div>
    </div>
  );
};

export default Dream;
