import Layout from "~/components/Layout";
import Notice from "./Notice";

const PrfilePage = () => {
  return (
    <Layout layoutNoOverflow footerHide isAuthPage>
      <Notice />
    </Layout>
  );
};

export default PrfilePage;
