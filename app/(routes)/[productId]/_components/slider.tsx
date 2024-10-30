"use client";
import ArrowDown from "/public/images/arrow-down.svg";

import React, { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SliderProps {
  images: { url: string; id: string }[];
}

const Slider: FC<SliderProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex flex-col lg:flex-row-reverse gap-[15px]">
      <Swiper
        pagination={{
          el: ".swiper-pagination-custom",
        }}
        modules={[Pagination, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images?.map((item) => {
          return (
            <SwiperSlide key={item?.id}>
              <div className="relative aspect-square rounded-2xl overflow-hidden h-full w-full">
              <Image
                src={item?.url}
                alt="Image slider"
                fill
                className="absolute top-0 right-0 object-cover"
              />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="hidden lg:block">
        <Swiper
          modules={[Thumbs, Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          watchSlidesProgress={true}
          onSwiper={setThumbsSwiper}
          direction="vertical"
          navigation={{
            nextEl: ".swiper-btn-next",
          }}
          style={{ height: "260px", width: "65px", overflow: "hidden" }}
          className="flex flex-col ml-0"
        >
          {images?.map((item) => {
            return (
              <SwiperSlide key={item?.id}>
                <div className="relative aspect-square rounded-2xl w-full h-full overflow-hidden">
                <Image src={item?.url} alt="Image slider" fill className="absolute top-0 left-0 object-cover" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {images?.length > 3 && (
          <Button variant="ghost" type="button" className="swiper-btn-next">
            <ArrowDown />
          </Button>
        )}
      </div>
      <div className="swiper-pagination-custom lg:hidden" />
    </div>
  );
};

export default Slider;
