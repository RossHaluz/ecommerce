"use client";
import ArrowDown from "/public/images/arrow-down.svg";
import ImageNotFound from "/public/images/image-not-found.jpg";

import React, { FC, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Thumbs } from "swiper/modules";
import { Swiper as SwiperClass } from "swiper/types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface SliderProps {
  images: { url: string; id: string }[];
}

const Slider: FC<SliderProps> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <>
      {images?.length > 0 ? (
        <div className="flex flex-col lg:flex-row-reverse gap-[15px]">
          <Swiper
            pagination={{
              el: ".swiper-pagination-custom",
              dynamicBullets: true,
            }}
            modules={[Pagination, Thumbs]}
            parallax
            thumbs={{ swiper: thumbsSwiper }}
          >
            {images?.map((item) => {
              return (
                <SwiperSlide
                  key={item?.id}
                  className="aspect-square rounded-2xl overflow-hidden relative"
                >
                  <Image
                    src={`${process.env.BACKEND_URL}/public/products/${item?.url}`}
                    alt="Image slider"
                    fill
                    objectFit="contain"
                    objectPosition="center center"
                    unoptimized={true}
                  />
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
                prevEl: ".swiper-btn-prev",
              }}
              style={{ height: "260px", width: "65px", overflow: "hidden" }}
              className="flex flex-col ml-0"
            >
              {images?.map((item) => {
                return (
                  <SwiperSlide
                    key={item?.id}
                    className="aspect-square rounded-2xl overflow-hidden relative"
                  >
                    <Image
                      src={`${process.env.BACKEND_URL}/public/products/${item?.url}`}
                      alt="Image slider"
                      fill
                      objectFit="contain"
                      unoptimized={true}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <div className="w-full flex items-center justify-between">
              {images?.length > 3 && (
                <Button
                  variant="ghost"
                  type="button"
                  className="swiper-btn-prev"
                >
                  <ArrowDown className="stroke-[#c0092a] rotate-180" />
                </Button>
              )}

              {images?.length > 3 && (
                <Button
                  variant="ghost"
                  type="button"
                  className="swiper-btn-next"
                >
                  <ArrowDown className="stroke-[#c0092a]" />
                </Button>
              )}
            </div>
          </div>
          <div className="swiper-pagination-custom mx-auto lg:hidden" />
        </div>
      ) : (
        <div className="relative aspect-square rounded-md overflow-hidden">
          <Image
            src={ImageNotFound}
            alt="Image not found"
            fill
            objectFit="cover"
          />
        </div>
      )}
    </>
  );
};

export default Slider;
