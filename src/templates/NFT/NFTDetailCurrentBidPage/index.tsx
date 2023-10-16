import Layout from "~/components/Layout";
import Description from "~/components/Description";
import Details from "./Details";

const statistics = [
  {
    label: "Created by",
    avatar: "/images/avatar.jpg",
    history: true,
    title: "Dash",
    login: "randomdash",
  },
  {
    label: "Collection",
    image: "/images/robot.jpg",
    title: "Cute Planet",
    category: "cute",
  },
];

const links = [
  {
    title: "View on Ordinals.com",
    icon: "country",
    url: "https://ordinals.com/",
  },
  {
    title: "View Ord.io",
    icon: "link",
    url: "https://www.ord.io/",
  },
  {
    title: "View on Ordinals.hiro.so",
    icon: "link",
    url: "https://ordinals.hiro.so/",
  },
];

const provenance = [
  {
    avatar: "/images/avatar.jpg",
    history: true,
    content: (
      <>
        Bid placed by <span>0x56C1...8eCC</span>
      </>
    ),
    price: "5.00 BTC",
    date: "Aug 18, 2022 at 18:80",
    url: "https://ui8.net/",
  },
  {
    avatar: "/images/avatar.jpg",
    history: true,
    content: (
      <>
        Listed by <span>@randomdash</span>
      </>
    ),
    price: "5.00 BTC",
    date: "Aug 18, 2022 at 18:80",
    url: "https://ui8.net/",
  },
  {
    avatar: "/images/avatar.jpg",
    history: true,
    content: (
      <>
        Minted by <span>@randomdash</span>
      </>
    ),
    price: "5.00 BTC",
    date: "Aug 18, 2022 at 18:80",
    url: "https://ui8.net/",
  },
];

const tags = [
  "Cute",
  "Robot",
  "Cute Planet",
  "Suitcase",
  "Spaceship",
  "Animation",
  "Redshift Render",
  "3D",
  "Character",
  "Cinema 4D",
];

const MintNFTPage = () => {
  return (
    <Layout layoutNoOverflow footerHide>
      <Description
        image="/images/cute-planet-large.jpg"
        title="The Explorer"
        statistics={statistics}
        links={links}
        tags={tags}
        provenanceAction={{
          avatar: "/images/avatar.jpg",
          history: true,
          content: (
            <>
              Auction won by <span>0x56C1...8eCC</span>
            </>
          ),
          title: (
            <>
              Sold for <span>6.05 BTC</span> $9,256.58
            </>
          ),
          date: "Aug 18, 2022 at 18:80",

          linkTitle: (
            <>
              Auction settled by <span>@Kohaku</span>
            </>
          ),
          linkUrl: "https://ui8.net/",
        }}
        provenance={provenance}
        content="FIND AN OFFER THAT SUITS YOU. SWAP. - explore the limitless possibilities of Bitcoin Ordinals."
      >
        <Details />
      </Description>
    </Layout>
  );
};

export default MintNFTPage;
