import { NextSeo } from "next-seo";
import SettingsPage from "~/templates/SettingsPage";

const Settings = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Settings",
          description:
            "This is settings page of munchers. You can set your settings here.",
        }}
      />
      <SettingsPage />
    </>
  );
};

export default Settings;
