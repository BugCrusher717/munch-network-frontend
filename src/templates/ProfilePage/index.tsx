import Layout from "~/components/Layout";
import Background from "~/components/Background";
import Profile from "./Profile";

const ProfilePage = () => {
  return (
    <Layout layoutNoOverflow lightHeader footerHide isAuthPage>
      <Background image="/images/background-1.jpg" />
      <Profile />
    </Layout>
  );
};

export default ProfilePage;
