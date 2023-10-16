import { useEffect, useState, useCallback } from "react";
import cn from "classnames";
import styles from "./Tokens.module.sass";
import Users from "~/components/Users";
import Actions from "~/components/Actions";
import Token from "~/components/Token";
import Spinner from "~/components/Spinner";

type TokensProps = {
  titleUsers?: string;
  items: any;
  users: string[];
  theme: any;
  setTheme: any;
  page: number;
  setPage: any;
  pageCount: number;
  isString?: boolean;
};

const Tokens = ({
  items,
  titleUsers,
  users,
  theme,
  setTheme,
  page,
  setPage,
  pageCount,
  isString = false,
}: TokensProps) => {
  const [sorting, setSorting] = useState<string>("grid");
  const [isScrolling, setIsScrolling] = useState(false);

  const onScroll = useCallback((_event: any) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollY = window.scrollY;

    // Calculate the percentage of scroll progress
    const scrollPercentage = (scrollY / (documentHeight - windowHeight)) * 100;

    if (scrollPercentage >= 100) {
      setIsScrolling((_isScrolling) => true);
    } else {
      setIsScrolling((_isScrolling) => false);
    }
  }, []);

  useEffect(() => {
    if (page < pageCount && setPage !== null && isScrolling === true) {
      setPage((_page: number) => page + 1);
    }
  }, [isScrolling]);

  useEffect(() => {
    //add eventlistener to window
    window.addEventListener("scroll", onScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className={styles.head}>
        <Users
          classUsersItem={styles.user}
          classUsersCounter={styles.counter}
          title={titleUsers}
          items={users}
          dark={theme}
          border
        />
        <Actions
          sortingValue={sorting}
          setSortingValue={setSorting}
          theme={theme}
          setTheme={setTheme}
          dark={theme}
        />
      </div>
      <div
        className={cn(styles.tokens, {
          [styles.list as string]: sorting === "list",
        })}
        id="scrollContainer"
      >
        {items.map((token: any, index: number) => (
          <Token
            className={styles.token}
            item={token}
            key={index}
            large={sorting === "list"}
            dark={theme}
            isString={isString}
          />
        ))}
      </div>

      {page < pageCount && setPage != null ? <Spinner dark={theme} /> : <></>}
    </>
  );
};

export default Tokens;
