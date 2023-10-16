import Layout from "~/components/Layout";
import Description from "~/components/Description";
import Price from "~/components/Price";
import Details from "~/components/Details";
import { useEffect, useState } from "react";
import {
  buyerSignPsbt,
  getBuyNowInscriptionData,
  getPsbt,
} from "~/actions/buyNow";
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
  selectWalletType,
} from "~/reducers/authSlice";
import { type BtcAddress } from "@btckit/types";
import { selectLoadingStatus } from "~/reducers/setPriceSlice";
import { selectBuyLoadingStatus } from "~/reducers/buyNowSlice";

import { useDispatch } from "react-redux";
import {
  AddressPurposes,
  type GetAddressOptions,
  type SignTransactionOptions,
  getAddress,
  signTransaction,
} from "sats-connect";
import { toast } from "react-toastify";
import { getInscriptions } from "~/utils/inscription";

const BuyNowPage = () => {
  const router = useRouter();

  const inscriptionData = useSelector(selectInscriptionData);
  const walletType = useSelector(selectWalletType);
  const loadingstatus = useSelector(selectLoadingStatus);
  const buyloadingstatus = useSelector(selectBuyLoadingStatus);
  const feePercentage = useSelector(selectBuyNowPercentage);
  const address = useSelector(selectAddress);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const expiredCount = useSelector(selectExpired);

  const [statistics, setStatistics] = useState<any[]>([]);
  const [inscriptionId, setInscriptionId] = useState("");
  const [percent, setPercent] = useState<number>(100);
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
    if (feePercentage) {
      setPercent((_percent) => 100 - feePercentage);
    }
  }, [feePercentage, percent]);

  const onConfirmBtnClicked = async () => {
    try {
      if (!isAuthenticated) return toast.warn("Please complete wallet connect");

      let pubkey, paymentAddress, signedPsbt;

      if (walletType && inscriptionId) {
        dispatch(setBuyLoadingStatus(true));
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
          inscriptionId,
          walletType,
          buyerPubkey: pubkey,
          expiredIn: expiresItem[expiredCount] as string,
        });

        if (!psbtRes) throw new Error("Can not create an offer");
        const { psbt, inputCount } = psbtRes;

        const inputsToFinalize: number[] = [];
        for (let i = 1; i < inputCount; i++) {
          inputsToFinalize.push(i);
        }

        if (walletType === "Unisat") {
          signedPsbt = await window.unisat.signPsbt(psbt);
        } else if (walletType === "Hiro") {
          const requestParams = {
            publicKey: pubkey,
            hex: psbt,
            network: process.env.NEXT_PUBLIC_NETWORK,

            signAtIndex: inputsToFinalize,
          };
          const result = await window.btc?.request(
            "signPsbt" as "signPstb",
            requestParams
          );
          signedPsbt = (result as any).result.hex;
        } else if (walletType === "Xverse" && paymentAddress) {
          const signPsbtOptions: SignTransactionOptions = {
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
          await signTransaction(signPsbtOptions);
        }

        const res = await buyerSignPsbt({ psbt, signedPsbt, walletType });
        dispatch(setBuyLoadingStatus(false));
        if (res === true) void router.push("/congrats");
      }
    } catch (err) {
      toast.warn("Can not create an offer");
      dispatch(setBuyLoadingStatus(false));
      console.error(err);
    }
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
      void getBuyNowInscriptionData(inscriptionId);
    }
  }, [inscriptionId, address, router, isAuthenticated]);

  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      {inscriptionData && inscriptionId && (
        <Description
          image={inscriptionData?.image}
          inscriptionId={inscriptionId}
          captionHide
          title={inscriptionData.title}
          date={inscriptionData.inscriptionNumber as string}
          statistics={statistics}
          links={links}
          content={inscriptionData.description}
        >
          <>
            <Details
              title="Buy now"
              content={
                <>
                  Confirm the transaction to buy <strong>Escape NFT</strong>
                </>
              }
              linkUrl="/article"
              linkTitle="Learn how to buy on Crypter"
            />
            <Price
              title="Total price"
              priceStatus={loadingstatus}
              buyStatus={buyloadingstatus}
              price={`${inscriptionData.price}`}
              crypterFee={feePercentage}
              percent={percent}
              expiresDay="7 Day"
              totalReceive={
                Math.floor(
                  ((Number(inscriptionData.price) * percent) / 100) * 10 ** 8
                ) /
                10 ** 8
              }
              buttonText="confirm"
              content={inscriptionData.description}
              onClick={() => void onConfirmBtnClicked()}
            />
          </>
        </Description>
      )}
    </Layout>
  );
};

export default BuyNowPage;
