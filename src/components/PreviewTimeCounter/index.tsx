import cn from "classnames";
import styles from "./TimeCounter.module.sass";
import { useEffect, useState } from "react";

type PreviewTimeCounterProps = {
  className?: string;
  classTimerItem?: string;
  classTimerValue?: string;
  classTimerText?: string;
  time: string;
};

const PreviewTimeCounter = ({
  className,
  classTimerItem,
  classTimerValue,
  classTimerText,
  time,
}: PreviewTimeCounterProps) => {
  const [day, setDay] = useState<number>(0);
  const [hour, setHour] = useState<number>(0);
  const [min, setMin] = useState<number>(0);

  useEffect(() => {
    const targetTime = new Date(time).toLocaleString("en-US", {
      timeZone: "GMT",
    });
    const currentTime = new Date().toLocaleString("en-US", { timeZone: "GMT" });
    let result =
      new Date(targetTime).getTime() - new Date(currentTime).getTime();
    if (result < 0) result = 0;
    const days = Math.floor(result / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (result % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((result % (1000 * 60 * 60)) / (1000 * 60));

    setDay(days);
    setHour(hours);
    setMin(minutes);
  }, [time]);

  return (
    <div className={cn(styles.timer, className)}>
      {day !== 0 && (
        <div className={cn(styles.item, classTimerItem)}>
          <span className={cn("h3", styles.value, classTimerValue)}>{day}</span>
          <span className={cn(styles.text, classTimerText)}>Day</span>
        </div>
      )}
      {hour !== 0 && (
        <div className={cn(styles.item, classTimerItem)}>
          <span className={cn("h3", styles.value, classTimerValue)}>
            {hour}
          </span>
          <span className={cn(styles.text, classTimerText)}>Hour</span>
        </div>
      )}
      {min !== 0 && (
        <div className={cn(styles.item, classTimerItem)}>
          <span className={cn("h3", styles.value, classTimerValue)}>{min}</span>
          <span className={cn(styles.text, classTimerText)}>Min</span>
        </div>
      )}
    </div>
  );
};

export default PreviewTimeCounter;
