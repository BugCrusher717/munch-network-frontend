import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import SetPricePage from "~/templates/SetPricePage";

const SetPrice: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap SetPrice",
          description:
            "This is price page of munchers. You can set the price of your own nfts here.",
        }}
      />
      <SetPricePage />
    </>
  );
};

export default SetPrice;
