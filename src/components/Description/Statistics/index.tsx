import cn from "classnames";
import styles from "./Statistics.module.sass";
import Image from "~/components/Image";
import AvatarGenerator from "~/components/common/Avatar-generator";
import Link from "next/link";

type StatisticsProps = {
  className?: string;
  items: any;
  address?: string;
};

const Statistics = ({ className, items, address }: StatisticsProps) => (
  <div className={cn(styles.statistics, className)}>
    <div className={styles.list}>
      {items.map((item: any, index: number) => (
        <div className={styles.item} key={index}>
          <div className={styles.label}>{item.label}</div>
          {item.label === "Owner" ? (
            <>
              {item.avatar === address ? (
                <Link className={styles.flex} href={`/profile`}>
                  <div
                    className={cn({
                      [styles.avatar as string]: item.avatar,
                      [styles.image as string]: item.image,
                      [styles.history as string]: item.history,
                    })}
                  >
                    {item.avatar ? (
                      <AvatarGenerator seed={item.avatar} />
                    ) : (
                      <Image
                        src={item.image}
                        layout="fill"
                        objectFit="cover"
                        alt={item.title}
                      />
                    )}
                  </div>
                  <div className={styles.details}>
                    <div className={styles.title}>
                      @{item.title === "" ? "Undefined" : item.title}
                    </div>
                    {item.login && (
                      <div className={styles.login}>
                        @{item.login === "" ? "Undefined" : item.login}
                      </div>
                    )}
                    {item.category && (
                      <div className={styles.category}>
                        {item.category === "" ? "Undefined" : item.category}
                      </div>
                    )}
                  </div>
                </Link>
              ) : (
                <>
                  {item.title !== "Unknown User" ? (
                    <Link
                      className={styles.flex}
                      href={`/userProfile/${item.title}`}
                    >
                      <div
                        className={cn({
                          [styles.avatar as string]: item.avatar,
                          [styles.image as string]: item.image,
                          [styles.history as string]: item.history,
                        })}
                      >
                        {item.avatar ? (
                          <AvatarGenerator seed={item.avatar} />
                        ) : (
                          <Image
                            src={item.image}
                            layout="fill"
                            objectFit="cover"
                            alt={item.title}
                          />
                        )}
                      </div>
                      <div className={styles.details}>
                        <div className={styles.title}>{item.title}</div>
                        {item.login && (
                          <div className={styles.login}>@{item.login}</div>
                        )}
                        {item.category && (
                          <div className={styles.category}>{item.category}</div>
                        )}
                      </div>
                    </Link>
                  ) : (
                    <div className={styles.flex}>
                      <div
                        className={cn({
                          [styles.avatar as string]: item.avatar,
                          [styles.image as string]: item.image,
                          [styles.history as string]: item.history,
                        })}
                      >
                        {item.avatar ? (
                          <AvatarGenerator seed={item.avatar} />
                        ) : (
                          <Image
                            src={item.image}
                            layout="fill"
                            objectFit="cover"
                            alt={item.title}
                          />
                        )}
                      </div>
                      <div className={styles.details}>
                        <div className={styles.title}>{item.title}</div>
                        {item.login && (
                          <div className={styles.login}>@{item.login}</div>
                        )}
                        {item.category && (
                          <div className={styles.category}>{item.category}</div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <Link
              className={styles.flex}
              href={
                item.title !== "Undefined" ? `/collection/${item.title}` : "/"
              }
            >
              <div
                className={cn({
                  [styles.avatar as string]: item.avatar,
                  [styles.image as string]: item.image,
                  [styles.history as string]: item.history,
                })}
              >
                {item.avatar && <AvatarGenerator seed={item.avatar} />}
                {item.image && (
                  <Image
                    src={item.image}
                    layout="fill"
                    objectFit="cover"
                    alt={"Collection Image"}
                  />
                )}
              </div>
              <div className={styles.details}>
                <div className={styles.title}>{item.title}</div>
                {item.login && (
                  <div className={styles.login}>@{item.login}</div>
                )}
                {item.category && (
                  <div className={styles.category}>{item.category}</div>
                )}
              </div>
            </Link>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Statistics;
