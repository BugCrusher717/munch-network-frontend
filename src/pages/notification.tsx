import { NextSeo } from "next-seo";
import NotificationPage from "~/templates/NotificationPage";

const Notification = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: "Munch Swap Notification",
          description:
            "This is the notification page of munchers, You can confirm all notifications here.",
        }}
      />
      <NotificationPage />
    </>
  );
};

export default Notification;
