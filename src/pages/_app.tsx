import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import "../styles/app.sass";
import { Provider } from "react-redux";
import { store } from "~/application/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config.mjs";
import Head from "next/head";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />

      <Head>
        <title>Munch - Buy , Sell and Swap Munchers - MunchSwap</title>
        <meta
          name="description"
          content="The Munchers, a species of monsters shrouded in mystery and hunger, wander the vastness of the universe in search of sustenance. Their insatiable appetite is the stuff of legend, and they have returned to wreak havoc upon the digital realm. Their latest quarry: the nutrient-rich data contained within the blocks of the virtual world. Be warned; those who dare to venture into their territory risk becoming their next meal. Welcome to the era of the Munchers."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DefaultSeo {...SEO} />
    </Provider>
  );
};

export default MyApp;
