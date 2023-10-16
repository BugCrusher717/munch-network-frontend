import { useRef, useState } from "react";
import cn from "classnames";
import Form from "~/components/Form";
import styles from "./Filters.module.sass";
import Status from "./Status";
import { useDispatch } from "react-redux";
import {
  setMaxPrice,
  setMinPrice,
  setSearchKeyWord,
} from "~/reducers/discoverSlice";

type StatusesType = {
  title: string;
  status: boolean;
};

type FiltersProps = {
  statuses: StatusesType[];
  dark?: boolean;
};

const Filters = ({ statuses, dark }: FiltersProps) => {
  const [email, setEmail] = useState<string>("");
  const minRef = useRef<HTMLInputElement | null>(null);
  const maxRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();

  const applyButtonClicked = () => {
    if (minRef.current && maxRef.current) {
      if (!minRef.current.value) dispatch(setMinPrice(undefined));
      else dispatch(setMinPrice(Number(minRef.current.value)));
      if (!maxRef.current.value) dispatch(setMaxPrice(undefined));
      else dispatch(setMaxPrice(Number(maxRef.current.value)));
    }
  };

  return (
    <div className={cn(styles.filters, { [styles.dark as string]: dark })}>
      <div className={styles.head}>
        <div className={cn("h3", styles.title)}>Advanced filter</div>
        <Form
          className={styles.form}
          inputClassName={styles.formInput}
          placeholder="Search by NFTs"
          value={email}
          setValue={setEmail}
          onSubmit={(event: any) => {
            event.preventDefault(); // Prevent the default form submission
            if (email.trim() !== "") {
              dispatch(setSearchKeyWord(email));
            } else {
              dispatch(setSearchKeyWord(""));
            }
          }}
          dark={dark}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.label}>OrderBy</div>
          <div className={styles.statuses}>
            {statuses.map((status, index) => (
              <Status
                className={styles.status}
                item={status}
                key={index}
                dark={dark}
                order={index + 1}
              />
            ))}
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.label}>Price</div>
          <div className={styles.fieldset}>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="tel"
                placeholder="Min"
                ref={minRef}
                required
              />
            </div>
            <div className={styles.field}>
              <input
                className={styles.input}
                type="tel"
                ref={maxRef}
                placeholder="Max"
                required
              />
            </div>
            <button
              className={cn(
                {
                  "button-large": !dark,
                  "button-white button-large": dark,
                },
                styles.button
              )}
              onClick={applyButtonClicked}
            >
              apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
