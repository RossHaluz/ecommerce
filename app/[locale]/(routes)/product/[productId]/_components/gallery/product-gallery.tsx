"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ZoomIn } from "lucide-react";
import FullscreenGallery from "@/components/large-photo-image";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { GallerySlides } from "./gallery-slides";
import { GalleryThumbs } from "./gallery-thumbs";
import { slideIndexAt } from "./slide-index";

interface ProductGalleryProps {
  images: { id: string; url: string }[];
  title?: string;
}

/** Фото 4:3 на всю ширину картки, лічильник, мініатюри; тап — повноекранний перегляд. */
export const ProductGallery = ({ images, title }: ProductGalleryProps) => {
  const t = useTranslations("product");
  const scrollerRef = useRef<HTMLDivElement>(null);
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

  const syncActive = () => {
    const el = scrollerRef.current;
    if (el) setActive(slideIndexAt(el.scrollLeft, el.clientWidth, images.length));
  };

  const showSlide = (index: number) => {
    const el = scrollerRef.current;
    el?.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="-mx-4 flex flex-col gap-2.5 bg-[#FFFDFD] pb-3.5 lg:mx-0 lg:flex-row lg:gap-3 lg:rounded-xl lg:p-4">
      <div className="relative min-w-0 lg:order-2 lg:flex-1">
        <GallerySlides images={images} alt={alt} scrollerRef={scrollerRef} onScroll={syncActive} onOpen={setFullscreenFrom} />
        {images.length > 1 && (
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-[rgba(30,30,30,0.72)] px-3 py-1 text-[13px] font-bold text-white">
            <ZoomIn size={14} className="hidden lg:block" aria-hidden />
            {active + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="lg:order-1">
          <GalleryThumbs images={images} active={active} onSelect={showSlide} />
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
