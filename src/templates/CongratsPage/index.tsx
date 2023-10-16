import styles from "./CongratsPage.module.sass";
import Layout from "~/components/Layout";
import Congrats from "~/components/Congrats";
import { useSelector } from "react-redux";
import { selectMsg, selectTransactionLink } from "~/reducers/congratSlice";

const CongratsPage = () => {
  const congratMsg = useSelector(selectMsg);
  const transactionLink = useSelector(selectTransactionLink);

  return (
    <Layout
      classHeader={styles.header}
      background="#F1F4F4"
      layoutNoOverflow
      footerHide
      emptyHeader
    >
      <Congrats
        title="Awesome"
        content={congratMsg}
        transactionLink={transactionLink}
      />
    </Layout>
  );
};

export default CongratsPage;
