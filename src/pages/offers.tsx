import { NextSeo } from "next-seo";
import Offerpage from "../templates/OfferPage";

const Offers = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Offers",
          description:
            "This is the offer page of munchers, You can confirm all your offers here.",
        }}
      />
      <Offerpage />
    </>
  );
};

export default Offers;
