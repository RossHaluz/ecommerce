"use client";

import { useTranslations } from "next-intl";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatPrice } from "@/lib/format/price";
import { cartTotal } from "../model/cart-total";

/** «До сплати» з сумою у вибраній валюті й гривнями дрібно — платять у гривнях. */
export const CartTotal = ({ items }: { items: { price: number | string }[] | undefined }) => {
  const t = useTranslations("cart");
  const { currency, format } = usePriceFormatter();
  const { data } = useExchangeRate();
  const total = cartTotal(items);
  if (!total) return null;

  const uah = currency === "USD" && data?.usdToUah ? formatPrice(total, { currency: "UAH", usdToUahRate: data.usdToUah }) : null;

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
