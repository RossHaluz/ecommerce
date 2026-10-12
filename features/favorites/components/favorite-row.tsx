"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/routing";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { AddedToCartSheet } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { productHref } from "@/entities/product/model/product-href";
import { productTitle } from "@/entities/product/model/product-heading";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { cn } from "@/lib/utils";
import { canBuy, type FavoriteRowView } from "../model/favorite-status";
import { FavoriteRowStatus } from "./favorite-row-status";
import { useFavoritesActions } from "../hooks/use-favorites-actions";

export const FavoriteRow = ({ row }: { row: FavoriteRowView }) => {
  const t = useTranslations();
  const { remove } = useFavoritesActions();
  const { format } = usePriceFormatter();
  const href = productHref(row.item.productName);

  return (
    <li className={cn("flex gap-3 rounded-xl bg-white p-2.5 md:items-center md:gap-5 md:p-4", row.availability === "unavailable" && "opacity-70")}>
      <Link href={href} className="relative h-[78px] w-[104px] shrink-0 overflow-hidden rounded-lg bg-[#F2F2F2] md:h-[120px] md:w-[160px]">
        <Image src={productImageUrl(row.item.image) ?? ImageNotFound} alt={row.item.title} fill sizes="160px" className="object-contain" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Link href={href} className="line-clamp-2 text-sm font-extrabold text-[#2E2E2E] hover:text-[#C0092A] md:text-[17px]">
          {productTitle(row.item.title)}
        </Link>
        <span className="text-xs text-[#6B6B6B] md:text-[13px]">OE {row.item.catalogNumber}</span>
        <FavoriteRowStatus row={row} />
        <span className="flex items-baseline gap-2 md:hidden">
          <span className="text-base font-extrabold text-[#C0092A]">{format(row.price)}</span>
          {row.oldPrice !== undefined && <s className="text-[13px] text-[#6B6B6B]">{format(row.oldPrice)}</s>}
        </span>
      </div>

      <span className="hidden w-[150px] flex-col items-end md:flex">
        <span className="text-xl font-extrabold text-[#C0092A]">{format(row.price)}</span>
        {row.oldPrice !== undefined && <s className="text-sm text-[#6B6B6B]">{format(row.oldPrice)}</s>}
      </span>

      <div className="flex shrink-0 flex-col items-end justify-between gap-2 md:flex-row-reverse md:items-center">
        <button
          type="button"
          aria-label={t("favorites.remove")}
          onClick={() => remove(row.item.id)}
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#C0092A] md:border md:border-[#E4E4E4]"
        >
          <Heart size={20} fill="currentColor" aria-hidden />
        </button>
        {canBuy(row) && (
          <AddedToCartSheet
            product={row.product}
            renderTrigger={(buy) => (
              <button
                type="button"
                onClick={() => buy()}
                aria-label={t("product.buy")}
                className="flex h-11 w-11 items-center justify-center gap-2 rounded-lg bg-[#C0092A] font-extrabold text-white md:w-auto md:px-5"
              >
                <ShoppingCart size={20} aria-hidden />
                <span className="hidden md:inline">{t("product.buy")}</span>
              </button>
            )}
          />
        )}
      </div>
    </li>
  );
};
