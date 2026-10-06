"use client";

import type { RefObject } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { productImageUrl } from "@/entities/product/model/product-image-url";

interface GallerySlidesProps {
  images: { id: string; url: string }[];
  alt: string;
  scrollerRef: RefObject<HTMLDivElement>;
  onScroll: () => void;
  onOpen: (index: number) => void;
}

/** Фото 4:3, гортаються пальцем. Нативна прокрутка замість Swiper: без JS-вимірів при завантаженні (TBT, LCP). */
export const GallerySlides = ({ images, alt, scrollerRef, onScroll, onOpen }: GallerySlidesProps) => {
  const t = useTranslations("a11y");

  return (
    <div
      ref={scrollerRef}
      onScroll={onScroll}
      className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] lg:rounded-lg [&::-webkit-scrollbar]:hidden"
    >
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onOpen(index)}
          aria-label={t("zoomPhoto")}
          className="relative aspect-[4/3] w-full shrink-0 snap-center snap-always"
        >
          <Image
            src={productImageUrl(image.url) ?? ""}
            alt={alt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
            // Інші фото — ліниво: не ділять канал з головним (LCP).
            loading={index === 0 ? undefined : "lazy"}
          />
        </button>
      ))}
    </div>
  );
};
