import cn from "classnames";
import styles from "./Follow.module.sass";
import Icon from "~/components/Icon";
import { followUser, unFollowUser } from "~/actions/profile";
import { useSelector } from "react-redux";
import { selectFollowLoadingStatus } from "~/reducers/profileSlice";
import Image from "next/image";
type FollowProps = {
  className?: string;
  dark?: boolean;
  value: boolean;
  address: string;
};

const Follow = ({ className, dark, value, address }: FollowProps) => {
  const followButtonClicked = () => {
    if (address) {
      if (value === false) {
        void followUser(address);
      } else {
        void unFollowUser(address);
      }
    }
  };

  const followLoadingStatus = useSelector(selectFollowLoadingStatus);

  return (
    <button
      className={cn(
        "button-medium",
        styles.button,
        {
          [styles.active as string]: value,
          [styles.dark as string]: dark,
        },
        className
      )}
      onClick={() => followButtonClicked()}
    >
      {followLoadingStatus === true ? (
        <div className={styles.loadingDiv}>
          <Image
            className={cn("loadingIcon", styles.loadingIcon)}
            src="/images/loading.gif"
            alt="Loading GIF"
            width={100}
            height={100}
          />
        </div>
      ) : (
        <>
          <span className={styles.text}>
            follow<span>ing</span>
          </span>
          <Icon className={styles.plus} name="plus" />
          <Icon className={styles.check} name="check" />
        </>
      )}
    </button>
  );
};

export default Follow;
