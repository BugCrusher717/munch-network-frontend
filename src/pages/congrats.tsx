import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import CongratsPage from "~/templates/CongratsPage";

const Congrats: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Congrats",
          description:
            "This is congrats page of munchers. It will show the result of your action.",
        }}
      />
      <CongratsPage />
    </>
  );
};

export default Congrats;
