import { NextSeo } from "next-seo";
import ProfilePage from "~/templates/ProfilePage";

const Profile = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Profile",
          description:
            "This is profile page of munchers. All your infos will be displayed here.",
        }}
      />
      <ProfilePage />
    </>
  );
};

export default Profile;
