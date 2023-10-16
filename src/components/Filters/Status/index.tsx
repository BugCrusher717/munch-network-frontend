import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./Status.module.sass";
import Icon from "~/components/Icon";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectConditionFlag,
  selectSortKeyword,
  setConditionFlag,
  setSortKeyword,
} from "~/reducers/discoverSlice";

type StatusProps = {
  className?: string;
  item: any;
  dark?: boolean;
  order: number;
};

const Status = ({ className, item, dark, order }: StatusProps) => {
  const [active, setActive] = useState<boolean>(false);

  const conditionFlag = useSelector(selectConditionFlag);
  const sortingKeyword = useSelector(selectSortKeyword);

  const dispatch = useDispatch();

  useEffect(() => {
    if (order === conditionFlag) setActive(true);
    else setActive(false);
  }, [conditionFlag]);

  const onButtonClicked = () => {
    dispatch(setConditionFlag(order));
    if (sortingKeyword === 1) {
      dispatch(setSortKeyword(0));
    } else {
      dispatch(setSortKeyword(sortingKeyword + 1));
    }
  };

  return (
    <button
      className={cn(
        styles.status,
        { [styles.active as string]: active, [styles.dark as string]: dark },
        className
      )}
      onClick={() => onButtonClicked()}
    >
      <span className={styles.check}>
        {sortingKeyword === 0 && <Icon name="down-arrow" />}
        {sortingKeyword === 1 && <Icon name="up-arrow" />}
      </span>

      {item.title}
    </button>
  );
};

export default Status;
