import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import RankingPage from "~/templates/Discover/RankingPage";

const Ranking: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Ranking",
          description:
            "This is munch nft ranking page for Munch Swap Website. In this site, You can see the rinking of munchers",
        }}
      />
      <RankingPage />
    </>
  );
};

export default Ranking;
