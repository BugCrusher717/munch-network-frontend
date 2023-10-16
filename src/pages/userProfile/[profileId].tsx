import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import ProfilePage from "~/templates/UserProfilePage";

const ProfileDetail: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap UserProfile",
          description:
            "This is userprofile page of munchers. You can see all users info here.",
        }}
      />
      <ProfilePage />
    </>
  );
};

export default ProfileDetail;
