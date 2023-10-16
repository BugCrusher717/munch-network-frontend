import Link from "next/link";
import cn from "classnames";
import styles from "./Price.module.sass";
import Field from "~/components/Field";
import Image from "next/image";
import DropDown from "../DropDown";

type PriceProps = {
  title: any;
  price?: string;
  priceStatus?: boolean;
  buyStatus?: boolean;
  value?: any;
  setValue?: any;
  placeholder?: any;
  crypterFee?: number;
  percent?: number;
  totalReceive?: number;
  onClick?: () => void;
  buttonText: string;
  content: any;
  expiresDay?: string;
};

const Price = ({
  title,
  price,
  priceStatus,
  buyStatus,
  value,
  setValue,
  placeholder,
  crypterFee,
  percent,
  totalReceive,
  onClick,
  buttonText,
  content,
  expiresDay,
}: PriceProps) => (
  <div className={styles.price}>
    <div className={styles.body}>
      <div className={styles.title}>{title}</div>
      <div className={styles.wrap}>
        {price ? (
          <div className={styles.flex}>
            <div className={cn("h3", styles.price)}>{price}</div>
            <div className={cn("h3", styles.currency)}>BTC</div>
          </div>
        ) : (
          <div className={styles.box}>
            <Field
              type="number"
              className={styles.field}
              inputClassName={styles.input}
              placeholder={placeholder || "0.00"}
              value={value}
              onChange={(e: any) => setValue(e.target.value)}
              large
              required
            />
            <div className={cn("h3", styles.currency)}>BTC</div>
          </div>
        )}
        <div className={styles.line}>
          <div className={styles.label}>Crypter fee</div>
          <div className={styles.value}>{crypterFee} %</div>
        </div>
        {expiresDay && (
          <div className={styles.line}>
            <div className={styles.label}>Expires in</div>
            <DropDown
              items={["30 minutes", "1 hour", "6 hours", "1 day", "7 days"]}
            />
          </div>
        )}
        <div className={styles.line}>
          <div className={styles.label}>Total receive</div>
          <div className={styles.percent}>{percent}%</div>
          <div className={styles.value}>{totalReceive} BTC</div>
        </div>
      </div>
      {onClick ? (
        priceStatus === false ? (
          buyStatus === false ? (
            <button
              className={cn("button-large button-wide", styles.button)}
              onClick={onClick}
            >
              {buttonText}
            </button>
          ) : (
            <button
              className={cn("button-large button-wide", styles.loadingDiv)}
            >
              <Image
                className={cn("loadingIcon", styles.loadingIcon)}
                src="/images/loading.gif"
                alt="Loading GIF"
                width={100}
                height={100}
              />
            </button>
          )
        ) : (
          <button className={cn("button-large button-wide", styles.loadingDiv)}>
            <Image
              className={cn("loadingIcon", styles.loadingIcon)}
              src="/images/loading.gif"
              alt="Loading GIF"
              width={100}
              height={100}
            />
          </button>
        )
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

export default Price;
