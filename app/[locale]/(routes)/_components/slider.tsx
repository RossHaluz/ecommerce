"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css";
import { FC,  useRef, useState } from "react";
import Image from "next/image";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { cn } from "@/lib/utils";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { nanoid } from "nanoid";
import Arrow from "/public/images/arrow.svg";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

interface SlideProps {
  images: { url: string }[];
  title: string;
  isMouseEnter: string | null;
  currentId: string | null;
}

const Slider: FC<SlideProps> = ({ images, title, isMouseEnter, currentId }) => {
  const [loading, setLoading] = useState(true);
  const currentCustomizer = useHydratedSelector(selectCurrentCustomizer);
  const swiperRef = useRef<any>(null);

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      modules={[Navigation]}
      loop={true}
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
    >
      {images?.map(({ url }) => {
        return (
          <SwiperSlide key={nanoid()}>
            <div
              className={cn(
                "relative w-full aspect-video flex justify-center items-center bg-white overflow-hidden",
                {
                  "aspect-video": currentCustomizer === "list",
                }
              )}
            >
              {loading && (
                <div className="absolute inset-0 animate-pulse bg-gray-300" />
              )}

              <Image
                src={
                  url
                    ? `${process.env.BACKEND_URL}/products/${url}`
                    : ImageNotFound
                }
                alt={title || "Фото товару"}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
                priority
                onLoad={() => setLoading(false)}
              />
            </div>
          </SwiperSlide>
        );
      })}

      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          swiperRef.current?.slidePrev();
        }}
        aria-label="Prev slide"
        className={cn(
          "absolute top-1/2 left-3  -translate-y-1/2 z-30 transform transition-opacity duration-75",
          {
            "opacity-100": isMouseEnter === currentId,
            "opacity-0 pointer-events-none": isMouseEnter !== currentId,
          }
        )}
      >
        <div className="bg-[#f5f5f5] hover:bg-[#e9e9e9] rounded-full flex items-center justify-center p-2 cursor-pointer">
          <Arrow className="fill-[#161515]" />
        </div>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          swiperRef.current?.slideNext();
        }}
        aria-label="Next slide"
        className={cn(
          "absolute top-1/2 right-3 transform -translate-y-1/2 transition-opacity duration-75 z-30",
          {
            "opacity-100": isMouseEnter === currentId,
            "opacity-0 pointer-events-none": isMouseEnter !== currentId,
          }
        )}
      >
        <div
          className={cn(
            "bg-[#f5f5f5] hover:bg-[#e9e9e9] rounded-full flex items-center justify-center p-2 cursor-pointer"
          )}
        >
          <Arrow className="fill-[#161515] rotate-180" />
        </div>
      </button>
    </Swiper>
  );
};

export default Slider;
