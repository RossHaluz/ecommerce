"use client";

import { useState } from "react";
import { productHref } from "@/entities/product/model/product-href";
import { StockLine } from "@/entities/product/ui/stock-line";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ProductCardImage } from "./product-card-image";
import { ProductCardTitle } from "./product-card-title";
import { ProductCardMeta } from "./product-card-meta";
import { ProductCardPrice } from "./product-card-price";
import { ProductCardBuy } from "./product-card-buy";

interface ProductCardProps {
  item: Product;
  index: number;
  className?: string;
}

export const ProductCard = ({ item, index, className }: ProductCardProps) => {
  const isList = useHydratedSelector(selectCurrentCustomizer) === "list";
  const href = productHref(item.product_name);
  // Повне підвантаження картки — лише коли людина вже тягнеться до неї: до кліку лишається 100–300 мс.
  const [prefetch, setPrefetch] = useState(false);
  const warm = () => setPrefetch(true);

  return (
    <li
      onMouseEnter={warm}
      onTouchStart={warm}
      className={cn(
        "flex rounded-xl bg-white p-2 transition-shadow hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] md:p-3",
        isList ? "flex-row gap-3 md:gap-5" : "flex-col gap-2",
        className
      )}
    >
      <ProductCardImage item={item} href={href} index={index} prefetch={prefetch} isList={isList} />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <ProductCardTitle title={item.title} href={href} prefetch={prefetch} />
        <ProductCardMeta item={item} />
        <StockLine quantity={item.quantity} className="text-xs md:text-[13px]" />
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <ProductCardPrice price={Number(item.price)} />
          <ProductCardBuy item={item} />
        </div>
      </div>
    </li>
  );
};
