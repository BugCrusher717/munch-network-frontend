import Layout from "~/components/Layout";
import Main from "./Main";
import Hot from "./Hot";
import Dream from "./Dream";
import Collections from "./Collections";
import Spotlight from "./Spotlight";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDiscoverCollectionData } from "~/reducers/collectionSlice";
import { selectAddress, selectRecentActivities } from "~/reducers/authSlice";
import { getDiscoverCollectionData } from "~/actions/collection";
import { getRecentActivities } from "~/actions/auth";
import { getRecentUser, getTopPrice } from "~/actions/buyNow";
import { selectRecentUser, selectTopPrice } from "~/reducers/buyNowSlice";

const HomePage = () => {
  const activeCollections = useSelector(selectDiscoverCollectionData);
  const address = useSelector(selectAddress);
  const recentActivities = useSelector(selectRecentActivities);
  const recentUser = useSelector(selectRecentUser);
  const topPrice = useSelector(selectTopPrice);

  useEffect(() => {
    void getRecentActivities();
    void getRecentUser();
    void getDiscoverCollectionData();
    void getTopPrice();
  }, [address]);

  return (
    <Layout layoutNoOverflow noRegistration>
      <Main list={recentActivities} />
      <Hot hotArtists={recentUser} />
      <Dream topPrice={topPrice} />
      <Collections items={activeCollections} />
      <Spotlight />
    </Layout>
  );
};

export default HomePage;
