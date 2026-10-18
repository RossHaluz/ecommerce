"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { productTitle } from "@/entities/product/model/product-heading";
import { StockStatus } from "@/entities/product/ui/stock-status";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { Product } from "@/lib/types";
import { productHref } from "@/entities/product/model/product-href";

/** Інші товари з тим самим номером: ліва й права, інший колір, друга штука. */
export const OeAlsoList = ({ products }: { products: Product[] }) => {
  const t = useTranslations();
  const { format } = usePriceFormatter();
  if (!products.length) return null;

  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-sm font-extrabold text-[#2E2E2E]">{t("search.alsoWithNumber")}</h3>
      <ul className="flex flex-col divide-y divide-[#EEEEEE]">
        {products.map((product) => (
          <li key={product.id}>
            <Link href={productHref(product.product_name)} className="flex min-h-[48px] items-center justify-between gap-3 py-2 hover:text-[#C0092A]">
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[15px]">{productTitle(product.title)}</span>
                <StockStatus quantity={product.quantity} className="text-xs" />
              </span>
              <span className="shrink-0 text-sm font-extrabold text-[#C0092A]">
                {Number(product.price) ? format(Number(product.price)) : t("product.negotiablePrice")}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
