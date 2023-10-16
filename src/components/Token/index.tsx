import Link from "next/link";
import cn from "classnames";
import styles from "./Token.module.sass";
import Image from "~/components/Image";
import Users from "~/components/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import AvatarGenerator from "../common/Avatar-generator";
import { addressShortening } from "~/utils/address";

type TokenProps = {
  className?: string;
  item: any;
  large?: boolean;
  dark?: boolean;
  isString?: boolean;
};

const Token = ({
  className,
  item,
  large,
  dark,
  isString = false,
}: TokenProps) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    void (async () => {
      try {
        const res = await axios.get(item.contentUrl as string);
        setContent(JSON.stringify(res.data));
      } catch (error) {
        console.error(error);
      }
    })();
  }, [isString]);

  return (
    <Link
      className={cn(
        styles.token,
        { [styles.large as string]: large, [styles.dark as string]: dark },
        className
      )}
      href={item.url}
    >
      <div className={styles.preview}>
        {isString ? (
          <p>{content}</p>
        ) : (
          <Image
            src={item.image}
            inscriptionsId={item.inscriptionId}
            layout="fill"
            objectFit="cover"
            alt="Token"
          />
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.category}>{item.category}</div>
        {item.price && item.price !== "undefined BTC" && (
          <div className={styles.line}>
            <div className={styles.price}>{item.price} </div>
            {item.users && <Users items={item.users} />}
            {item.avatar && (
              <div className={styles.users}>
                <AvatarGenerator seed={item.avatar} />{" "}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Token;
