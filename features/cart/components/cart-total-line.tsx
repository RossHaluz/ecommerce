"use client";

import { useTranslations } from "next-intl";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { cartTotal } from "../model/cart-total";

/** «До сплати» з сумою у вибраній валюті й гривнями дрібно — платять у гривнях. */
export const CartTotal = ({ items }: { items: { price: number | string }[] | undefined }) => {
  const t = useTranslations("cart");
  const { format, approxUah } = usePriceFormatter();
  const total = cartTotal(items);
  if (!total) return null;

  const uah = approxUah(total);

  return (
    <div className="flex items-baseline justify-between border-t border-[#EEEEEE] pt-3">
      <span className="text-[15px]">{t("total")}</span>
      <span className="flex flex-col items-end">
        <span className="text-xl font-extrabold text-[#C0092A]">{format(total)}</span>
        {uah && <span className="text-xs text-[#6B6B6B]">≈ {uah}</span>}
      </span>
    </div>
  );
};
