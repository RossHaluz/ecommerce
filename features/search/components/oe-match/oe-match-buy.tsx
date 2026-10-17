"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AddedToCartSheet } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { Product } from "@/lib/types";
import { productHref } from "../../model/results-href";

export const OeMatchBuy = ({ product }: { product: Product }) => {
  const t = useTranslations();
  const { format, approxUah } = usePriceFormatter();
  const price = Number(product.price);
  const uah = approxUah(price);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col">
        <span className="text-2xl font-extrabold text-[#C0092A]">{price ? format(price) : t("product.negotiablePrice")}</span>
        <span className="min-h-[16px] text-xs text-[#6B6B6B]">{uah && t("product.approxShort", { price: uah })}</span>
      </div>
      <div className="flex gap-3">
        <Link
          href={productHref(product.product_name)}
          className="flex h-12 flex-1 items-center justify-center rounded-lg border-2 border-[#C0092A] px-4 font-extrabold text-[#C0092A] hover:bg-[#FFF2F4]"
        >
          {t("search.details")}
        </Link>
        <AddedToCartSheet
          product={product}
          renderTrigger={(buy) => (
            <button type="button" onClick={() => buy()} className="h-12 flex-1 rounded-lg bg-[#C0092A] px-4 font-extrabold text-white hover:bg-[#A30722]">
              {t("product.buy")}
            </button>
          )}
        />
      </div>
    </div>
  );
};
