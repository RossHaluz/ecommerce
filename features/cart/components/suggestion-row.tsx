"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import { Link } from "@/i18n/routing";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { OrderItemThumb } from "@/entities/order-item/ui/order-item-thumb";
import { productHref } from "@/entities/product/model/product-href";
import type { Product } from "@/lib/types";
import { useAddToCart } from "../hooks/use-add-to-cart";

/** Додає одразу в кошик, що вже відкритий, — без ще однієї шторки поверх. */
export const SuggestionRow = ({ product }: { product: Product }) => {
  const t = useTranslations();
  const { format } = usePriceFormatter();
  const addToCart = useAddToCart();
  const price = Number(product.price);

  return (
    <li className="flex items-center gap-3 rounded-xl bg-white p-2.5">
      <OrderItemThumb imageUrl={product.images?.[0]?.url} sizes="72px" className="h-[54px] w-[72px] rounded-lg" />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <Link href={productHref(product.product_name)} prefetch={false} className="line-clamp-2 text-sm font-bold leading-[18px] text-[#2E2E2E] first-letter:uppercase">
          {product.title}
        </Link>
        <span className="text-[15px] font-extrabold text-[#C0092A]">{price ? format(price) : t("product.negotiablePrice")}</span>
      </span>
      <button
        type="button"
        onClick={() => addToCart(product)}
        aria-label={`${t("cart.addToCart")}: ${product.title}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C0092A] text-white"
      >
        <Plus size={20} aria-hidden />
      </button>
    </li>
  );
};
