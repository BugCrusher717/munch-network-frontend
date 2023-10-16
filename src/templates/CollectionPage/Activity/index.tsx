import Token from "~/components/Token";
import styles from "./Activity.module.sass";

type ActivityProps = {
  items: any;
};

const Activity = ({ items }: ActivityProps) => (
  <div className={styles.tokens}>
    {items.map(
      (token: any, index: number) =>
        token.price &&
        token.price !== "undefined BTC" && (
          <Token
            className={styles.token}
            item={token}
            key={index}
            large={true}
            dark={false}
            isString={false}
          />
        )
    )}
  </div>
);

export default Activity;
