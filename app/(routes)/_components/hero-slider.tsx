"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

interface HeroSliderProps {
  heroBillboards: {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    url: string;
  }[];
}

const HeroSlider: FC<HeroSliderProps> = ({ heroBillboards }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={10}
      slidesPerView={1}
      autoplay
      navigation
      pagination
      className="swiper-hero"
    >
      {heroBillboards?.map((item) => {
        return (
          <SwiperSlide key={item?.id}>
            <div
              className="relative w-full h-full"
              style={{
                backgroundImage: `url(${process.env.BACKEND_URL}/hero-billboards/${item?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

              <div className="relative container w-full h-full  flex flex-col justify-center gap-[42.97px]">
                <div className="flex flex-col  gap-7 lg:w-[656px]">
                  <h1 className="font-bold text-[24px] text-left text-white leading-[30.12px] lg:text-[48px] lg:font-bold lg:leading-[60.24px]">
                    {item?.title}
                  </h1>
                  <h2 className="text-sm text-white text-left lg:text-[24px] lg:leading-[29.26px]">
                    {item?.subtitle}
                  </h2>
                </div>

                <Button className="py-[11.5px] px-5 max-w-max cursor-pointer lg:px-[25px] lg:py-[15px] lg:text-base lg:font-semibold rounded-[5px]">
                  <Link href="/categories">Перейти в каталог</Link>
                </Button>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default HeroSlider;
