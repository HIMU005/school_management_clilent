// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./styles.css";

// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwipCard from "./SwipCard";
const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[1, 2, 3, 4, 5].map((card, idx) => (
          <SwiperSlide key={idx}>
            <SwipCard card={card} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
