import cn from "classnames";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import styles from "./Details.module.sass";
import Icon from "~/components/Icon";
import Follow from "~/components/Follow";
import Contacts from "../Contacts";
import { addressShortening } from "~/utils/address";
import {
  selectFollowStatus,
  selectUserAddress,
  selectUserProfileDatas,
} from "~/reducers/profileSlice";

type ActionsType = {
  title: string;
  value: string;
  counter: string;
  onClick?: () => void;
};

type DetailsProps = {
  actions: ActionsType[];
  sorting: any;
  setSorting: any;
  links: any;
  socials: any;
  bio?: string;
};

const Details = ({
  actions,
  sorting,
  setSorting,
  links,
  socials,
  bio,
}: DetailsProps) => {
  const user = useSelector(selectUserProfileDatas);
  const address = useSelector(selectUserAddress);
  const follow = useSelector(selectFollowStatus);

  const handleClick = (value: string, onClick: any) => {
    setSorting(value);
    onClick && onClick();
  };

  const handleCopyClick = () => {
    if (address) {
      void navigator.clipboard.writeText(address);
      toast.success("Address is Copied");
    }
  };

  return (
    <div className={styles.details}>
      <div className={styles.head}>
        <div className={styles.flex}>
          <div className={styles.box}>
            <div className={cn("h2", styles.user)}>{user.name}</div>
            <div className={styles.line}>
              <div className={styles.login}>{user.email}</div>
              <div className={styles.code}>
                {address && addressShortening(address)}
                <button
                  className={styles.copy}
                  onClick={() => handleCopyClick()}
                >
                  <Icon name="copied" />
                </button>
              </div>
            </div>
          </div>
          <Follow
            className={styles.follow}
            value={follow}
            dark
            address={address}
          />
        </div>
        <div className={styles.actions}>
          {actions.map((action, index) => (
            <div
              className={cn(styles.action, {
                [styles.active as string]: sorting === action.value,
              })}
              key={index}
              onClick={() => handleClick(action.value, action.onClick)}
            >
              <div className={cn("h4", styles.counter)}>{action.counter}</div>
              <div className={styles.subtitle}>
                <Icon name="profile-fat" /> {action.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Contacts links={links} socials={socials} bio={bio} />
    </div>
  );
};

export default Details;
