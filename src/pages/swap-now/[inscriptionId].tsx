import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import SwapPage from "~/templates/SwapPage";

const SwapNow: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap SwapPage",
          description:
            "This is Swap Page of Munchers. You can swap 1:n munchers here.",
        }}
      />
      <SwapPage />
    </>
  );
};

export default SwapNow;
