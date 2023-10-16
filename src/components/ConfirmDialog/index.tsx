import styles from "./ConfirmDialog.module.sass";
import { useDispatch } from "react-redux";
import { cancelActiveOffers as cancelBuyNowActiveOffers } from "~/actions/buyNow";
import { cancelActiveOffers as cancelSwapActiveOffers } from "~/actions/swapNow";
import {
  reduceTotalActiveItemCount,
  reduceTotalActiveSwapItemCount,
  removeBuyNowActiveOffers,
  removeSwapNowActiveOffers,
} from "~/reducers/notificationSlice";
import {
  reducePendingItemCount,
  reducePendingSwapItemCount,
  reduceReceivedItemCount,
  reduceReceivedSwapItemCount,
  removePendingOffers,
  removePendingSwapOffers,
  removeReceivedOffers,
  removeReceivedSwapOffers,
} from "~/reducers/offerSlice";
type ConfirmDialogProps = {
  transactionLink: string;
  setShowFlag: any;
  typeFlag: string;
};

const ConfirmDialog = ({
  transactionLink,
  setShowFlag,
  typeFlag,
}: ConfirmDialogProps) => {
  const dispatch = useDispatch();

  const onOkayBtnClicked = async () => {
    if (typeFlag === "BuyNow") {
      await cancelBuyNowActiveOffers(transactionLink);
      dispatch(removeBuyNowActiveOffers(transactionLink));
      dispatch(reduceTotalActiveItemCount());
      setShowFlag("");
    }

    if (typeFlag === "Swap") {
      await cancelSwapActiveOffers(transactionLink);
      dispatch(removeSwapNowActiveOffers(transactionLink));
      setShowFlag("");
      dispatch(reduceTotalActiveSwapItemCount());
    }

    if (typeFlag === "PendingBuyNow") {
      await cancelBuyNowActiveOffers(transactionLink);
      dispatch(removePendingOffers(transactionLink));
      dispatch(reducePendingItemCount());
      setShowFlag("");
    }

    if (typeFlag === "PendingSwap") {
      await cancelSwapActiveOffers(transactionLink);
      dispatch(removePendingSwapOffers(transactionLink));
      setShowFlag("");
      dispatch(reducePendingSwapItemCount());
    }
    if (typeFlag === "ReceivedBuyNow") {
      await cancelBuyNowActiveOffers(transactionLink);
      dispatch(removeReceivedOffers(transactionLink));
      dispatch(reduceReceivedItemCount());
      setShowFlag("");
    }

    if (typeFlag === "ReceivedSwap") {
      await cancelSwapActiveOffers(transactionLink);
      dispatch(removeReceivedSwapOffers(transactionLink));
      setShowFlag("");
      dispatch(reduceReceivedSwapItemCount());
    }
  };

  const onCancelBtnClicked = () => {
    setShowFlag("");
  };
  return (
    <div className={styles.react_confirm_alert_overlay}>
      <div className={styles.react_confirm_alert}>
        <div className={styles.react_confirm_alert_body}>
          <div className={styles.react_confirm_title}>Are you sure?</div>
          <div className={styles.react_confirm_text}>
            You want to cancel this offer?
          </div>
          <div className={styles.react_confirm_alert_button_group}>
            <button
              className={styles.react_confirm_alert_button}
              onClick={() => void onOkayBtnClicked()}
            >
              Okay
            </button>
            <button
              className={styles.react_confirm_alert_button}
              onClick={() => onCancelBtnClicked()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
