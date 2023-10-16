import cn from "classnames";
import styles from "./UserFollow.module.sass";
import Icon from "~/components/Icon";
import { userFollow, userUnfollow } from "~/actions/profile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  type UserFollowerForm,
  selectUserAddress,
  setUserFollowerStatus,
} from "~/reducers/profileSlice";

type FollowProps = {
  className?: string;
  dark?: boolean;
  value: boolean;
  setValue: any;
  item: any;
  address: string;
};

const Follow = ({
  className,
  dark,
  value,
  setValue,
  item,
  address,
}: FollowProps) => {
  const ownerAddress = useSelector(selectUserAddress);
  const dispatch = useDispatch();
  const followButtonClicked = () => {
    const form: UserFollowerForm = { ...item };
    if (item.address && ownerAddress) {
      if (value === false) {
        void userFollow(item.address, ownerAddress);
        form.follow = true;
        dispatch(setUserFollowerStatus({ form, address }));
        setValue((_value: boolean) => true);
      } else {
        void userUnfollow(item.address, ownerAddress);
        form.follow = false;
        dispatch(setUserFollowerStatus({ form, address }));
        setValue((_value: boolean) => false);
      }
    }
  };

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
      <span className={styles.text}>
        follow<span>ing</span>
      </span>
      <Icon className={styles.plus} name="plus" />
      <Icon className={styles.check} name="check" />
    </button>
  );
};

export default Follow;
