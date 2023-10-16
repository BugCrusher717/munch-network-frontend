import { useRouter } from "next/router";
import cn from "classnames";
import styles from "./Description.module.sass";
import Icon from "~/components/Icon";
import Preview from "./Preview";
import Statistics from "./Statistics";
import Caption from "./Caption";
import Links from "./Links";
import Tags from "./Tags";
import Provenance from "./Provenance";
import { useSelector } from "react-redux";
import { selectAddress } from "~/reducers/authSlice";

type DescriptionProps = {
  exit?: boolean;
  image: string;
  inscriptionId?: string;
  statistics: any;
  content: any;
  links?: any;
  tags?: any;
  provenanceAction?: any;
  provenance?: any;
  captionHide?: boolean;
  title: string;
  date?: string;
  children: React.ReactNode;
};

const Description = ({
  exit,
  image,
  inscriptionId,
  statistics,
  content,
  links,
  tags,
  provenanceAction,
  provenance,
  captionHide,
  title,
  date,
  children,
}: DescriptionProps) => {
  const router = useRouter();

  const address = useSelector(selectAddress);

  return (
    <>
      {exit && (
        <div className={styles.top}>
          <button className={styles.exit} onClick={() => router.back()}>
            <Icon name="close-fat" />
            <span>Exit preview mode</span>
          </button>
        </div>
      )}
      <div className={styles.row}>
        <div className={styles.col}>
          <Preview image={image} alt={title} inscriptionId={inscriptionId} />
          <Statistics
            className={styles.box}
            items={statistics}
            address={address}
          />
          <div className={styles.box}>
            <div className={cn("h4", styles.stage)}>Details</div>
            <div className={styles.content}>{content}</div>
            {links && <Links items={links} />}

            {tags && <Tags tags={tags} />}
          </div>
          {provenance && (
            <div className={styles.box}>
              <div className={cn("h4", styles.stage)}>Provenance</div>
              <Provenance action={provenanceAction} items={provenance} />
            </div>
          )}
        </div>
        <div className={styles.col}>
          <div className={styles.wrap}>
            {!captionHide && <Caption title={title} date={date} />}
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
