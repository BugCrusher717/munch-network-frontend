import Layout from "~/components/Layout";
import Notice from "./Notice";

const Offerpage = () => {
  return (
    <Layout layoutNoOverflow footerHide isAuthPage>
      <Notice />
    </Layout>
  );
};

export default Offerpage;
