import cn from "classnames";
import styles from "./Actions.module.sass";
import Icon from "~/components/Icon";

const sorting = [
  {
    icon: "list",
    value: "list",
  },
  {
    icon: "grid",
    value: "grid",
  },
];

type ActionsProps = {
  sortingValue?: any;
  setSortingValue?: any;
  theme?: any;
  setTheme?: any;
  filtersShow?: boolean;
  filters?: any;
  setFilters?: any;
  dark?: boolean;
};

const Actions = ({
  sortingValue,
  setSortingValue,
  theme,
  setTheme,
  filtersShow,
  filters,
  setFilters,
  dark,
}: ActionsProps) => (
  <div className={cn(styles.actions, { [styles.dark as string]: dark })}>
    {sortingValue &&
      sorting.map((item, index) => (
        <button
          className={cn(styles.sorting, {
            [styles.active as string]: sortingValue === item.value,
          })}
          key={index}
          onClick={() => setSortingValue(item.value)}
        >
          <Icon name={item.icon} />
        </button>
      ))}
    {filtersShow && (
      <button
        className={cn(styles.filters, { [styles.active as string]: filters })}
        onClick={() => setFilters(!filters)}
      >
        <Icon name="filter" />
      </button>
    )}
    <button
      className={cn(styles.theme, { [styles.active as string]: theme })}
      onClick={() => setTheme(!theme)}
    >
      <Icon className={styles.sun} name="sun" />
      <Icon className={styles.moon} name="moon" />
    </button>
  </div>
);

export default Actions;
