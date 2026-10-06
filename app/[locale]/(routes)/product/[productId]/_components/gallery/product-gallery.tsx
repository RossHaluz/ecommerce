"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import { ZoomIn } from "lucide-react";
import FullscreenGallery from "@/components/large-photo-image";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { GalleryThumbs } from "./gallery-thumbs";

interface ProductGalleryProps {
  images: { id: string; url: string }[];
  title?: string;
}

/** Фото 4:3 на всю ширину картки, лічильник, мініатюри; тап — повноекранний перегляд. */
export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const t = useTranslations("product");
  const tA11y = useTranslations("a11y");
  const swiperRef = useRef<SwiperClass | null>(null);
  const [active, setActive] = useState(0);
  const [fullscreenFrom, setFullscreenFrom] = useState<number | null>(null);
  const alt = title || t("imageAlt");

  if (!images?.length) {
    return (
      <section className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#FFFDFD]">
        <Image src={ImageNotFound} alt={alt} fill className="object-contain" />
      </section>
    );
  }

  return (
    <section className="-mx-4 flex flex-col gap-2.5 bg-[#FFFDFD] pb-3.5 lg:mx-0 lg:flex-row lg:gap-3 lg:rounded-xl lg:p-4">
      <div className="relative min-w-0 lg:order-2 lg:flex-1">
        <Swiper onSwiper={(swiper) => (swiperRef.current = swiper)} onSlideChange={(swiper) => setActive(swiper.activeIndex)}>
          {images.map((image, index) => (
            <SwiperSlide key={image.id}>
              <button
                type="button"
                onClick={() => setFullscreenFrom(index)}
                aria-label={tA11y("zoomPhoto")}
                className="relative block aspect-[4/3] w-full overflow-hidden lg:rounded-lg"
              >
                <Image
                  src={productImageUrl(image.url) ?? ""}
                  alt={alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                  priority={index === 0}
                  // Сусідні слайди Chrome вантажить одразу — не даємо їм ділити канал з головним фото (LCP).
                  fetchPriority={index === 0 ? undefined : "low"}
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        {images.length > 1 && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-[rgba(30,30,30,0.72)] px-3 py-1 text-[13px] font-bold text-white">
            <ZoomIn size={14} className="hidden lg:block" aria-hidden />
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="lg:order-1">
          <GalleryThumbs images={images} active={active} onSelect={(index) => swiperRef.current?.slideTo(index)} />
        </div>
      )}

      {fullscreenFrom !== null && (
        <FullscreenGallery
          initialIndex={fullscreenFrom}
          onClose={() => setFullscreenFrom(null)}
          images={images.map((image) => image.url)}
        />
      )}
    </section>
  );
};
