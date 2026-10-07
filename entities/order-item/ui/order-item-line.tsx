"use client";

import { usePriceFormatter } from "@/hooks/use-price-formatter";
import type { OrderItem } from "@/redux/order/slice";
import { OrderItemThumb } from "./order-item-thumb";

/** Рядок «фото · назва × кількість · сума» — у підсумку оформлення й на сторінці «Дякуємо». */
export const OrderItemLine = ({ item }: { item: OrderItem }) => {
  const { format } = usePriceFormatter();

  return (
    <li className="flex items-center gap-3">
      <OrderItemThumb imageUrl={item.images?.[0]?.url} sizes="72px" className="h-[52px] w-[72px] rounded-md border border-[#EEEEEE]" />
      <span className="line-clamp-2 flex-1 text-sm font-bold text-[#484848] first-letter:uppercase">
        {item.title}
        {item.quantity > 1 && <span className="font-normal text-[#6B6B6B]"> × {item.quantity}</span>}
      </span>
      <span className="shrink-0 text-[15px] font-bold text-[#484848]">{format(Number(item.price))}</span>
    </li>
  );
};
