"use client";

import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { AddedToCartSheet } from "@/features/cart";
import type { Product } from "@/lib/types";

/** На вузькій картці телефона — лише іконка (44 px для пальця), з md — повне «Купити». */
export const ProductCardBuy = ({ item }: { item: Product }) => {
  const t = useTranslations("product");

  return (
    <AddedToCartSheet
      product={item}
      renderTrigger={(buy) => (
        <button
          type="button"
          onClick={() => buy()}
          aria-label={t("buy")}
          className="flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#C0092A] font-extrabold text-white hover:bg-[#A30722] md:w-auto md:px-5"
        >
          <ShoppingCart size={20} className="md:hidden" aria-hidden />
          <span className="hidden md:inline">{t("buy")}</span>
        </button>
      )}
    />
  );
};
