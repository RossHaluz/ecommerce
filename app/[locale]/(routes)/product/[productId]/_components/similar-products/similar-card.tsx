"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/routing";
import { AddedToCartSheet } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { productHref } from "@/entities/product/model/product-href";
import { StockStatus } from "@/entities/product/ui/stock-status";
import type { Product } from "@/lib/types";
import ImageNotFound from "/public/images/image-not-found.jpg";

/** Картка «Ще для Audi …»: фото 4:3, назва, OE, наявність, ціна й «Купити» — як у макеті. */
export const SimilarCard = ({ product }: { product: Product }) => {
  const t = useTranslations("product");
  const { format } = usePriceFormatter();
  const href = productHref(product.product_name);
  const price = Number(product.price);

  return (
    <article className="flex h-full flex-col gap-1.5 lg:gap-2 lg:rounded-xl lg:bg-[#FFFDFD] lg:p-3">
      <Link href={href} prefetch={false} className="relative block aspect-[4/3] overflow-hidden rounded-lg bg-[#F2F2F2]">
        <Image
          src={productImageUrl(product.images?.[0]?.url) ?? ImageNotFound}
          alt={product.title}
          fill
          sizes="(max-width: 1023px) 160px, 25vw"
          className="object-cover"
        />
      </Link>
      <h3 className="m-0 line-clamp-2 text-sm font-bold leading-[18px] text-[#2E2E2E] first-letter:uppercase lg:text-[15px] lg:leading-5">
        <Link href={href} prefetch={false}>
          {product.title}
        </Link>
      </h3>
      {product.catalog_number && <span className="text-xs text-[#6B6B6B] lg:text-[13px]">{product.catalog_number}</span>}
      <StockStatus quantity={product.quantity} className="text-[13px] font-bold" />
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="text-[17px] font-extrabold text-[#C0092A] lg:text-xl">{price ? format(price) : t("negotiablePrice")}</span>
        <AddedToCartSheet
          product={product}
          renderTrigger={(buy) => (
            <button
              type="button"
              onClick={() => buy()}
              aria-label={`${t("buy")}: ${product.title}`}
              className="flex h-11 min-w-[44px] items-center justify-center rounded-lg bg-[#C0092A] px-0 font-extrabold text-white lg:px-4"
            >
              <ShoppingCart size={20} className="lg:hidden" aria-hidden />
              <span className="hidden lg:inline">{t("buy")}</span>
            </button>
          )}
        />
      </div>
    </article>
  );
};
