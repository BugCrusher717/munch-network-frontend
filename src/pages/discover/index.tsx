import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import DiscoverPage from "~/templates/Discover/DiscoverPage";

const Discover: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Discover",
          description:
            "This is discover page for Munch Swap website. You can search and some inscriptions here.",
        }}
      />
      <DiscoverPage />
    </>
  );
};

export default Discover;
