import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./SetPricePage.module.sass";
import Layout from "~/components/Layout";
import Description from "~/components/Description";
import Price from "~/components/Price";
import Details from "~/components/Details";
import { useRouter } from "next/router";
import {
  getInscriptionData,
  getPrice,
  removeSelectedActivity,
  setPrice,
} from "~/actions/setPrice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import {
  selectBuyNowPrice,
  selectDeleteLoadingStatus,
  selectInscriptionData,
  selectLoadingStatus,
  setBuyNowPrice,
} from "~/reducers/setPriceSlice";
import {
  selectBuyLoadingStatus,
  selectBuyNowPercentage,
} from "~/reducers/buyNowSlice";
import { addressShortening } from "~/utils/address";
import {
  selectAddress,
  selectIsAuthenticated,
  selectUser,
} from "~/reducers/authSlice";
import Image from "next/image";
import { getInscriptions } from "~/utils/inscription";

const MintNFTPage = () => {
  const buyloadingstatus = useSelector(selectBuyLoadingStatus);
  const loadingstatus = useSelector(selectLoadingStatus);
  const deleteLoadingStatus = useSelector(selectDeleteLoadingStatus);
  const feePercentage = useSelector(selectBuyNowPercentage);
  const router = useRouter();
  const price = useSelector(selectBuyNowPrice);
  const inscriptionData = useSelector(selectInscriptionData);
  const address = useSelector(selectAddress);
  const userInfo = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [percent, setPercent] = useState<number>(100);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [inscriptionId, setInscriptionId] = useState("");
  const [buy, setBuy] = useState<boolean>(false);
  const [reserve, setReserve] = useState<boolean>(false);
  const [buyValue, setBuyValue] = useState<number>(0);
  const [reserveValue, setReserveValue] = useState<string>("");
  const [links, setLinks] = useState<
    {
      title: string;
      icon: string;
      url: string;
    }[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (feePercentage) {
      setPercent((_percent) => 100 - feePercentage);
    }
  }, [feePercentage, percent]);

  useEffect(() => {
    if (router.query.inscriptionId)
      setInscriptionId(router.query.inscriptionId as string);
  }, [router]);

  useEffect(() => {
    setBuyValue((_buyValue) => price);
  }, [price]);

  useEffect(() => {
    if (inscriptionId) {
      void (async () => {
        await getPrice(inscriptionId);
      })();
    }
  }, [inscriptionId]);

  useEffect(() => {
    if (inscriptionId) {
      if (address && isAuthenticated) {
        void (async () => {
          const inscriptions = await getInscriptions(address);
          const inscription = inscriptions.find(
            (inscriptionData) => inscriptionData.inscriptionId === inscriptionId
          );
          if (!inscription)
            return void router.push(`/inscription/${inscriptionId}`);
        })();
      } else return void router.push(`/inscription/${inscriptionId}`);

      void getInscriptionData(inscriptionId);
    }
  }, [inscriptionId, address, router, isAuthenticated]);

  useEffect(() => {
    if (inscriptionData && address) {
      setStatistics([
        {
          label: "Owner",
          avatar: address,
          history: true,
          title: userInfo.name,
          login: addressShortening(address),
        },
        {
          label: "Collection",
          image: inscriptionData.imgUrl,
          title: inscriptionData.title,
          category: addressShortening(inscriptionData.title),
        },
      ]);
    }
  }, [inscriptionData, address]);

  const onSetPriceBtnClicked = async () => {
    if (inscriptionId && Number(buyValue) !== 0) {
      await setPrice(inscriptionId, Number(buyValue));
    }
    setBuy(false);
  };

  useEffect(() => {
    setLinks([
      {
        title: "View on Ordinals.com",
        icon: "country",
        url: `https://ordinals.com/inscription/${inscriptionId}`,
      },
      {
        title: "View on Ordinals.hiro.so",
        icon: "link",
        url: `https://ordinals.hiro.so/inscription/${inscriptionId}`,
      },
    ]);
  }, [inscriptionId]);

  const onRemoveButton = () => {
    void removeSelectedActivity(inscriptionId);
    dispatch(setBuyNowPrice(0));
  };

  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      {inscriptionData && inscriptionId && (
        <Description
          image={`${process.env.NEXT_PUBLIC_INSCRIPTION_URL}${inscriptionId}`}
          inscriptionId={inscriptionId}
          captionHide={buy || reserve}
          title={inscriptionData.title}
          date={inscriptionData.inscriptionNumber}
          statistics={statistics}
          links={links}
          content={inscriptionData.description}
        >
          {buy && (
            <>
              <Details
                title="Set a Buy Now price"
                content={
                  <>
                    <p>Buyers will be able to instantly buy the NFT.</p>
                    <p>You may edit this price at any time.</p>
                  </>
                }
                linkUrl="/article"
                linkTitle="Learn how Buy Now price work"
                onClose={() => setBuy(false)}
              />
              <Price
                title="Buy now price"
                value={buyValue}
                priceStatus={loadingstatus}
                buyStatus={loadingstatus}
                setValue={setBuyValue}
                crypterFee={feePercentage}
                percent={percent}
                totalReceive={
                  Math.floor(((buyValue * percent) / 100) * 10 ** 8) / 10 ** 8
                }
                buttonText="set price"
                onClick={() => void onSetPriceBtnClicked()}
                content="FIND AN OFFER THAT SUITS YOU. SWAP. - explore the limitless possibilities of Bitcoin Ordinals."
              />
            </>
          )}
          {reserve && (
            <>
              <Details
                title="Remove From List"
                content={
                  <>
                    <p>Buyers will be able to instantly buy the NFT.</p>
                    <p>You may edit this price at any time.</p>
                  </>
                }
                linkUrl="/article"
                linkTitle="Learn how Reserve price work"
                onClose={() => setReserve(false)}
              />
              <Price
                title="Remove From List"
                value={reserveValue}
                setValue={setReserveValue}
                priceStatus={loadingstatus}
                buyStatus={buyloadingstatus}
                crypterFee={0.0}
                percent={2}
                totalReceive={0.0}
                buttonText="set price"
                onClick={() => setReserve(false)}
                content="FIND AN OFFER THAT SUITS YOU. SWAP. - explore the limitless possibilities of Bitcoin Ordinals."
              />
            </>
          )}
          {!buy && !reserve && (
            <div className={styles.row}>
              <div className={styles.col}>
                <div className={styles.label}>Buy now</div>
                <div className={cn("h4", styles.value)}>{price} BTC</div>
                {loadingstatus == false ? (
                  <button
                    className={cn("button-medium button-wide", styles.button)}
                    onClick={() => setBuy(true)}
                  >
                    set buy now price
                  </button>
                ) : (
                  <button
                    className={cn(
                      "button-medium button-wide",
                      styles.loadingDiv
                    )}
                  >
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
              <div className={styles.col}>
                <div className={styles.label}>Remove</div>
                <div className={cn("h4", styles.value)}>
                  {reserveValue || "-"}
                </div>
                {deleteLoadingStatus == false ? (
                  <button
                    className={cn(
                      "button-stroke-grey button-medium button-wide",
                      styles.button
                    )}
                    onClick={
                      price !== 0
                        ? () => onRemoveButton()
                        : () => console.log("disabled")
                    }
                  >
                    Remove From List
                  </button>
                ) : (
                  <button
                    className={cn(
                      "button-medium button-wide",
                      styles.loadingDiv
                    )}
                  >
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
            </div>
          )}
        </Description>
      )}
    </Layout>
  );
};

export default MintNFTPage;
