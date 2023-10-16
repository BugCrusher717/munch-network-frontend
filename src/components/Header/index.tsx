import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import Link from "next/link";
import cn from "classnames";
import styles from "./Header.module.sass";
import Logo from "~/components/Logo";
import Icon from "~/components/Icon";
import Modal from "~/components/Modal";
import ConnectWallet from "~/components/ConnectWallet";
import Search from "./Search";
import Discover from "./Discover";
import Profile from "./Profile";
import Menu from "./Menu";
import { resultSearch } from "~/mocks/resultSearch";
import { selectSignMessage, setAuthLoading } from "~/reducers/authSlice";
import { useSelector } from "react-redux";
import {
  selectAddress,
  selectAuthLoading,
  selectIsRegistered,
  selectPubkey,
  selectWalletType,
} from "~/reducers/authSlice";
import "@btckit/types";
import { type SignMessageOptions, signMessage } from "sats-connect";
import { getSignMessage, userLogin } from "~/actions/auth";
import { selectIsNewData } from "~/reducers/notificationSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setVisibleStatus } from "~/reducers/searchSlice";

const menu = [
  {
    title: "Discover",
    url: "/discover",
  },
];

type HeaderProps = {
  className?: string;
  noRegistration?: boolean;
  light?: boolean;
  empty?: boolean;
};

const Header = ({ className, noRegistration, light, empty }: HeaderProps) => {
  const [visibleProfile, setVisibleProfile] = useState<boolean>(false);
  const [connect, setConnect] = useState<boolean>(false);

  const walletName = useSelector(selectWalletType);
  const address = useSelector(selectAddress);
  const pubkey = useSelector(selectPubkey);
  const authLoading = useSelector(selectAuthLoading);
  const registration = useSelector(selectIsRegistered);
  const isNewData = useSelector(selectIsNewData);
  const signMessageText = useSelector(selectSignMessage);

  const dispatch = useDispatch();

  useHotkeys("esc", () => setVisibleProfile(false));

  useEffect(() => {
    dispatch(setVisibleStatus(false));
  }, []);

  useEffect(() => {
    if (address) void getSignMessage(address);
  }, [address]);

  const handleClick = async () => {
    try {
      if (walletName === "Unisat") {
        dispatch(setAuthLoading(true));
        const signature = await window.unisat.signMessage(
          signMessageText,
          "bip322-simple"
        );
        void userLogin(
          address as string,
          signature,
          walletName,
          pubkey as string
        );
      } else if (walletName === "Hiro") {
        dispatch(setAuthLoading(true));
        const res = await window.btc?.request("signMessage", {
          message: signMessageText,
          paymentType: "p2tr", // or 'p2wphk' (default)
        });
        void userLogin(
          address as string,
          (res as any).result.signature as string,
          walletName,
          pubkey as string
        );
      } else if (walletName === "Xverse") {
        dispatch(setAuthLoading(true));
        const signMessageOptions: SignMessageOptions = {
          payload: {
            network: {
              type:
                process.env.NEXT_PUBLIC_NETWORK === "testnet"
                  ? "Testnet"
                  : "Mainnet",
            },
            address: address as string,
            message: signMessageText,
          },
          onFinish: (response: string) => {
            void userLogin(
              address as string,
              response,
              walletName,
              pubkey as string
            );
          },
          onCancel: () => toast.warn("Canceled"),
        };
        await signMessage(signMessageOptions);
      }
    } catch (error) {
      toast.warn("user canceled");
      dispatch(setAuthLoading(false));
    }

    setConnect(false);
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          {
            [styles.profileOpen as string]: visibleProfile,
            [styles.light as string]: visibleProfile || light,
            [styles.empty as string]: empty,
            [styles.noRegistration as string]: noRegistration && !registration,
          },
          className
        )}
        onClick={() => dispatch(setVisibleStatus(false))}
      >
        {empty ? (
          <>
            <Logo className={styles.logo} light={visibleProfile || light} />
            <Profile
              className={styles.profile}
              headClassName={styles.profileHead}
              bodyClassName={styles.profileBody}
              onOpen={() => setVisibleProfile(!visibleProfile)}
              onClose={() => setVisibleProfile(false)}
              visible={visibleProfile}
            />
          </>
        ) : (
          <>
            <div className={styles.col}>
              <Logo className={styles.logo} light={visibleProfile || light} />
              <Search
                className={styles.search}
                result={resultSearch}
                light={visibleProfile || light}
              />
            </div>
            <div className={styles.col}>
              <Discover
                className={styles.discover}
                light={visibleProfile || light}
              />
              <div className={styles.navigation}>
                {menu.map((link, index) => (
                  <Link className={styles.link} href={link.url} key={index}>
                    {link.title}
                  </Link>
                ))}
              </div>
              <button
                className={cn(
                  "button-stroke button-medium",
                  styles.button,
                  styles.connect
                )}
                onClick={() => setConnect(true)}
              >
                connect wallet
              </button>
              <Link
                className={cn(
                  styles.notification,
                  isNewData ? styles.active : ""
                )}
                href="/notification"
              >
                <Icon name="flash" />
              </Link>
              <Profile
                className={styles.profile}
                onOpen={() => setVisibleProfile(!visibleProfile)}
                onClose={() => setVisibleProfile(false)}
                visible={visibleProfile}
              />
              <Menu classBurger={styles.burger} resultSearch={resultSearch} />
            </div>
          </>
        )}
      </header>
      <div
        className={cn(styles.overlay, {
          [styles.visible as string]: visibleProfile,
        })}
      ></div>
      <Modal
        className={styles.modal}
        closeClassName={styles.close}
        visible={connect}
        onClose={() => setConnect(false)}
      >
        <ConnectWallet
          onContinue={() => void handleClick()}
          onLoadingStatus={authLoading}
        />
      </Modal>
    </>
  );
};

export default Header;
