"use client";
import ArrowDown from "/public/images/arrow-down.svg";
import ImageNotFound from "/public/images/image-not-found.jpg";

import React, { FC, useEffect, useRef, useState } from "react";
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
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      prevRef.current &&
      nextRef.current &&
      swiperRef.current.params.navigation
    ) {
      const navigation = swiperRef.current.params.navigation;
      if (typeof navigation === "object") {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, [swiperRef]);

  return (
    <>
      {images?.length > 0 ? (
        <div className="flex flex-col lg:flex-row-reverse gap-[15px]">
          <Swiper
            ref={swiperRef}
            pagination={{
              el: ".swiper-pagination-custom",
              dynamicBullets: true,
            }}
            modules={[Pagination, Thumbs, Navigation]}
            parallax
            thumbs={{ swiper: thumbsSwiper }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setThumbsSwiper(swiper);
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {images?.map((item) => {
              return (
                <SwiperSlide
                  key={item?.id}
                  className="rounded-2xl overflow-hidden relative"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      aspectRatio: "1",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={`${process.env.BACKEND_URL}/public/products/${item?.url}`}
                      alt="Image slider"
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center center"
                      unoptimized={true}
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="hidden lg:block">
            <Swiper
              modules={[Thumbs]}
              spaceBetween={10}
              slidesPerView={3}
              watchSlidesProgress={true}
              onSwiper={setThumbsSwiper}
              direction="vertical"
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
                  ref={prevRef}
                  variant="ghost"
                  type="button"
                  className="swiper-btn-prev"
                >
                  <ArrowDown className="stroke-[#c0092a] rotate-180" />
                </Button>
              )}

              {images?.length > 3 && (
                <Button
                  ref={nextRef}
                  variant="ghost"
                  type="button"
                  className="swiper-btn-next"
                >
                  <ArrowDown className="stroke-[#c0092a]" />
                </Button>
              )}
            </div>
          </div>
          <div className="swiper-pagination-custom mx-auto lg:hidden w-full" />
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
