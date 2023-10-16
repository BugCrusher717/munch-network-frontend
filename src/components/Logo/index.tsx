import Link from "next/link";
import cn from "classnames";
import styles from "./Logo.module.sass";
import Image from "next/image";

type LogoProps = {
  className?: string;
  light?: boolean;
  onClick?: () => void;
};

const Logo = ({ className, light, onClick }: LogoProps) => (
  <Link
    href="/"
    className={cn(styles.logo, { [styles.light as string]: light }, className)}
    onClick={onClick}
  >
    <Image
      src="/images/logo.svg"
      alt=""
      width={100}
      height={100}
      className={styles.logoImage}
    />
  </Link>
);

export default Logo;
