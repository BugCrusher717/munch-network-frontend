import { useState } from "react";
import cn from "classnames";
import styles from "./ConnectWallet.module.sass";
import Logo from "~/components/Logo";
import Arrow from "~/components/Arrow";
import Icon from "~/components/Icon";
import ChooseWallet from "./ChooseWallet";
import ScanToConnect from "./ScanToConnect";
import Message from "./Message";
import { type WalletTypes } from "~/types/type";
import { useDispatch } from "react-redux";
import { walletConnect } from "~/reducers/authSlice";
import { type BtcAddress } from "@btckit/types";
import {
  type GetAddressOptions,
  AddressPurposes,
  getAddress,
  type GetAddressResponse,
} from "sats-connect";
import { toast } from "react-toastify";

type ConnectWalletProps = {
  onClickLogo?: any;
  onContinue?: any;
  onLoadingStatus?: any;
};

const ConnectWallet = ({
  onClickLogo,
  onContinue,
  onLoadingStatus,
}: ConnectWalletProps) => {
  const [cookies, setCookies] = useState<boolean>(false);
  const [scan, setScan] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onWalletBtnClicked = async (walletName: WalletTypes) => {
    if (walletName === "Hiro") {
      try {
        const addressesRes = await window.btc?.request("getAddresses", {});
        const { address, publicKey } = (
          addressesRes as any
        ).result.addresses.find(
          (address: BtcAddress) => address.type === "p2tr"
        );

        const { address: paymentAddress } = (
          addressesRes as any
        ).result.addresses.find(
          (address: BtcAddress) => address.type === "p2wpkh"
        );

        dispatch(
          walletConnect({
            address,
            walletType: "Hiro",
            pubkey: publicKey,
            paymentAddress,
          })
        );
        setMessage(true);
      } catch (err) {
        toast.warn("Wallet is not installed or User canceled");
      }
    } else if (walletName === "Xverse") {
      try {
        const getAddressOptions: GetAddressOptions = {
          payload: {
            purposes: [AddressPurposes.ORDINALS, AddressPurposes.PAYMENT],
            message: "Address for receiving Ordinals",
            network: {
              type:
                process.env.NEXT_PUBLIC_NETWORK === "testnet"
                  ? "Testnet"
                  : "Mainnet",
            },
          },
          onFinish: (response: GetAddressResponse) => {
            const address = (response as any).addresses[0].address as string;
            const paymentAddress = (response as any).addresses[1]
              .address as string;
            const pubkey = (response as any).addresses[0].publicKey as string;
            dispatch(
              walletConnect({
                address,
                walletType: "Xverse",
                pubkey,
                paymentAddress,
              })
            );
            setMessage(true);
          },
          onCancel: () => {
            toast.warn("Wallet is not installed or User canceled");
          },
        };
        await getAddress(getAddressOptions);
      } catch (err) {
        toast.warn("Wallet is not installed or User canceled");
      }
    } else if (walletName === "Unisat") {
      try {
        const addresses = (await (
          window as any
        ).unisat?.requestAccounts()) as string[];
        const pubkey = await window.unisat.getPublicKey();
        dispatch(
          walletConnect({
            address: addresses[0] as string,
            walletType: "Unisat",
            pubkey,
            paymentAddress: addresses[0] as string,
          })
        );

        setMessage(true);
      } catch (err) {
        toast.warn("Wallet is not installed or User canceled");
      }
    }
  };

  return (
    <div className={styles.row}>
      <div
        className={styles.col}
        style={{
          backgroundColor:
            (scan && "#B9A9FB") || (message && "#DBFF73") || "#BCE6EC",
        }}
      >
        <Logo className={styles.logo} onClick={onClickLogo} />
        <div className={styles.line}>
          <h1 className={cn("h1", styles.title)}>Connect wallet.</h1>
          <Arrow className={styles.arrow} color="#F7FBFA" />
        </div>
        <div className={styles.info}>
          {message
            ? "Sign the message in your wallet to continue"
            : "Choose how you want to connect. There are several wallet providers."}
        </div>
      </div>
      <div className={styles.col}>
        {message ? (
          <>
            <button
              className={cn("button-circle", styles.back)}
              onClick={() => setMessage(false)}
            >
              <Icon name="arrow-left" />
            </button>
            <Message
              onContinue={onContinue}
              onLoadingStatus={onLoadingStatus}
            />
          </>
        ) : scan ? (
          <>
            <button
              className={cn("button-circle", styles.back)}
              onClick={() => setScan(false)}
            >
              <Icon name="arrow-left" />
            </button>
            <ScanToConnect />
          </>
        ) : (
          <ChooseWallet
            onScan={() => setScan(true)}
            onClickWallet={onWalletBtnClicked}
          />
        )}
        {!message && (
          <div
            className={cn(styles.cookies, {
              [styles.hide as string]: cookies,
            })}
          >
            <div className={styles.text}>
              We use 🍪 <span>cookies</span> for better experience
            </div>
            <button className={styles.accept} onClick={() => setCookies(true)}>
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
