"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { FC } from "react";
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
        parallax={true}
      >
        {categories?.map((item) => {
          return (
            <SwiperSlide
              key={item?.billboard?.imageUrl}
              style={{ height: 400 }}
            >
              {({ isActive }) => (
                <Link
                  href={`/categories/${item?.id}`}
                  className={`flex relative rounded-[5px] px-[27px] py-[20px] transition ease-in-out delay-250 h-full transform  ${
                    isActive &&
                    "transform scale-[1] drop-shadow-[1px_1px_5px_rgba(127,170,132,0.50)]"
                  }`}
                  style={{
                    backgroundImage: `url('${process.env.BACKEND_URL}/billboards/${item?.billboard?.imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>
                  <h3 className="relative mt-auto text-left text-[16px] w-[199px] text-white font-semibold tracking-[0.32px]">
                    {item?.name}
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
