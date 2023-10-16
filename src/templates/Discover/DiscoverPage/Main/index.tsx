import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./Main.module.sass";
import Slide from "./Slide";
import { EffectFade, Navigation } from "swiper";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

type MainProps = {
  scrollToRef: any;
  recentActivityData: any[];
};

const Main = ({ scrollToRef, recentActivityData }: MainProps) => {
  return (
    <div className={styles.main} ref={scrollToRef}>
      <Swiper
        navigation={true}
        loop={true}
        effect={"fade"}
        modules={[EffectFade, Navigation]}
        className="discover-swiper"
      >
        {recentActivityData.map((x, index) => (
          <SwiperSlide key={index}>
            <Slide item={x} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Main;
