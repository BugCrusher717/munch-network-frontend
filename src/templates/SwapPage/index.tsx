import Layout from "~/components/Layout";
import Description from "~/components/Description";
import Details from "~/components/Details";
import { useEffect, useRef, useState } from "react";
import { getBuyNowInscriptionData } from "~/actions/buyNow";
import { useRouter } from "next/router";
import {
  selectBuyNowPercentage,
  selectExpired,
  selectInscriptionData,
  setBuyLoadingStatus,
} from "~/reducers/buyNowSlice";
import { useSelector } from "react-redux";
import { addressShortening } from "~/utils/address";
import {
  selectAddress,
  selectIsAuthenticated,
  selectUser,
  selectWalletType,
} from "~/reducers/authSlice";
import { type BtcAddress } from "@btckit/types";
import { tabsTime, statuses } from "~/mocks/nfts";

import { useDispatch } from "react-redux";
import {
  AddressPurposes,
  type GetAddressOptions,
  type SignTransactionOptions,
  getAddress,
  signTransaction,
} from "sats-connect";
import { toast } from "react-toastify";
import SwapPrice from "~/components/SwapPrice";
import {
  selectSwapNowInscriptionDatas,
  selectSwapNowInscriptionId,
  selectSwapNowLoadingStatus,
  selectSwapNowUrl,
  selectSwapPrice,
  selectTotalPageCount,
  setSwapLoadingStatus,
  setSwapNowInscriptionData,
  setSwapNowInscriptionId,
  setSwapNowUrl,
  setSwapPrice,
} from "~/reducers/swapNowSlice";
import SwapCatalog from "~/components/SwapCatalog";
import {
  getPsbt,
  buyerSignPsbt,
  formatSwapNowInscriptionDatas,
  getSwapNowInscriptionDatas,
} from "~/actions/swapNow";
import { type IImageInscription } from "../ProfilePage/Profile";
import { getInscriptions } from "~/utils/inscription";

