import { useState } from "react";
import cn from "classnames";
import styles from "./Upload.module.sass";
import Image from "~/components/Image";
import Icon from "~/components/Icon";

const Upload = () => {
  const [objectURL, setObjectURL] = useState<any>("/images/cute-planet-1.png");

  const handleUpload = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // setImage(file);
      setObjectURL(URL.createObjectURL(file as Blob));
    }
  };

  return (
    <div className={styles.upload}>
      <div className={styles.preview}>
        {objectURL !== null && (
          <>
            <button className={styles.close} onClick={() => setObjectURL(null)}>
              <Icon name="close" />
            </button>
            <Image
              src={objectURL}
              layout="fill"
              objectFit="cover"
              alt="Upload"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;
