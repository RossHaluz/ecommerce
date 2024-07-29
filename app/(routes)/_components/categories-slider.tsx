"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface CategoriesSliderProps {
  categories: {
    id: string;
    name: string;
    billboard: {
      label: string;
      imageUrl: string;
    };
  }[];
}

const CategoriesSlider: FC<CategoriesSliderProps> = ({ categories }) => {
  return (
    <div className="relative w-full m-auto mt-5 lg:hidden">
      <Swiper
        spaceBetween={10}
        slidesPerView={1.7}
        centeredSlides={true}
        roundLengths={true}
        loop={true}
      >
        {categories?.map((item) => {
          return (
            <SwiperSlide key={item?.billboard?.imageUrl}>
              {({ isActive }) => (
                <Link
                  href={`/categories/${item?.id}`}
                  className={`flex relative rounded-[5px] px-[27px] py-[20px] transition ease-in-out delay-250 h-full transform scale-[0.8] ${
                    isActive &&
                    "transform scale-[1] drop-shadow-[1px_1px_5px_rgba(127,170,132,0.50)]"
                  }`}
                >
                  <Image
                    src={item?.billboard?.imageUrl}
                    alt={item?.name}
                    fill
                    className="absolute top left-0 object-cover w-full h-full"
                  />
                  <h3 className="relative mt-auto text-left text-[16px] w-[199px] text-[#484848] font-semibold tracking-[0.32px]">
                    {item?.billboard?.label}
                  </h3>
                </Link>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CategoriesSlider;
