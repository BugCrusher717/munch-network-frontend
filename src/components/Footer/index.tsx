import Link from "next/link";
import styles from "./Footer.module.sass";
import Logo from "~/components/Logo";
import Icon from "~/components/Icon";

import { footerNavigation } from "~/constants/footerNavigation";

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.body}>
      <div className={styles.details}>
        <Logo className={styles.logo} />
        <div className={styles.info}>Empower your creativity.</div>
      </div>
      <div className={styles.group}>
        {footerNavigation.map((item: any, index: number) => (
          <div className={styles.item} key={index}>
            <div className={styles.category}>{item.title}</div>
            <div className={styles.menu}>
              {item.menu.map((link: any, index: number) =>
                link.external ? (
                  <a
                    className={styles.link}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={index}
                  >
                    {link.icon && <Icon name={link.icon} />}
                    {link.title}
                  </a>
                ) : (
                  <Link className={styles.link} href={link.url} key={index}>
                    {link.icon && <Icon name={link.icon} />}
                    {link.title}
                  </Link>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className={styles.foot}>
      <div className={styles.copyright}>
        Copyright © 2022 UI8 LLC. All rights reserved
      </div>
    </div>
  </footer>
);

export default Footer;
