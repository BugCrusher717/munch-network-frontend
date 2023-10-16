import { useEffect, useState } from "react";
import styles from "./Profile.module.sass";
import List from "~/components/List";
import Tokens from "~/components/Tokens";
import Details from "./Details";
import FollowList from "./FollowList";

import { socials } from "~/constants/profile";
import AvatarGenerator from "~/components/common/Avatar-generator";
import { useSelector } from "react-redux";
import {
  formatUserProfileInscriptionDatas,
  getFollowCount,
  getFollowStatus,
  getFollowerMembers,
  getFollowingMembers,
  getTotalSales,
  getUserProfile,
  getUserProfileInscriptionDatas,
} from "~/actions/profile";
import {
  selectFollowStatus,
  selectFollowerCount,
  selectFollowerMembers,
  selectFollowingCount,
  selectFollowingMebmers,
  selectTotalFollowerPageCount,
  selectTotalFollowingPageCount,
  selectTotalInscriptionCount,
  selectTotalInscriptionPageCount,
  selectTotalSales,
  selectUserAddress,
  selectUserInscriptionDatas,
  selectUserProfileDatas,
} from "~/reducers/profileSlice";
import { addressShortening } from "~/utils/address";
import { useRouter } from "next/router";
import { selectUser } from "~/reducers/authSlice";

export interface LinkForm {
  title: string;
  icon: string;
  url: string;
}

export interface TabTokensForm {
  title: string;
  value: string;
  counter: number;
}
export interface IImageInscription {
  title: string;
  inscriptionId: string;
  image: string;
  price: string;
  url: string;
  category: string;
  users: string[];
}

export interface IStringInscription {
  title: string;
  contentUrl: string;
  price: string;
  url: string;
  category: string;
  users: string[];
}

