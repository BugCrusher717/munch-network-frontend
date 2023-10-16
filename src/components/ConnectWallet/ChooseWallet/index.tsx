import { useState } from "react";
import cn from "classnames";
import styles from "./ChooseWallet.module.sass";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import type { WalletTypes } from "~/types/type";

const tabs = ["Extensions"];

interface Wallet {
  title: WalletTypes;
  image: string;
}

const wallets: Wallet[] = [
  {
    title: "Hiro",
    image: "/images/hiro.png",
  },
  {
    title: "Unisat",
    image: "/images/unisat.png",
  },
  {
    title: "Xverse",
    image: "/images/xverse.png",
  },
];

type ChooseWalletProps = {
  onScan?: () => void;
  onClickWallet: (walletName: WalletTypes) => Promise<void>;
};

const ChooseWallet = ({ onScan, onClickWallet }: ChooseWalletProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.choose}>
      <div className={cn("h3", styles.title)}>Choose the wallet</div>
      <div className={styles.head}>
        <div className={styles.tabs}>
          {tabs.map((item, index) => (
            <button
              className={cn(styles.tab, {
                [styles.active as string]: activeIndex === index,
              })}
              onClick={() => setActiveIndex(index)}
              key={index}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.wallets}>
        {wallets.map((wallet, index) => (
          <button
            className={styles.wallet}
            key={index}
            onClick={() => void onClickWallet(wallet.title)}
          >
            <span className={styles.inner}>
              <span className={styles.icon}>
                <Image
                  src={wallet.image}
                  width={40}
                  height={40}
                  style={{ width: "100%", height: "100%" }}
                  alt="Wallet"
                />
              </span>
              {wallet.title} <Icon name="arrow-right" />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChooseWallet;
