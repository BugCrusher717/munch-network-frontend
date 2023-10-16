import cn from "classnames";
import { useEffect, useRef, useState } from "react"; // Import useState
import styles from "./Dropdown.module.sass";
import Icon from "../Icon";
import { useDispatch } from "react-redux";
import { setExpired } from "~/reducers/buyNowSlice";

type DropDownProps = {
  items: string[];
};

const DropDown = ({ items }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  // Close the dropdown when a click occurs outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as HTMLElement)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      id="dropdown"
      className={cn(styles.selectOptions, {
        [styles.open as string]: isOpen,
      })}
      ref={dropdownRef}
    >
      <div className={styles.selectStyle} onClick={toggleDropdown}>
        <span>{selectedItem || "30 minutes"}</span>
        <Icon name="arrow-down" />
      </div>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {items?.map((item, index) => (
            <div
              key={index}
              className={styles.selectOption}
              onClick={() => {
                handleItemClick(item);
                dispatch(setExpired(index));
              }}
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropDown;
