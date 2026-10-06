"use client";

import { useEffect, useState } from "react";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { StockStatus } from "@/entities/product/ui/stock-status";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import ProductBtn from "../product-btn";
import { MAIN_BUY_CTA_ID } from "./main-buy-cta";

/** Телефон: ціна й «Купити» завжди під пальцем, поки гортають фото й характеристики. */
export const StickyBuyBar = ({ product }: { product: Product }) => {
  const [visible, setVisible] = useState(false);
  const { format } = usePriceFormatter();

  useEffect(() => {
    const cta = document.getElementById(MAIN_BUY_CTA_ID);
    if (!cta) return;
    // Лише коли кнопку прогорнули (вона вище екрана), а не коли до неї ще не дійшли.
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0)
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 bg-[#FFFDFD] px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.12)] transition-transform duration-200 lg:hidden",
        // invisible, а не aria-hidden: прихована кнопка не має ловити фокус клавіатури.
        visible ? "translate-y-0" : "invisible translate-y-full"
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-xl font-extrabold text-[#C0092A]">{format(product.price)}</span>
        <StockStatus quantity={product.quantity} className="text-xs font-bold" />
      </div>
      <div className="w-[180px]">
        <ProductBtn item={product} className="h-12 text-base" />
      </div>
    </div>
  );
};
