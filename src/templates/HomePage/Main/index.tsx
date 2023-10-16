import cn from "classnames";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import styles from "./Main.module.sass";
import Arrow from "~/components/Arrow";
import Item from "./Item";

import { Navigation, Scrollbar } from "swiper";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

type MainProps = {
  list: any[];
};

const Main = ({ list }: MainProps) => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.col}>
          <h1 className={cn("hero", styles.title)}>Instant Swap.</h1>
          <Arrow className={styles.arrow} />
        </div>
        <div className={styles.col}>
          <div className={styles.content}>
            FIND AN OFFER THAT SUITS YOU. SWAP. - explore the limitless
            possibilities of Bitcoin Ordinals.
          </div>
          <Link className={cn("button-empty", styles.search)} href="/discover">
            start your search
          </Link>
        </div>
      </div>
      <div className={styles.wrapper}>
        <Swiper
          navigation={true}
          loop={false}
          modules={[Navigation, Scrollbar]}
          className="vertical-swiper"
          direction="vertical"
          scrollbar={{
            hide: true,
          }}
          speed={700}
          breakpoints={{
            320: {
              direction: "horizontal",
            },
            1024: {
              direction: "vertical",
            },
          }}
        >
          {list.map((x, index) => (
            <SwiperSlide key={index}>
              <Item item={x} key={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Main;
