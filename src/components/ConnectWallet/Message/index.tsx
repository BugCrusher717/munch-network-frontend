import cn from "classnames";
import styles from "./Message.module.sass";
import Image from "~/components/Image";
import Icon from "~/components/Icon";

type MessageProps = {
  onContinue?: () => void;
  onLoadingStatus?: boolean;
};

const Message = ({ onContinue, onLoadingStatus }: MessageProps) => (
  <div className={styles.message}>
    <div className={styles.logo}>
      <Image
        src="/images/logo-connect-wallet.svg"
        inscriptionsId=""
        width="100"
        height="100"
        layout="responsive"
        objectFit="contain"
        alt="Logo"
      />
    </div>
    <div className={cn("h3", styles.title)}>
      Sign the message <br></br>in your wallet to continue
    </div>
    <div className={styles.info}>
      Crypter uses this signature to verify that you’re the owner of this
      Ethereum address.
    </div>
    <div className={styles.btns}>
      <button className={cn("button-stroke-white", styles.button)}>
        Disconnect
      </button>
      {onLoadingStatus === false ? (
        <button
          className={cn("button-white", styles.button)}
          onClick={onContinue}
        >
          continue
        </button>
      ) : (
        <button className={cn("button-white", styles.loadingDiv)}>
          <Image
            className={cn("loadingIcon", styles.loadingIcon)}
            src="/images/loading.gif"
            alt="Loading GIF"
            width={100}
            height={100}
          />
        </button>
      )}
    </div>
    <div className={styles.links}>
      <button
        className={styles.question}
        onClick={() => window.open("https://docs.ordinals.com/", "_blank")}
      >
        New to ordinal?
      </button>
      <button className={styles.learn}>
        Learn about wallet <Icon name="arrow-right" />
      </button>
    </div>
  </div>
);

export default Message;
