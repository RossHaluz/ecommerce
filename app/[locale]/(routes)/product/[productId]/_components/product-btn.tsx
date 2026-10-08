"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { AddedToCartSheet, QuantityStepper } from "@/features/cart";
import { buyState } from "@/features/cart/model/buy-state";
import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { InCartLink } from "./buy-box/in-cart-link";

interface ProductBtnProps {
  item: Product;
  /** Блок покупки — з кількістю й поясненнями; липка панель — лише кнопка. */
  compact?: boolean;
  className?: string;
}

/** «Купити» з кількістю в межах залишку; коли весь залишок у кошику — «У кошику · перейти». */
const ProductBtn = ({ item, compact = false, className }: ProductBtnProps) => {
  const t = useTranslations("product");
  const { format } = usePriceFormatter();
  const items = useHydratedSelector(selectOrderItems);
  const [quantity, setQuantity] = useState(1);
  const state = buyState(item.quantity, items?.find((line) => line.id === item.id)?.quantity ?? 0);

  const price = Number(item.price);

  return (
    // Шторка «Додано» лишається змонтованою: після покупки останньої штуки кнопка стає «У кошику»,
    // і якби разом із нею зникла шторка, вона закрилась би, щойно відкрившись.
    <AddedToCartSheet
      product={item}
      renderTrigger={(buy) => {
        if (state.kind === "inCart") return <InCartLink inCart={state.inCart} compact={compact} className={className} />;
        const chosen = Math.min(quantity, state.maxQuantity);
        return (
          <div className="flex w-full gap-2">
            {!compact && state.maxQuantity > 1 && (
              <QuantityStepper value={chosen} max={state.maxQuantity} onChange={setQuantity} size="lg" label={item.title} />
            )}
            <Button
              className={cn("h-[52px] min-w-0 flex-1 rounded-lg text-[17px] font-extrabold lg:h-14 lg:text-lg", className)}
              onClick={() => {
                buy(chosen);
                setQuantity(1);
              }}
            >
              {/* Сума на кнопці лише коли штук кілька: людина бачить, на що погоджується. */}
              {chosen > 1 && price ? `${t("buy")} · ${format(price * chosen)}` : t("buy")}
            </Button>
          </div>
        );
      }}
    />
  );
};

export default ProductBtn;
