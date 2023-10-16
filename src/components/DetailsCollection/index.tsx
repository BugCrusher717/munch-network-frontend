import cn from "classnames";
import styles from "./DetailsCollection.module.sass";
import Icon from "~/components/Icon";
import Contacts from "~/templates/ProfilePage/Profile/Contacts";
import { type Linksform } from "~/reducers/collectionSlice";

type DetailsType = {
  label: string;
  value: any;
};

type DetailsProps = {
  details: DetailsType[];
  collectionDatas: any;
  links: Linksform[];
};

const Details = ({ details, collectionDatas, links }: DetailsProps) => {
  return (
    <div className={styles.details}>
      <div className={styles.head}>
        <div className={styles.box}>
          <div className={cn("h2", styles.user)}>
            {collectionDatas[0]?.name}
          </div>
        </div>
      </div>
      <div className={styles.list}>
        {details.map((item, index) => (
          <div className={styles.item} key={index}>
            <div className={styles.label}>
              <Icon name="profile-fat" />
              {item.label}
            </div>
            <div className={cn("h4", styles.value)}>{item.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.foot}>
        <div className={styles.stage}>Description</div>
        <div className={styles.content}>{collectionDatas[0].description}</div>
      </div>
      <Contacts links={links} />
    </div>
  );
};

export default Details;
