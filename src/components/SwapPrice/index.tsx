import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import DropDown from "../DropDown";

import styles from "./SwapPrice.module.sass";
import { addressShortening } from "~/utils/address";

type SwapPriceProps = {
  title: string;
  price?: number;
  value?: any;
  setValue?: any;
  placeholder?: any;
  crypterFee?: number;
  percent?: number;
  totalReceive?: number;
  onSelectClick?: () => void;
  onClick?: () => void;
  buttonText: string;
  selectButtonText: string;
  content: any;
  swapNowInscriptionId: string[];
  swapLoadingStatus: boolean;
};

const SwapPrice = ({
  title,
  price,
  setValue,
  crypterFee,
  percent,
  totalReceive,
  onSelectClick,
  onClick,
  buttonText,
  selectButtonText,
  content,
  swapNowInscriptionId,
  swapLoadingStatus,
}: SwapPriceProps) => (
  <div className={styles.price}>
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <input
            type="number"
            className={styles.input}
            value={price}
            onChange={(e: any) => setValue(e.target.value)}
          />

          <div className={cn("h3", styles.currency)}>BTC</div>
        </div>
        <div className={styles.line}>
          <div className={styles.label}>Inscriptionid</div>
          {swapNowInscriptionId ? (
            <div className={styles.value}>
              {swapNowInscriptionId.map((id: string, index: number) => (
                <div key={index}>
                  <Link
                    href={`/inscription/${id}`}
                    className={styles.LinkStyle}
                    target="_blank"
                  >
                    <span>{addressShortening(id)}</span>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.value}>Not Selected</div>
          )}
        </div>
        {/* crypterFee */}
        <div className={styles.line}>
          <div className={styles.label}>Crypter fee</div>
          <div className={styles.value}>{crypterFee} %</div>
        </div>
        {/* experied */}
        <div className={styles.line}>
          <div className={styles.label}>Expires in</div>
          <DropDown
            items={["30 minutes", "1 hour", "6 hours", "1 day", "7 days"]}
          />
        </div>
        {/* total receive */}
        <div className={styles.line}>
          <div className={styles.label}>Total receive</div>
          <div className={styles.percent}>{percent}%</div>
          <div className={styles.value}>{totalReceive} BTC</div>
        </div>
      </div>
      {onClick ? (
        <div className={styles.buttons}>
          <button
            className={cn("button-large button-wide", styles.button)}
            onClick={onSelectClick}
          >
            {selectButtonText}
          </button>
          {swapLoadingStatus === false ? (
            <button
              className={cn("button-large button-wide", styles.button)}
              onClick={onClick}
            >
              {buttonText}
            </button>
          ) : (
            <button className={cn("button-large button-wide", styles.button)}>
              <Image
                className={cn("loadingIcon", styles.loadingIcon)}
                src="/images/loading.gif"
                alt="Loading GIF"
                width={100}
                height={100}
              />
            </button>
          )}
        </div>
      ) : (
        <Link
          className={cn("button-large button-wide", styles.button)}
          href="/congrats"
        >
          {buttonText}
        </Link>
      )}
    </div>
    <div className={styles.content}>{content}</div>
  </div>
);

export default SwapPrice;
