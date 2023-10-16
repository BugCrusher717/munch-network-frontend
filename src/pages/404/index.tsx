import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import ErrorPage from "~/templates/ErrorPage";

const ErrorPageTemplate: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap ErrorPage",
          description: "This is ErrorPage for Munch Swap Website",
        }}
      />
      <ErrorPage />
    </>
  );
};

export default ErrorPageTemplate;
