import Layout from "~/components/Layout";
import Description from "~/components/Description";
import Details from "./Details";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getBuyNowInscriptionData } from "~/actions/buyNow";
import { useDispatch, useSelector } from "react-redux";
import { selectInscriptionData } from "~/reducers/buyNowSlice";
import { addressShortening } from "~/utils/address";
import {
  setSwapNowInscriptionId,
  setSwapNowUrl,
  setSwapPrice,
} from "~/reducers/swapNowSlice";
import { selectAddress, selectIsAuthenticated } from "~/reducers/authSlice";
import { getInscriptions } from "~/utils/inscription";

const MintNFTPage = () => {
  const router = useRouter();
  const address = useSelector(selectAddress);
  const inscriptionData = useSelector(selectInscriptionData);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [inscriptionId, setInscriptionId] = useState("");
  const [statistics, setStatistics] = useState<any[]>([]);
  const [links, setLinks] = useState<
    {
      title: string;
      icon: string;
      url: string;
    }[]
  >([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSwapNowUrl(""));
    dispatch(setSwapNowInscriptionId(""));
    dispatch(setSwapPrice(0));
  }, []);

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

      void (async () => {
        const res = await getBuyNowInscriptionData(inscriptionId);
      })();
    }
  }, [inscriptionId, address, router, isAuthenticated]);

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

  return (
    <Layout layoutNoOverflow footerHide noRegistration>
      {inscriptionData && inscriptionId && (
        <Description
          image={inscriptionData?.image}
          inscriptionId={inscriptionId}
          title="Inscription"
          date={inscriptionData.inscriptionNumber as string}
          statistics={statistics}
          links={links}
          content={inscriptionData.description}
        >
          <Details
            link={`/buy-now/${inscriptionData.title}`}
            swapLink={`/swap-now/${inscriptionData.title}`}
            buyNowPrice={inscriptionData.price}
          />
        </Description>
      )}
    </Layout>
  );
};

export default MintNFTPage;
