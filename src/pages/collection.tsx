import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import CollectionPage from "~/templates/CollectionPage";

const Profile: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Collection",
          description:
            "This is Collection page of Munchers, You can check all collections here.",
        }}
      />
      <CollectionPage />
    </>
  );
};

export default Profile;
