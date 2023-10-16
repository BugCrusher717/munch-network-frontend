import Link from "next/link";
import cn from "classnames";
import styles from "./Wallet.module.sass";
import Icon from "~/components/Icon";
import { useSelector } from "react-redux";
import {
  selectAddress,
  selectBtcPrice,
  selectPaymentAddress,
} from "~/reducers/authSlice";
import { addressShortening, getBalance } from "~/utils/address";
import { useEffect, useState } from "react";

type WalletProps = {
  onDisconnect: () => void;
};

const Wallet = ({ onDisconnect }: WalletProps) => {
  const address = useSelector(selectAddress);
  const btcPrice = useSelector(selectBtcPrice);
  const [balance, setBalance] = useState(0);
  const [totalbalance, setTotalBalance] = useState(0);
  const paymentAddress = useSelector(selectPaymentAddress);

  useEffect(() => {
    if (paymentAddress) {
      void (async () => {
        const balance = await getBalance(paymentAddress);
        setBalance((_balance) => balance);
        setTotalBalance((_totalbalance) => balance * btcPrice);
      })();
    }
  }, [paymentAddress, btcPrice]);

  const actions = [
    {
      title: "Manage wallet",
      icon: "settings-alt",
      url: "/settings#wallet",
    },
    {
      title: "Disconnect",
      icon: "close-square",
      onClick: onDisconnect,
    },
  ];

  return (
    <div className={styles.wallet}>
      <div className={styles.head}>
        <div className={styles.title}>Connected wallet</div>
        <div className={styles.actions}>
          {actions.map((action: any, index: number) =>
            action.onClick ? (
              <button
                className={styles.action}
                onClick={action.onClick}
                key={index}
              >
                <Icon name={action.icon} />
                {action.title}
              </button>
            ) : (
              <Link className={styles.action} href={action.url} key={index}>
                <Icon name={action.icon} />
                {action.title}
              </Link>
            )
          )}
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.code}>
          {address && addressShortening(address)}
        </div>
        <div className={cn("h4", styles.line)}>
          <div className={styles.crypto}>{balance.toFixed(5)} BTC</div>
          <div className={styles.price}>{totalbalance.toFixed(2)} USD</div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
