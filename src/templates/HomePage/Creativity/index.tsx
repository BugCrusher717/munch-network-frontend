import Link from "next/link";
import cn from "classnames";
import styles from "./Creativity.module.sass";

import { creativity } from "~/constants/creativity";

const Creativity = () => (
  <div className={styles.creativity}>
    <div className={styles.head}>
      <div className={cn("h1", styles.title)}>Own your creativity.</div>
      <div className={styles.info}>
        Each web3 community is unique and deserves a custom marketplace with its
        own look, features, fees.
      </div>
    </div>
    <div className={styles.list}>
      {creativity.map((item, index) => (
        <div className={styles.item} key={index}>
          <div className={styles.preview}>
            <video className={styles.confetti} autoPlay muted loop playsInline>
              <source src={item.video} type="video/mp4" />
            </video>
          </div>
          <div className={styles.wrap}>
            <div className={styles.content}>{item.content}</div>
            <Link
              className={cn("button-stroke button-medium", styles.button)}
              href={item.url}
            >
              learn more
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Creativity;
