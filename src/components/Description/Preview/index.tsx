import styles from "./Preview.module.sass";
import Image from "~/components/Image";

type PreviewProps = {
  image: string;
  alt: string;
  inscriptionId?: string;
};

const Preview = ({ image, alt, inscriptionId }: PreviewProps) => (
  <div className={styles.preview}>
    <Image
      src={image}
      layout="fill"
      objectFit="cover"
      alt={alt}
      inscriptionsId={inscriptionId}
      className={styles.Image}
    />
  </div>
);

export default Preview;
