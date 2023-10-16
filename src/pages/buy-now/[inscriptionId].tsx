import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import BuyNowPage from "~/templates/BuyNowPage";

const BuyNow: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap BuyNow",
          description:
            "This is Buy-Now page for Munch Swap website. In this site, You can buy the munchers.",
        }}
      />
      <BuyNowPage />
    </>
  );
};

export default BuyNow;