const Profile = () => {
  const router = useRouter();
  const [sorting, setSorting] = useState<string>("total-sales");
  const [sortingTokens, setSortingTokens] = useState<string>("image");
  const [sortingFollowers, setSortingFollowers] = useState<string>("followers");
  const [profildId, setProfileId] = useState<string>("");
  const [theme, setTheme] = useState<boolean>(false);

  const [followerPage, setFollwerPage] = useState<number>(1);
  const [followingPage, SetFollowingPage] = useState<number>(1);

  const address = useSelector(selectUserAddress);
  const user = useSelector(selectUserProfileDatas);
  const ownuser = useSelector(selectUser);

  const followerMembers = useSelector(selectFollowerMembers);
  const followingMembers = useSelector(selectFollowingMebmers);
  const followerCount = useSelector(selectFollowerCount);
  const followingCount = useSelector(selectFollowingCount);
  const followStatus = useSelector(selectFollowStatus);
  const totalSales = useSelector(selectTotalSales);

  const [inscriptionPage, setInscriptionPage] = useState<number>(1);
  const [inscriptionTake, setInscriptionTake] = useState<number>(20);
  const totalInscriptionPageCount = useSelector(
    selectTotalInscriptionPageCount
  );

  const totalFollowingPageCount = useSelector(selectTotalFollowingPageCount);
  const totalFollowerPageCount = useSelector(selectTotalFollowerPageCount);

  const totalInscriptionCount = useSelector(selectTotalInscriptionCount);

  const [links, setLinks] = useState<LinkForm[]>([]);
  const [imageInscriptions, setImageInscriptions] = useState<
    IImageInscription[]
  >([]);
  const [stringInscriptions, setStringInscriptions] = useState<
    IStringInscription[]
  >([]);
  const [tabsTokens, setTabsTokens] = useState<TabTokensForm[]>([]);
  const inscriptionDatas = useSelector(selectUserInscriptionDatas);

  useEffect(() => {
    void formatUserProfileInscriptionDatas();
  }, []);
  useEffect(() => {
    if (router.query.profileId) {
      setProfileId((_profildId) => router.query.profileId as string);
      void getUserProfileInscriptionDatas(
        router.query.profileId as string,
        inscriptionPage,
        inscriptionTake
      );
      if (router.query.profileId === ownuser.name) void router.push("/profile");
    }
  }, [router, inscriptionPage]);

  useEffect(() => {
    if (address) {
      void getFollowCount(address);
      void getTotalSales(address);
      void getFollowerMembers(address, followerPage, 20);
      void getFollowingMembers(address, followingPage, 20);
      void getFollowStatus(address);
    }
  }, [address, followStatus]);

  useEffect(() => {
    if (profildId) {
      void getUserProfile(profildId);
    }
  }, [profildId]);

  useEffect(() => {
    const imageInscriptionDatas: IImageInscription[] = [];
    const stringInscriptionDatas: IStringInscription[] = [];

    inscriptionDatas.forEach((inscription) => {
      if (inscription.contentType.startsWith("image")) {
        imageInscriptionDatas.push({
          title: inscription.title,
          inscriptionId: inscription.inscriptionId,
          image: `${process.env.NEXT_PUBLIC_INSCRIPTION_URL}${inscription.inscriptionId}`,
          price: inscription.price ? `${inscription.price} BTC` : "Not listed",
          url: `/set-price/${inscription.inscriptionId}`,
          category: addressShortening(inscription.inscriptionId),
          users: [],
        });
      } else if (inscription.contentType.startsWith("text"))
        stringInscriptionDatas.push({
          title: inscription.title,
          contentUrl: `${process.env.NEXT_PUBLIC_INSCRIPTION_URL}${inscription.inscriptionId}`,
          price: inscription.price ? `${inscription.price} ` : "Not listed",
          url: `/set-price/${inscription.inscriptionId}`,
          users: [],
          category: addressShortening(inscription.inscriptionId),
        });
    });
    setImageInscriptions(imageInscriptionDatas);
    setStringInscriptions(stringInscriptionDatas);

    const tabsTokens = [
      {
        title: "IMAGE INSCRIPTIONS",
        value: "image",
        counter: totalInscriptionCount,
      },
      {
        title: "TEXT INSCRIPTIONS",
        value: "text",
        counter: 0,
      },
    ];
    setTabsTokens(tabsTokens);
  }, [inscriptionDatas]);

  useEffect(() => {
    const links = [];
    if (user) {
      if (user.website) {
        links.push({
          title: "Website",
          icon: "country",
          url: user.website,
        });
      }
      if (user.facebook) {
        links.push({
          title: "Facebook",
          icon: "facebook",
          url: user.facebook,
        });
      }
      if (user.twitter) {
        links.push({
          title: "Facebook",
          icon: "twitter",
          url: user.twitter,
        });
      }
    }
    setLinks(links);
  }, [user]);

  const actions = [
    {
      title: "Total sales",
      value: "total-sales",
      counter: `${totalSales} BTC`,
    },
    {
      title: "Following",
      value: "following",
      counter: String(followingCount),
      onClick: () => setSortingFollowers("following"),
    },
    {
      title: "Followers",
      value: "followers",
      counter: String(followerCount),
      onClick: () => setSortingFollowers("followers"),
    },
  ];

  const tabsFollow = [
    {
      title: "Following",
      value: "following",
      counter: followingCount,
      onClick: () => setSorting("following"),
    },
    {
      title: "Followers",
      value: "followers",
      counter: followerCount,
      onClick: () => setSorting("followers"),
    },
  ];

  return (
    <div className={styles.row}>
      <div className={styles.col}>
        <div className={styles.avatar}>
          {address && <AvatarGenerator seed={address} />}
        </div>
        <Details
          actions={actions}
          sorting={sorting}
          setSorting={setSorting}
          links={links}
          socials={socials}
          bio={user.bio}
        />
      </div>
      <div className={styles.col}>
        {sorting === "total-sales" ? (
          <List
            tabs={tabsTokens}
            tabsValue={sortingTokens}
            setTabsValue={setSortingTokens}
            light={theme}
          >
            {sortingTokens === "image" &&
              (imageInscriptions.length > 0 ? (
                <Tokens
                  titleUsers="Collected by"
                  items={imageInscriptions}
                  users={[]}
                  theme={theme}
                  page={inscriptionPage}
                  setPage={setInscriptionPage}
                  setTheme={setTheme}
                  pageCount={totalInscriptionPageCount}
                />
              ) : (
                <h1>No Inscriptions</h1>
              ))}
            {sortingTokens === "text" && (
              <>
                {stringInscriptions.length > 0 ? (
                  <Tokens
                    titleUsers="Collected by"
                    items={stringInscriptions}
                    users={[]}
                    theme={theme}
                    setTheme={setTheme}
                    page={0}
                    setPage={null}
                    pageCount={1}
                    isString
                  />
                ) : (
                  <h1>No Inscriptions</h1>
                )}
              </>
            )}
          </List>
        ) : (
          <List
            tabs={tabsFollow}
            tabsValue={sortingFollowers}
            setTabsValue={setSortingFollowers}
          >
            {sorting === "followers" && sortingFollowers === "followers" && (
              <FollowList
                title="Followers"
                counter={followerCount}
                items={followerMembers}
                pageCount={followerPage}
                setPageCount={setFollwerPage}
                totalPageCount={totalFollowerPageCount}
              />
            )}
            {sorting === "following" && sortingFollowers === "following" && (
              <FollowList
                title="Following"
                counter={followingCount}
                items={followingMembers}
                pageCount={followingPage}
                setPageCount={SetFollowingPage}
                totalPageCount={totalFollowingPageCount}
              />
            )}
          </List>
        )}
      </div>
    </div>
  );
};

export default Profile;
