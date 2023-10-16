import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import NFTDetailCurrentBidPage from "~/templates/NFT/NFTDetailCurrentBidPage";

const NFTDetail: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap NftDetailCurrent",
          description: "",
        }}
      />
      <NFTDetailCurrentBidPage />{" "}
    </>
  );
};

export default NFTDetail;
