"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { cn } from "@/lib/utils";

interface GalleryThumbsProps {
  images: { id: string; url: string }[];
  active: number;
  onSelect: (index: number) => void;
}

/** Мініатюри: рядком під фото на телефоні, колонкою зліва на комп'ютері. Звичайні кнопки — без другого Swiper. */
export const GalleryThumbs = ({ images, active, onSelect }: GalleryThumbsProps) => {
  const t = useTranslations("a11y");

  return (
    <div className="flex gap-2 overflow-x-auto px-4 pb-1 lg:max-h-[520px] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:px-0 lg:pb-0">
      {images.map((image, index) => (
        <button
          key={image.id}
          type="button"
          onClick={() => onSelect(index)}
          aria-label={t("photo", { number: index + 1 })}
          aria-current={index === active}
          className={cn(
            "relative h-12 w-16 shrink-0 overflow-hidden rounded-md lg:h-[60px] lg:w-20",
            index === active ? "border-2 border-[#C0092A]" : "border border-[#DDDDDD]"
          )}
        >
          <Image src={productImageUrl(image.url) ?? ""} alt="" fill sizes="80px" className="object-cover" />
        </button>
      ))}
    </div>
  );
};
