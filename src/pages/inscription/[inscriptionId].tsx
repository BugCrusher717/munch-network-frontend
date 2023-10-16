import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import NFTDetailPage from "~/templates/NFT/NFTDetailPage";

const NFTDetail: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap NftDetail",
          description:
            "This is NftDetail page for Munch-Swap. You can see more detailed descriptions of muncher nfts.",
        }}
      />
      <NFTDetailPage />
    </>
  );
};

export default NFTDetail;
