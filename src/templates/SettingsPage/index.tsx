import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./SettingsPage.module.sass";
import Layout from "~/components/Layout";
import Icon from "~/components/Icon";
import Information from "./Information";
import { useSelector } from "react-redux";
import {
  selectUser,
  selectAuthLoading,
  selectPaymentAddress,
} from "~/reducers/authSlice";
import { updateUserProfile } from "~/actions/auth";
import Image from "next/image";

const SettingsPage = () => {
  const scrollToRefProfile = useRef<any>(null);
  const [active, setActive] = useState<any>(scrollToRefProfile);
  const [saveStatus, setSaveStatus] = useState<boolean>(false);
  const authLoading = useSelector(selectAuthLoading);
  const userInfo = useSelector(selectUser);
  const paymentAddress = useSelector(selectPaymentAddress);

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");

  useEffect(() => {
    if (authLoading === true) setSaveStatus(true);
    else setSaveStatus(false);
  }, [authLoading]);

  useEffect(() => {
    setEmail(userInfo.email ?? "");
    setName(userInfo.name ?? "");
    setBio(userInfo.bio ?? "");
    setWebsite(userInfo.website ?? "");
    setTwitter(userInfo.twitter ?? "");
    setFacebook(userInfo.facebook ?? "");
  }, [userInfo]);

  const menu = [
    {
      title: "Profile",
      anchor: scrollToRefProfile,
    },
  ];

  const onSaveBtnClicked = () => {
    void updateUserProfile({
      email,
      name,
      paymentAddress,
      bio,
      website,
      twitter,
      facebook,
    });
  };

  const handleClick = (anchor: any) => {
    anchor.current.scrollIntoView({
      behavior: "smooth",
    });
    setActive(anchor);
  };

  return (
    <Layout layoutNoOverflow footerHide isAuthPage>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.wrap}>
            <div className={styles.head}>
              <div className={cn("h1", styles.title)}>Settings</div>

              {saveStatus === false ? (
                <button
                  className={cn("button-large", styles.button)}
                  onClick={onSaveBtnClicked}
                >
                  <span>Save</span>
                  <Icon name="check" />
                </button>
              ) : (
                <button className={cn("button-large", styles.loadingDiv)}>
                  <Image
                    className={cn("loadingIcon", styles.loadingIcon)}
                    src="/images/loading.gif"
                    alt="Loading GIF"
                    width={100}
                    height={100}
                  />
                </button>
              )}
            </div>
            <div className={styles.menu}>
              {menu.map((link, index) => (
                <button
                  className={cn("h4", styles.link, {
                    [styles.active as string]: link.anchor === active,
                  })}
                  key={index}
                  onClick={() => handleClick(link.anchor)}
                >
                  {link.title}
                  <Icon name="arrow-right" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.section}>
            <div className={styles.anchor} ref={scrollToRefProfile}></div>
            <div className={styles.label}>information</div>
            <Information
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              bio={bio}
              setBio={setBio}
              website={website}
              setWebsite={setWebsite}
              twitter={twitter}
              setTwitter={setTwitter}
              facebook={facebook}
              setFacebook={setFacebook}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
