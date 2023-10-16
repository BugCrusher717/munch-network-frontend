import cn from "classnames";
import styles from "./Tabs.module.sass";
import { useDispatch } from "react-redux";
import { setFilterTime } from "~/reducers/discoverSlice";
type TabType = {
  title: string;
  value: string;
  onClick?: () => void;
};

type TabsProps = {
  className?: string;
  items: TabType[];
  value: number | string;
  setValue: any;
  dark?: boolean;
};

const Tabs = ({ className, items, value, setValue, dark }: TabsProps) => {
  const dispatch = useDispatch();

  const handleClick = (value: string, onClick: any) => {
    setValue(value);
    onClick && onClick();
    if (value === "24-hours") dispatch(setFilterTime(1));
    if (value === "7-days") dispatch(setFilterTime(7));
    if (value === "30-days") dispatch(setFilterTime(30));
  };

  return (
    <div
      className={cn(
        styles.tabs,
        { [styles.tabsDark as string]: dark },
        className
      )}
    >
      {items.map((item, index) => (
        <button
          className={cn(styles.button, {
            [styles.active as string]: value === item.value,
          })}
          onClick={() => handleClick(item.value, item.onClick)}
          key={index}
        >
          {item.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
