"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { FavoriteButton } from "@/features/favorites";
import { TitleBadges } from "@/entities/product/ui/title-badges";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

// Перший ряд на телефоні. Більше — і фото ділять вузький канал з LCP-фото.
const ABOVE_THE_FOLD_ITEMS = 2;
// Перший екран телефона: LCP часто не перше фото, а 3–4-те, і lazy відкладав його на ~1,3 с.
const FIRST_SCREEN_ITEMS = 6;

interface ProductCardImageProps {
  item: Product;
  href: string;
  index: number;
  prefetch: boolean;
  isList: boolean;
}

export const ProductCardImage = ({ item, href, index, prefetch, isList }: ProductCardImageProps) => {
  const t = useTranslations("product");
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn("relative shrink-0", isList && "w-[42%] md:w-[38%]")}>
      <Link href={href} prefetch={prefetch} scroll={false} className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-white">
        {loading && <div className="absolute inset-0 animate-pulse bg-[#E4E4E4]" />}
        <Image
          src={productImageUrl(item.images?.[0]?.url) ?? ImageNotFound}
          alt={item.title || t("imageAlt")}
          fill
          // Реальна ширина фото, а не колонки — інакше телефон тягне вдвічі більше пікселів.
          sizes={isList ? "(max-width: 767px) 40vw, 30vw" : "(max-width: 1279px) 46vw, (max-width: 1599px) 26vw, 20vw"}
          className="object-contain"
          priority={index < ABOVE_THE_FOLD_ITEMS}
          loading={index >= ABOVE_THE_FOLD_ITEMS && index < FIRST_SCREEN_ITEMS ? "eager" : undefined}
          onLoad={() => setLoading(false)}
        />
        <TitleBadges title={item.title} />
      </Link>
      <FavoriteButton product={item} className="absolute right-1.5 top-1.5" />
    </div>
  );
};
