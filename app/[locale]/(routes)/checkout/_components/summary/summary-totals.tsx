"use client";

import { useTranslations } from "next-intl";
import { CartTotal, cartTotal } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { OrderItem } from "@/redux/order/slice";
import type { DeliveryMethod } from "../../model/checkout-options";

/** Вартість доставки чесно «за тарифами»: сума невідома до відправки, і обіцянка цифри зірвала б довіру. */
export const SummaryTotals = ({ items, deliveryMethod }: { items: OrderItem[]; deliveryMethod: DeliveryMethod }) => {
  const t = useTranslations("checkout");
  const { format } = usePriceFormatter();

  return (
    <div className="flex flex-col gap-2 text-[15px] text-[#484848]">
      <div className="flex justify-between gap-3">
        <span>{t("itemsCount", { count: items.length })}</span>
        <span>{format(cartTotal(items))}</span>
      </div>
      <div className="flex justify-between gap-3">
        <span>{t("deliveryCost")}</span>
        <span className="text-right text-[#6B6B6B]">{t(`delivery.${deliveryMethod}.cost`)}</span>
      </div>
      <CartTotal items={items} />
    </div>
  );
};
