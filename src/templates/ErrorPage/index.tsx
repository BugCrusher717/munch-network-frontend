import Link from "next/link";
import styles from "./ErrorPage.module.sass";

const ErrorPage = () => {
  return (
    <div className={styles.message}>
      <strong>404</strong>
      <p className={styles.title}>LOOKS LIKE YOU ARE LOST IN THE SPACE</p>
      <p className={styles.messageText}>
        The page you are looking for might be removed or is temporally
        unavailable
      </p>
      <Link className={styles.button} href="/">
        GO BACK HOME
      </Link>
    </div>
  );
};

export default ErrorPage;