const SwapPage = () => {
  const router = useRouter();

  const scrollToNFTs = useRef<any>(null);

  const inscriptionData = useSelector(selectInscriptionData);
  const swapNowInscriptionId = useSelector(selectSwapNowInscriptionId);
  const walletType = useSelector(selectWalletType);
  const feePercentage = useSelector(selectBuyNowPercentage);
  const swapUrl = useSelector(selectSwapNowUrl);
  const swapPrice = useSelector(selectSwapPrice);
  const inscriptionDatas = useSelector(selectSwapNowInscriptionDatas);
  const user = useSelector(selectUser);
  const address = useSelector(selectAddress);
  const swapLoadingStatus = useSelector(selectSwapNowLoadingStatus);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [page, setPage] = useState<number>(1);
  const totalPageCount = useSelector(selectTotalPageCount);
  const expiredCount = useSelector(selectExpired);

  const [showSwapPage, setShowSwapPage] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>(100);
  const [statistics, setStatistics] = useState<any[]>([]);
  const [inscriptionId, setInscriptionId] = useState("");
  const [imageInscriptionDatas, setImageInscriptionDatas] = useState<
    IImageInscription[]
  >([]);
  const [links, setLinks] = useState<
    {
      title: string;
      icon: string;
      url: string;
    }[]
  >([]);

  const dispatch = useDispatch();

  const expiresItem = ["30m", "1h", "6h", "1d", "7d"];

  useEffect(() => {
    dispatch(setSwapNowInscriptionId(""));
  }, []);

  useEffect(() => {
    if (feePercentage) {
      setPercent((_percent) => 100 - feePercentage);
    }
  }, [feePercentage, percent]);

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

  const onSwapSelectBtnClicked = () => {
    if (!isAuthenticated) return toast.warn("Please complete wallet connect");

    dispatch(setSwapNowUrl(`/swap-now/${inscriptionData?.title}`));
    setShowSwapPage((_showSwapPage) => true);
  };

  const onSwapClose = () => {
    setShowSwapPage((_showSwapPage) => false);
  };

  const onSetSwapPrice = (price: number) => {
    dispatch(setSwapPrice(price));
  };

  const onConfirmBtnClicked = async () => {
    if (!swapNowInscriptionId)
      return toast.warn("Please select swap inscription");

    if (!isAuthenticated) return toast.warn("Please complete wallet connect");

    try {
      const taprootPubkey = user.pubkey;
      let pubkey, paymentAddress, signedPsbt;
      dispatch(setBuyLoadingStatus(true));
      dispatch(setSwapLoadingStatus(true));
      if (walletType && inscriptionId) {
        if (walletType === "Unisat") {
          pubkey = await window.unisat.getPublicKey();
        } else if (walletType === "Hiro") {
          const addressesRes = await window.btc?.request("getAddresses");
          pubkey = (addressesRes as any).result.addresses.find(
            (address: BtcAddress) => address.type === "p2wpkh"
          ).publicKey;
        } else if (walletType === "Xverse") {
          const getAddressOptions: GetAddressOptions = {
            payload: {
              purposes: [AddressPurposes.ORDINALS, AddressPurposes.PAYMENT],
              message: "Address for receiving Ordinals and payments",
              network: {
                type:
                  process.env.NEXT_PUBLIC_NETWORK === "testnet"
                    ? "Testnet"
                    : "Mainnet",
              },
            },
            onFinish: (response: any) => {
              pubkey = response.addresses[1].publicKey;
              paymentAddress = response.addresses[1].address;
            },
            onCancel: () => toast.warn("Request canceled"),
          };
          await getAddress(getAddressOptions);
        }
        const psbtRes = await getPsbt({
          sellerInscriptionId: inscriptionId,
          buyerInscriptionIds: swapNowInscriptionId,
          walletType,
          buyerPubkey: pubkey,
          price: Number(swapPrice),
          expiredIn: expiresItem[expiredCount] as string,
        });

        if (!psbtRes) throw new Error("Can not create an offer");
        const { psbt, inputCount } = psbtRes;

        const inputsToFinalize: number[] = [];
        for (let i = 2; i < inputCount; i++) {
          inputsToFinalize.push(i);
        }

        if (walletType === "Unisat") {
          signedPsbt = await window.unisat.signPsbt(psbt);
        } else if (walletType === "Hiro") {
          const paymentRequestParams = {
            publicKey: pubkey,
            hex: psbt,
            network: process.env.NEXT_PUBLIC_NETWORK,
            signAtIndex: inputsToFinalize,
          };
          const paymentResult = await window.btc?.request(
            "signPsbt" as "signPstb",
            paymentRequestParams
          );
          signedPsbt = (paymentResult as any).result.hex;

          const taprootRequestParams = {
            publicKey: taprootPubkey,
            hex: signedPsbt,
            network: process.env.NEXT_PUBLIC_NETWORK,
            signAtIndex: [1],
          };
          const taprootResult = await window.btc?.request(
            "signPsbt" as "signPstb",
            taprootRequestParams
          );
          signedPsbt = (taprootResult as any).result.hex;
        } else if (walletType === "Xverse" && paymentAddress) {
          const signPsbtPaymentOptions: SignTransactionOptions = {
            payload: {
              network: {
                type:
                  process.env.NEXT_PUBLIC_NETWORK === "testnet"
                    ? "Testnet"
                    : "Mainnet",
              },
              message: "Sign Transaction",
              psbtBase64: psbt,
              broadcast: false,
              inputsToSign: [
                {
                  address: paymentAddress as string,
                  signingIndexes: inputsToFinalize,
                },
              ],
            },
            onFinish: (response: any) => {
              signedPsbt = response.psbtBase64;
            },
            onCancel: () => toast.warn("Canceled"),
          };
          await signTransaction(signPsbtPaymentOptions);

          if (!signedPsbt) return;

          const signPsbtTaprootOptions: SignTransactionOptions = {
            payload: {
              network: {
                type:
                  process.env.NEXT_PUBLIC_NETWORK === "testnet"
                    ? "Testnet"
                    : "Mainnet",
              },
              message: "Sign Transaction",
              psbtBase64: signedPsbt as string,
              broadcast: false,
              inputsToSign: [
                {
                  address: address as string,
                  signingIndexes: [1],
                },
              ],
            },
            onFinish: (response: any) => {
              signedPsbt = response.psbtBase64;
            },
            onCancel: () => toast.warn("Canceled"),
          };
          await signTransaction(signPsbtTaprootOptions);
        }

        const res = await buyerSignPsbt({
          psbt,
          signedPsbt,
          walletType,
        });
        dispatch(setBuyLoadingStatus(false));
        dispatch(setSwapLoadingStatus(false));

        if (res === true) void router.push("/congrats");
      }
    } catch (err) {
      toast.warn("Can not create an offer");
      dispatch(setBuyLoadingStatus(false));
      dispatch(setSwapLoadingStatus(false));
      console.error(err);
    }
  };

  useEffect(() => {
    if (inscriptionDatas) {
      const imageInscriptionDatas: any[] = [];

      inscriptionDatas.forEach((inscription) => {
        imageInscriptionDatas.push({
          title: inscription.title,
          image: `${process.env.NEXT_PUBLIC_INSCRIPTION_URL}${inscription.inscriptionId}`,
          price: inscription.price ? `${inscription.price} BTC` : "Not listed",
          url: `${swapUrl}`,
          category: addressShortening(inscription.inscriptionId),
          users: [],
          inscriptionId: inscription.inscriptionId,
          imgUrl: inscription.imgUrl,
          checked: inscription.checked,
        });
      });
      setImageInscriptionDatas(imageInscriptionDatas);
    }
  }, [inscriptionDatas, swapUrl]);

  useEffect(() => {
    if (inscriptionData) {
      setStatistics([
        {
          label: "Owner",
          avatar: inscriptionData.avatar,
          history: true,
          title: inscriptionData.login,
          login: addressShortening(inscriptionData.avatar),
        },
        {
          label: "Collection",
          image: inscriptionData.imageCategory,
          title: inscriptionData.category,
          category: addressShortening(inscriptionData.title),
        },
      ]);
    }
  }, [inscriptionData]);

  useEffect(() => {
    if (router.query.inscriptionId)
      setInscriptionId(router.query.inscriptionId as string);
  }, [router]);

  useEffect(() => {
    if (inscriptionId) {
      if (address && isAuthenticated) {
        void (async () => {
          const inscriptions = await getInscriptions(address);
          const inscription = inscriptions.find(
            (inscriptionData) => inscriptionData.inscriptionId === inscriptionId
          );
          if (inscription)
            return void router.push(`/set-price/${inscriptionId}`);
        })();
      }
    }
  }, [inscriptionId, showSwapPage, address, router, isAuthenticated]);

  useEffect(() => {
    if (inscriptionId) void getBuyNowInscriptionData(inscriptionId);
  }, [inscriptionId]);

  useEffect(() => {
    if (router.query.inscriptionId)
      setInscriptionId(router.query.inscriptionId as string);
  }, [router]);

  useEffect(() => {
    void formatSwapNowInscriptionDatas();
  }, []);

  useEffect(() => {
    void getSwapNowInscriptionDatas(page, 20);
  }, [page, isAuthenticated]);

  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      {inscriptionData && (
        <>
          {showSwapPage === false ? (
            <Description
              image={inscriptionData?.image}
              inscriptionId={inscriptionData?.inscriptionId}
              captionHide
              title={inscriptionData.title}
              date={inscriptionData.inscriptionNumber as string}
              statistics={statistics}
              links={links}
              content={inscriptionData.description}
            >
              <Details
                title="Swap now"
                content={
                  <>
                    Confirm the transaction to Swap <strong>Escape NFT</strong>
                  </>
                }
                linkUrl="/article"
                linkTitle="Learn how to Swap on Crypter"
              />
              <SwapPrice
                title="Add BTC"
                price={swapPrice}
                crypterFee={feePercentage}
                percent={percent}
                setValue={onSetSwapPrice}
                totalReceive={
                  Math.floor(((swapPrice * percent) / 100) * 10 ** 8) / 10 ** 8
                }
                buttonText="Confirm"
                selectButtonText="Select"
                content={inscriptionData.description}
                onSelectClick={() => void onSwapSelectBtnClicked()}
                onClick={() => void onConfirmBtnClicked()}
                swapNowInscriptionId={swapNowInscriptionId}
                swapLoadingStatus={swapLoadingStatus}
              />
            </Description>
          ) : (
            <SwapCatalog
              title="SWAP NFTS"
              tabsTime={tabsTime}
              filters={statuses}
              items={imageInscriptionDatas}
              scrollToRef={scrollToNFTs}
              loadingStatus={swapLoadingStatus}
              onClose={onSwapClose}
              totalPageCount={totalPageCount}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default SwapPage;
