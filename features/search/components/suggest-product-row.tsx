"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { productTitle } from "@/entities/product/model/product-heading";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { cn } from "@/lib/utils";
import type { SuggestProduct } from "../model/types";
import { productHref } from "@/entities/product/model/product-href";
import { HighlightedText } from "./highlighted-text";

interface SuggestProductRowProps {
  product: SuggestProduct;
  query: string;
  optionId: string;
  isActive: boolean;
  onPick: () => void;
}

export const SuggestProductRow = ({ product, query, optionId, isActive, onPick }: SuggestProductRowProps) => {
  const t = useTranslations();
  const { format } = usePriceFormatter();
  const inStock = product.quantity > 0;

  return (
    <li id={optionId} role="option" aria-selected={isActive}>
      <Link
        href={productHref(product.slug)}
        onClick={onPick}
        className={cn("flex items-center gap-3 rounded-lg p-2 hover:bg-[#F5F5F5]", isActive && "bg-[#F5F5F5]")}
      >
        <span className="relative h-12 w-16 shrink-0 overflow-hidden rounded-md bg-white">
          <Image src={productImageUrl(product.image ?? undefined) ?? ImageNotFound} alt="" fill sizes="64px" className="object-contain" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="line-clamp-2 text-[15px] leading-5 text-[#484848]">
            <HighlightedText text={productTitle(product.title)} query={query} />
          </span>
          <span className="flex flex-wrap gap-x-2 text-xs text-[#6B6B6B]">
            {product.catalogNumber && <span>{t("search.oe", { number: product.catalogNumber })}</span>}
            <span className={inStock ? "text-[#1E7B3C]" : "text-[#8A5A00]"}>{t(inStock ? "product.inStock" : "product.onOrder")}</span>
          </span>
        </span>
        <span className="shrink-0 whitespace-nowrap text-right text-sm font-extrabold text-[#C0092A]">
          {product.price ? format(product.price) : t("product.negotiablePrice")}
        </span>
      </Link>
    </li>
  );
};
