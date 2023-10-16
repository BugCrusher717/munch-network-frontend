import cn from "classnames";
import styles from "./Caption.module.sass";
import Icon from "~/components/Icon";

type CaptionProps = {
  title?: string;
  date?: string;
};

const Caption = ({ title, date }: CaptionProps) => (
  <div className={styles.caption}>
    <div className={styles.line}>
      <div className={cn("h2", styles.title)}>{title}</div>
    </div>
    <div className={styles.date}>
      <Icon name="external-link" />
      Inscription Number: {date}
    </div>
  </div>
);

export default Caption;
