import cn from "classnames";
import styles from "./Preview.module.sass";
import Image from "~/components/Image";
import PreviewTimeCounter from "~/components/PreviewTimeCounter";
import TimeCounter from "~/components/TimeCounter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectBtcPrice } from "~/reducers/authSlice";
import { getActionsDatas } from "~/actions/discover";
import { useEffect } from "react";
import { selectActionsDatas } from "~/reducers/discoverSlice";
import AvatarGenerator from "~/components/common/Avatar-generator";
import {
  selectPreviewData,
  selectPreviewFlag,
} from "~/reducers/notificationSlice";
import { addressShortening } from "~/utils/address";
import Link from "next/link";

const Preview = () => {
  const btcPrice = useSelector(selectBtcPrice);
  const actionDatas = useSelector(selectActionsDatas);
  const previewFlag = useSelector(selectPreviewFlag);
  const previewData = useSelector(selectPreviewData);
  const link_url: string = process.env.NEXT_PUBLIC_INSCRIPTION_URL as string;

  useEffect(() => {
    if (btcPrice) void getActionsDatas(btcPrice);
  }, [btcPrice]);

  return (
    <div className={styles.preview}>
      {previewFlag === false && actionDatas[0] ? (
        <>
          <div className={styles.image}>
            <Image
              src={actionDatas[0].image}
              inscriptionsId={actionDatas[0].inscriptionId}
              width="100"
              height="100"
              layout="responsive"
              objectFit="contain"
              alt="Logo"
            />
          </div>

          <div className={styles.head}>
            <div className={cn("h3", styles.title)}>Last Sales</div>
            <TimeCounter
              className={styles.timer}
              classTimerItem={styles.timerItem}
              classTimerValue={styles.timerValue}
              classTimerText={styles.timerText}
              time={actionDatas[0].salesTime}
            />
          </div>
          <div className={styles.foot}>
            <div className={styles.item}>
              <div className={styles.photo}>
                <AvatarGenerator seed={actionDatas[0].avatar} />
              </div>
              <div className={styles.details}>
                <div className={styles.subPreviewtitle}>
                  {actionDatas[0].login}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {previewData && (
            <>
              {previewData.swapInscriptionId ? (
                <div className={styles.box}>
                  <div className={styles.user}>
                    <div className={styles.swapdetails}>
                      <div className={styles.firstDiv}>
                        <div className={styles.swapTitle}>
                          <span className={styles.userTitle}>You</span>
                        </div>

                        <div className={styles.swapCountDiv}>
                          <div className={styles.swapCountStyle}>
                            {previewData.swapInscriptionId.length}
                          </div>
                        </div>
                        {previewData.swapInscriptionId.length > 1 ? (
                          <div className={styles.swapImages}>
                            {previewData.swapInscriptionId
                              .slice()
                              .reverse()
                              .map((item, index) => (
                                <Image
                                  alt=""
                                  width={100}
                                  height={100}
                                  key={index}
                                  inscriptionsId={item}
                                  src={`${link_url}${item}`}
                                  className={cn(styles.swapImageSVG)}
                                  style={
                                    index === 0
                                      ? {
                                          left: `3.5rem`,
                                          zIndex: `${999 - index}`,
                                        }
                                      : {
                                          left: `${
                                            (3.5 /
                                              (previewData.swapInscriptionId
                                                .length -
                                                1)) *
                                            (previewData.swapInscriptionId
                                              .length -
                                              1 -
                                              index)
                                          }rem`,
                                          top: `${10 * index}%`,
                                          zIndex: `${999 - index}`,
                                        }
                                  }
                                />
                              ))}
                          </div>
                        ) : (
                          <div className={styles.originalImageDiv}>
                            <Image
                              alt=""
                              width={100}
                              height={100}
                              inscriptionsId={previewData.swapInscriptionId[0]}
                              src={`${link_url}${previewData.swapInscriptionId[0]}`}
                              className={styles.swapImage}
                            />
                          </div>
                        )}
                      </div>
                      <div className={styles.secondDiv}>
                        <Image
                          alt=""
                          width={100}
                          height={100}
                          src="/images/swap-icon.svg"
                          className={styles.swapIconImage}
                        />
                      </div>

                      <div className={styles.thirdDiv}>
                        <div className={styles.swapTitle}>
                          <span className={styles.userTitle}>
                            @{previewData.userName}
                          </span>
                        </div>
                        <div className={styles.countDiv}>
                          <div className={styles.originalCountStyle}>1</div>
                        </div>
                        <div className={styles.originalImageDiv}>
                          <Image
                            alt=""
                            width={100}
                            height={100}
                            inscriptionsId={previewData.inscriptionId}
                            src={`${link_url}${previewData.inscriptionId}`}
                            className={styles.swapImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.subtitle}>Offer</div>
                  <div className={styles.list}>
                    <div className={styles.item}>
                      <div className={styles.price}>{previewData.price}</div>
                      <div className={styles.price}>BTC</div>
                    </div>
                  </div>
                  <div className={styles.inscriptionItem}>
                    <div className={styles.label}>InscriptionIds</div>
                    <div className={styles.value}>
                      {previewData.swapInscriptionId.map(
                        (id: string, index: number) => (
                          <div key={index}>
                            <Link
                              href={`/inscription/${id}`}
                              className={styles.LinkStyle}
                              target="_blank"
                            >
                              <span>{addressShortening(id)}</span>
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.label}>Expires in</div>

                    <PreviewTimeCounter
                      className={styles.timer}
                      classTimerItem={styles.timerItem}
                      classTimerValue={styles.timerValue}
                      classTimerText={styles.timerText}
                      time={previewData.expiredAt}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.box}>
                  <div className={styles.user}>
                    <div className={styles.swapdetails}>
                      <div className={styles.thirdDiv}>
                        <div className={styles.swapTitle}>
                          <span className={styles.userTitle}>
                            @{previewData.userName}
                          </span>
                        </div>

                        <div className={styles.originalImageDiv}>
                          <Image
                            alt=""
                            width={100}
                            height={100}
                            inscriptionsId={previewData.inscriptionId}
                            src={`${link_url}${previewData.inscriptionId}`}
                            className={styles.swapImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.subtitle}>Offer</div>
                  <div className={styles.list}>
                    <div className={styles.item}>
                      <div className={cn("h3", styles.price)}>
                        {previewData.price}
                      </div>
                      <div className={cn("h3", styles.price)}>BTC</div>
                    </div>
                  </div>
                  <div className={styles.item}>
                    <div className={styles.label}>Expires in</div>
                    <PreviewTimeCounter
                      className={styles.timer}
                      classTimerItem={styles.timerItem}
                      classTimerValue={styles.timerValue}
                      classTimerText={styles.timerText}
                      time={previewData.expiredAt}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Preview;
