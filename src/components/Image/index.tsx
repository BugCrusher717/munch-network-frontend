import { useEffect, useState } from "react";
import { default as NextImage, type ImageProps } from "next/image";
import cn from "classnames";
import styles from "./Image.module.sass";
import { getInscriptionContentType } from "~/utils/inscription";

type CustomImageProps = ImageProps & {
  inscriptionsId?: string;
};

const Image = ({ className, inscriptionsId, ...props }: CustomImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [contentType, setContentType] = useState<string>("image/webp");
  const network = process.env.NEXT_PUBLIC_NETWORK;

  useEffect(() => {
    const getInscriptionConetnet = async () => {
      if (inscriptionsId) {
        const res = await getInscriptionContentType(inscriptionsId);
        setContentType((_contentType) =>
          network === "testnet" ? res.contentType : res.content_type
        );
      }
    };
    void getInscriptionConetnet();
  }, [inscriptionsId]);

  return (
    <>
      {contentType === "image/svg+xml" || contentType === "text/html" ? (
        <iframe
          className={cn(styles.svgImage, className)}
          src={props.src as string}
          style={props.style}
        />
      ) : (
        <NextImage
          className={cn(
            styles.image,
            { [styles.loaded as string]: loaded },
            className
          )}
          onLoadingComplete={() => setLoaded(true)}
          {...props}
        />
      )}
    </>
  );
};

export default Image;
