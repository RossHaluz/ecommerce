"use client";

import { useTranslations } from "next-intl";
import { cartTotal } from "@/features/cart";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { OrderItemThumb } from "@/entities/order-item/ui/order-item-thumb";
import type { OrderItem } from "@/redux/order/slice";
import { richTags } from "@/i18n/rich-tags";
import { EditCartButton } from "./edit-cart-button";

const MAX_THUMBS = 3;

/** Телефон: замість довгого списку — що й на скільки; деталі за «Змінити». */
export const MiniSummary = ({ items }: { items: OrderItem[] }) => {
  const t = useTranslations("checkout");
  const { format } = usePriceFormatter();

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3.5">
      <span className="flex shrink-0">
        {items.slice(0, MAX_THUMBS).map((item, index) => (
          <OrderItemThumb
            key={item.orderItemId ?? item.id}
            imageUrl={item.images?.[0]?.url}
            sizes="52px"
            className={`h-10 w-[52px] rounded-md border-2 border-white ${index ? "-ml-4" : ""}`}
          />
        ))}
      </span>
      <span className="flex-1 text-sm text-[#484848]">
        {t.rich("miniSummary", { ...richTags, count: items.length, total: format(cartTotal(items)) })}
      </span>
      <EditCartButton />
    </div>
  );
};
