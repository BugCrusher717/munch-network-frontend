import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import CollectionPage from "~/templates/CollectionPage";

const CollectionDetail: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Collection",
          description:
            "This is collection page for Munch website. You can see all munch collections here.",
        }}
      />
      <CollectionPage />
    </>
  );
};

export default CollectionDetail;
