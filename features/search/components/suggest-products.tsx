"use client";

import { useTranslations } from "next-intl";
import type { SuggestProduct } from "../model/types";
import { SuggestProductRow } from "./suggest-product-row";

export const SEARCH_LISTBOX_ID = "search-suggestions";
export const searchOptionId = (index: number) => `search-option-${index}`;

interface SuggestProductsProps {
  products: SuggestProduct[];
  query: string;
  activeIndex: number;
  onPick: () => void;
}

export const SuggestProducts = ({ products, query, activeIndex, onPick }: SuggestProductsProps) => {
  const t = useTranslations("search");

  return (
    <section className="flex flex-col gap-1">
      <h3 className="px-2 text-xs font-extrabold uppercase tracking-wide text-[#8A8A8A]">{t("products")}</h3>
      <ul id={SEARCH_LISTBOX_ID} role="listbox" aria-label={t("products")} className="flex flex-col">
        {products.map((product, index) => (
          <SuggestProductRow
            key={product.id}
            product={product}
            query={query}
            optionId={searchOptionId(index)}
            isActive={index === activeIndex}
            onPick={onPick}
          />
        ))}
      </ul>
    </section>
  );
};
