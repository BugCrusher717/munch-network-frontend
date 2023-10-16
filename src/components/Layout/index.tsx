import { useEffect } from "react";
import { useRouter } from "next/router";
import { enablePageScroll, clearQueueScrollLocks } from "scroll-lock";
import Head from "next/head";
import cn from "classnames";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./Layout.module.sass";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import {
  selectIsAuthenticated,
  selectIsRegistered,
} from "~/reducers/authSlice";
import {
  formatActiveOffers,
  formatSwapActiveOffers,
  getActiveOffers,
  getActiveSwapOffers,
} from "~/actions/notifiction";
import { getBtcPrce } from "~/actions/auth";
import { getBuyNowPercentage } from "~/actions/buyNow";

import { useDispatch } from "react-redux";
import { setVisibleStatus } from "~/reducers/searchSlice";
type LayoutProps = {
  layoutNoOverflow?: boolean;
  classHeader?: string;
  headerHide?: boolean;
  noRegistration?: boolean;
  lightHeader?: any;
  emptyHeader?: boolean;
  footerHide?: boolean;
  background?: string;
  children: React.ReactNode;
  isAuthPage?: boolean;
};

const Layout = ({
  layoutNoOverflow,
  classHeader,
  noRegistration,
  headerHide,
  lightHeader,
  emptyHeader,
  footerHide,
  background,
  children,
  isAuthPage = false,
}: LayoutProps) => {
  const { pathname } = useRouter();
  const isRegistered = useSelector(selectIsRegistered);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  const dispatch = useDispatch();
  useEffect(() => {
    void getBtcPrce();
  }, []);

  useEffect(() => {
    void getBuyNowPercentage();
  }, []);

  useEffect(() => {
    if (!isAuthenticated && isAuthPage) {
      if (pathname !== "/") {
        toast.warn("Please wallet connect with bitcoin wallets");
        return void router.push("/");
      }
    }
    if (isAuthenticated && !isRegistered) return void router.push("/settings");
  }, [isAuthenticated, isRegistered, pathname, router, isAuthPage]);

  useEffect(() => {
    if (isAuthenticated && isRegistered) {
      void formatActiveOffers();
      void formatSwapActiveOffers();
      void getActiveOffers(1);
      void getActiveSwapOffers(1);
    }
  }, [isAuthenticated, isRegistered]);

  useEffect(() => {
    clearQueueScrollLocks();
    enablePageScroll();
  }, [pathname]);

  return (
    <>
      <Head>
        <title>Munch swap</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <div
        className={cn(styles.layout, {
          [styles.noOverflow as string]: layoutNoOverflow,
        })}
        style={{ backgroundColor: background }}
      >
        {!headerHide && (
          <Header
            className={classHeader}
            noRegistration={noRegistration}
            light={lightHeader}
            empty={emptyHeader}
          />
        )}
        <div
          className={styles.inner}
          onClick={() => dispatch(setVisibleStatus(false))}
        >
          {children}
        </div>
        {!footerHide && <Footer />}
      </div>
    </>
  );
};

export default Layout;
