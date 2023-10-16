import Layout from "~/components/Layout";
import Artists from "./Artists";

const HomePage = () => {
  return (
    <Layout layoutNoOverflow footerHide isAuthPage>
      <Artists />
    </Layout>
  );
};

export default HomePage;
